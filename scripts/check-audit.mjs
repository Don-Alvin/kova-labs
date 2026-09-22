import assert from "node:assert/strict";
import { existsSync, mkdirSync } from "node:fs";
import puppeteer from "puppeteer-core";

const base = process.env.BASE_URL ?? "http://localhost:3100";
const executablePath = [process.env.BROWSER_EXECUTABLE_PATH, "C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"].find(path => path && existsSync(path));
const browser = await puppeteer.launch({ executablePath, headless: true });
const article = "/blog/how-much-does-a-website-cost-in-kenya-2026";
const errors = [];
mkdirSync("artifacts/audit", { recursive: true });
try {
  const page = await browser.newPage();
  page.on("pageerror", error => errors.push(error.message));
  for (const [width, height] of [[360, 800], [390, 844], [768, 1024], [1440, 1000]]) {
    await page.setViewport({ width, height });
    for (const path of ["/", "/work", "/blog", article, "/services/website-design", "/services/web-applications", "/services/custom-software", "/services/seo-setup", "/quote", "/contact"]) {
      const response = await page.goto(base + path, { waitUntil: "networkidle2", timeout: 120000 });
      assert.equal(response.status(), 200, path);
      const result = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > innerWidth,
        h1: document.querySelectorAll("h1").length,
        text: document.body.innerText,
        phones: [...document.querySelectorAll('a[href^="https://wa.me/"]')].map(link => new URL(link.href).pathname),
        invalidPreloads: [...document.querySelectorAll('link[rel="preload"][as="image"]')].filter(link => !link.getAttribute("href") && !link.getAttribute("imagesrcset")).length,
      }));
      assert.equal(result.overflow, false, `${width}px ${path} overflow`);
      assert.equal(result.h1, 1, path);
      assert.equal(result.text.includes("Nairobi"), false, path);
      assert.ok(result.phones.every(phone => phone === "/254785629612"), "phone unchanged");
      assert.equal(result.invalidPreloads, 0, "image preload has a source");
      if (path === "/") {
        const faq = await page.evaluate(() => {
          const schema = [...document.querySelectorAll('script[type="application/ld+json"]')].map(script => JSON.parse(script.textContent)).find(item => item["@type"] === "FAQPage");
          return { count: schema.mainEntity.length, visible: document.querySelectorAll(".faq-item").length };
        });
        assert.equal(faq.count, faq.visible);
      }
      if (path === article) {
        const schema = await page.evaluate(() => [...document.querySelectorAll('script[type="application/ld+json"]')].map(script => JSON.parse(script.textContent)));
        assert.ok(schema.some(item => item["@type"] === "BlogPosting"));
        assert.ok(schema.some(item => item["@type"] === "BreadcrumbList"));
      }
      if (path === "/work") assert.equal(await page.$$eval(".project-showcase", cards => cards.length), 3);
      if (path === "/quote") {
        const href = await page.$eval('a[href^="https://wa.me/"][href*="Estimated"]', link => link.href);
        assert.ok(decodeURIComponent(href).includes("Estimated total: KSh 15,000"));
      }
      if (["/", "/work", article].includes(path) && [390, 1440].includes(width)) await page.screenshot({ path: `artifacts/audit/${path === "/" ? "home" : path === "/work" ? "work" : "article"}-${width}.png`, fullPage: true });
    }
    console.log(`PASS: audit routes, price, phone, headings, preloads and overflow at ${width}px`);
  }
  const redirect = await fetch(`${base}/services/data-analytics`, { redirect: "manual" });
  assert.equal(redirect.status, 308);
  assert.ok(redirect.headers.get("location").endsWith("/services/seo-setup"));
  const sitemap = await fetch(`${base}/sitemap.xml`).then(response => response.text());
  assert.ok(sitemap.includes(article));
  assert.equal(sitemap.includes("data-analytics"), false);
  const image = await fetch(`${base}${article}/opengraph-image`);
  assert.equal(image.status, 200);
  assert.ok(image.headers.get("content-type").startsWith("image/png"));
  assert.deepEqual(errors, []);
  console.log("PASS: redirect, sitemap, article social image and no runtime errors");
} finally {
  await browser.close();
}
