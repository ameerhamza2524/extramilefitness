"use client";
import { useEffect, useRef, useState } from "react";

const APPLY = "#apply";
const APPLY_FORM = "https://ww.ptextramilefitness.com/widget/survey/Nz8kmtE6GWsivAq5sOCV";
const CDN = "https://images.squarespace-cdn.com/content/v1/669cd7e93e05045d9aff6341/";
const img = (path, w = 900) => `${CDN}${path}?format=${w}w`;

const forYou = [
  ["You've been better than this.", "You've peaked before, maybe more than once, and people still remember it. Or you never stopped training. You just stopped progressing."],
  ['"After this trip." After this project. Monday.', "You know exactly what to do. You just keep moving the start date."],
  ["You're ready for next-level results.", "You just need a kick in the right direction."],
];

const steps = [
  ["Set", "Weeks 1–6", "We set your standards and get you back in rhythm: routine, starting lifts, and your diet begins. I notice every miss and ask why. Miss a check-in and I'm in touch the same day."],
  ["Prove", "Diet track · Build track", "You lean out while still getting stronger — progressive overload in every session. Once you're lean, we build. The focus shifts to adding muscle."],
  ["Keep", "No finish line", "We hold what you've built. After a diet, back to maintenance. After a build, we tidy up. Then the next block starts. There's no finish line."],
];

const get = [
  "1-1 coaching with me for 6 months+",
  "Weekly check-ins, with a personal video reply from me within 24hrs",
  "A lift technique library — content giving you the details to add more to your lifts",
  "A game plan from me at every check-in",
  "The community: WhatsApp group and in-person meet-ups",
];

const results = [
  ["Veronique", "18 weeks", "11 lbs / 5kg drop of Body Fat",
    "Biggest motivation for Vee was to change the reflection she saw in the mirror. Main challenge: lack of knowledge and confidence in whether she was doing the right thing. 4 days training per week.",
    "2288a3d9-8b59-4073-bcec-449f2667b157/Untitled+%28Facebook+Post%29+%283%29.png"],
  ["Ryan", "16 weeks", "2.2 lbs / 1kg Body Recomp",
    "Biggest motivation: to be in his best shape for his 30th birthday. Ryan had trained for years but didn't have the proof to show for it. Main challenge: office snacks and overeating on weekends. 5 days training per week.",
    "26eb1d5a-9c2b-490e-92e7-11ee14058726/Untitled+%28Facebook+Post%29+%282%29.png"],
  ["Reiss", "20 weeks", "13 lbs / 6kg drop of Body Fat",
    "Biggest motivation: to build her revenge body ahead of her Big 30. Main challenge: managing fatigue while balancing motherhood and a demanding work schedule. 3–4 days training per week.",
    "b6c0fb4e-553b-4906-8c93-d0331ba7659a/Untitled+%28Facebook+Post%29+%281%29.png"],
  ["Mark", "48 weeks", "26 lbs / 12kg drop of Body Fat",
    "Biggest motivation: to prioritise self-care and respect his mind and body. Main challenge: working around a demanding healthcare career, night shifts, and self-belief that his 20s were his hero years. 4–5 days training per week.",
    "78953b51-77bf-4580-8919-4426bf3172ff/Untitled+%28Facebook+Post%29.png"],
  ["Hazel", "4 years", "86 lbs / 39kg drop of Body Fat",
    "Biggest motivation: to achieve her first pull up. Main challenge: personal self-doubt that she wouldn't be able to do it. 4–5 days training per week.",
    "5d17f894-a4e7-4ae0-a7f0-ff98518a5c16/Untitled+%28Facebook+Post%29+%284%29.png"],
];

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

const faqs = [
  ["How long is the programme?", "Our signature programme has a minimum commitment of 6 months for two main reasons: We hold ourselves to getting a world-class result, and this simply isn't possible in less time. It also allows you to fully develop within the programme without feeling rushed through the process."],
  ["Is this for men or women?", "Both. One programme."],
  ["Time commitment per week", "We set an expectation of 5 hours in the gym per week. Outside of that, we focus on the other 163 hours that have the biggest impact on your results."],
  ["I live outside of the UK", "Most clients are in the UK, the USA and Dubai. Check-ins are online, so time zones aren't a problem."],
  ["What does onboarding look like?", "We have a thorough onboarding to ensure we have everything we need to get the most out of you — and you have full clarity on what to expect. Every programme is customised personally for you, down to the letter."],
  ["Is there nutritional support?", "Absolutely. Without nutritional support you won't see the results you desire. We adapt our approach to your experience, eating habits and goals."],
  ["Will I have to eat boring meals?", "No. We keep meals simple at first while we learn how your body responds to food, then you explore more as we move through the phases."],
];

const HERO_VIDEO = "/video/hero.mp4";
const STORY_VIDEO = "/video/becoming-her.mp4";

/* ── Animated word reveal ── */
const Words = ({ t }) =>
  t.split(" ").map((w, i) => (
    <span className="wm" key={i}><span style={{ "--i": i }}>{w}&nbsp;</span></span>
  ));

/* ── Video section (Watch) ── */
function Story({ src }) {
  const [on, setOn] = useState(false);
  return (
    <div className="vf">
      {on ? (
        src.startsWith("http") ? (
          <iframe src={src + (src.includes("?") ? "&" : "?") + "autoplay=1"} allow="autoplay; fullscreen" allowFullScreen />
        ) : (
          <video src={src} controls autoPlay playsInline />
        )
      ) : (
        <>
          <img src="/img/crowd.webp" alt="" />
          {src
            ? <button className="play" onClick={() => setOn(true)} aria-label="Play video"><i /></button>
            : process.env.NODE_ENV === "development" && <p className="hint">Set STORY_VIDEO in app/page.jsx to enable the video</p>
          }
        </>
      )}
    </div>
  );
}

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
  const offset = useRef(0);
  const paused = useRef(false);
  const hover = useRef(false);
  const timer = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const dir = reverse ? 1 : -1;
    let raf;
    let last = performance.now();

    const frame = (now) => {
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

    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
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
      className="tg-row"
      onMouseEnter={() => { hover.current = true; }}
      onMouseLeave={() => { hover.current = false; }}
    >
      <button className="tg-btn prev" onClick={() => step(1)} aria-label="Previous transformations">‹</button>
      <div className="tg">
        <div ref={trackRef} className="tg-track">
          {[...items, ...items].map((s, i) => (
            <img key={i} loading="lazy" src={img(s, 750)} alt="Transformation" />
          ))}
        </div>
      </div>
      <button className="tg-btn next" onClick={() => step(-1)} aria-label="Next transformations">›</button>
    </div>
  );
}

/* ══════════════════════════════════════
   APPLY FORM EMBED (HIGHLEVEL SURVEY)
══════════════════════════════════════ */
function ApplyFormEmbed() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Inject the HighLevel form_embed.js script
    const scriptSrc = "https://ww.ptextramilefitness.com/js/form_embed.js";
    let script = document.querySelector(`script[src="${scriptSrc}"]`);
    if (!script) {
      script = document.createElement("script");
      script.src = scriptSrc;
      script.type = "text/javascript";
      script.async = true;
      document.body.appendChild(script);
    }

    // Safety fallback: ensure skeleton transitions away after 3s if iframe finishes silently
    const timer = setTimeout(() => setLoaded(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="apply-card" data-r>
      <div className="apply-card-topbar">
        <span className="apply-status-pill">
          <span className="apply-dot" aria-hidden="true" />
          Application Window Open
        </span>
        <span className="apply-card-tag">1:1 Concierge Coaching</span>
      </div>

      <div className="apply-embed">
        {!loaded && (
          <div className="apply-skeleton">
            <div className="apply-spinner" aria-hidden="true" />
            <span className="apply-skeleton-text">Loading application...</span>
          </div>
        )}
        <iframe
          src={APPLY_FORM}
          id="Nz8kmtE6GWsivAq5sOCV"
          title="Extra Mile Fitness Application Form"
          scrolling="no"
          onLoad={() => setLoaded(true)}
          style={{ border: "none", width: "100%" }}
        />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   PAGE
══════════════════════════════════════ */
export default function Page() {
  const vref = useRef(null);
  const userSet = useRef(false);
  const [muted, setMuted] = useState(true);
  const [soundBlocked, setSoundBlocked] = useState(false);

  /* Sound is ON by default. Browsers can block un-muted autoplay until the
     visitor interacts, so we keep retrying (on load + first click/keypress)
     and fall back to muted only while waiting. The button stays a plain
     toggle: "Sound on" / "Sound off". */
  useEffect(() => {
    const v = vref.current;
    if (!v) return;

    const gestures = ["pointerdown", "keydown", "touchstart"];
    let attached = false;

    const detach = () => {
      gestures.forEach((ev) => removeEventListener(ev, onGesture));
      attached = false;
    };
    const onGesture = (e) => {
      /* Ignore the sound button — it has its own toggle handler. */
      if (e.target?.closest?.(".snd")) { detach(); return; }
      if (userSet.current) { detach(); return; }
      v.muted = false;
      v.play().catch(() => {});
      setMuted(false);
      setSoundBlocked(false);
      detach();
    };
    const attach = () => {
      if (attached) return;
      attached = true;
      gestures.forEach((ev) => addEventListener(ev, onGesture, { once: true }));
    };

    const trySoundOn = () => {
      if (userSet.current) return;
      v.muted = false;
      const p = v.play();
      if (p && p.then) {
        p.then(() => { if (!userSet.current) setMuted(false); }).catch(() => {
          if (userSet.current) return;
          v.muted = true;
          setMuted(true);
          setSoundBlocked(true);
          v.play().catch(() => {});
          attach();
        });
      }
    };

    trySoundOn();
    v.addEventListener("canplay", trySoundOn);

    return () => {
      v.removeEventListener("canplay", trySoundOn);
      detach();
    };
  }, []);

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
    const onMove = (e) => {
      root.style.setProperty("--mx", e.clientX + "px"); root.style.setProperty("--my", e.clientY + "px");
      cur.style.transform = `translate(${e.clientX}px,${e.clientY}px) translate(-50%,-50%)`;
      cur.classList.toggle("h", !!e.target.closest?.("a,button,summary"));
      const b = e.target.closest?.(".btn:not(.fab)");
      if (b) { const q = b.getBoundingClientRect(); b.style.transform = `translate(${(e.clientX - q.left - q.width / 2) * 0.2}px,${(e.clientY - q.top - q.height / 2) * 0.3}px)`; }
    };
    const onOut = (e) => { const b = e.target.closest?.(".btn"); if (b) b.style.transform = ""; };

    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("mousemove", onMove);
    addEventListener("mouseout", onOut);
    onScroll();
    return () => {
      io.disconnect(); cio.disconnect();
      removeEventListener("scroll", onScroll);
      removeEventListener("mousemove", onMove);
      removeEventListener("mouseout", onOut);
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
          <a href="#about">About</a>
          <a href="#method">Method</a>
          <a href="#watch">Watch</a>
          <a href="#faq">FAQ</a>
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
              1:1 concierge coaching for busy professionals who run teams, travel and don't have time to figure it out.
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
            <div className={`ph${HERO_VIDEO ? " has-video" : ""}`}>
              {HERO_VIDEO
                ? <video ref={vref} src={HERO_VIDEO} poster="/img/hero.webp" autoPlay muted={muted} loop playsInline preload="metadata" />
                : <img src="/img/hero.webp" alt="Miles, founder of Extra Mile Fitness" />}
            </div>
            {HERO_VIDEO && (
              <button
                className="snd"
                aria-pressed={!muted}
                aria-label={muted ? "Turn sound on" : "Turn sound off"}
                onClick={() => {
                  const v = vref.current;
                  if (!v) return;
                  userSet.current = true;
                  if (muted) {
                    v.muted = false;
                    setMuted(false);
                    setSoundBlocked(false);
                    v.play().catch(() => {});
                  } else {
                    v.muted = true;
                    setMuted(true);
                  }
                }}
              >
                {muted ? (soundBlocked ? "Turn sound on" : "Sound on") : "Sound off"}
              </button>
            )}
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
            <a className="tc tc-apply" href={APPLY}>
              <div className="tc-thumb">
                <span className="tc-apply-inner">
                  <b>Your story next</b>
                  <span>Apply for coaching →</span>
                </span>
              </div>
              <p className="tc-name">Apply now</p>
            </a>
          </div>
        </div>

        {/* Client story cards */}
        <div className="wrap" style={{ marginTop: 100 }}>
          <div className="eyebrow" data-r>Client stories</div>
          <h3 className="res-sub-h" data-r>The people behind the numbers.</h3>
          <div className="res">
            {results.map(([name, wk, stat, txt, src], i) => (
              <div className="rc" key={name} data-r style={{ "--d": `${(i % 3) * 0.1}s` }}>
                <div className="rimg"><img loading="lazy" src={img(src, 1000)} alt={`${name}'s transformation`} /></div>
                <div className="rb">
                  <span>{wk}</span>
                  <h3>{name}</h3>
                  <b>{stat}</b>
                  <p>{txt}</p>
                </div>
              </div>
            ))}
            <a className="rc rc-apply" href={APPLY} data-r style={{ "--d": "0.2s" }}>
              <div className="rimg">
                <span className="rc-apply-inner">
                  <b>Your story next</b>
                  <span>Apply for coaching →</span>
                </span>
              </div>
              <div className="rb">
                <span>6 months+</span>
                <h3>You?</h3>
                <b>Your transformation could be here</b>
                <p>If you're ready to be held to a higher standard, apply and let's build your next chapter.</p>
              </div>
            </a>
          </div>
        </div>

        <div className="wrap" style={{ marginTop: 70, textAlign: "center" }} data-r>
          <a className="btn solid" href={APPLY}>Apply for coaching →</a>
        </div>
      </section>

      {/* Ticker */}
      <Ticker />

      {/* ════════════════════════════════
          4. THIS IS FOR YOU IF
      ════════════════════════════════ */}
      <section style={{ background: "var(--bg2)" }}>
        <div className="wrap">
          <div className="eyebrow" data-r>This is for you if</div>
          <h2 data-r>You know what to do. <em>Keeping it</em> is the hard part.</h2>
          <div className="for">
            {forYou.map(([h, p], i) => (
              <div key={i} data-r style={{ "--d": `${i * 0.12}s` }}>
                <i>0{i + 1}</i><b>{h}</b><p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          5. THE REAL PROBLEM
      ════════════════════════════════ */}
      <section>
        <div className="wrap split">
          <div className="im" data-r>
            <img data-p="0.08" src="/img/coach.webp" alt="Coaching in the gym" />
          </div>
          <div>
            <div className="eyebrow" data-r>The real problem</div>
            <h2 data-r>You don't need more <em>information.</em></h2>
            <p data-r>You know how to train. You know how to eat. You've done it before, and you could probably write your own programme.</p>
            <p data-r>Knowing isn't the problem. <strong>Keeping your standard is.</strong> A standard isn't something you hit once. It's something you keep.</p>
            <p data-r>What you're missing is someone outside your circle holding you to it. Not a friend who'll let it slide. A professional who notices when you miss, and asks why.</p>
          </div>
        </div>
      </section>

      {/* Full-bleed band */}
      <div className="band">
        <img data-p="0.15" src="/img/gym.webp" alt="" />
        <h2 data-r>A goal you reach becomes your <em>floor.</em></h2>
      </div>

      {/* ════════════════════════════════
          6. ABOUT MILES
      ════════════════════════════════ */}
      <section id="about">
        <div className="wrap split">
          <div className="im" data-r>
            <img data-p="0.08" src={img("297b97f1-7175-4e90-afa4-ebc0d983ec32/5E13A484-22F2-461D-9760-F702FDCE18E6.JPG", 1000)} alt="Miles McGilvery, founder of Extra Mile Fitness" />
          </div>
          <div>
            <div className="eyebrow" data-r>About</div>
            <h2 data-r>What <em>Extra Mile</em> means.</h2>
            <p data-r>Extra Mile was never about doing more than everyone else. It's about going past your previous best — and refusing to let that be the best you'll ever be.</p>
            <p data-r>I've been coaching since 2016, and I've still slid twice. I didn't need more information. I needed someone holding me to it.</p>
            <div className="bel" data-r>
              <div><b>You are the sum of your decisions.</b> Future you depends on every decision you make from today.</div>
              <div><b>Standards are fixed.</b> How you keep them can flex.</div>
              <div><b>I lead from the front.</b> I'll never ask you to do something I haven't done or wouldn't do myself.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          7. MILES' PERSONAL STORY
      ════════════════════════════════ */}
      <section className="story">
        <img className="cut" data-p="0.05" src="/img/cut1.webp" alt="" />
        <div className="wrap">
          <div className="eyebrow" data-r>I know this one, because I lived it</div>
          <div className="sig" data-r>Miles</div>
          <div className="story-body" data-r>
            <p>I competed in 2017, then slid. I got back to peak shape in Jamaica in 2022, then slid again.</p>
            <p>I hid it the way you probably do. Baggier tops. Old photos from when I was in shape. Holiday pictures always in a vest. My fitted base layer that looks great when I'm in shape ended up in the shed.</p>
            <p>The moment I knew was a beach club in Dubai. Everyone around me was in great shape, and I kept my top on. I knew exactly why. In my friend group I'm the fitness guy — and that comes with a standard I wasn't keeping.</p>
            <p>When I mentioned it, nobody took it seriously. Every trip ended with <em>"I'll get back on it when I get home."</em></p>
            <p>In Dubai I said: this is my last. A month before flying home, I booked six months with my own coach — so I landed already in rhythm.</p>
            <blockquote>My coach didn't teach me anything I didn't know. <b>What I got was accountability from outside my circle, and a higher standard to measure myself against.</b></blockquote>
          </div>
          <div className="big" data-r>
            <div><b>14kg</b><span>lost in six months</span></div>
            <div><b>9.9%</b><span>body fat, DEXA-verified</span></div>
            <div><b>Routine</b><span>back. Energy back. Base layer out of the shed.</span></div>
          </div>
          <a className="btn" href={APPLY} data-r>Apply for coaching</a>
        </div>
      </section>

      {/* ════════════════════════════════
          8. WATCH
      ════════════════════════════════ */}
      <section id="watch">
        <div className="wrap">
          <div className="eyebrow" data-r>Watch</div>
          <h2 data-r>See what the <em>standard</em> looks like.</h2>
          <div data-r style={{ marginTop: 50 }}>
            <Story src={STORY_VIDEO} />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          9. METHOD
      ════════════════════════════════ */}
      <section id="method">
        <div className="wrap">
          <div className="eyebrow" data-r>Our method</div>
          <h2 data-r>Set · Prove · <em>Keep.</em></h2>
          <div className="stack">
            {steps.map(([t, s, p], i) => (
              <div className="sc" key={t} style={{ top: 100 + i * 28 }}>
                <i>0{i + 1}</i>
                <div><h3>{t}</h3><small>{s}</small><p>{p}</p></div>
              </div>
            ))}
          </div>
          <div className="method-cta" data-r>
            <a className="btn solid" href={APPLY}>Start your transformation →</a>
            <p className="note">New members start: 1st Monday of the month</p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          10. WHAT YOU GET
      ════════════════════════════════ */}
      <section style={{ background: "var(--bg2)" }}>
        <div className="wrap">
          <div className="eyebrow" data-r>What you get</div>
          <h2 data-r>Coaching with <em>Extra Mile Fitness.</em></h2>
          <div className="get">
            {get.map((g, i) => (
              <div key={i} data-r style={{ "--d": `${i * 0.1}s` }}>
                <i>0{i + 1}</i><p>{g}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 56, textAlign: "center" }} data-r>
            <a className="btn solid" href={APPLY}>Apply for coaching →</a>
            <p className="note" style={{ textAlign: "center" }}>New members start: 1st Monday of the month</p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          11. FAQ
      ════════════════════════════════ */}
      <section id="faq">
        <div className="wrap" style={{ maxWidth: 900 }}>
          <div className="eyebrow" data-r>FAQs</div>
          <h2 data-r>Got <em>questions?</em></h2>
          <div data-r style={{ marginTop: 40 }}>
            {faqs.map(([q, a]) => (
              <details key={q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
          <div style={{ marginTop: 60, textAlign: "center" }} data-r>
            <p style={{ color: "var(--mut)", marginBottom: 24, fontSize: 18 }}>Still have questions? We're happy to talk.</p>
            <a className="btn" href={APPLY}>Get in touch →</a>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          12. BEFORE YOU APPLY
      ════════════════════════════════ */}
      <section id="before-you-apply" className="bya">
        <div className="wrap" style={{ maxWidth: 1000 }}>
          <div className="eyebrow" data-r>Step 00 · Before you apply</div>
          <h2 data-r>Before you <em>apply.</em></h2>

          <p className="bya-lead" data-r>
            <span>This isn't group coaching.</span>
            <span>It isn't a fad diet.</span>
            <span>It isn't a template.</span>
          </p>

          <div className="bya-copy">
            <p data-r><strong>EMF is 1:1 concierge coaching</strong> for men and women who perform at a high level in their careers, and are ready to hold their health to the same standard.</p>
            <p data-r>Where you start doesn't matter. Complete beginner or getting back to your best, I've spent 10 years taking people from day one to an elite standard.</p>
            <p data-r>What matters is how you think. A beginner mindset looks for shortcuts. An elite mindset commits, shows up when it's inconvenient, and owns the result.</p>
            <p data-r>You don't need to be elite to start. You need to be ready to think like it.</p>
          </div>

          <div className="bya-close" data-r>
            If you're after cheap, quick or easy, <em>this isn't for you.</em>
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
            Complete the short assessment below to see if you're a good fit for the programme. All applications are reviewed personally within 24 hours.
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
              <a href={APPLY_FORM} target="_blank" rel="noopener noreferrer">
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
        <img className="cut" data-p="0.04" src="/img/cut2.webp" alt="" />
        <div className="wrap">
          <img className="lg" data-r src="/logo.png" alt="Extra Mile Fitness" />
          <h2 data-r>There's no finish line. <em>Only your next standard.</em></h2>
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
