/**
 * Single source of truth for every video on the site.
 * Swap an ID here and it updates everywhere it is used.
 *
 * Shorts are vertical (9/16) and must be embedded with the video ID
 * (https://www.youtube-nocookie.com/embed/<ID>), never the shorts URL.
 */
export const VIDEOS = {
  thankYouIntro: "xW4Ef0oaVGs", // YouTube Short (vertical 9:16) — thank-you hero
  howProgrammeWorks: "WiBDnMeDdBU", // normal YouTube (16:9) — thank-you "Watch before your call"
  commonQuestions: "jJAU4i1LfGo", // normal YouTube (16:9) — thank-you "Watch before your call"
  mainLanding: "h6NFI63Q3tA", // normal YouTube (16:9) — alternative for the home hero
  blackFriday: "uVDYUbtzWGc", // YouTube Short (vertical 9:16) — Black Friday hero
};

/**
 * Member video testimonials (YouTube Shorts).
 * Shown on the home page and the Black Friday page.
 */
export const TESTIMONIALS = [
  { name: "Hazel", videoId: "OXPvxuvpxQ0" },
  { name: "Ariel", videoId: "8Yk_KTeBG8E" },
  { name: "Maggie", videoId: "i-C-lGiQvjU" },
  { name: "Reiss", videoId: "1loPo0Ba0Ko" },
  { name: "Alice", videoId: "t7hLMRLBzpU" },
  { name: "Louis", videoId: "k3zkd6kJnPU" },
];

/**
 * Local video files served from /public/video.
 * Swap a path here and it updates everywhere it is used.
 */
export const LOCAL_VIDEOS = {
  theNewStandard: "/video/the-new-standard.mp4?v=2", // home hero (vertical 9:16) — bump ?v= when replacing the file
};
