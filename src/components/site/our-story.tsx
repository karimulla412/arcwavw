export function OurStory() {
  return (
    <section id="our-story" className="w-full bg-paper px-4 py-20 md:px-8 md:py-28 lg:px-12">
      <div className="mx-auto max-w-[1400px] rounded-3xl bg-white2 overflow-hidden shadow-sm">
        <div className="flex flex-col lg:flex-row">
          {/* Image */}
          <div className="relative h-[400px] w-full lg:h-auto lg:w-1/2">
            <img src="/images/DSC04922.jpg" alt="Arcwave Pilates Story" className="absolute inset-0 h-full w-full object-cover" />
          </div>
          {/* Content */}
          <div className="flex w-full flex-col justify-center p-8 sm:p-12 lg:w-1/2 lg:p-16 xl:p-24">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-teal">Our Story</p>
            <h2 className="mt-4 font-serif text-4xl italic text-ink sm:text-5xl lg:text-6xl">
              Why Arcwave?
            </h2>
            <p className="mt-6 text-lg font-medium text-ink">Pilates, done with purpose.</p>
            <p className="mt-4 text-sm leading-relaxed text-ink/80 sm:text-base">
              We’re not just another reformer studio running random workouts. At Arcwave, every movement follows a structured method built on years of Pilates expertise, anatomy, and hands-on experience.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink/80 sm:text-base">
              Our trainers know how the body moves, how it adapts, and how to progress it safely.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink/80 sm:text-base">
              No guesswork. No random routines. Just intelligent movement, expert guidance, and real progress.
            </p>
            <p className="mt-8 font-serif text-xl italic text-teal">
              Arcwave — where experience moves you forward.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
