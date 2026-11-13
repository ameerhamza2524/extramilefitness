"use client";
import { useEffect, useRef, useState } from "react";

const BLANK = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

/**
 * An <img> that does not request its file until it is close to the viewport.
 * Native loading="lazy" is too eager in Chrome (it prefetches images several
 * screens ahead), which is why the long before/after strips used to download
 * on the landing page before anyone scrolled to them.
 */
export default function LazyImage({ src, srcSet, sizes, alt = "", rootMargin = "400px", ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return (
    <img
      ref={ref}
      src={visible ? src : BLANK}
      srcSet={visible ? srcSet : undefined}
      sizes={visible ? sizes : undefined}
      alt={alt}
      loading="lazy"
      decoding="async"
      {...rest}
    />
  );
}
