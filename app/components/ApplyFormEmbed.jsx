"use client";
import { useEffect, useRef, useState } from "react";

/* ══════════════════════════════════════
   APPLY FORM EMBED (TYPEFORM)
   The only form on the site. Do not add any other form or survey.
   Form: https://extramilefitness.typeform.com/to/Zl4MFOYH
   Owner note: the post-submit redirect to
   https://extramilefitness.vercel.app/thank-you is configured inside
   Typeform (Ending → Redirect on completion), not in this codebase.
══════════════════════════════════════ */
const TYPEFORM_ID = "01M6W1CE6YRAS328G2Q5ASWDDP";
const TYPEFORM_FALLBACK = "https://extramilefitness.typeform.com/to/Zl4MFOYH?typeform-source=wk5v5fdcjcd.typeform.com";

export default function ApplyFormEmbed() {
  const [active, setActive] = useState(false);
  const cardRef = useRef(null);

  /* Don't load the third-party form until the card is close to the viewport. */
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") { setActive(true); return; }
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { setActive(true); io.disconnect(); }
    }, { rootMargin: "700px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Load the Typeform embed script once. Calling tf.load() re-scans the DOM
     so the form also mounts after client-side navigation back to this page. */
  useEffect(() => {
    if (!active) return;
    const scriptSrc = "https://embed.typeform.com/next/embed.js";
    const init = () => {
      if (typeof window !== "undefined" && window.tf && typeof window.tf.load === "function") {
        window.tf.load();
      }
    };

    let script = document.querySelector(`script[src="${scriptSrc}"]`);
    if (!script) {
      script = document.createElement("script");
      script.src = scriptSrc;
      script.async = true;
      script.addEventListener("load", init, { once: true });
      document.body.appendChild(script);
    } else if (window.tf) {
      init();
    } else {
      script.addEventListener("load", init, { once: true });
    }

    return () => script && script.removeEventListener("load", init);
  }, [active]);

  return (
    <div className="apply-card" data-r ref={cardRef}>
      <div className="apply-card-topbar">
        <span className="apply-status-pill">
          <span className="apply-dot" aria-hidden="true" />
          Application Window Open
        </span>
        <span className="apply-card-tag">1:1 Concierge Coaching</span>
      </div>

      <div className="apply-embed apply-embed-typeform">
        <div className="typeform-live" data-tf-live={TYPEFORM_ID} />
      </div>

      <div className="apply-footer-info">
        <span className="apply-secure">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Your data is encrypted and strictly confidential.
        </span>
        <p className="apply-fallback">
          Form not loading?{" "}
          <a href={TYPEFORM_FALLBACK} target="_blank" rel="noopener noreferrer">
            Open application directly ↗
          </a>
        </p>
      </div>
    </div>
  );
}
