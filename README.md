# Extra Mile Fitness – Landing Page (Next.js)

    npm install
    npm run dev      # http://localhost:3000
    npm run build && npm start

- Assets (logo + photos) were extracted from the client's PDF into `public/` (webp, web-optimised).
- Colours: bg #101915, panel #16201B, tan #C19A6B, cream #EDE8E0 (sampled from the brand PDF).
- Fonts: PDF uses Gilroy / MADE Outer Sans / Authentic Signature (licensed). Outfit + Mrs Saint Delafield (Google Fonts) are used as close free stand-ins. If the client owns the licences, add the files to `public/fonts` and swap in `app/layout.jsx` via `next/font/local`.
- Apply link: `APPLY` constant at the top of `app/page.jsx`.
- Application form: Typeform embed in `app/page.jsx` (`TYPEFORM_ID`). The post-submit redirect to `/thank-you` is configured inside Typeform.

## Video
All video IDs live in `lib/videos.js`. The shared `app/components/VideoBlock.jsx` renders a click-to-play poster and only loads the YouTube (nocookie) iframe on click. Pass `aspect="9/16"` for Shorts. `VIDEOS.blackFriday` is intentionally unused.
