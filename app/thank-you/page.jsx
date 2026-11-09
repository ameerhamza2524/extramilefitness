"use client";
import { useEffect } from "react";
import StorySections from "../StorySections";

export default function ThankYouPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))),
      { threshold: 0.15 }
    );
    document.querySelectorAll("[data-r]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <main>
      <header className="ty">
        <div className="ty-top">
          <a href="/" aria-label="Extra Mile Fitness home">
            <img src="/logo.png" alt="Extra Mile Fitness" />
          </a>
          <a className="btn" href="/">Back to home</a>
        </div>

        <div className="wrap" style={{ maxWidth: 960 }}>
          <div className="eyebrow" data-r>Application received</div>
          <h1 data-r>Thank <em>you.</em></h1>
          <p className="ty-sub" data-r>
            Your application is in. I personally review every application within 24 hours — if it's a fit, you'll hear from me directly.
          </p>

          <div className="ty-next" data-r>
            <div>
              <span>01</span>
              <b>Review</b>
              <p>I read every application myself. No assistants, no filters.</p>
            </div>
            <div>
              <span>02</span>
              <b>Reply</b>
              <p>If it's a fit, you'll get a reply within 24 hours.</p>
            </div>
            <div>
              <span>03</span>
              <b>Start</b>
              <p>New members start the 1st Monday of the month.</p>
            </div>
          </div>

          <p className="ty-note" data-r>While you wait, here's a little more about Extra Mile.</p>
        </div>
      </header>

      <StorySections />

      <footer>
        <span>© 2026 Extra Mile Fitness</span>
        <span>Privacy Policy · Cookie Policy</span>
      </footer>
    </main>
  );
}
