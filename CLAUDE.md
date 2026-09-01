# CLAUDE.md

## Project

This is the KovaLab website. Read `implementation.md` for the full spec before doing anything.

## Git

Never commit. Never push. Never create branches. I handle all git operations myself.

## Branches

There are two branches. Always confirm which branch you are on before writing code.

- **main**: Production branch, deployed to kovalab.co.ke. Contains only the Coming Soon page. Do not touch unless explicitly told to.
- **dev**: Development branch. All feature work happens here. This is where phases 1 through 3 are built.

## Workflow

Build in four phases, in this order:

**Phase 0: Coming Soon (main branch)**
Build a single-page "Coming Soon" site. See the Coming Soon spec in `implementation.md`. This ships to production first while the full site is developed on dev.

**Phase 1: Foundation (dev branch)**
1. Fonts, design tokens, globals.css, Tailwind config
2. Root layout
3. Logo component
4. Navbar (desktop + mobile)
5. Footer
6. Global components (WhatsApp button, Cal.com popup, cookie consent)
7. Reusable shared components (SectionEyebrow, AnimateOnScroll)

**Phase 2: Homepage (dev branch)**
8. Hero + entrance animations
9. Stats bar + counter animation
10. Marquee
11. Client logos
12. Work section + parallax
13. Why section
14. Services section
15. Quote estimator
16. FAQ
17. Process
18. CTA banner
19. Wire all sections into page.tsx

**Phase 3: Inner pages (dev branch)**
20. About page
21. Service pages (3)
22. Contact page with Cal.com embed
23. Blog listing page
24. Blog post page
25. Project/case study pages
26. Quote estimator standalone page
27. Privacy policy
28. 404 page
29. Sanity schemas + studio setup
30. API route for newsletter
31. Sitemap and robots.ts
32. Google Analytics integration

After completing each page, run the dev server and verify it renders correctly before moving on.

## Autonomy

Follow `implementation.md` exactly. If the spec defines it, build it as written. Do not improvise on:
- Layout structure
- Colors or typography
- Section order
- Copy/content
- Animation timing or easing values
- Pricing values in the quote estimator

If you encounter something the spec does not cover, stop and ask before proceeding.

## Dependencies

You may add dependencies beyond what the spec lists if genuinely needed, but explain why before installing. Do not add component libraries, icon libraries, or CSS frameworks beyond Tailwind.

## Code style

- TypeScript strict mode
- Functional components only
- Client components (`"use client"`) only where needed (animations, interactivity). Keep everything else as server components.
- Use Tailwind classes. No inline styles unless unavoidable.
- CSS variables for all colors. Reference them through the Tailwind config extensions.
- No `any` types
- Named exports for components

## Writing rules

These are non-negotiable:

- **Never use em dashes** (—) anywhere: not in copy, metadata, alt text, comments, or JSX. Use commas, periods, colons, or rewrite the sentence.
- Use pipes `|` for title separators
- Sentence case for all headings and labels
- No ALL CAPS text in the UI

## Design rules

These are non-negotiable:

- **No rounded corners.** No `border-radius`, no `rounded-*` Tailwind classes, on any element. Buttons, cards, inputs, modals, images, banners: all sharp edges.
- **Montserrat is the only font.** No fallback to serif or monospace for stylistic purposes. Vary weight only.
- All colors come from CSS variables defined in `globals.css`. Never hardcode hex values in components except inside the Logo SVG.

## Narration

Do the work silently. Do not explain what you are about to do, what you just did, or why. Just write the code. Only speak up when:
- You need to ask a question because the spec is unclear
- You need to explain a dependency you want to add
- A build or render error occurs that you cannot resolve
- A phase is complete and you are ready for the next one

## Testing

After each page is built, run `npm run dev` and verify:
- The page renders without errors
- Layout matches the spec
- No TypeScript or console errors
- Responsive layout works at mobile width

Report only failures. Do not report success.
