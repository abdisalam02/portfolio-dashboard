import { Metadata } from "next";
import BookingDropTemplate from "@/components/demo/BookingDropTemplate";

export const metadata: Metadata = {
  title: "Noor Henna Atelier · 2,000 kr Booking Drop Demo | A.GURE",
  description:
    "Live demonstration of the 2,000 kr one-page booking site for organic bridal mendhi and fine-line jagua artists in Oslo. Visual lookbook, transparent rates, and instant chair reservations.",
  openGraph: {
    title: "Noor Henna Atelier · 2,000 kr Booking Drop Demo",
    description: "Live 1-page mobile booking drop built by A.Gure for independent henna artists.",
    url: "https://agure.space/demo/henna",
  },
};

export default function HennaDemoPage() {
  return <BookingDropTemplate key="henna" niche="henna" />;
}
