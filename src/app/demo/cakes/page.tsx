import { Metadata } from "next";
import LuffyCakesView from "@/components/demo/LuffyCakesView";

export const metadata: Metadata = {
  title: "Luffy Cakes Oslo · Artisanal Cake Pre-orders | A.GURE Demo",
  description:
    "Live demonstration of the 2,000 kr mobile booking drop for artisanal bakeries and cake creators in Oslo. Custom cake configurator and pickup reservation.",
  openGraph: {
    title: "Luffy Cakes · 2,000 kr Booking Drop Demo",
    description: "Live 1-page mobile booking drop built by A.Gure for solo bakeries.",
    url: "https://agure.space/demo/cakes",
  },
};

export default function CakesDemoPage() {
  return <LuffyCakesView />;
}
