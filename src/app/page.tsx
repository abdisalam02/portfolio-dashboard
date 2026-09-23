import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ClientWork from "@/components/ClientWork";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <ClientWork />
      <ContactSection />
      <Footer />
    </main>
  );
}

