import { Metadata } from "next";
import BookingDropTemplate from "@/components/demo/BookingDropTemplate";

export const metadata: Metadata = {
  title: "Studio Klō (Nails) · 2,000 kr Booking Drop Demo | A.GURE",
  description:
    "Live demonstration of the 2,000 kr one-page booking site for nail technicians and private beauty studios in Oslo. Transparent price list, 6-photo lookbook, and 1-tap booking.",
  openGraph: {
    title: "Studio Klō Nails · 2,000 kr Booking Drop Demo",
    description: "Live 1-page mobile booking drop built by A.Gure for solo nail artists.",
    url: "https://agure.space/demo/nails",
  },
};

export default function NailsDemoPage() {
  return <BookingDropTemplate niche="nails" />;
}
