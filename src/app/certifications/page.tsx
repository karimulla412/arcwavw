import { Certifications } from "@/components/site/certifications";
import { Footer } from "@/components/site/footer";
import { getSettings } from "@/lib/site";

export const dynamic = "force-dynamic";

function s(settings: Record<string, string>, key: string, fallback: string) {
  return settings[key] ?? fallback;
}

export default async function CertificationsPage() {
  const [settings] = await Promise.all([getSettings()]);
  const instagramUrl = s(
    settings,
    "instagramUrl",
    "https://www.instagram.com/arcwavepilates/"
  );

  return (
    <main className="flex min-h-screen flex-col bg-paper pt-24">
      <Certifications />
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
