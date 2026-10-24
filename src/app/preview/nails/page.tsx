"use client";

import StudioKloNailsView from "@/components/demo/StudioKloNailsView";
import StudioPinGate from "@/components/StudioPinGate";

export default function PreviewNailsPage() {
  return (
    <StudioPinGate title="Studio Klō Preview">
      <StudioKloNailsView />
    </StudioPinGate>
  );
}
