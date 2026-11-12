"use client";
import { useEffect, useRef, useState } from "react";
import VideoBlock from "./components/VideoBlock";
import { LOCAL_VIDEOS } from "../lib/videos";

const APPLY = "#apply";
const CDN = "https://images.squarespace-cdn.com/content/v1/669cd7e93e05045d9aff6341/";
const img = (path, w = 900) => `${CDN}${path}?format=${w}w`;

/* Final CTA background — swap this one path when the new photo arrives. */
// TODO (owner): replace with the new final-CTA image, e.g. "/img/final-cta.webp".
const FINAL_CTA_IMAGE = "/img/cut2.webp";

const transforms = [
  "121c3806-f07d-4596-88e9-ece8e07cf4c4/Sophia+Transformation.png",
  "eed82795-c39d-4597-bd80-95476b08302c/Transformation+Template+%282%29.png",
  "cf55e4dc-b693-40e1-802a-caeb2264da90/Mark+Front.png",
  "80a9bcc6-03f8-4084-aaf5-82c24a13248c/Transformation+Template+%289%29.png",
  "66f9dad8-a0eb-4570-8bff-f43e1a5a42d6/Scott+front.png",
  "2e6300c7-019d-44c6-b099-d22cdd924225/Transformation+Template+%286%29.png",
  "e2e43699-7146-408a-84cf-e3fcc154089a/Hazel+F.png",
  "a0fc3f4a-8fef-47df-870a-e635d40d279a/Hazel+B.png",
  "e8a3981b-0312-4ba0-8005-270f88f0f415/Transformation+Template+%288%29.png",
  "7dcd09c9-b53b-420e-89c8-018224b09951/Rachel+Side.png",
  "b933482c-00b4-4cab-8bee-e2a6167e4d3a/Reiss+Side.png",
  "66198236-79fe-462f-a609-155a58dce274/Khamis.png",
  "0dfd6096-f4ec-4424-8932-afdf04059d78/Carlos.png",
  "8e1a09d3-0eba-47fd-aa70-a6ab5bba4979/Amy.png",
];

const videoTestimonials = ["Reiss", "Louis", "Hazel", "Ariel", "Maggie", "Alice"];

/* ── Animated word reveal ── */
const Words = ({ t }) =>
  t.split(" ").map((w, i) => (
    <span className="wm" key={i}><span style={{ "--i": i }}>{w}&nbsp;</span></span>
  ));

/* ── Urgency bar ── */
function UrgencyBanner() {
  return (
    <div className="urgency-bar" aria-live="polite">
      <span className="urgency-dot" aria-hidden="true" />
      <span>Limited spots available<span className="urgency-mid"> — New members start <strong>1st Monday of the month</strong></span></span>
      <a href={APPLY} className="urgency-link">Secure yours →</a>
    </div>
  );
}

/* ── Results ticker ── */
const tickers = [
  "Hazel — 86 lbs lost in 4 years",
  "Mark — 26 lbs dropped around night shifts",
  "Reiss — revenge body built in 20 weeks",
  "Ryan — best shape of his life for his 30th",
  "Veronique — transformed her mirror reflection",
  "671 success stories across 7 countries",
];
function Ticker() {
  return (
    <div className="ticker-wrap" aria-hidden="true">
      <div className="ticker-inner">
        {[...tickers, ...tickers].map((t, i) => (
          <span key={i}>{t} <span className="ticker-sep">✦</span></span>
        ))}
      </div>
    </div>
  );
}

/* ── Video testimonial card ── */
function TestimonialCard({ name }) {
  return (
    <div className="tc">
      <div className="tc-thumb">
        <img src="/img/group.webp" alt={`${name} testimonial`} loading="lazy" />
        <span className="tc-play" aria-hidden="true"><i /></span>
      </div>
      <p className="tc-name">{name}</p>
    </div>
  );
}

/* ── Transformation strip (auto-scroll + arrows) ── */
function TransformRow({ items, reverse = false }) {
  const trackRef = useRef(null);
  const rowRef = useRef(null);
  const offset = useRef(0);
  const paused = useRef(false);
  const hover = useRef(false);
  const timer = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const dir = reverse ? 1 : -1;
    let raf = 0;
    let last = 0;
    let visible = true;
    let running = false;

    const frame = (now) => {
      if (!visible || document.hidden) { running = false; return; }
      if (!last) last = now;
      const dt = Math.min(now - last, 48);
      last = now;
      const half = track.scrollWidth / 2;

      if (half > 0) {
        if (!paused.current && !hover.current) {
          offset.current += dir * 0.45 * (dt / 16.67);
        }
        if (dir < 0) {
          if (offset.current <= -half) offset.current += half;
        } else if (offset.current >= 0) {
          offset.current -= half;
        }
        offset.current = Math.max(-half, Math.min(0, offset.current));
        track.style.transform = `translate3d(${offset.current}px,0,0)`;
      }

      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running || !visible || document.hidden) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      running = false;
    };

    /* Only animate while the strip is on screen. */
    const io = typeof IntersectionObserver !== "undefined"
      ? new IntersectionObserver(([e]) => {
          visible = e.isIntersecting;
          if (visible) start(); else stop();
        }, { rootMargin: "200px" })
      : null;
    if (io && rowRef.current) io.observe(rowRef.current);

    const onVisibility = () => { if (document.hidden) stop(); else start(); };
    document.addEventListener("visibilitychange", onVisibility);
    start();

    return () => {
      stop();
      if (io) io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      clearTimeout(timer.current);
    };
  }, [reverse]);

  const step = (sign) => {
    const track = trackRef.current;
    if (!track) return;
    const half = track.scrollWidth / 2;
    const first = track.firstElementChild;
    if (!half || !first) return;

    const card = first.getBoundingClientRect().width + 16;
    paused.current = true;
    track.classList.add("nudging");
    offset.current = Math.max(-half, Math.min(0, offset.current + sign * card));
    track.style.transform = `translate3d(${offset.current}px,0,0)`;

    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      track.classList.remove("nudging");
      paused.current = false;
    }, 900);
  };

  return (
    <div
      ref={rowRef}
      className="tg-row"
      onMouseEnter={() => { hover.current = true; }}
      onMouseLeave={() => { hover.current = false; }}
    >
      <button className="tg-btn prev" onClick={() => step(1)} aria-label="Previous transformations">‹</button>
      <div className="tg">
        <div ref={trackRef} className="tg-track">
          {[...items, ...items].map((s, i) => (
            <img
              key={i}
              loading="lazy"
              decoding="async"
              width="360"
              height="480"
              src={img(s, 300)}
              srcSet={`${img(s, 300)} 300w, ${img(s, 500)} 500w`}
              sizes="(max-width:900px) 270px, 350px"
              alt="Transformation"
            />
          ))}
        </div>
      </div>
      <button className="tg-btn next" onClick={() => step(-1)} aria-label="Next transformations">›</button>
    </div>
  );
}

/* ══════════════════════════════════════
   APPLY FORM EMBED (TYPEFORM)
   Owner note: the post-submit redirect to
   https://extramilefitness.vercel.app/thank-you is configured inside
   Typeform (Ending → Redirect on completion), not in this codebase.
══════════════════════════════════════ */
const TYPEFORM_ID = "01M6W1CE6YRAS328G2Q5ASWDDP";
const TYPEFORM_FALLBACK = "https://extramilefitness.typeform.com/to/Zl4MFOYH?typeform-source=wk5v5fdcjcd.typeform.com";

function ApplyFormEmbed() {
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
    </div>
  );
}

/* ══════════════════════════════════════
   PAGE
══════════════════════════════════════ */
export default function Page() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))),
      { threshold: 0.15 }
    );
    document.querySelectorAll("[data-r]").forEach((el) => io.observe(el));

    const cio = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target, to = +el.dataset.count, suf = el.dataset.suf || "", t0 = performance.now();
      const tick = (t) => { const p = Math.min((t - t0) / 1800, 1); el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + suf; p < 1 && requestAnimationFrame(tick); };
      requestAnimationFrame(tick); cio.unobserve(el);
    }), { threshold: 0.6 });
    document.querySelectorAll("[data-count]").forEach((el) => cio.observe(el));

    const ps = [...document.querySelectorAll("[data-p]")];
    const bar = document.getElementById("bar");
    const fab = document.querySelector(".fab");
    const cur = document.querySelector(".cur");
    const root = document.documentElement;
    let raf;

    /* Keep the fixed nav/hero clear of the urgency banner, whose height
       changes when its text wraps (mostly on mobile). */
    const ub = document.querySelector(".urgency-bar");
    const setTopbar = () => root.style.setProperty("--topbar-h", `${ub ? ub.offsetHeight : 38}px`);
    setTopbar();
    addEventListener("resize", setTopbar);
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(setTopbar) : null;
    if (ro && ub) ro.observe(ub);

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        ps.forEach((el) => { const r = el.parentElement.getBoundingClientRect(); const c = r.top + r.height / 2 - innerHeight / 2; el.style.transform = `translate3d(0,${c * -el.dataset.p}px,0)`; });
        bar.style.width = (scrollY / (root.scrollHeight - innerHeight)) * 100 + "%";
        fab.classList.toggle("on", scrollY > 700);
      });
    };

    /* Pointer effects are desktop-only and throttled to one frame. */
    const finePointer = matchMedia("(pointer: fine)").matches;
    let moveRaf = 0;
    let px = 0, py = 0, pTarget = null;

    const applyMove = () => {
      moveRaf = 0;
      root.style.setProperty("--mx", px + "px"); root.style.setProperty("--my", py + "px");
      cur.style.transform = `translate(${px}px,${py}px) translate(-50%,-50%)`;
      cur.classList.toggle("h", !!pTarget.closest?.("a,button,summary"));
      const b = pTarget.closest?.(".btn:not(.fab)");
      if (b) { const q = b.getBoundingClientRect(); b.style.transform = `translate(${(px - q.left - q.width / 2) * 0.2}px,${(py - q.top - q.height / 2) * 0.3}px)`; }
    };
    const onMove = (e) => {
      px = e.clientX; py = e.clientY; pTarget = e.target;
      if (!moveRaf) moveRaf = requestAnimationFrame(applyMove);
    };
    const onOut = (e) => { const b = e.target.closest?.(".btn"); if (b) b.style.transform = ""; };

    addEventListener("scroll", onScroll, { passive: true });
    if (finePointer) {
      addEventListener("mousemove", onMove, { passive: true });
      addEventListener("mouseout", onOut);
    }
    onScroll();
    return () => {
      io.disconnect(); cio.disconnect();
      removeEventListener("scroll", onScroll);
      removeEventListener("mousemove", onMove);
      removeEventListener("mouseout", onOut);
      cancelAnimationFrame(moveRaf);
      removeEventListener("resize", setTopbar);
      if (ro) ro.disconnect();
    };
  }, []);

  return (
    <main>
      <div className="loader"><img src="/logo.png" alt="" /></div>
      <div id="bar" /><div className="cur" />
      <a className="btn solid fab" href={APPLY}>Apply now →</a>
      <UrgencyBanner />

      {/* ════════════ NAV ════════════ */}
      <nav>
        <img src="/logo.png" alt="Extra Mile Fitness" />
        <div className="lk">
          <a href="#results">Results</a>
          <a href="#before-you-apply">Before you apply</a>
        </div>
        <a className="btn" href={APPLY}>Apply</a>
      </nav>

      {/* ════════════════════════════════
          1. HERO
      ════════════════════════════════ */}
      <header className="hero">
        <div className="ghost" data-p="-0.12" aria-hidden>EXTRA MILE</div>
        <div className="wrap">
          <div>
            <div className="eyebrow" data-r>1:1 Concierge Coaching</div>
            <h1>
              <Words t="Get in the best shape of your life," />
              <em><Words t="without it taking over your life." /></em>
            </h1>
            <p className="sub" data-r style={{ "--d": "1.9s" }}>
              1:1 concierge coaching for busy professionals who run teams, travel and don’t have time to figure it out.
            </p>
            <div data-r style={{ "--d": "2.1s" }}>
              <a className="btn solid hero-cta" href={APPLY}>Apply for coaching →</a>
              <p className="note">New members start: 1st Monday of the month</p>
            </div>
            <div className="hero-proof" data-r style={{ "--d": "2.4s" }}>
              <div className="proof-faces" aria-hidden="true">
                {["coach", "group", "crowd"].map((k) => <img key={k} src={`/img/${k}.webp`} alt="" />)}
              </div>
              <span>Joined by <strong>650+ clients</strong> across 7 countries</span>
            </div>
          </div>
          <div className="phw" data-r style={{ "--d": "1.6s" }}>
            <VideoBlock
              src={LOCAL_VIDEOS.theNewStandard}
              aspect="9/16"
              title="The New Standard — find out more"
              poster="/img/hero.webp"
              className="hero-vb"
            />
          </div>
        </div>
        <div className="scroll" />
      </header>

      {/* Marquee */}
      <div className="marq" aria-hidden>
        <div>
          {Array(8).fill(["Set", "Prove", "Keep", "No finish line"]).flat().map((t, i) => (
            <span key={i}>{t} <span style={{ color: "var(--tan)" }}>•</span></span>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════
          2. STATS
      ════════════════════════════════ */}
      <div className="stats">
        {[[10, "+", "Years coaching"], [671, "", "Success stories"], [83, "%", "Members stay 12+ months"]].map(([n, s, l]) => (
          <div key={l} data-r><b data-count={n} data-suf={s}>0</b><span>{l}</span></div>
        ))}
      </div>

      {/* ════════════════════════════════
          3. RESULTS  — social proof first
      ════════════════════════════════ */}
      <section id="results">
        <div className="wrap">
          <div className="eyebrow" data-r>Results</div>
          <h2 data-r>Join the team. <em>Level up your life.</em></h2>
          <p className="results-sub" data-r>
            With 671 success stories across 7 different countries — real people, real challenges, real results.
          </p>
        </div>

        {/* Scrolling transformation strip */}
        <div className="tg-wrap">
          <TransformRow items={transforms} />
          <TransformRow items={transforms} reverse />
        </div>

        {/* Video testimonials */}
        <div className="wrap" style={{ marginTop: 100 }}>
          <div className="eyebrow" data-r>What our members say</div>
          <h2 data-r>Hear it <em>from them.</em></h2>
          <div className="testimonials-grid" data-r>
            {videoTestimonials.map((name) => <TestimonialCard key={name} name={name} />)}
          </div>
        </div>

        <div className="wrap" style={{ marginTop: 70, textAlign: "center" }} data-r>
          <a className="btn solid" href={APPLY}>Apply for coaching →</a>
        </div>
      </section>

      {/* Ticker */}
      <Ticker />

      {/* ════════════════════════════════
          4. BEFORE YOU APPLY
      ════════════════════════════════ */}
      <section id="before-you-apply" className="bya">
        <div className="wrap" style={{ maxWidth: 1000 }}>
          <div className="eyebrow" data-r>Step 00 · Before you apply</div>
          <h2 data-r>Before you <em>apply.</em></h2>

          <p className="bya-lead" data-r>
            <span>This isn’t group coaching.</span>
            <span>It isn’t a fad diet.</span>
            <span>It isn’t a template.</span>
          </p>

          <div className="bya-copy">
            <p data-r><strong>EMF is 1:1 concierge coaching</strong> for men and women who perform at a high level in their careers, and are ready to hold their health to the same standard.</p>
            <p data-r>Where you start doesn’t matter. Complete beginner or getting back to your best, I’ve spent 10 years taking people from day one to an elite standard.</p>
            <p data-r>What matters is how you think. A beginner mindset looks for shortcuts. An elite mindset commits, shows up when it’s inconvenient, and owns the result.</p>
            <p data-r>You don’t need to be elite to start. You need to be ready to think like it.</p>
          </div>

          <div className="bya-close" data-r>
            If you’re after cheap, quick or easy, <em>this isn’t for you.</em>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          13. APPLY (EMBEDDED)
      ════════════════════════════════ */}
      <section id="apply" style={{ background: "var(--bg2)" }}>
        <div className="wrap" style={{ maxWidth: 960 }}>
          <div className="eyebrow" data-r>Step 01 · Initial Intake</div>
          <h2 data-r>Apply for <em>1-on-1 Coaching.</em></h2>
          <p className="results-sub" data-r>
            Complete the short assessment below to see if you’re a good fit for the programme. All applications are reviewed personally within 24 hours.
          </p>

          <div className="apply-badges" data-r>
            <div className="apply-badge">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Takes ~2–3 minutes</span>
            </div>
            <div className="apply-badge">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>100% Confidential</span>
            </div>
            <div className="apply-badge">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Direct Coach Review</span>
            </div>
            <div className="apply-badge">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Cohorts Start 1st Monday</span>
            </div>
          </div>

          <ApplyFormEmbed />

          <div className="apply-footer-info" data-r>
            <span className="apply-secure">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
      </section>

      {/* ════════════════════════════════
          14. FINAL CTA
      ════════════════════════════════ */}
      <section className="final">
        <img className="cut" data-p="0.04" src={FINAL_CTA_IMAGE} alt="" />
        <div className="wrap">
          <img className="lg" data-r src="/logo.png" alt="Extra Mile Fitness" />
          <h2 data-r>There’s no finish line. <em>Only your next standard.</em></h2>
          <div data-r>
            <a className="btn solid" href={APPLY}>Apply for coaching →</a>
            <p className="note">New members start: 1st Monday of the month</p>
          </div>
          <p className="final-spots" data-r>
            <span className="urgency-dot" aria-hidden="true" />
            Limited spots available each month
          </p>
        </div>
      </section>

      <footer>
        <span>© 2026 Extra Mile Fitness</span>
        <span>Privacy Policy · Cookie Policy</span>
      </footer>
    </main>
  );
}
