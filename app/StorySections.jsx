"use client";

const CDN = "https://images.squarespace-cdn.com/content/v1/669cd7e93e05045d9aff6341/";
const img = (path, w = 900) => `${CDN}${path}?format=${w}w`;

const results = [
  ["Veronique", "18 weeks", "11 lbs / 5kg drop of Body Fat",
    "Biggest motivation for Vee was to change the reflection she saw in the mirror. Main challenge: lack of knowledge and confidence in whether she was doing the right thing. 4 days training per week.",
    "2288a3d9-8b59-4073-bcec-449f2667b157/Untitled+%28Facebook+Post%29+%283%29.png"],
  ["Ryan", "16 weeks", "2.2 lbs / 1kg Body Recomp",
    "Biggest motivation: to be in his best shape for his 30th birthday. Ryan had trained for years but didn’t have the proof to show for it. Main challenge: office snacks and overeating on weekends. 5 days training per week.",
    "26eb1d5a-9c2b-490e-92e7-11ee14058726/Untitled+%28Facebook+Post%29+%282%29.png"],
  ["Reiss", "20 weeks", "13 lbs / 6kg drop of Body Fat",
    "Biggest motivation: to build her revenge body ahead of her Big 30. Main challenge: managing fatigue while balancing motherhood and a demanding work schedule. 3–4 days training per week.",
    "b6c0fb4e-553b-4906-8c93-d0331ba7659a/Untitled+%28Facebook+Post%29+%281%29.png"],
  ["Mark", "48 weeks", "26 lbs / 12kg drop of Body Fat",
    "Biggest motivation: to prioritise self-care and respect his mind and body. Main challenge: working around a demanding healthcare career, night shifts, and self-belief that his 20s were his hero years. 4–5 days training per week.",
    "78953b51-77bf-4580-8919-4426bf3172ff/Untitled+%28Facebook+Post%29.png"],
  ["Hazel", "4 years", "86 lbs / 39kg drop of Body Fat",
    "Biggest motivation: to achieve her first pull up. Main challenge: personal self-doubt that she wouldn’t be able to do it. 4–5 days training per week.",
    "5d17f894-a4e7-4ae0-a7f0-ff98518a5c16/Untitled+%28Facebook+Post%29+%284%29.png"],
  /* PLACEHOLDER: swap these values and the image path when the new client story is supplied. */
  ["[CLIENT NAME]", "[X] weeks", "[RESULT]",
    "Biggest motivation: [PLACEHOLDER]. Main challenge: [PLACEHOLDER]. [N] days training per week.",
    null],
];

const steps = [
  ["Set", "Weeks 1–6", "We set your standards and get you back in rhythm: routine, starting lifts, and your diet begins. I notice every miss and ask why. Miss a check-in and I’m in touch the same day."],
  ["Prove", "Diet track · Build track", "You lean out while still getting stronger — progressive overload in every session. Once you’re lean, we build. The focus shifts to adding muscle."],
  ["Keep", "No finish line", "We hold what you’ve built. After a diet, back to maintenance. After a build, we tidy up. Then the next block starts. There’s no finish line."],
];

const faqs = [
  ["How long is the programme?", "Our signature programme has a minimum commitment of 6 months for two main reasons: We hold ourselves to getting a world-class result, and this simply isn’t possible in less time. It also allows you to fully develop within the programme without feeling rushed through the process."],
  ["Is this for men or women?", "Both. One programme."],
  ["Time commitment per week", "We set an expectation of 5 hours in the gym per week. Outside of that, we focus on the other 163 hours that have the biggest impact on your results."],
  ["I live outside of the UK", "Most clients are in the UK, the USA and Dubai. Check-ins are online, so time zones aren’t a problem."],
  ["What does onboarding look like?", "We have a thorough onboarding to ensure we have everything we need to get the most out of you — and you have full clarity on what to expect. Every programme is customised personally for you, down to the letter."],
  ["Is there nutritional support?", "Absolutely. Without nutritional support you won’t see the results you desire. We adapt our approach to your experience, eating habits and goals."],
  ["Will I have to eat boring meals?", "No. We keep meals simple at first while we learn how your body responds to food, then you explore more as we move through the phases."],
];

export default function StorySections() {
  return (
    <>
      {/* ════════════════════════════════
          CLIENT STORIES
      ════════════════════════════════ */}
      <section id="client-stories">
        <div className="wrap">
          <div className="eyebrow" data-r>Client stories</div>
          <h2 data-r>The people <em>behind the numbers.</em></h2>
          <div className="res">
            {results.map(([name, wk, stat, txt, src], i) => (
              <div className="rc" key={name} data-r style={{ "--d": `${(i % 3) * 0.1}s` }}>
                <div className="rimg">
                  {src
                    ? <img loading="lazy" src={img(src, 1000)} alt={`${name}’s transformation`} />
                    : <div className="rimg-ph">PLACEHOLDER PHOTO</div>}
                </div>
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
      </section>

      {/* ════════════════════════════════
          WHAT EXTRA MILE MEANS
      ════════════════════════════════ */}
      <section id="what-extra-mile-means">
        <div className="wrap split">
          <div className="im" data-r>
            <img data-p="0.08" src={img("297b97f1-7175-4e90-afa4-ebc0d983ec32/5E13A484-22F2-461D-9760-F702FDCE18E6.JPG", 1000)} alt="Miles McGilvery, founder of Extra Mile Fitness" />
          </div>
          <div>
            <div className="eyebrow" data-r>What Extra Mile means</div>
            <h2 data-r>More than a <em>programme.</em></h2>
            <p data-r>Extra Mile was never about doing more than everyone else. It’s about going past your previous best — and refusing to let that be the best you’ll ever be.</p>
            <p data-r>I’ve been coaching since 2016, and I’ve still slid twice. I didn’t need more information. I needed someone holding me to it.</p>
            <div className="bel" data-r>
              <div><b>You are the sum of your decisions.</b> Future you depends on every decision you make from today.</div>
              <div><b>Standards are fixed.</b> How you keep them can flex.</div>
              <div><b>I lead from the front.</b> I’ll never ask you to do something I haven’t done or wouldn’t do myself.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          MY STORY
      ════════════════════════════════ */}
      <section className="story">
        <img className="cut" data-p="0.05" src="/img/cut1.webp" alt="" />
        <div className="wrap">
          <div className="eyebrow" data-r>My story · I know this one, because I lived it</div>
          <div className="sig" data-r>Miles</div>
          <div className="story-body" data-r>
            <p>I competed in 2017, then slid. I got back to peak shape in Jamaica in 2022, then slid again.</p>
            <p>I hid it the way you probably do. Baggier tops. Old photos from when I was in shape. Holiday pictures always in a vest. My fitted base layer that looks great when I’m in shape ended up in the shed.</p>
            <p>The moment I knew was a beach club in Dubai. Everyone around me was in great shape, and I kept my top on. I knew exactly why. In my friend group I’m the fitness guy — and that comes with a standard I wasn’t keeping.</p>
            <p>When I mentioned it, nobody took it seriously. Every trip ended with <em>“I’ll get back on it when I get home.”</em></p>
            <p>In Dubai I said: this is my last. A month before flying home, I booked six months with my own coach — so I landed already in rhythm.</p>
            <blockquote>My coach didn’t teach me anything I didn’t know. <b>What I got was accountability from outside my circle, and a higher standard to measure myself against.</b></blockquote>
          </div>
          <div className="big" data-r>
            <div><b>14kg</b><span>lost in six months</span></div>
            <div><b>9.9%</b><span>body fat, DEXA-verified</span></div>
            <div><b>Routine</b><span>back. Energy back. Base layer out of the shed.</span></div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          OUR METHOD
      ════════════════════════════════ */}
      <section id="our-method">
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
        </div>
      </section>

      {/* ════════════════════════════════
          FAQs
      ════════════════════════════════ */}
      <section id="faqs">
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
        </div>
      </section>
    </>
  );
}
