import { WordsPullUpMultiStyle } from "@/components/anim/words-pull-up-multi";
import { Award, BadgeCheck } from "lucide-react";

export function Certifications() {
  return (
    <section
      id="certifications"
      className="relative w-full overflow-hidden bg-paper px-4 py-20 md:px-8 md:py-28 lg:px-12"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="text-center">
          <p className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-teal sm:text-xs">
            <BadgeCheck className="h-4 w-4" />
            International Certification at Arcwave
          </p>
          <h2 className="mx-auto mt-6 max-w-3xl text-3xl font-normal leading-[0.95] tracking-tight text-ink sm:text-4xl md:text-5xl">
            <WordsPullUpMultiStyle
              segments={[
                { text: "Chennai’s First." },
                { text: "Internationally Certified.", className: "font-serif italic text-teal" },
              ]}
            />
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-ink/80 md:text-base">
            Arcwave Pilates Studio is proud to be the first Pilates studio in Chennai to conduct an international Pilates certification program.
          </p>
        </div>

        <div className="mx-auto mt-14 flex max-w-5xl flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="w-full rounded-3xl bg-white2 p-8 shadow-sm lg:w-1/2">
            <h3 className="text-xl font-medium text-ink">Our certification pathway covers:</h3>
            <ul className="mt-6 space-y-4">
              <li className="flex items-center gap-3 text-ink/80">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-lime/60 text-teal">
                  <Award className="h-4 w-4" />
                </span>
                Reformer Pilates — Level 1
              </li>
              <li className="flex items-center gap-3 text-ink/80">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-lime/60 text-teal">
                  <Award className="h-4 w-4" />
                </span>
                Reformer Pilates — Level 2
              </li>
              <li className="flex items-center gap-3 text-ink/80">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-lime/60 text-teal">
                  <Award className="h-4 w-4" />
                </span>
                Tower Pilates
              </li>
            </ul>
            <p className="mt-8 text-sm leading-relaxed text-ink/80">
              Designed for aspiring and practicing Pilates professionals, the program goes beyond learning exercises. It builds a deeper understanding of movement, technique, anatomy, teaching methodology, and practical application.
            </p>
            <p className="mt-4 font-serif text-lg italic text-teal">
              Learn with structure. Train with expertise. Get internationally certified.
            </p>
          </div>

          <div className="w-full rounded-3xl bg-ink p-8 text-paper shadow-sm lg:w-1/2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-lime">
              Certification Details
            </p>
            <h3 className="mt-4 text-2xl font-serif italic text-white">Intensive Training</h3>
            <p className="mt-6 text-sm leading-relaxed text-paper/80">
              The certification includes 5 days (7 hours per day) of intensive reformer training, totaling 35 hours of hands-on training.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-paper/80">
              This is followed by a minimum of 2 weeks of self-practice.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-paper/80">
              Finally, you will undergo both an online and offline exam to become internationally certified.
            </p>
            <div className="mt-8">
              <a href="/contact" className="inline-flex h-11 items-center justify-center rounded-full bg-lime px-6 text-xs font-semibold uppercase tracking-[0.15em] text-ink transition-colors hover:bg-lime/90">
                Enquire Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
