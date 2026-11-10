"use client";
import { useState } from "react";

/**
 * Reusable click-to-play video block.
 *
 * - Pass a YouTube video ID (Shorts included) or leave `videoId` empty to show
 *   the placeholder state.
 * - `aspect` accepts "16/9" (default) or "9/16" for vertical Shorts.
 * - The iframe is only mounted after a click, so the page loads fast.
 */
export default function VideoBlock({
  videoId,
  aspect = "16/9",
  title = "Video",
  poster,
  className = "",
}) {
  const [playing, setPlaying] = useState(false);
  const playerSrc = videoId
    ? `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1&autoplay=1`
    : null;
  const posterSrc = poster || (videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : null);

  return (
    <div className={`vb ${className}`.trim()} style={{ aspectRatio: aspect }}>
      {playing && playerSrc ? (
        <iframe
          src={playerSrc}
          title={title}
          allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          className="vb-poster"
          onClick={() => videoId && setPlaying(true)}
          aria-label={videoId ? `Play ${title}` : `${title} — video coming soon`}
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
