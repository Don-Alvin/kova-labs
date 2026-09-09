# Project screenshots

The homepage's four project panels are curated in `src/components/home/Work.tsx`.
Each project uses three WebP screenshots in proportional CSS device frames:

- `<name>.webp`: desktop screenshot, up to 1400px wide.
- `<name>-tablet.webp`: actual tablet layout at 820 x 1100.
- `<name>-mobile.webp`: actual mobile layout at 390 x 844.

Names: `gedoholdings`, `lamonarealtors`, `threemicecomputers`. The Wekaniweke
assets are retained locally while that project is temporarily hidden.
Capture the live page at the appropriate viewport; don't stretch a desktop image
into a phone frame. Use WebP around quality 82-86, retain clear text, and check all
three frames after changing an image. Next Image generates responsive delivery sizes.

Case studies on `/work` use separate images uploaded through Sanity Studio. Editing
those case studies does not replace the curated homepage mockups.
