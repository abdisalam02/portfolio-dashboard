import { NextResponse } from "next/server";

interface GenerateRequest {
  brandName: string;
  niche: string;
  angle: "pricing" | "dms" | "aesthetic" | "freelancer" | "custom";
  notes?: string;
}

const TEMPLATE_PRESETS = {
  pricing: {
    tag: "NO AGENCY MARKUP",
    headlineTemplate: (brand: string) => `Websites can be crazy expensive. A direct site for ${brand} doesn't have to be.`,
    descTemplate: (_brand: string, niche: string) =>
      `I recently started building clean mobile sites for small ${niche || "businesses"} in Oslo. Honest rates, direct work, and zero 40k agency markup.`,
    dmTemplate: (brand: string, niche: string) =>
      `Hey! I'm A.Gure, an independent junior dev in Oslo. I recently started making clean mobile sites for small ${niche || "spots"} because agencies charge crazy 40k+ kr fees. Check 2 client sites I'm working on at abdisalam.space (tooth gem studio & custom grillz maker). Loved your work with ${brand} — put together a quick 1-tap mobile booking preview for you guys (attached). Down to see a 15-sec demo? No pressure!`,
    smsTemplate: (brand: string) =>
      `Hey ${brand}! I'm A.Gure, local Oslo dev. Recently started building clean mobile sites for small spots (no 40k agency fees). Check 2 client sites: abdisalam.space`,
    emailSubject: (brand: string) => `Quick intro & website idea for ${brand}`,
    emailBodyTemplate: (brand: string, niche: string) =>
      `Hey ${brand} team,

I'm A.Gure, an independent junior dev in Oslo. I recently started building clean mobile sites for small businesses because big agencies charge crazy 40,000+ kr fees.

You can see 2 client sites I'm currently working on at abdisalam.space (an Oslo tooth gem studio and a custom grillz maker).

I saw your work in the ${niche || "local"} scene and noticed bookings still run through email/DMs. I put together a quick visual concept showing how a clean 1-tap mobile booking page could look (concept card attached below).

Open to seeing a quick 15-second demo? No pressure at all!

Best,
A.Gure
abdisalam.space`
  },
  dms: {
    tag: "DIRECT BOOKINGS",
    headlineTemplate: (brand: string) => `Still handling ${brand}'s bookings through messy DMs & emails?`,
    descTemplate: (brand: string, _niche: string) =>
      `I recently started building clean booking sites for independent spots in Oslo. Replace lost messages with a direct 1-tap menu so clients can book ${brand} in 30 seconds.`,
    dmTemplate: (brand: string, _niche: string) =>
      `Hey! I'm A.Gure, a local junior dev in Oslo. Started making clean mobile booking sites because agencies charge crazy 40k+ prices. Check 2 client sites I'm working on at abdisalam.space. Noticed ${brand}'s bookings run through messy DMs/emails, so I put together a quick 1-tap booking concept (attached). Down to see a 15-sec demo? No pressure!`,
    smsTemplate: (brand: string) =>
      `Hey ${brand}! I'm A.Gure, local Oslo dev. Built a 1-tap booking concept so you don't lose clients in DMs/emails. Check 2 client sites: abdisalam.space`,
    emailSubject: (brand: string) => `Idea to automate bookings for ${brand} (no agency markup)`,
    emailBodyTemplate: (brand: string, niche: string) =>
      `Hey ${brand} team,

I'm A.Gure, a local junior dev in Oslo. I recently started making simple mobile booking sites because agencies charge crazy 40,000+ kr prices.

You can check out 2 client sites I'm currently designing right now at abdisalam.space (an Oslo tooth gem studio and a custom grillz maker).

I noticed ${brand}'s bookings still run through email and DMs. A lot of ${niche || "local"} spots lose clients from back-and-forth messages, so I put together a quick visual concept showing how a 1-tap booking page could work (card attached below).

Would love to send over a 15-second preview if you're curious. No pressure either way!

Best,
A.Gure
abdisalam.space`
  },
  aesthetic: {
    tag: "MOBILE FIRST",
    headlineTemplate: (brand: string) => `Your work looks great on Instagram. Does ${brand}'s website match it?`,
    descTemplate: (brand: string, _niche: string) =>
      `I recently started building clean mobile sites for local spots in Oslo. Custom design that matches your aesthetic with zero agency markup.`,
    dmTemplate: (brand: string) =>
      `Hey! I'm A.Gure, a junior web dev in Oslo. Agencies charge 40k+ kr for sites, so I build clean mobile pages for local spots directly at honest rates. Check 2 client sites I'm working on at abdisalam.space. Your aesthetic with ${brand} is unreal — put together a quick mobile concept matching your vibe (attached). Down to see a 15-sec preview? No pressure!`,
    smsTemplate: (brand: string) =>
      `Hey ${brand}! I'm A.Gure, local Oslo dev. Put together a mobile site concept matching your Instagram aesthetic. See 2 client sites: abdisalam.space`,
    emailSubject: (brand: string) => `Mobile web makeover idea for ${brand}`,
    emailBodyTemplate: (brand: string, _niche: string) =>
      `Hey ${brand} team,

I'm A.Gure, a junior web designer in Oslo. Big agencies charge 40,000+ kr for websites, so I build clean mobile sites for local spots directly at honest rates.

You can see 2 client sites I'm currently working on right now at abdisalam.space (an Oslo tooth gem studio and a custom grillz shop).

Your aesthetic on Instagram is top tier, so I put together a quick visual concept for ${brand} that matches your exact visual vibe (attached below).

Down to check out a 15-second demo? No pressure at all!

Best,
A.Gure
abdisalam.space`
  },
  freelancer: {
    tag: "1-ON-1 FREELANCER",
    headlineTemplate: (brand: string) => `I build & redesign clean websites for spots like ${brand}.`,
    descTemplate: (_brand: string, niche: string) =>
      `I recently started building clean websites for small businesses in Oslo. Direct 1-on-1 collaboration, fair rates, and zero corporate fluff.`,
    dmTemplate: (brand: string) =>
      `Hey! I'm A.Gure, an independent junior dev in Oslo. I build clean mobile sites for small spots (no 40k agency fees). Check 2 client sites I'm working on at abdisalam.space. Loved what you're doing with ${brand} and put together a quick mobile preview (attached). Want to check it out? No pressure at all!`,
    smsTemplate: (brand: string) =>
      `Hey ${brand}! I'm A.Gure, local Oslo dev. Recently started building clean websites for small spots (no agency fees). Check 2 client sites: abdisalam.space`,
    emailSubject: (brand: string) => `Quick intro & website idea for ${brand}`,
    emailBodyTemplate: (brand: string, _niche: string) =>
      `Hey ${brand} team,

I'm A.Gure, an independent junior dev in Oslo. I build clean mobile websites directly 1-on-1 for small local spots (zero 40,000+ kr agency fees or corporate fluff).

You can see 2 client websites I'm currently working on at abdisalam.space (a tooth gem studio and a custom grillz maker).

I love what you're doing with ${brand} and put together a quick visual concept for you (attached below).

Let me know if you'd be open to seeing a 15-second preview. No pressure!

Best,
A.Gure
abdisalam.space`
  },
  custom: {
    tag: "CUSTOM CONCEPT",
    headlineTemplate: (brand: string) => `A clean mobile website custom-crafted for ${brand}.`,
    descTemplate: (brand: string, niche: string) =>
      `I recently started building clean websites for small spots in Oslo. Tailored specifically for ${brand} with fair rates and zero agency markup.`,
    dmTemplate: (brand: string) =>
      `Hey! I'm A.Gure, a local junior dev in Oslo. Started building clean sites for small businesses (no 40k agency fees). Check 2 client sites I'm working on at abdisalam.space. Put together a quick concept for ${brand} — want to check it out? No pressure!`,
    smsTemplate: (brand: string) =>
      `Hey ${brand}! I'm A.Gure, local Oslo dev. Check out 2 client sites: abdisalam.space`,
    emailSubject: (brand: string) => `Custom website concept for ${brand}`,
    emailBodyTemplate: (brand: string, _niche: string) =>
      `Hey ${brand} team,

I'm A.Gure, an independent junior dev in Oslo. I make clean mobile sites for small businesses without the 40,000+ kr agency markup.

You can check out 2 client sites I'm currently working on at abdisalam.space.

I put together a quick mobile concept for ${brand} (attached below). Let me know if you'd like to see a 15-second demo!

Best,
A.Gure
abdisalam.space`
  }
};

export async function POST(req: Request) {
  try {
    const body: GenerateRequest = await req.json();
    const { brandName, niche, angle = "pricing", notes = "" } = body;

    const brand = brandName?.trim() || "Your Brand";
    const cleanNiche = niche?.trim() || "studio";
    const apiKey = process.env.GEMINI_API_KEY?.trim();

    // Default preset fallback prepared upfront (lean and punchy)
    const preset = TEMPLATE_PRESETS[angle] || TEMPLATE_PRESETS.pricing;
    const fallbackData = {
      cardHeadline: preset.headlineTemplate(brand),
      cardDesc: preset.descTemplate(brand, cleanNiche),
      cardTag: preset.tag,
      dmMessage: preset.dmTemplate(brand, cleanNiche),
      smsMessage: preset.smsTemplate(brand),
      emailSubject: preset.emailSubject(brand),
      emailBody: preset.emailBodyTemplate(brand, cleanNiche)
    };

    // If Gemini API Key is present, attempt live AI generation with strict brevity and honesty constraints
    if (apiKey) {
      const candidateModels = [
        "gemini-3.5-flash-lite",
        "gemini-3-flash-preview",
        "gemini-3.6-flash"
      ];

      const prompt = `You are A.Gure, an independent junior freelance web developer and designer based in Oslo, Norway (portfolio: abdisalam.space).
You write ultra-short, punchy, radically honest outreach pitches to local small businesses (e.g. makeup artists, tattoo artists, studios).

CRITICAL LENGTH RULE:
- KEEP IT SHORT. Nobody reads long cold emails.
- Email Body: MUST BE UNDER 85 WORDS TOTAL. Exactly 4 short paragraphs:
  1. Intro as junior dev in Oslo + 40,000+ kr agency fee contrast (1 sentence).
  2. Mention 2 client sites live at abdisalam.space (Oslo tooth gem studio & custom grillz maker) (1 sentence).
  3. Mention ${brand}, their booking headache (${notes || "email/DMs"}), and that you attached a visual concept card (1-2 sentences).
  4. Casual 15-second demo question with "No pressure at all!" (1 sentence).
- DM Message: Under 45 words max.
- SMS Message: Under 140 characters.

STRICT CONSTRAINTS:
- NEVER write long paragraphs or corporate essays.
- NEVER use fake flattery ("stumbled across", "following your page", "hope you're having a good week").
- NEVER use buzzwords ("digital atelier", "bespoke solutions", "streamlined synergy", "cutting-edge").
- Sound humble, skilled, hungry, polite, and direct.

PROSPECT:
- Brand Name: "${brand}"
- Niche: "${cleanNiche}"
- Angle: "${angle}"
- Context: "${notes}"

Return ONLY a valid JSON object with these exact keys:
{
  "cardHeadline": "...",
  "cardDesc": "...",
  "cardTag": "...",
  "dmMessage": "...",
  "smsMessage": "...",
  "emailSubject": "...",
  "emailBody": "..."
}`;

      for (const model of candidateModels) {
        try {
          const res = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: {
                  responseMimeType: "application/json",
                  temperature: 0.3
                }
              })
            }
          );

          if (res.ok) {
            const data = await res.json();
            const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (rawText) {
              const parsed = JSON.parse(rawText);

              // Quality gate: ensure AI was short, included honesty anchors, and avoided corporate fluff
              const dm = parsed.dmMessage || "";
              const email = parsed.emailBody || "";
              const wordCount = email.split(/\s+/).length;
              const hasFluff = /stumbled across|following your page|having a good week|finds you well|digital atelier|bespoke/i.test(dm + email);
              const hasProof = /abdisalam\.space/i.test(dm + email);

              // Accept only if under 120 words, has proof, and has no corporate fluff
              if (!hasFluff && hasProof && wordCount <= 120) {
                return NextResponse.json({
                  success: true,
                  source: "gemini",
                  model,
                  data: parsed
                });
              } else {
                console.warn(`Gemini output failed quality/brevity gate (words=${wordCount}, fluff=${hasFluff}, proof=${hasProof}). Falling back to preset.`);
              }
            }
          }
        } catch (modelErr) {
          console.warn(`Error trying model ${model}:`, modelErr);
        }
      }
    }

    // Smart Local Fallback (Guaranteed punchy & compliant)
    return NextResponse.json({
      success: true,
      source: "preset",
      data: fallbackData
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
