"use client";
import { useEffect } from "react";
import StorySections from "../StorySections";
import VideoBlock from "../components/VideoBlock";
import { VIDEOS } from "../../lib/videos";

/* PLACEHOLDER: Talia's before/after images and interview video are not supplied yet. */
const TALIA_VIDEO = "";

function TaliaSection() {
  return (
    <section id="talia" className="talia-section">
      <div className="wrap">
        <div className="eyebrow" data-r>CLIENT STORY · TALIA, 31</div>
        <h2 className="talia-title" data-r>“If not now, when?”</h2>

        <div className="talia-grid">
          <div className="talia-media" data-r>
            <div className="talia-ba">
              <figure className="ba-ph">
                <div className="ba-frame">BEFORE photo</div>
                <figcaption>88kg</figcaption>
              </figure>
              <figure className="ba-ph">
                <div className="ba-frame">AFTER photo (shoot)</div>
                <figcaption>76.3kg</figcaption>
              </figure>
            </div>

            <div className="talia-video">
              <VideoBlock
                videoId={TALIA_VIDEO}
                aspect="16/9"
                title="Talia’s interview"
              />
              <p className="video-caption">VIDEO: Talia’s interview</p>
            </div>

            <div className="talia-stats">
              <div><b>-11.7kg</b><span>88kg → 76.3kg</span></div>
              <div><b>16 wks</b><span>Recomp to photoshoot</span></div>
              <div><b>6+ mo</b><span>Of coaching</span></div>
            </div>
          </div>

          <div className="talia-copy" data-r>
            <p>Talia is 31. She came to London from New Zealand three years ago, and works in HR and property investment.</p>
            <p>She wasn’t new to any of this. She represented New Zealand at netball, swam at national level, and did CrossFit. In her mid-twenties she hired her first coach and learned how to train for shape, not just sport.</p>
            <p>Then she moved to London. Long hours, travel, and training on her own. In her words, it was “something that I like to do, but wasn’t as intentional as what I could have been.”</p>
            <p>She knew what to do. What she wanted was a standard: “I just wanted intention with how I trained. I wanted a bit more accountability.” So she asked herself one question. “If not now, when?”</p>

            <h3>Six months on</h3>
            <p>She finished a 16-week recomp ending in a photoshoot. “I’m feeling the fittest I’ve ever been, the healthiest I’ve ever been.” From 88kg to 76.3kg in just over six months of coaching: 11.7kg, a weight she hadn’t seen since she was 18 or 19.</p>
            <p>The hardest part? “It actually hasn’t been that hard at all.” She controlled what she could control: sleep, food, steps, cardio, training. And she kept it up through finishing a work contract, moving out of her flat and a visit from her dad.</p>

            <h3>From lone wolf to leaning on people</h3>
            <p>“I’ve always just been a silent worker.” She nearly skipped the September meet-up. She went anyway, and “that changed my perspective completely, from being lone wolf, do it by yourself, to actually, you can lean on people.” She now trains with other members.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

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
      {/* (A) Confirmation bar — above the header, no link, no button */}
      <div className="confirm-bar" role="status">
        <svg className="confirm-check" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        <span>
          <strong>You’re booked. Check your email for your call link.</strong>{" "}
          <span className="confirm-light">Take the call somewhere quiet, not on the move.</span>
        </span>
      </div>

      {/* (B) Header — logo only, not clickable */}
      <header className="ty">
        <div className="ty-top">
          <img src="/logo.png" alt="Extra Mile Fitness" />
        </div>

        {/* (C) Hero / title */}
        <div className="wrap ty-hero">
          <div className="eyebrow ty-eyebrow" data-r>STEP 1 OF 2: WATCH THIS BEFORE WE SPEAK</div>
          <h1 data-r>You’re booked in. I’m looking forward to speaking with you.</h1>
          <p className="ty-sub" data-r>
            You’ve just made the decision most people keep putting off. In the video below, I’ll show you what happens on our call, how we help men and women who’ve been stuck finally break through, and what happens next.
          </p>
          <div className="ty-video-wrap" data-r>
            <VideoBlock
              videoId={VIDEOS.thankYouIntro}
              aspect="9/16"
              title="What to expect on the call"
              className="vb-short"
            />
            <p className="video-caption">VIDEO: What to expect on the call · Miles to camera</p>
          </div>
        </div>
      </header>

      {/* (D) Watch before your call */}
      <section id="watch-before-your-call" className="watch-before">
        <div className="wrap">
          <div className="eyebrow" data-r>Before your call</div>
          <h2 data-r>Watch before your call</h2>
          <p className="results-sub" data-r>Two short videos so we can use our time on you, not the basics.</p>

          <div className="watch-videos">
            <div data-r>
              <VideoBlock
                videoId={VIDEOS.howProgrammeWorks}
                aspect="16/9"
                title="How the programme works"
              />
              <h3>How the programme works</h3>
              <p className="video-caption">How coaching is structured, what a check-in looks like, and how the phases fit together.</p>
            </div>
            <div data-r style={{ "--d": "0.12s" }}>
              <VideoBlock
                videoId={VIDEOS.commonQuestions}
                aspect="16/9"
                title="Common questions answered"
              />
              <h3>Common questions answered</h3>
              <p className="video-caption">The questions new members ask most before they start.</p>
            </div>
          </div>
        </div>
      </section>

      {/* (E) Client spotlight: Talia */}
      <TaliaSection />

      {/* (F–I) Client stories, Miles’ story, method, FAQs */}
      <StorySections />

      {/* (J) Footer — plain text, nothing leaves the page */}
      <footer>
        <span>© 2026 Extra Mile Fitness</span>
        <span>Privacy Policy · Cookie Policy</span>
      </footer>
    </main>
  );
}
