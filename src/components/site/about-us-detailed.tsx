import { WordsPullUpMultiStyle } from "@/components/anim/words-pull-up-multi";

export function AboutUsDetailed() {
  return (
    <section className="w-full bg-paper px-4 py-20 md:px-8 md:py-28 lg:px-12">
      <div className="mx-auto max-w-[1400px] flex flex-col items-center text-center">
        <h2 className="font-serif text-4xl italic text-ink sm:text-5xl lg:text-6xl">Why Arcwave?</h2>
        <div className="mt-8 max-w-3xl space-y-4 text-left text-sm leading-relaxed text-ink/80 sm:text-base md:text-lg">
          <p>
            Pilates is more than moving through exercises on a reformer. It’s about understanding the body, knowing how movement works, and creating the right progression for every individual.
          </p>
          <p>
            At Arcwave Pilates Studio, we believe great Pilates should never feel random.
          </p>
          <p>
            Our sessions are built around a structured approach developed through years of professional Pilates teaching and hands-on experience with different bodies, fitness levels, goals, and limitations. Every movement has a purpose, and every progression is thoughtfully designed.
          </p>
          <p>
            What sets our trainers apart is their strong foundation in anatomy, movement, and physical conditioning, backed by years of experience training and working with clients. We understand that no two bodies are the same—and that meaningful progress comes from knowing how to challenge each person appropriately.
          </p>
          <p>
            So when you step into Arcwave, you&apos;re not simply stepping into a studio with reformers.
          </p>
          <p className="font-medium text-ink">
            You&apos;re stepping into a space built on knowledge, experience, structure, and intentional movement.
          </p>
          <p>
            Whether you&apos;re beginning your Pilates journey or looking to take your fitness to the next level, our goal is to help you progress with confidence—effectively, intelligently, and safely.
          </p>
        </div>
      </div>
    </section>
  );
}
