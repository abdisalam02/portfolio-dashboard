import { Metadata } from "next";
import BookingDropTemplate from "@/components/demo/BookingDropTemplate";

export const metadata: Metadata = {
  title: "Live 2,000 kr Booking Drop Demos · Bakery, Nails & Weddings | A.GURE",
  description:
    "Explore 3 live demonstrations of the 2,000 kr mobile booking site for solo Instagram creators, nail techs, and wedding businesses in Oslo. Built in 48 hours with 0 monthly fees.",
  openGraph: {
    title: "2,000 kr Booking Drop Demos · A.GURE",
    description: "See how the 2,000 kr one-page site adapts to bakeries, nail studios, and wedding services.",
    url: "https://agure.space/demo",
  },
};

export default function DemoPage() {
  return <BookingDropTemplate niche="cakes" />;
}
