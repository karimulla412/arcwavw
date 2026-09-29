import { Hero } from "@/components/site/hero";
import { About } from "@/components/site/about";
import { OurStory } from "@/components/site/our-story";
import { Certifications } from "@/components/site/certifications";
import { Trainers } from "@/components/site/trainers";
import { Programs } from "@/components/site/programs";
import { Features } from "@/components/site/features";
import { Pricing } from "@/components/site/pricing";
import { BookingSection } from "@/components/site/booking-section";
import { Gallery } from "@/components/site/gallery";
import { Testimonials } from "@/components/site/testimonials";
import { ReviewForm } from "@/components/site/review-form";
import { Contact } from "@/components/site/contact";
import { Faq } from "@/components/site/faq";
import { Footer } from "@/components/site/footer";
import {
  getSettings,
  getPlans,
  getSlots,
  getCertificates,
  getTrainers,
  getGalleryImages,
  getFAQs,
  getReviews,
} from "@/lib/site";

export const dynamic = "force-dynamic";

function s(settings: Record<string, string>, key: string, fallback: string) {
  return settings[key] ?? fallback;
}

export default async function Home() {
  const [settings, plans, slots, certificates, trainers, galleryImages, faqs, reviews] = await Promise.all([
    getSettings(),
    getPlans(),
    getSlots(),
    getCertificates(),
    getTrainers(),
    getGalleryImages(),
    getFAQs(),
    getReviews(),
  ]);
  const instagramUrl = s(
    settings,
    "instagramUrl",
    "https://www.instagram.com/arcwavepilates/"
  );

  return (
    <main className="flex min-h-screen flex-col bg-paper">
      <div id="top" />
      <Hero
        eyebrow={s(settings, "eyebrow", "Boutique Pilates · Thiruvanmiyur, Chennai")}
        tagline={s(settings, "tagline", "Breath · Move · Flow")}
        description={s(
          settings,
          "heroDesc",
          "A stronger core. A little more ease. A whole new connection with your body."
        )}
        subTagline={s(settings, "subTagline", "Mindful movement. Meaningful strength.")}
      />
      <OurStory />
      <Features />
      <Programs />
      <BookingSection slots={slots} />
      <Pricing plans={plans} />
      <Faq instagramUrl={instagramUrl} />
      <Footer
        studioName={s(settings, "studioName", "Arcwave Pilates")}
        tagline={s(settings, "tagline", "Breath · Move · Flow")}
        subTagline={s(settings, "subTagline", "Mindful movement. Meaningful strength.")}
        location={s(settings, "location", "Thiruvanmiyur, Chennai")}
        instagramUrl={instagramUrl}
        instagramHandle={s(settings, "instagramHandle", "@arcwavepilates")}
      />
    </main>
  );
}
