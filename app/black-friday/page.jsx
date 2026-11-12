"use client";
import { useEffect, useRef, useState } from "react";
import ApplyFormEmbed from "../components/ApplyFormEmbed";
import VideoBlock from "../components/VideoBlock";
import { VIDEOS, TESTIMONIALS } from "../../lib/videos";

const APPLY = "#apply";
const CDN = "https://images.squarespace-cdn.com/content/v1/669cd7e93e05045d9aff6341/";
const img = (path, w = 900) => `${CDN}${path}?format=${w}w`;

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

const plans = [
  {
    term: "12 months",
    featured: true,
    items: [
      "December free: you start 7 December, and your 12 months count from 4 January",
      "Bring a friend for your first month",
      "Team photoshoot in London, May 2027, paid for",
      "Your Black Friday rate locked for your next renewal",
      "EMF T-shirt",
    ],
  },
  {
    term: "6 months",
    items: [
      "Bring a friend for your first month",
      "EMF T-shirt",
    ],
  },
];

const Words = ({ t }) =>
  t.split(" ").map((w, i) => (
    <span className="wm" key={i}><span style={{ "--i": i }}>{w}&nbsp;</span></span>
  ));

function Claim() {
  return <a className="btn solid" href={APPLY}>Claim your spot →</a>;
}

function TestimonialCard({ name, videoId }) {
  return (
    <div className="tc">
      <VideoBlock
        videoId={videoId}
        aspect="9/16"
        title={`${name} — member testimonial`}
        className="tc-video"
      />
      <p className="tc-name">{name}</p>
    </div>
  );
}

function ResultsGallery() {
  const ref = useRef(null);

  const scroll = (dir) => {
    const el = ref.current;
    if (!el) return;
    const item = el.querySelector(".bf-gallery-item");
    const step = item ? item.getBoundingClientRect().width + 16 : 320;
    const max = el.scrollWidth - el.clientWidth;
    if (dir > 0 && el.scrollLeft >= max - 8) el.scrollTo({ left: 0, behavior: "smooth" });
    else if (dir < 0 && el.scrollLeft <= 8) el.scrollTo({ left: max, behavior: "smooth" });
    else el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div className="bf-gallery-wrap">
      <div className="bf-gallery" ref={ref} tabIndex={0} aria-label="Client results gallery">
        <figure className="bf-gallery-item bf-story-card">
          <img
            className="bf-story-img"
            src="/img/david-transformation.webp"
            alt="David before and after 23 weeks of coaching"
            loading="lazy"
            decoding="async"
          />
          <div className="bf-story-overlay">
            <span className="bf-story-kicker">Client story</span>
            <b className="bf-story-name">David</b>
            <span className="bf-story-meta">23 weeks · 26 lbs / 12 kg body fat</span>
            <dl className="bf-story-list">
              <div>
                <dt>Biggest motivation</dt>
                <dd>To get back into his peak shape.</dd>
              </div>
              <div>
                <dt>Main challenge</dt>
                <dd>Juggling work and running with his physique goals.</dd>
              </div>
              <div>
                <dt>Training</dt>
                <dd>5 days per week.</dd>
              </div>
            </dl>
          </div>
        </figure>
        {transforms.map((src, i) => (
          <figure className="bf-gallery-item" key={src}>
            <img src={img(src, 500)} alt={`Client transformation ${i + 1}`} loading="lazy" decoding="async" />
          </figure>
        ))}
      </div>
      <div className="bf-gallery-nav">
        <button className="bf-gallery-btn prev" type="button" onClick={() => scroll(-1)} aria-label="Previous results">‹</button>
        <p className="bf-gallery-hint">Scroll or drag to see more</p>
        <button className="bf-gallery-btn next" type="button" onClick={() => scroll(1)} aria-label="Next results">›</button>
      </div>
    </div>
  );
}

export default function BlackFridayPage() {
  const bannerRef = useRef(null);
  const [bannerH, setBannerH] = useState(52);

  /* Black page background (the rest of the site is dark green). */
  useEffect(() => {
    const prev = document.body.style.backgroundColor;
    document.body.style.backgroundColor = "#080808";
    return () => { document.body.style.backgroundColor = prev; };
  }, []);

  /* Keep the fixed nav/hero clear of the Black Friday banner. */
  useEffect(() => {
    const el = bannerRef.current;
    if (!el) return;
    const set = () => setBannerH(el.offsetHeight);
    set();
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(set) : null;
    if (ro) ro.observe(el);
    addEventListener("resize", set);
    return () => {
      if (ro) ro.disconnect();
      removeEventListener("resize", set);
    };
  }, []);

  /* Reveal-on-scroll + animated stat counters. */
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))),
      { threshold: 0.15 }
    );
    document.querySelectorAll("[data-r]").forEach((el) => io.observe(el));

    const cio = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target, to = +el.dataset.count, suf = el.dataset.suf || "", t0 = performance.now();
      const tick = (t) => {
        const p = Math.min((t - t0) / 1800, 1);
        el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + suf;
        p < 1 && requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      cio.unobserve(el);
    }), { threshold: 0.6 });
    document.querySelectorAll("[data-count]").forEach((el) => cio.observe(el));

    return () => { io.disconnect(); cio.disconnect(); };
  }, []);

  return (
    <div className="bf-page" style={{ "--topbar-h": `${bannerH}px` }}>
      <div className="loader"><img src="/logo.png" alt="" /></div>

      {/* Banner */}
      <div className="bf-banner" ref={bannerRef} role="status">
        <span><strong>Black Friday</strong> · 12 places · Starts 7 December</span>
        <span className="bf-banner-sub">Closes Monday 30th November 23:59 GMT</span>
      </div>

      {/* Nav */}
      <nav className="bf-nav">
        <img src="/logo.png" alt="Extra Mile Fitness" />
        <Claim />
      </nav>

      {/* Hero */}
      <header className="hero bf-hero">
        <div className="ghost" aria-hidden>BLACK FRIDAY</div>
        <div className="wrap">
          <div>
            <div className="eyebrow" data-r>Black Friday · 12 places only</div>
            <h1>
              <Words t="Everyone else starts in January." />
              <em><Words t="You start now." /></em>
            </h1>
            <p className="sub" data-r style={{ "--d": "1.9s" }}>
              1:1 concierge coaching for busy professionals who run teams, travel and don’t have time to figure it out.
            </p>
            <div data-r style={{ "--d": "2.1s" }}>
              <Claim />
              <p className="note">Starts 7 December · Closes Monday 30th November 23:59 GMT</p>
            </div>
            <div className="hero-proof" data-r style={{ "--d": "2.4s" }}>
              <div className="proof-faces" aria-hidden="true">
                {["coach", "group", "crowd"].map((k) => <img key={k} src={`/img/${k}.webp`} alt="" />)}
              </div>
              <span><strong>12 places</strong> · one start date · no January</span>
            </div>
          </div>
          <div className="phw" data-r style={{ "--d": "1.6s" }}>
            <VideoBlock
              videoId={VIDEOS.blackFriday}
              aspect="9/16"
              title="The New Standard — Black Friday"
              className="hero-vb"
              autoPlay
              loop
              soundPrompt
              clean
            />
          </div>
        </div>
        <div className="scroll" />
      </header>

      {/* Stats */}
      <div className="stats bf-stats">
        {[[10, "+", "Years coaching"], [671, "", "Success stories"], [83, "%", "Members stay 12+ months"]].map(([n, s, l]) => (
          <div key={l} data-r><b data-count={n} data-suf={s}>0</b><span>{l}</span></div>
        ))}
      </div>

      {/* Offer */}
      <section id="offer" className="bf-offer">
        <div className="wrap">
          <div className="eyebrow" data-r>The Black Friday offer</div>
          <h2 data-r>The New Standard: <em>Black Friday.</em></h2>
          <p className="bf-offer-lead" data-r>Start 7 December. <em>Not January.</em></p>

          <div className="bf-plans">
            {plans.map((plan) => (
              <article className={`bf-plan${plan.featured ? " bf-plan-featured" : ""}`} key={plan.term} data-r>
                {plan.featured && <span className="bf-plan-tag">Best value</span>}
                <span className="bf-plan-kicker">{plan.term}</span>
                <ul>
                  {plan.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
            ))}
          </div>

          <p className="bf-offer-note" data-r>
            Black Friday pricing is covered on your call. A booked call doesn’t hold your place. Payment does.
          </p>
          <div className="bf-cta" data-r><Claim /></div>
        </div>
      </section>

      {/* Client results gallery */}
      <section id="results" className="bf-results">
        <div className="wrap">
          <div className="eyebrow" data-r>Client results</div>
          <h2 data-r>Real people. <em>Real results.</em></h2>
          <p className="results-sub" data-r>
            671 success stories across 7 countries. Scroll through the wall and see what a standard looks like.
          </p>
        </div>

        <ResultsGallery />

        <div className="wrap bf-cta" data-r><Claim /></div>
      </section>

      {/* Video testimonials */}
      <section id="testimonials" className="bf-testimonials">
        <div className="wrap">
          <div className="eyebrow" data-r>Video testimonials</div>
          <h2 data-r>Hear it <em>from them.</em></h2>
          <p className="results-sub" data-r>Six members. Six different starting points. The same standard.</p>
          <div className="testimonials-grid" data-r>
            {TESTIMONIALS.map((t) => <TestimonialCard key={t.videoId} {...t} />)}
          </div>
          <div className="bf-cta" data-r><Claim /></div>
        </div>
      </section>

      {/* Before you apply */}
      <section id="before-you-apply" className="bya bf-bya">
        <div className="wrap" style={{ maxWidth: 1000 }}>
          <div className="eyebrow" data-r>Before you apply</div>
          <h2 data-r>Before you <em>apply.</em></h2>

          <div className="bya-copy">
            <p data-r>This isn’t group coaching, a fad diet or a template. It’s 12 places on 1:1 concierge coaching, and everyone starts 7 December.</p>
            <p data-r>Complete beginner or years in, it doesn’t matter. Mindset does.</p>
            <p data-r>If you’re planning to “start in January,” that’s the exact loop this breaks. The people who win next year start before everyone else.</p>
            <p data-r>You don’t need to be elite to start. You need to be ready to think like it.</p>
          </div>

          <div className="bya-close" data-r>
            Places are secured on payment. <em>When the 12 are gone, they’re gone.</em>
          </div>

          <div className="bf-cta" data-r><Claim /></div>
        </div>
      </section>

      {/* Apply */}
      <section id="apply" className="bf-apply">
        <div className="wrap" style={{ maxWidth: 960 }}>
          <div className="eyebrow" data-r>Black Friday application</div>
          <h2 data-r>Apply for <em>1-on-1 Coaching.</em></h2>
          <p className="results-sub" data-r>
            12 places. Everyone starts 7 December. Closes Monday 30th November 23:59 GMT.
          </p>
          <div className="bf-apply-note" data-r>
            Black Friday pricing is covered on your call. A booked call doesn’t hold your place. Payment does.
          </div>

          <ApplyFormEmbed />
        </div>
      </section>

      {/* Final CTA */}
      <section className="final bf-final">
        <div className="wrap">
          <img className="lg" data-r src="/logo.png" alt="Extra Mile Fitness" />
          <h2 data-r>Everyone else starts in January. <em>You start now.</em></h2>
          <div data-r><Claim /></div>
          <p className="final-spots" data-r>
            <span className="urgency-dot" aria-hidden="true" />
            12 places · Starts 7 December
          </p>
        </div>
      </section>

      <footer>
        <span>© 2026 Extra Mile Fitness</span>
        <span>Black Friday · 12 places · Starts 7 December</span>
      </footer>
    </div>
  );
}
