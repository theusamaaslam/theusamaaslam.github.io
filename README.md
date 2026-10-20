# Usama Aslam

Personal portfolio for AI systems, inference, conversational agents, and platform engineering.

Live site: https://theusamaaslam.github.io/

## Development

Use Node.js 24 (or Node.js >=22.22).

```sh
npm ci
npm run dev
```

```sh
npm run build
npm run preview
```

Edit project content in `src/data/site.ts`. Case studies are generated from this data. Styles live in `src/styles/site.css`.

## Publishing

Pushing to `main` runs the official Astro GitHub Pages action and publishes the static output. Pages uses GitHub Actions as its source.

## Design and accessibility

Static HTML with Astro, self-hosted Manrope, GSAP and Lenis. No analytics, cookies, contact backend, or third-party font requests. Visuals are conceptual architecture illustrations, not product screenshots. Reduced motion uses native scrolling and still diagrams. Filters and diagram controls work with a keyboard.

Descriptions distinguish collaboration, implemented work, test observations, and benchmark targets. No internal endpoints, credentials, or private documents are published.

Manrope is distributed under the SIL Open Font License in `public/fonts/OFL.txt`.
