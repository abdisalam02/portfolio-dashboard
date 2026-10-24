import Link from "next/link";
import { LEGAL } from "@/config/legal";

// Renders the mandatory Norwegian e-commerce legal block.
export default function LegalFooter() {
  const showOrg = LEGAL.orgNumber && !LEGAL.orgNumber.includes("TODO-VERIFY");

  return (
    <div className="pt-6 text-[11px] font-mono text-muted flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <span>© 2026 {LEGAL.tradingName}</span>
        <span>/</span>
        <span>{LEGAL.address}</span>
        <span>/</span>
        <a href={`mailto:${LEGAL.email}`} className="hover:text-foreground transition-colors">
          {LEGAL.email}
        </a>
      </div>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {showOrg && (
          <>
            <span>Org.nr. {LEGAL.orgNumber}</span>
            <span>/</span>
          </>
        )}
        <span>{LEGAL.mvaStatus}</span>
        <span>/</span>
        <Link href="/privacy" className="hover:text-foreground transition-colors underline underline-offset-2">
          Personvernerklæring
        </Link>
      </div>
    </div>
  );
}
