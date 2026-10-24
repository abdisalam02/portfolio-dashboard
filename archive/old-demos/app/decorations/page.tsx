import { Metadata } from "next";
import BookingDropTemplate from "@/components/demo/BookingDropTemplate";

export const metadata: Metadata = {
  title: "Aura Decor & Balloons · 2,000 kr Booking Drop Demo | A.GURE",
  description:
    "Live demonstration of the 2,000 kr one-page booking site for balloon architecture and luxury event decor studios in Oslo. Organic arch vitrine, package menus, and date hold booking.",
  openGraph: {
    title: "Aura Decor & Balloons · 2,000 kr Booking Drop Demo",
    description: "Live 1-page mobile booking drop built by A.Gure for event and balloon studios.",
    url: "https://agure.space/demo/decorations",
  },
};

export default function DecorationsDemoPage() {
  return <BookingDropTemplate key="decorations" niche="decorations" />;
}
