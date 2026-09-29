import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { WordsPullUpMultiStyle } from "@/components/anim/words-pull-up-multi";
import { Instagram } from "lucide-react";

const HARDCODED_FAQS = [
  {
    question: "01. I’m over 50. Can I do Pilates?",
    answer: "Absolutely. Pilates can be adapted to different ages and fitness levels. At Arcwave, we focus on your body, your movement quality, and your individual starting point—not your age.",
  },
  {
    question: "02. I have chronic issues like neck, back, or knee pain. Can I do Pilates?",
    answer: "In many cases, Pilates can be adapted to work around existing pain or movement limitations. Our trainers assess your needs and modify exercises accordingly. If you have a diagnosed condition or ongoing pain, we recommend getting clearance from your healthcare professional before starting.",
  },
  {
    question: "03. I’m a few weeks away from delivery. Can I do Pilates?",
    answer: "Pregnancy requires a more individual approach. Depending on your stage of pregnancy and medical history, Pilates may be appropriate with suitable modifications. Always get clearance from your obstetrician or healthcare provider, and let our trainers know about your pregnancy before starting.",
  },
  {
    question: "04. I do strength training. Can I combine it with Pilates?",
    answer: "Absolutely. You don’t have to choose one. Strength training builds strength and power, while Pilates can complement it through controlled movement, core work, mobility, balance, and body awareness. Together, they can form a well-rounded training routine.",
  },
  {
    question: "05. How many days a week should I do Pilates?",
    answer: "Consistency matters more than doing as much as possible. For most people, 2–3 sessions a week is a practical starting point. Your ideal frequency depends on your goals, training history, recovery, and overall routine.",
  },
  {
    question: "06. Will Pilates help me lose inches and get toned?",
    answer: "Pilates can help build muscular endurance, improve posture, and develop a stronger, more defined look. Changes in body composition, however, depend on your overall activity, nutrition, genetics, sleep, and consistency—not Pilates alone.",
  },
  {
    question: "07. What does Pilates actually do for my everyday life?",
    answer: "Pilates isn't just about what happens inside the studio. Better core control, balance, mobility, posture, and body awareness can help you move more efficiently in everyday life—from sitting at your desk to walking, lifting, climbing stairs, and simply feeling more in control of your body. At Arcwave, the goal isn't just to make you better at Pilates. It's to help you move better, every day.",
  }
];

export function Faq({
  instagramUrl,
}: {
  faqs?: any[]; // optional now
  instagramUrl: string;
}) {
  return (
    <section
      id="faq"
      className="relative w-full overflow-hidden bg-paper px-4 py-20 md:px-8 md:py-28 lg:px-12"
    >
      <div className="mx-auto max-w-3xl">
        <h2 className="mt-6 text-3xl font-normal leading-[0.95] tracking-tight text-ink sm:text-4xl md:text-5xl">
          <WordsPullUpMultiStyle
            segments={[
              { text: "Your questions and" },
              { text: "our expertise answers", className: "font-serif italic" },
            ]}
          />
        </h2>

        <Accordion
          type="single"
          collapsible
          defaultValue="item-0"
          className="mt-10"
        >
          {HARDCODED_FAQS.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border-line"
            >
              <AccordionTrigger className="text-left text-base font-medium text-ink hover:text-teal sm:text-lg">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground sm:text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-10 flex flex-col items-start gap-4 rounded-2xl border border-line bg-muted p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-ink">
              Still curious? Our team is a message away.
            </p>
            <p className="mt-1 text-xs text-muted-foreground/80">
              DM us on Instagram — we usually reply within a few hours.
            </p>
          </div>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-teal px-5 py-2.5 text-sm font-medium text-white transition-transform hover:scale-105"
          >
            <Instagram className="h-4 w-4" />
            Ask us on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
