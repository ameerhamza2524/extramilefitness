"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Reusable video block.
 *
 * - YouTube: pass a video ID (Shorts included).
 * - Local file: pass `src` (e.g., "/video/the-new-standard.mp4").
 * - Leave both empty to show the placeholder state.
 * - `aspect` accepts "16/9" (default) or "9/16" for vertical video.
 * - `autoPlay` starts the video immediately.
 *   Local files try to start WITH sound first, then fall back to muted
 *   (browsers block unmuted autoplay until the visitor interacts).
 * - `loop` replays the video when it ends (useful for hero films).
 * - `soundPrompt` shows a “Tap for sound” control for muted autoplay.
 * - `clean` hides the YouTube chrome (title, logo, controls) and makes the
 *   frame click-through, so only the film is visible. Pair with `soundPrompt`.
 * - Otherwise the player is only mounted after a click, so the page loads fast.
 */
export default function VideoBlock({
  videoId,
  src,
  aspect = "16/9",
  title = "Video",
  poster,
  className = "",
  autoPlay = false,
  loop = false,
  soundPrompt = false,
  clean = false,
}) {
  const [playing, setPlaying] = useState(autoPlay);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [soundBlocked, setSoundBlocked] = useState(false);
  const videoRef = useRef(null);
  const hasVideo = Boolean(videoId || src);
  const isLocal = Boolean(src);
  const youtubeSrc = videoId
    ? `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1&autoplay=1${autoPlay && !soundOn ? "&mute=1" : ""}${loop ? `&loop=1&playlist=${videoId}` : ""}${clean ? "&controls=0&disablekb=1&fs=0&iv_load_policy=3" : ""}`
    : null;
  const posterSrc =
    poster ||
    (videoId ? `https://i.ytimg.com/vi/${videoId}/${aspect === "9/16" ? "oar2" : "hqdefault"}.jpg` : null);

  /* Autoplay policy: try unmuted first, then mute and show the sound prompt. */
  useEffect(() => {
    if (!autoPlay || !isLocal || !playing) return;
    const v = videoRef.current;
    if (!v) return;
    v.muted = !soundOn;
    const attempt = v.play();
    if (attempt && typeof attempt.then === "function") {
      attempt
        .then(() => {
          /* Some browsers start muted on their own; offer the sound button. */
          if (!soundOn && v.muted) setSoundBlocked(true);
        })
        .catch(() => {
          if (soundOn) return;
          v.muted = true;
          setSoundBlocked(true);
          const retry = v.play();
          if (retry && typeof retry.catch === "function") retry.catch(() => {});
        });
    }
  }, [autoPlay, isLocal, playing, soundOn]);

  /* Unmute inside the click handler so the browser treats it as a gesture. */
  const enableSound = () => {
    setSoundOn(true);
    const v = videoRef.current;
    if (v) {
      v.muted = false;
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    }
  };

  const showSoundPrompt =
    autoPlay && soundPrompt && !soundOn && (!isLocal || soundBlocked);

  return (
    <div className={`vb ${clean ? "vb-clean" : ""} ${className}`.trim()} style={{ aspectRatio: aspect }}>
      {playing && hasVideo ? (
        isLocal ? (
          <>
            <video
              ref={videoRef}
              src={src}
              poster={poster}
              controls
              loop={loop}
              playsInline
              preload="auto"
              onCanPlay={() => setReady(true)}
              onPlaying={() => setReady(true)}
              onError={() => setFailed(true)}
            />
            {!ready && (
              <span className="vb-loading" aria-live="polite">
                {failed ? "Video unavailable" : "Loading video…"}
              </span>
            )}
          </>
        ) : (
          <iframe
            src={youtubeSrc}
            title={title}
            allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
            allowFullScreen={!clean}
            tabIndex={clean ? -1 : undefined}
          />
        )
      ) : (
        <button
          type="button"
          className="vb-poster"
          onClick={() => hasVideo && setPlaying(true)}
          aria-label={hasVideo ? `Play ${title}` : `${title} — video coming soon`}
        >
          {posterSrc ? (
            <img src={posterSrc} alt="" loading="lazy" decoding="async" />
          ) : (
            <span className="vb-ph">Video placeholder</span>
          )}
          <span className="vb-play" aria-hidden="true"><i /></span>
        </button>
      )}
      {showSoundPrompt && (
        <button type="button" className="vb-sound" onClick={enableSound}>
          <span aria-hidden="true">♪</span> Tap for sound
        </button>
      )}
    </div>
  );
}
