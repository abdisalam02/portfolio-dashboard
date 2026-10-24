import { Metadata } from "next";
import StudioKloNailsView from "@/components/demo/StudioKloNailsView";
import StudioPinGate from "@/components/StudioPinGate";

export const metadata: Metadata = {
  title: "Studio Klō (Demo) | A.GURE",
  robots: { index: false, follow: false },
};

export default function NailsDemoPage() {
  return (
    <StudioPinGate title="Studio Klō Demo">
      <StudioKloNailsView />
    </StudioPinGate>
  );
}
