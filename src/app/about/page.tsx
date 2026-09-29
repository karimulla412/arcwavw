import { AboutUsDetailed } from "@/components/site/about-us-detailed";
import { About as Founder } from "@/components/site/about";
import { Gallery } from "@/components/site/gallery";
import { Footer } from "@/components/site/footer";
import { getSettings, getGalleryImages } from "@/lib/site";

export const dynamic = "force-dynamic";

function s(settings: Record<string, string>, key: string, fallback: string) {
  return settings[key] ?? fallback;
}

export default async function AboutPage() {
  const [settings, galleryImages] = await Promise.all([
    getSettings(),
    getGalleryImages(),
  ]);
  const instagramUrl = s(
    settings,
    "instagramUrl",
    "https://www.instagram.com/arcwavepilates/"
  );

  return (
    <main className="flex min-h-screen flex-col bg-paper pt-24">
      <AboutUsDetailed />
      <Gallery images={galleryImages} />
      <Founder
        eyebrow={s(settings, "founderEyebrow", "The person behind your progress")}
        aboutDesc={s(
          settings,
          "aboutDesc",
          "Meet Niranjan, founder of Arcwave Pilates and an internationally certified Pilates expert. With 7+ years mastering classical and contemporary Pilates, his approach brings together precision, patience and purposeful movement — helping you understand your body as you build strength."
        )}
        founderName={s(settings, "founderName", "Niranjan")}
        founderTitle={s(settings, "founderTitle", "FOUNDER · ARCWAVE PILATES")}
        founderYears={s(settings, "founderYears", "7+ years")}
        founderYearsLabel={s(
          settings,
          "founderYearsLabel",
          "of Pilates practice & expertise"
        )}
        founderPurpose={s(settings, "founderPurpose", "One purpose")}
        founderPurposeLabel={s(settings, "founderPurposeLabel", "Helping you move better")}
      />
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
