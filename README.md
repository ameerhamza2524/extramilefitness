# Extra Mile Fitness – Landing Page (Next.js)

    npm install
    npm run dev      # http://localhost:3000
    npm run build && npm start

- Assets (logo + photos) were extracted from the client's PDF into `public/` (webp, web-optimised).
- Colours: bg #101915, panel #16201B, tan #C19A6B, cream #EDE8E0 (sampled from the brand PDF).
- Fonts: PDF uses Gilroy / MADE Outer Sans / Authentic Signature (licensed). Outfit + Mrs Saint Delafield (Google Fonts) are used as close free stand-ins. If the client owns the licences, add the files to `public/fonts` and swap in `app/layout.jsx` via `next/font/local`.
- Apply link: `APPLY` constant at the top of `app/page.jsx`.

## Video
Put the client's files in `public/video/` and set `HERO_VIDEO` (hero, with a "Turn sound on" button) and/or `STORY_VIDEO` (the Watch section; .mp4 path or a YouTube/Vimeo embed URL) at the top of `app/page.jsx`. Left empty, the hero shows the photo and the Watch section shows a poster only.
