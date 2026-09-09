import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import puppeteer from "puppeteer-core";

const executablePath = [
  process.env.BROWSER_EXECUTABLE_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome", "/usr/bin/chromium", "/usr/bin/chromium-browser",
].find((path) => path && existsSync(path));
if (!executablePath) throw new Error("Set BROWSER_EXECUTABLE_PATH to your Chrome or Chromium executable.");

const baseUrl = process.env.BASE_URL ?? "http://localhost:3000";
const browser = await puppeteer.launch({ executablePath, headless: true });
const errors = [];
try {
  const page = await browser.newPage();
  page.setDefaultTimeout(30_000);
  page.on("pageerror", (error) => errors.push(error.message));
  const bookings = [];
  page.on("request", (request) => { if (/https:\/\/[^/]*cal\.com\//.test(request.url())) bookings.push(request.url()); });
  await page.setViewport({ width: 390, height: 844 });
  const response = await page.goto(baseUrl, { waitUntil: "networkidle2", timeout: 90_000 });
  assert.equal(response.status(), 200);
  await page.waitForSelector('.consent-banner button');
  await page.locator('.consent-banner button:last-child').click();
  await page.waitForSelector('.consent-banner', { hidden: true });

  await page.locator('[aria-label="Open menu"]').click();
  await page.waitForSelector('#mobile-menu[open]');
  assert.equal(await page.evaluate(() => document.activeElement?.getAttribute("aria-label")), "Close menu");
  await page.keyboard.down("Shift");
  await page.keyboard.press("Tab");
  await page.keyboard.up("Shift");
  assert.equal(await page.evaluate(() => document.querySelector('#mobile-menu').contains(document.activeElement)), true);
  await page.keyboard.press("Tab");
  assert.equal(await page.evaluate(() => document.querySelector('#mobile-menu').contains(document.activeElement)), true);
  await page.keyboard.press("Escape");
  await page.waitForSelector('#mobile-menu[open]', { hidden: true });
  assert.equal(await page.evaluate(() => document.activeElement?.getAttribute("aria-label")), "Open menu");
  assert.equal(await page.evaluate(() => document.body.style.overflow), "");

  await page.locator('[aria-label="Open menu"]').click();
  await page.setViewport({ width: 1024, height: 900 });
  await page.waitForSelector('#mobile-menu[open]', { hidden: true });
  assert.equal(await page.evaluate(() => document.body.style.overflow), "");
  console.log("PASS: modal focus, Escape, focus restoration, and desktop resize");

  await page.locator('.faq-item:nth-child(1) summary').click();
  await page.locator('.faq-item:nth-child(2) summary').click();
  assert.equal(await page.evaluate(() => document.querySelectorAll('.faq-item[open]').length), 1);
  console.log("PASS: native FAQ disclosure");

  for (const width of [1440, 768, 390, 320]) {
    await page.setViewport({ width, height: 1000 });
    await page.evaluate(() => document.querySelector('#work').scrollIntoView());
    await page.evaluate(async () => { await Promise.all(Array.from(document.querySelectorAll('#work img')).map((image) => image.decode())); });
    const layout = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > innerWidth,
      cards: document.querySelectorAll('.project-showcase').length,
      images: Array.from(document.querySelectorAll('#work img')).every((image) => image.naturalWidth > 0),
    }));
    assert.equal(layout.overflow, false);
    assert.equal(layout.cards, 4);
    assert.equal(layout.images, true);
  }
  assert.equal(bookings.length, 0, "Cal should not initialize on the homepage");
  console.log("PASS: project mockups at 1440/768/390/320px and no global booking requests");

  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await page.setViewport({ width: 390, height: 844 });
  await page.evaluate(() => scrollTo(0, 0));
  await page.locator('[aria-label="Open menu"]').click();
  assert.ok(await page.evaluate(() => parseFloat(getComputedStyle(document.querySelector('#mobile-menu')).animationDuration) < 0.01));
  await page.keyboard.press("Escape");
  console.log("PASS: reduced-motion menu");

  for (const mode of ["no JavaScript", "failed JavaScript bundles"]) {
    const fallback = await browser.newPage();
    if (mode === "no JavaScript") await fallback.setJavaScriptEnabled(false);
    else {
      await fallback.setRequestInterception(true);
      fallback.on("request", (request) => request.resourceType() === "script" ? request.abort() : request.continue());
    }
    await fallback.goto(baseUrl, { waitUntil: "networkidle2", timeout: 90_000 });
    const visible = await fallback.evaluate(() => {
      const elements = document.querySelectorAll('.hero-line, .hero-description, .hero-ctas');
      return Array.from(elements).every((element) => {
        const style = getComputedStyle(element);
        return style.opacity === "1" && style.transform === "none" && element.getBoundingClientRect().height > 0;
      }) && document.querySelector('.stat-value')?.textContent.trim() === "4";
    });
    assert.equal(visible, true, `Hero must remain visible with ${mode}`);
    // ElementHandle clicking also works when page JavaScript (and locator RAF polling) is disabled.
    await fallback.click('.faq-item summary');
    assert.equal(await fallback.evaluate(() => document.querySelector('.faq-item').open), true);
    await fallback.close();
    console.log(`PASS: hero and FAQ with ${mode}`);
  }
  assert.deepEqual(errors, []);
} finally {
  await browser.close();
}
