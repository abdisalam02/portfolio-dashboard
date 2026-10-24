import { Metadata } from "next";
import LuffyCakesView from "@/components/demo/LuffyCakesView";
import StudioPinGate from "@/components/StudioPinGate";

export const metadata: Metadata = {
  title: "Luffy Cakes (Demo) | A.GURE",
  robots: { index: false, follow: false },
};

export default function CakesDemoPage() {
  return (
    <StudioPinGate title="Luffy Cakes Demo">
      <LuffyCakesView />
    </StudioPinGate>
  );
}
