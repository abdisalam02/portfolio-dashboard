import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LEGAL } from "@/config/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How A.Gure collects, uses, and protects your personal data.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />

      <div className="pt-28 sm:pt-36 md:pt-40 pb-24 px-4 sm:px-8 max-w-3xl mx-auto">
        {/* Draft notice */}
        <div className="mb-8 p-4 border-2 border-amber-400 bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 text-xs font-mono">
          <strong>Utkast — gjennomgå før publisering.</strong> Dette er et foreløpig utkast og
          erstatter ikke juridisk rådgivning. Oppdater alle TODO-VERIFY-felt før nettsiden lanseres.
        </div>

        <div className="space-y-2 mb-10 pb-6 border-b border-card-border">
          <div className="text-[11px] font-mono text-muted uppercase tracking-wider">Juridisk</div>
          <h1 className="text-4xl sm:text-5xl font-black font-heading tracking-tight uppercase">
            Personvernerklæring
          </h1>
          <p className="text-sm text-muted font-mono">
            Sist oppdatert: {new Date().toLocaleDateString("nb-NO")}
          </p>
        </div>

        <div className="prose prose-sm max-w-none space-y-8 font-body text-foreground">
          <section className="space-y-3">
            <h2 className="text-lg font-bold font-heading uppercase">1. Behandlingsansvarlig</h2>
            <p className="text-sm text-muted leading-relaxed">
              {LEGAL.tradingName} ({LEGAL.legalName})<br />
              {LEGAL.address}<br />
              <a href={`mailto:${LEGAL.email}`} className="underline hover:text-foreground">
                {LEGAL.email}
              </a><br />
              Org.nr. {LEGAL.orgNumber} · {LEGAL.mvaStatus}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold font-heading uppercase">2. Hvilke opplysninger samles inn</h2>
            <p className="text-sm text-muted leading-relaxed">
              Når du bruker kontaktskjemaet på {LEGAL.domain} samler vi inn:
            </p>
            <ul className="text-sm text-muted list-disc list-inside space-y-1">
              <li>Navn</li>
              <li>E-postadresse</li>
              <li>Meldingsinnhold du skriver</li>
            </ul>
            <p className="text-sm text-muted leading-relaxed">
              Vi samler ikke inn informasjonskapsler (cookies) utover det som er nødvendig for å huske
              temavalg (lys/mørk modus), lagret lokalt i nettleseren din (<code>ag_theme</code>).
              Ingen sporings- eller analyseverktøy er aktivert.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold font-heading uppercase">3. Formål med behandlingen</h2>
            <p className="text-sm text-muted leading-relaxed">
              Opplysningene brukes utelukkende for å besvare henvendelser om web-tjenester og
              for å inngå avtale om oppdrag. De deles ikke med tredjeparter for markedsføringsformål.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold font-heading uppercase">4. Underdatabehandlere</h2>
            <p className="text-sm text-muted leading-relaxed">
              Kontaktskjemaet sender e-post via <strong>Resend</strong> (resend.com) og nettsiden er
              hostet på <strong>Vercel</strong> (vercel.com). Begge behandler data i henhold til GDPR.
              Ingen andre underdatabehandlere er i bruk.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold font-heading uppercase">5. Lagring og sletting</h2>
            <p className="text-sm text-muted leading-relaxed">
              E-poster fra kontaktskjemaet lagres i innboksen til {LEGAL.email} og slettes manuelt
              når henvendelsen er ferdig behandlet, senest innen 12 måneder.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold font-heading uppercase">6. Dine rettigheter</h2>
            <p className="text-sm text-muted leading-relaxed">
              Du har rett til innsyn, retting og sletting av personopplysninger vi har om deg.
              Send en e-post til{" "}
              <a href={`mailto:${LEGAL.email}`} className="underline hover:text-foreground">
                {LEGAL.email}
              </a>{" "}
              med emnelinjen «Personvern» for å bruke disse rettighetene.
              Du kan også klage til{" "}
              <a
                href="https://www.datatilsynet.no"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground"
              >
                Datatilsynet
              </a>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold font-heading uppercase">7. Kontakt</h2>
            <p className="text-sm text-muted leading-relaxed">
              Spørsmål om denne erklæringen rettes til{" "}
              <a href={`mailto:${LEGAL.email}`} className="underline hover:text-foreground">
                {LEGAL.email}
              </a>.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t border-card-border">
          <Link
            href="/"
            className="text-xs font-mono text-muted hover:text-foreground transition-colors"
          >
            ← Tilbake til forsiden
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
