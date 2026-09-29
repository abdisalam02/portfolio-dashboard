// Single source of truth for all legal/identity details.
// All TODO-VERIFY fields must be filled in after sole proprietorship registration.
// Never hardcode these values per-page — always import from here.

export const LEGAL = {
  tradingName: "A.Gure",
  // TODO-VERIFY: Update once registration is complete
  legalName: "TODO-VERIFY: legal name after registration",
  address: "TODO-VERIFY: registered address after registration",
  email: "hello@agure.space",
  // TODO-VERIFY: Fill in after registration at Brønnøysundregistrene
  orgNumber: "TODO-VERIFY: org number",
  // Update to "VAT-registered" once annual sales exceed 50,000 kr
  mvaStatus: "Not VAT-registered",
  domain: "agure.space",
  canonicalUrl: "https://agure.space",
  instagram: "https://instagram.com",
} as const;
