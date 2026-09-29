import { WordsPullUpMultiStyle } from "@/components/anim/words-pull-up-multi";

const PROGRAMS = [
  {
    title: "Reformer Pilates",
    tagline: "Strength. Sculpt. Flow.",
    desc: "Take your Pilates practice to the next level with the Reformer. Using controlled resistance and fluid movement, Reformer Pilates builds deep core strength, improves posture, enhances flexibility, and leaves you feeling stronger and more balanced.",
  },
  {
    title: "Tower Pilates",
    tagline: "Move deeper. Feel stronger.",
    desc: "Tower Pilates blends classic Pilates principles with springs, bars, and straps to create a dynamic full-body workout. Improve mobility, stability, strength, and body awareness through precise, mindful movement.",
  },
  {
    title: "Chair Pilates",
    tagline: "Challenge your strength. Find your balance.",
    desc: "Chair Pilates delivers a powerful workout in a compact format. Designed to challenge your core, legs, arms, and stability, it builds functional strength, coordination, and confidence in every movement.",
  },
];

const SERVICES = [
  {
    title: "Small Group Sessions",
    badge: "Maximum 4 members",
    desc: "Personalized Pilates in a small, supportive setting. With only four clients per session, every participant receives focused instruction, individual corrections, and appropriate modifications.",
  },
  {
    title: "Private Sessions",
    badge: "One-on-one attention",
    desc: "A completely personalized Pilates experience designed around your individual goals, abilities, and requirements. Particularly suitable for rehabilitation, older adults, beginners, pre/post-natal clients, and anyone seeking dedicated attention.",
  },
];

export function Programs() {
  return (
    <section id="programs" className="w-full bg-paper px-4 py-20 md:px-8 md:py-28 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        {/* Intro */}
        <div className="max-w-3xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-teal sm:text-xs">
            Our Pilates Programs
          </p>
          <h2 className="mt-5 text-3xl font-normal leading-[1.05] tracking-tight text-ink sm:text-4xl md:text-5xl lg:text-6xl">
            <WordsPullUpMultiStyle
              segments={[
                { text: "Pilates for every body," },
                { text: "every stage of life.", className: "font-serif italic text-teal" },
              ]}
            />
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-ink/70 sm:text-base md:text-lg">
            At Arcwave Pilates, we believe Pilates is for every body, every age,
            and every stage of life. Our sessions are thoughtfully designed to
            help you build strength, improve flexibility, develop better
            posture, enhance body awareness, and move with greater confidence.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-ink/70 sm:text-base md:text-lg">
            Whether you are completely new to Pilates, an experienced
            practitioner, preparing for motherhood, or recovering from an
            injury, we offer programs tailored to your individual needs and
            fitness level.
          </p>
        </div>

        {/* Program cards grid */}
        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
          {PROGRAMS.map((p, i) => (
            <article
              key={i}
              className="flex flex-col rounded-2xl border border-line bg-white2 p-6 transition-colors hover:border-teal/40 md:p-7"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal/10 text-xs font-semibold text-teal">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-lg font-medium text-ink">{p.title}</h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.15em] text-teal">
                {p.tagline}
              </p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {p.desc}
              </p>
            </article>
          ))}
        </div>

        {/* CTA line */}
        <div className="mt-12 rounded-2xl border border-teal/30 bg-teal/5 px-6 py-8 text-center md:px-10 md:py-10">
          <p className="text-xl font-medium text-ink md:text-2xl lg:text-3xl">
            Move Better. Feel Stronger.{" "}
            <span className="font-serif italic text-teal">Live Better.</span>
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
            Whether your goal is to improve fitness, develop strength and
            flexibility, support your pregnancy journey, recover from an
            injury, or simply feel better in your body, our Pilates programs
            are designed to meet you where you are and help you progress with
            confidence.
          </p>
        </div>

        {/* Services we provide */}
        <div className="mt-16">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-teal sm:text-xs">
            Services we provide
          </p>
          <h3 className="mt-4 text-2xl font-normal text-ink md:text-3xl lg:text-4xl">
            Two ways to practise
          </h3>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {SERVICES.map((s, i) => (
              <article
                key={i}
                className="flex flex-col rounded-2xl border border-line bg-muted p-6 md:p-8"
              >
                <div className="flex items-center justify-between gap-3">
                  <h4 className="text-xl font-medium text-ink md:text-2xl">
                    {s.title}
                  </h4>
                  <span className="shrink-0 rounded-full bg-teal/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-teal">
                    {s.badge}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {s.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
