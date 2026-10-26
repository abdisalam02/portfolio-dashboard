import Header from "@/components/Header";
import ClientWork from "@/components/ClientWork";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Work",
  description: "Selected websites and interactive digital work by A.Gure in Oslo.",
};

export default function WorkPage() {
  return (
    <main className="min-h-svh relative bg-background text-foreground selection:bg-foreground selection:text-background pt-16">
      <Header />
      <ClientWork headingTitle="WORK" showSadija={true} isWorkPage={true} />
      <Footer />
    </main>
  );
}
