"use client";
import { useState } from "react";

/**
 * Reusable click-to-play video block.
 *
 * - YouTube: pass a video ID (Shorts included).
 * - Local file: pass `src` (e.g. "/video/the-new-standard.mp4").
 * - Leave both empty to show the placeholder state.
 * - `aspect` accepts "16/9" (default) or "9/16" for vertical video.
 * - The player is only mounted after a click, so the page loads fast.
 */
export default function VideoBlock({
  videoId,
  src,
  aspect = "16/9",
  title = "Video",
  poster,
  className = "",
}) {
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const hasVideo = Boolean(videoId || src);
  const isLocal = Boolean(src);
  const youtubeSrc = videoId
    ? `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1&autoplay=1`
    : null;
  const posterSrc = poster || (videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : null);

  return (
    <div className={`vb ${className}`.trim()} style={{ aspectRatio: aspect }}>
      {playing && hasVideo ? (
        isLocal ? (
          <>
            <video
              src={src}
              poster={poster}
              controls
              autoPlay
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
            allowFullScreen
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
    </div>
  );
}
