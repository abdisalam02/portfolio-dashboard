import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FiArrowUpRight } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Live 2,000 kr Booking Drop Demos · Studio Klō & Luffy Cakes | A.GURE",
  description:
    "Explore 2 live interactive demonstrations of the 2,000 kr mobile booking drop: Studio Klō (salon & beauty) and Luffy Cakes (custom patisserie & bakery) in Oslo.",
  openGraph: {
    title: "2,000 kr Booking Drop Demos · A.GURE",
    description: "Interactive mobile booking sites for solo studios and creators.",
    url: "https://agure.space/demo",
  },
};

const DEMOS = [
  {
    id: "nails",
    number: "01",
    niche: "Nail Atelier & Beauty Studio",
    title: "Studio Klō",
    tagline: "Lookbook, treatment menu & 1-tap chair reservation",
    href: "/demo/nails",
    color: "#D98880",
    badge: "Personal Services",
  },
  {
    id: "cakes",
    number: "02",
    niche: "Artisanal Cake Studio",
    title: "Luffy Cakes",
    tagline: "Step-by-step custom cake configurator & pickup schedule",
    href: "/demo/cakes",
    color: "#FFA8C5",
    badge: "Custom Products",
  },
];

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <Header />

      <div className="pt-28 sm:pt-36 md:pt-40 pb-20 px-4 sm:px-8 max-w-5xl mx-auto w-full">
        <div className="space-y-3 mb-12 border-b border-card-border pb-8">
          <div className="flex items-center gap-3 text-xs font-mono text-muted uppercase">
            <span>Live Demonstrations</span>
            <span className="w-1 h-1 rounded-full bg-card-border" />
            <span>2,000 kr Booking Drop</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-heading tracking-tight uppercase">
            Live Demos
          </h1>
          <p className="text-base text-muted font-body max-w-xl leading-relaxed">
            Real interactive mobile sites built for Oslo solo creators. Tap either demo to test the full client booking experience on your phone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {DEMOS.map((demo) => (
            <Link
              key={demo.id}
              href={demo.href}
              className="group p-6 sm:p-8 rounded-2xl bg-card border border-card-border hover:border-foreground transition-all flex flex-col justify-between space-y-6 shadow-sm"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-muted font-bold">
                    § {demo.number}
                  </span>
                  <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-background border border-card-border text-foreground font-bold">
                    {demo.badge}
                  </span>
                </div>

                <div className="space-y-1">
                  <h2 className="text-2xl sm:text-3xl font-black font-heading uppercase text-foreground group-hover:underline">
                    {demo.title}
                  </h2>
                  <div className="text-xs font-mono text-muted">
                    {demo.niche}
                  </div>
                </div>

                <p className="text-sm text-muted font-body leading-relaxed">
                  {demo.tagline}
                </p>
              </div>

              <div className="pt-4 border-t border-card-border flex items-center justify-between text-xs font-mono font-bold text-foreground">
                <span>OPEN INTERACTIVE DEMO</span>
                <FiArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
