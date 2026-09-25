import { Metadata } from "next";
import BookingDropTemplate from "@/components/demo/BookingDropTemplate";

export const metadata: Metadata = {
  title: "Astrid Bridal (Wedding Florals) · 2,000 kr Booking Drop Demo | A.GURE",
  description:
    "Live demonstration of the 2,000 kr one-page booking site for wedding florists, planners, and ceremony services in Oslo. Transparent packages, bridal lookbook, and date inquiry form.",
  openGraph: {
    title: "Astrid Bridal Florals · 2,000 kr Booking Drop Demo",
    description: "Live 1-page mobile booking drop built by A.Gure for wedding and event services.",
    url: "https://agure.space/demo/wedding",
  },
};

export default function WeddingDemoPage() {
  return <BookingDropTemplate niche="wedding" />;
}
