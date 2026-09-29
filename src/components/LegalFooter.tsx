import Link from "next/link";
import { LEGAL } from "@/config/legal";

// Renders the mandatory Norwegian e-commerce legal block.
// Norwegian law requires business name, address, email, org number, and VAT status on every page.
export default function LegalFooter() {
  return (
    <div className="border-t border-card-border pt-6 mt-6 text-[11px] font-mono text-muted space-y-1">
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        <span>{LEGAL.tradingName}</span>
        <span>·</span>
        <span>{LEGAL.address}</span>
        <span>·</span>
        <a href={`mailto:${LEGAL.email}`} className="hover:text-foreground transition-colors">
          {LEGAL.email}
        </a>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        <span>Org.nr. {LEGAL.orgNumber}</span>
        <span>·</span>
        <span>{LEGAL.mvaStatus}</span>
        <span>·</span>
        <Link href="/privacy" className="hover:text-foreground transition-colors underline underline-offset-2">
          Personvernerklæring
        </Link>
      </div>
    </div>
  );
}
