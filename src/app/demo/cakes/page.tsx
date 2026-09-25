import { Metadata } from "next";
import BookingDropTemplate from "@/components/demo/BookingDropTemplate";

export const metadata: Metadata = {
  title: "Maison Sucre (Bakery) · 2,000 kr Booking Drop Demo | A.GURE",
  description:
    "Live demonstration of the 2,000 kr one-page booking site for artisanal bakeries and cake creators in Oslo. Pre-order schedule, flavor lookbook, and pickup request form.",
  openGraph: {
    title: "Maison Sucre Cakes · 2,000 kr Booking Drop Demo",
    description: "Live 1-page mobile booking drop built by A.Gure for solo bakeries.",
    url: "https://agure.space/demo/cakes",
  },
};

export default function CakesDemoPage() {
  return <BookingDropTemplate niche="cakes" />;
}
