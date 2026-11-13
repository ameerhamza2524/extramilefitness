"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Reusable video block.
 *
 * - YouTube: pass a video ID (Shorts included).
 * - Local file: pass `src` (e.g., "/video/the-new-standard.mp4").
 * - Leave both empty to show the placeholder state.
 * - `aspect` accepts "16/9" (default) or "9/16" for vertical video.
 * - `autoPlay` starts the video automatically. YouTube autoplay is always
 *   muted (browser policy), so the "Tap for sound" control is shown.
 *   Local files try to start WITH sound first, then fall back to muted.
 * - `loop` replays the video when it ends (useful for hero films).
 * - `soundPrompt` shows a “Tap for sound” control for muted autoplay.
 * - `clean` hides the YouTube chrome (title, logo, controls).
 * - Otherwise the player is only mounted after a click, so the page loads fast.
 *
 * The poster is always shown first, even for autoplay, and the real player is
 * mounted after the page is idle. That keeps the first paint quick and gives
 * every video a single, reliable play control.
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
  const [started, setStarted] = useState(false);
  const [userStarted, setUserStarted] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [soundBlocked, setSoundBlocked] = useState(false);
  const videoRef = useRef(null);
  const iframeRef = useRef(null);
  const hasVideo = Boolean(videoId || src);
  const isLocal = Boolean(src);

  /* The player is only mounted once it is needed. Autoplay waits for the
     page to be idle so the hero image/text can paint first. */
  useEffect(() => {
    if (!autoPlay || !hasVideo || started) return;
    let idleId = 0;
    let delayId = 0;
    const start = () => setStarted(true);
    /* Give the poster, logo and copy a head start before the video request. */
    delayId = window.setTimeout(() => {
      if (typeof window.requestIdleCallback === "function") {
        idleId = window.requestIdleCallback(start, { timeout: 1800 });
      } else {
        start();
      }
    }, 900);
    return () => {
      window.clearTimeout(delayId);
      if (idleId && typeof window.cancelIdleCallback === "function") window.cancelIdleCallback(idleId);
    };
  }, [autoPlay, hasVideo, started]);

  const youtubeSrc = videoId
    ? `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1&enablejsapi=1&autoplay=1&mute=${autoPlay && !userStarted ? 1 : 0}${loop ? `&loop=1&playlist=${videoId}` : ""}${clean ? "&controls=0&disablekb=1&fs=0&iv_load_policy=3" : ""}`
    : null;
  const posterSrc =
    poster ||
    (videoId ? `https://i.ytimg.com/vi/${videoId}/${aspect === "9/16" ? "oar2" : "hqdefault"}.jpg` : null);

  /* Play/pause the local file. Autoplay tries unmuted first, then mutes and
     shows the sound prompt if the browser blocks sound. */
  useEffect(() => {
    if (!isLocal || !started) return;
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
          if (soundOn) {
            /* The click is a gesture, but a strict browser may still block
               unmuted playback. Start muted so the film always plays. */
            v.muted = true;
            const retry = v.play();
            if (retry && typeof retry.catch === "function") retry.catch(() => {});
            return;
          }
          v.muted = true;
          setSoundBlocked(true);
          const retry = v.play();
          if (retry && typeof retry.catch === "function") retry.catch(() => {});
        });
    }
  }, [isLocal, started, soundOn]);

  /* YouTube is driven through its iframe API via postMessage. */
  const command = (func, args = []) => {
    const win = iframeRef.current && iframeRef.current.contentWindow;
    if (!win) return;
    win.postMessage(JSON.stringify({ event: "command", func, args }), "*");
  };

  const onIframeLoad = () => {
    setReady(true);
    /* Kick playback in case the browser ignored the autoplay parameter.
       For click-to-play this runs inside the visitor's play request. */
    command("playVideo");
    if (autoPlay && !userStarted) command("mute");
  };

  /* Unmute inside the click handler so the browser treats it as a gesture. */
  const enableSound = () => {
    setSoundOn(true);
    setSoundBlocked(false);
    if (isLocal) {
      const v = videoRef.current;
      if (v) {
        v.muted = false;
        const p = v.play();
        if (p && typeof p.catch === "function") p.catch(() => {});
      }
    } else {
      command("unMute");
      command("setVolume", [100]);
      command("playVideo");
    }
  };

  const start = () => {
    if (!hasVideo) return;
    setStarted(true);
    setUserStarted(true);
    /* A click is a user gesture, so the video can start with sound. */
    setSoundOn(true);
  };

  const showSoundPrompt =
    started && autoPlay && !userStarted && soundPrompt && !soundOn && (!isLocal || soundBlocked);

  return (
    <div className={`vb ${clean ? "vb-clean" : ""} ${className}`.trim()} style={{ aspectRatio: aspect }}>
      {started && hasVideo ? (
        isLocal ? (
          <>
            <video
              ref={videoRef}
              src={src}
              poster={poster}
              controls
              loop={loop}
              playsInline
              preload="metadata"
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
            ref={iframeRef}
            src={youtubeSrc}
            title={title}
            onLoad={onIframeLoad}
            allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
            allowFullScreen={!clean}
            tabIndex={clean ? -1 : undefined}
          />
        )
      ) : (
        <button
          type="button"
          className="vb-poster"
          onClick={start}
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
