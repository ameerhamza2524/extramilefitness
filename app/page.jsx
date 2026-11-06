"use client";
import { useEffect, useRef, useState } from "react";

const APPLY = "https://www.ptextramilefitness.com/widget/survey/Nz8kmtE6GWsivAq5sOCV";
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

const videoTestimonials = ["Hazel", "Sophia", "Reiss", "Ariel", "Maggie", "Alice", "Monica", "Mide", "Lydia", "Melina", "Louis"];

const faqs = [
  ["How long is the programme?", "Our signature programme has a minimum commitment of 6 months for two main reasons: We hold ourselves to getting a world-class result, and this simply isn't possible in less time. It also allows you to fully develop within the programme without feeling rushed through the process."],
  ["Is this for men or women?", "Both. One programme."],
  ["Time commitment per week", "We set an expectation of 5 hours in the gym per week. Outside of that, we focus on the other 163 hours that have the biggest impact on your results."],
  ["I live outside of the UK", "Most clients are in the UK, the USA and Dubai. Check-ins are online, so time zones aren't a problem."],
  ["What does onboarding look like?", "We have a thorough onboarding to ensure we have everything we need to get the most out of you — and you have full clarity on what to expect. Every programme is customised personally for you, down to the letter."],
  ["Is there nutritional support?", "Absolutely. Without nutritional support you won't see the results you desire. We adapt our approach to your experience, eating habits and goals."],
  ["Will I have to eat boring meals?", "No. We keep meals simple at first while we learn how your body responds to food, then you explore more as we move through the phases."],
];

const HERO_VIDEO = "";
const STORY_VIDEO = "";

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
      Limited spots available — New members start <strong>1st Monday of the month</strong>
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
  "650+ success stories across 7 countries",
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

/* ══════════════════════════════════════
   PAGE
══════════════════════════════════════ */
export default function Page() {
  const vref = useRef(null);
  const [muted, setMuted] = useState(true);

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
            <div className="eyebrow" data-r>1:1 Online Coaching</div>
            <h1>
              <Words t="Your best wasn't back then." />
              <em><Words t="It's ahead of you." /></em>
            </h1>
            <p className="sub" data-r style={{ "--d": "1.9s" }}>
              For capable men and women who've been in shape before and are ready to go past it — with a coach holding you to a higher standard.
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
            <div className="ph">
              {HERO_VIDEO
                ? <video ref={vref} src={HERO_VIDEO} autoPlay muted loop playsInline />
                : <img src="/img/hero.webp" alt="Miles, founder of Extra Mile Fitness" />}
            </div>
            {HERO_VIDEO && (
              <button className="snd" onClick={() => { vref.current.muted = !muted; setMuted(!muted); }}>
                {muted ? "Turn sound on" : "Sound off"}
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
        {[[650, "+", "Success stories"], [7, "", "Countries"], [14, "kg", "Lost in 6 months"], [24, "hrs", "Video reply time"]].map(([n, s, l]) => (
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
            With 650+ success stories across 7 different countries — real people, real challenges, real results.
          </p>
        </div>

        {/* Scrolling transformation strip */}
        <div className="tg-wrap">
          {[0, 1].map((r) => {
            const a = r ? [...transforms].reverse() : transforms;
            return (
              <div className={`tg ${r ? "rev" : ""}`} key={r}>
                <div>{[...a, ...a].map((s, i) => <img key={i} loading="lazy" src={img(s, 750)} alt="Transformation" />)}</div>
              </div>
            );
          })}
        </div>

        {/* Client story cards */}
        <div className="wrap" style={{ marginTop: 80 }}>
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
          </div>
        </div>

        {/* Video testimonials */}
        <div className="wrap" style={{ marginTop: 100 }}>
          <div className="eyebrow" data-r>What our members say</div>
          <h2 data-r>Hear it <em>from them.</em></h2>
          <div className="testimonials-grid" data-r>
            {videoTestimonials.map((name) => <TestimonialCard key={name} name={name} />)}
          </div>
        </div>

        {/* Community photos */}
        <div className="wrap" style={{ marginTop: 80 }}>
          <div className="mos">
            {["group", "crowd", "dine"].map((k, i) => (
              <div key={k} data-r style={{ "--d": `${i * 0.12}s` }}>
                <img loading="lazy" src={`/img/${k}.webp`} alt="Extra Mile Fitness community" />
              </div>
            ))}
          </div>
        </div>

        {/* Results CTA */}
        <div className="wrap mid-cta" data-r>
          <div className="mid-cta-inner">
            <p>Ready to be the next story on this page?</p>
            <a className="btn solid" href={APPLY}>Start your transformation →</a>
          </div>
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
          12. FINAL CTA
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
