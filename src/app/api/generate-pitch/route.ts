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
      `Hey! I'll be straight with you — I'm A.Gure, an independent junior web dev here in Oslo. I recently started making clean mobile websites for small ${niche || "businesses"} because agencies charge crazy 40,000+ kr prices. You can check out 2 client sites I'm currently working on right now at abdisalam.space (one is for an Oslo tooth gem studio, and the other is an interactive grillz maker). Loved your work with ${brand} and put together a quick preview of how a direct 1-tap mobile booking site could look for you without the agency markup. Down to see a 15-second preview? No pressure at all!`,
    smsTemplate: (brand: string) =>
      `Hey ${brand}! I'm A.Gure, local Oslo dev. Recently started building clean mobile sites for small spots (no 40k agency fees). Check 2 client sites I'm working on: abdisalam.space`,
    emailSubject: (brand: string) => `Quick intro & website idea for ${brand}`,
    emailBodyTemplate: (brand: string, niche: string) =>
      `Hey ${brand} team,

I'll be straight up with you: I'm A.Gure, an independent junior web designer here in Oslo. I recently started designing and building clean, mobile-first websites specifically for small local businesses and independent creators.

Websites from big design agencies can be crazy expensive — they easily quote 40,000+ kr and weeks of meetings for basic templates that small businesses don't need. Because I just started out and I'm actively building up my portfolio and client roster, I do fast, custom work directly with you at honest, fair rates with zero agency markup.

You can see 2 client websites I'm currently working on right now on my portfolio: https://abdisalam.space (one is an automated mobile booking site for an Oslo tooth gem studio, and the other is an interactive showcase for a custom grillz maker).

I love what you're doing with ${brand} in the ${niche || "local"} scene, but noticed your bookings still run through email / DMs. I put together a quick visual concept showing how a clean 1-tap mobile booking page for ${brand} could look so clients stop asking back-and-forth questions and book directly in 30 seconds.

No pressure at all! Let me know if you'd be open to checking out a quick 15-second demo.

Best,
Abdisalam Gure (A.Gure)
Web Developer & Designer
https://abdisalam.space
niwache12@gmail.com`
  },
  dms: {
    tag: "DIRECT BOOKINGS",
    headlineTemplate: (brand: string) => `Still handling ${brand}'s bookings through messy DMs & emails?`,
    descTemplate: (brand: string, _niche: string) =>
      `I recently started building clean booking sites for independent spots in Oslo. Replace lost messages with a direct 1-tap menu so clients can book ${brand} in 30 seconds.`,
    dmTemplate: (brand: string, niche: string) =>
      `Hey! I'll be straight with you — I'm A.Gure, an independent junior web dev in Oslo. I recently started building clean mobile sites for small ${niche || "spots"} because big agencies charge 40,000+ kr for basic stuff. You can see 2 client sites I'm currently working on at abdisalam.space (one for a tooth gem studio, one for a custom grillz shop). Loved your page with ${brand} — noticed bookings still run through messy DMs and emails, so I put together a quick preview of how a direct 1-tap booking page could save you hours of back-and-forth. Open to checking it out? No pressure!`,
    smsTemplate: (brand: string) =>
      `Hey ${brand}! I'm A.Gure, local Oslo dev. Built a 1-tap booking concept so you don't lose clients in DMs/emails. Check 2 client sites I'm working on: abdisalam.space`,
    emailSubject: (brand: string) => `Idea to automate bookings for ${brand} (no agency markup)`,
    emailBodyTemplate: (brand: string, niche: string) =>
      `Hey ${brand} team,

I'll be straight up with you: I'm A.Gure, an independent junior web designer based here in Oslo. I recently started building clean, mobile-first websites specifically for local businesses and creators.

I noticed you're currently handling a lot of inquiries and bookings through DMs or email. A lot of ${niche || "independent"} businesses lose clients simply because people hate asking "price?" and waiting hours for a reply.

Big agencies charge 40,000+ kr to set up a basic website. Because I just started doing this independently and am building my portfolio, I build clean, fast booking pages at fair, honest rates with zero agency nonsense. You can see 2 client websites I'm currently designing right on my site: https://abdisalam.space (one for an Oslo tooth gem studio, and one for a custom grillz maker).

I put together a quick visual concept card showing how a 1-tap booking menu for ${brand} could work.

Would love to send over a 15-second preview if you're curious. No pressure at all!

Best,
Abdisalam Gure (A.Gure)
https://abdisalam.space
niwache12@gmail.com`
  },
  aesthetic: {
    tag: "MOBILE FIRST",
    headlineTemplate: (brand: string) => `Your work looks great on Instagram. Does ${brand}'s website match it?`,
    descTemplate: (brand: string, _niche: string) =>
      `I recently started building clean mobile sites for local spots in Oslo. Custom design that matches your aesthetic with zero agency markup.`,
    dmTemplate: (brand: string) =>
      `Hey! I'll be straight with you — I'm A.Gure, a local junior web dev in Oslo. I recently started making clean mobile sites for independent spots because agencies charge crazy 40,000+ kr fees. Check out 2 client sites I'm working on right now at abdisalam.space. Your visual aesthetic with ${brand} is incredible — put together a quick concept of what a modern mobile site matching your exact vibe could look like. Down to check out a 15-second demo? No pressure!`,
    smsTemplate: (brand: string) =>
      `Hey ${brand}! I'm A.Gure, local Oslo dev. Put together a mobile site concept matching your Instagram aesthetic. See 2 client sites I'm working on: abdisalam.space`,
    emailSubject: (brand: string) => `Mobile web makeover idea for ${brand}`,
    emailBodyTemplate: (brand: string, niche: string) =>
      `Hey ${brand} team,

I'll be straight up with you: I'm A.Gure, an independent junior web designer here in Oslo. I recently started designing and building clean mobile websites specifically for independent businesses and creators.

Your visual aesthetic on Instagram is top tier — you clearly care about presentation. But when clients tap a link or ask for info, having a slow template or messy email thread hurts that impression. Big agencies charge 40,000+ kr for custom sites. Because I'm building up my portfolio, I work directly with you at honest, fair rates with zero agency markup.

You can check out 2 websites I'm currently designing for clients right now on my site: https://abdisalam.space (one is for an Oslo tooth gem studio, and the other is an interactive grillz shop).

I put together a visual concept card for ${brand} that matches your exact visual aesthetic.

Let me know if you'd be down to see a 15-second demo! No pressure at all.

Best,
Abdisalam Gure (A.Gure)
https://abdisalam.space`
  },
  freelancer: {
    tag: "1-ON-1 FREELANCER",
    headlineTemplate: (brand: string) => `I build & redesign clean websites for spots like ${brand}.`,
    descTemplate: (_brand: string, niche: string) =>
      `I recently started building clean websites for small businesses in Oslo. Direct 1-on-1 collaboration, fair rates, and zero corporate fluff.`,
    dmTemplate: (brand: string) =>
      `Hey! I'll be straight with you — I'm A.Gure, an independent junior web developer in Oslo. I recently started building clean mobile websites for small businesses because agencies charge crazy 40k+ prices. You can see 2 client sites I'm working on right now at abdisalam.space. Loved what you're doing with ${brand} and put together a quick preview of how a custom mobile site could look. Want to check it out? No pressure at all!`,
    smsTemplate: (brand: string) =>
      `Hey ${brand}! I'm A.Gure, local Oslo dev. Recently started building clean websites for small spots (no agency fees). Check 2 client sites I'm working on: abdisalam.space`,
    emailSubject: (brand: string) => `Quick intro & website idea for ${brand}`,
    emailBodyTemplate: (brand: string, niche: string) =>
      `Hey ${brand} team,

I'll be straight with you: I'm A.Gure, an independent junior web designer based in Oslo. I recently started designing and building clean, mobile-first websites specifically for small local businesses and creators.

Websites from big agencies can be crazy expensive — they charge 40,000+ kr and take months for basic templates. Because I'm building up my client roster, I do fast, custom work directly with you at honest, fair rates with zero agency markup or monthly retainers.

You can see 2 websites I'm currently working on for clients right now on my portfolio: https://abdisalam.space (one is an automated mobile booking site for an Oslo tooth gem studio, and the other is an interactive 3D showcase for a custom grillz maker).

I love what you're doing with ${brand} in the ${niche || "local"} scene, and put together a quick visual concept showing how a direct mobile site could streamline your business.

No pressure at all! Let me know if you'd be open to checking out a quick 15-second demo.

Best,
Abdisalam Gure (A.Gure)
https://abdisalam.space`
  },
  custom: {
    tag: "CUSTOM CONCEPT",
    headlineTemplate: (brand: string) => `A clean mobile website custom-crafted for ${brand}.`,
    descTemplate: (brand: string, niche: string) =>
      `I recently started building clean websites for small spots in Oslo. Tailored specifically for ${brand} with fair rates and zero agency markup.`,
    dmTemplate: (brand: string) =>
      `Hey! I'll be straight with you: I'm A.Gure, a local junior web dev in Oslo. Recently started building clean sites for small businesses (no 40k agency fees). Check 2 client sites I'm working on at abdisalam.space. Put together a quick concept for ${brand} — want to check it out? No pressure!`,
    smsTemplate: (brand: string) =>
      `Hey ${brand}! I'm A.Gure, local Oslo dev. Check out 2 client sites I'm working on at abdisalam.space`,
    emailSubject: (brand: string) => `Custom website concept for ${brand}`,
    emailBodyTemplate: (brand: string, _niche: string) =>
      `Hey ${brand} team,

I'll be straight with you: I'm A.Gure, an independent junior web designer in Oslo. I recently started making clean mobile sites for small businesses because big agencies charge 40,000+ kr.

You can check out 2 client sites I'm currently working on at https://abdisalam.space (one for a tooth gem studio, one for a custom grillz maker).

I put together a quick mobile concept for ${brand}. Let me know if you'd like to see a 15-second demo!

Best,
Abdisalam Gure`
  }
};

export async function POST(req: Request) {
  try {
    const body: GenerateRequest = await req.json();
    const { brandName, niche, angle = "pricing", notes = "" } = body;

    const brand = brandName?.trim() || "Your Brand";
    const cleanNiche = niche?.trim() || "studio";
    const apiKey = process.env.GEMINI_API_KEY?.trim();

    // Default preset fallback prepared upfront
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

    // If Gemini API Key is present, attempt live AI generation with strict human-honesty constraints
    if (apiKey) {
      const candidateModels = [
        "gemini-3.5-flash-lite",
        "gemini-3-flash-preview",
        "gemini-3.6-flash"
      ];

      const prompt = `You are A.Gure, an independent junior freelance web developer and designer based in Oslo, Norway (portfolio: abdisalam.space).
You write radically honest, authentic, and human outreach pitches to local small businesses (e.g. makeup artists, tattoo artists, independent studios).

ABSOLUTE MANDATORY NARRATIVE (YOU MUST FOLLOW THIS STORY):
1. RADICAL HONESTY: Start by stating honestly that you are A.Gure, an independent junior developer in Oslo who RECENTLY STARTED making websites specifically for small local businesses.
2. THE PRICING TRUTH: Call out the elephant in the room: websites from big agencies are crazy expensive (they easily quote 40,000+ kr and weeks of meetings for basic templates that small businesses don't need).
3. VALUE PROPOSITION: Because you just started and are building up your portfolio and client roster, you build fast, clean, custom mobile sites directly 1-on-1 at fair, honest rates with zero agency markup.
4. PROOF OF WORK: Explicitly mention that you are currently working on 2 client websites right now in Oslo that they can see live on your site (abdisalam.space) — one is an automated mobile booking site for an Oslo tooth gem studio (By Gangina), and the other is an interactive showcase for a custom grillz maker (Monochrome).
5. THE CLIENT'S HEADACHE: Address ${brand} and how their current booking/contact method (${notes || "email or Instagram DMs"}) causes lost clients and tedious back-and-forth messages, and how a clean 1-tap mobile booking page simplifies it.
6. CASUAL CLOSE: "No pressure at all! Let me know if you'd be open to seeing a quick 15-second demo."

STRICT RULES:
- NEVER say "I stumbled across your page", "I've been following your work for a bit", "Hope you're having a good week", "Hope this email finds you well".
- NEVER use corporate or agency jargon: "digital atelier", "bespoke solutions", "streamlined synergy", "cutting-edge", "unparalleled", "elevate".
- Sound humble, skilled, hungry, polite, and 100% human.
- Card Headline: Under 10 words, punchy and honest.
- Card Description: Exactly 2 short sentences highlighting honest rates and zero agency markup.
- Card Tag: 2-3 words uppercase category (e.g. "NO AGENCY MARKUP", "DIRECT BOOKINGS").
- DM Message: 3-4 sentences max, casual and direct for Instagram/WhatsApp, mentioning you just started, the 40k agency contrast, the 2 client sites on abdisalam.space, and the 15-sec demo question.
- SMS Message: Under 160 characters.
- Email Subject: Short, natural subject line.
- Email Body: 3-4 short paragraphs strictly following the narrative above.

PROSPECT DETAILS:
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

              // Quality gate: ensure AI included honesty anchors and avoided corporate fluff
              const dm = parsed.dmMessage || "";
              const email = parsed.emailBody || "";
              const hasFluff = /stumbled across|following your page|having a good week|finds you well|digital atelier|bespoke/i.test(dm + email);
              const hasProof = /abdisalam\.space/i.test(dm + email);

              if (!hasFluff && hasProof) {
                return NextResponse.json({
                  success: true,
                  source: "gemini",
                  model,
                  data: parsed
                });
              } else {
                console.warn(`Gemini output failed quality gate (fluff=${hasFluff}, proof=${hasProof}). Falling back to preset.`);
              }
            }
          }
        } catch (modelErr) {
          console.warn(`Error trying model ${model}:`, modelErr);
        }
      }
    }

    // Smart Local Fallback (Always 100% compliant with the honest, human story)
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
