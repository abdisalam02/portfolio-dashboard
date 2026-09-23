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
      `Agencies charge 40,000+ kr for basic templates and weeks of meetings. I build fast, custom mobile sites for independent ${niche || "spots"} — fair rates, zero agency markup.`,
    dmTemplate: (brand: string, niche: string) =>
      `Hey ${brand}! Big fan of your work in the ${niche || "local"} scene. Put together a quick visual preview of what an independent mobile site could look like for you guys — no crazy agency markup or monthly retainer fees. Let me know if you'd like me to send over the link!`,
    smsTemplate: (brand: string) =>
      `Hey ${brand}! Abdisalam here, independent web dev in Oslo. Put together a clean mobile site concept for ${brand} without agency markups: abdisalam.space`,
    emailSubject: (brand: string) => `Quick idea for ${brand}'s mobile site (no agency markup)`,
    emailBodyTemplate: (brand: string, niche: string) =>
      `Hey ${brand} team,

I've been following your work in the ${niche || "local"} scene for a while now — really love what you guys are putting out.

Most agencies charge 40,000+ NOK and lock you into monthly retainers for basic websites. I'm an independent junior developer in Oslo building fast, custom mobile sites for local spots with fair, flat rates and zero hidden fees.

I put together a clean concept card of how a modern mobile site for ${brand} could look (attached below).

You can see my recent client work here: https://abdisalam.space

If this sounds interesting, I'd love to chat or show you a quick 15-second demo. No pressure at all!

Best,
Abdisalam Gure (A.Gure)
Web Developer & Designer
https://abdisalam.space
niwache12@gmail.com`
  },
  dms: {
    tag: "DIRECT BOOKINGS",
    headlineTemplate: (brand: string) => `Still booking ${brand}'s clients through Instagram DMs?`,
    descTemplate: (brand: string, _niche: string) =>
      `Lost messages, endless back-and-forth, and answering "how much is this?". I build simple mobile sites with direct booking calendars and clear menus so clients can book ${brand} in 30 seconds.`,
    dmTemplate: (brand: string) =>
      `Hey ${brand}! Love your page. Noticed bookings still run through DMs — put together a quick preview of how a direct 1-tap mobile booking menu for ${brand} could look to save you from answering "price?" all day. Want to check it out?`,
    smsTemplate: (brand: string) =>
      `Hey ${brand}! Quick concept for a 1-tap mobile booking site for ${brand} so you don't lose clients in DMs: abdisalam.space`,
    emailSubject: (brand: string) => `Idea to automate bookings for ${brand} (replace messy DMs)`,
    emailBodyTemplate: (brand: string, niche: string) =>
      `Hey ${brand} team,

I love the work you're doing with ${brand}. 

I noticed you're currently handling a lot of inquiries and bookings through Instagram DMs. A lot of ${niche || "independent"} studios lose clients because people hate asking "price?" and waiting hours for a reply.

I build simple, mobile-first websites with direct booking calendars and clear service menus so your clients can view your work and book an appointment in 30 seconds straight from their phone.

Attached is a quick visual concept I designed for ${brand}. You can see my live work at: https://abdisalam.space

Would love to send over a 15-second interactive screen recording if you're interested!

Best,
Abdisalam Gure
https://abdisalam.space
niwache12@gmail.com`
  },
  aesthetic: {
    tag: "MOBILE FIRST",
    headlineTemplate: (brand: string) => `Your Instagram looks great. Does ${brand}'s website match it?`,
    descTemplate: (brand: string, _niche: string) =>
      `Most people find ${brand} on Instagram through their phone. If your website is slow or hard to navigate on mobile, you lose them. I build clean mobile sites that convert visitors into clients.`,
    dmTemplate: (brand: string) =>
      `Hey ${brand}! Your feed aesthetic is top tier. Put together a visual card of what a modern, mobile-first website matching ${brand}'s exact vibe could look like. Let me know if you want to see the preview!`,
    smsTemplate: (brand: string) =>
      `Hey ${brand}! Put together a mobile site preview matching your Instagram aesthetic: abdisalam.space`,
    emailSubject: (brand: string) => `Mobile web makeover idea for ${brand}`,
    emailBodyTemplate: (brand: string, niche: string) =>
      `Hey ${brand} team,

Your visual aesthetic on Instagram is incredible. You clearly care about design and presentation.

Most visitors check your link on a phone. If a website doesn't match that same modern feeling, people bounce back to Instagram. I specialize in building minimal, ultra-fast mobile websites for independent ${niche || "brands"} that match their visual identity 1:1.

I put together a visual concept card for ${brand} (attached below).

Feel free to browse my live portfolio at: https://abdisalam.space

Let me know if you'd like to see a quick mobile mockup!

Best,
Abdisalam Gure
https://abdisalam.space`
  },
  freelancer: {
    tag: "INDEPENDENT FREELANCER",
    headlineTemplate: (brand: string) => `I build & redesign clean websites for spots like ${brand}.`,
    descTemplate: (_brand: string, niche: string) =>
      `No corporate fluff or confusing tech jargon. Just honest, direct work between you and me to make your ${niche || "business"} look sharp online and bring in more customers.`,
    dmTemplate: (brand: string) =>
      `Hey ${brand}! I'm an independent web developer in Oslo. Love what you guys are building and put together a quick preview of how a custom mobile site for ${brand} could look. Open to checking it out?`,
    smsTemplate: (brand: string) =>
      `Hey ${brand}! Independent web developer in Oslo here. Put together a custom mobile site preview for ${brand}: abdisalam.space`,
    emailSubject: (brand: string) => `Quick intro & website idea for ${brand}`,
    emailBodyTemplate: (brand: string, niche: string) =>
      `Hey ${brand} team,

I'm Abdisalam, an independent web developer and designer based in Oslo. I love what you're doing with ${brand} in the ${niche || "local"} space.

I build clean, mobile-first websites directly for independent businesses — no agency fluff, no salespeople, just 1-on-1 collaboration with a developer who cares about making your brand look top tier.

I put together a concept card for ${brand} (attached). You can check out my live work at: https://abdisalam.space

If you've been thinking about getting a new site or refreshing your current one, let's grab a coffee or chat!

Best,
Abdisalam Gure
https://abdisalam.space`
  },
  custom: {
    tag: "CUSTOM CONCEPT",
    headlineTemplate: (brand: string) => `A modern mobile website custom-crafted for ${brand}.`,
    descTemplate: (brand: string, niche: string) =>
      `Tailored specifically for ${brand}. Clean design, instant loading on phones, and built to turn your followers into direct clients.`,
    dmTemplate: (brand: string) =>
      `Hey ${brand}! Put together a custom mobile site preview for you guys. Let me know if you'd like to check it out!`,
    smsTemplate: (brand: string) =>
      `Hey ${brand}! Check out this custom mobile site preview I put together for you: abdisalam.space`,
    emailSubject: (brand: string) => `Custom mobile site concept for ${brand}`,
    emailBodyTemplate: (brand: string, _niche: string) =>
      `Hey ${brand} team,\n\nPut together a custom mobile site concept for you guys.\n\nCheck it out at https://abdisalam.space\n\nBest,\nAbdisalam Gure`
  }
};

export async function POST(req: Request) {
  try {
    const body: GenerateRequest = await req.json();
    const { brandName, niche, angle = "pricing", notes = "" } = body;

    const brand = brandName?.trim() || "Your Brand";
    const cleanNiche = niche?.trim() || "studio";
    const apiKey = process.env.GEMINI_API_KEY?.trim();

    // If Gemini API Key is present, attempt live AI generation
    if (apiKey) {
      try {
        const prompt = `You are A.Gure, an independent junior freelance web developer and designer based in Oslo, Norway (portfolio: abdisalam.space).
You are writing a hyper-personalized, casual outreach message and visual card copy for a prospect:
- Business/Brand Name: "${brand}"
- Niche/Industry: "${cleanNiche}"
- Chosen Angle: "${angle}" (pricing = no agency markup, dms = replace messy DMs with direct booking, aesthetic = website matches great Instagram, freelancer = honest 1-on-1 direct collaboration)
- Extra Notes: "${notes}"

STRICT GUIDELINES:
- Absolutely NO corporate buzzwords (NEVER use words like "digital atelier", "bespoke solutions", "streamlined synergy", "cutting-edge", "unparalleled", "elevate").
- Tone must be down-to-earth, casual, confident, polite, and human (junior freelancer vibe).
- Card Headline: Under 10 words, punchy and engaging.
- Card Description: Exactly 2 short, crisp sentences.
- Card Tag: 2-3 words uppercase category (e.g. "DIRECT BOOKINGS", "NO AGENCY MARKUP", "MOBILE FIRST", "TATTOO & PIERCING").
- DM Message: 3-4 sentences max, perfect for Instagram DM.
- SMS Message: Under 160 characters, casual.
- Email Subject: Short, natural subject line.
- Email Body: Casual 3-paragraph email with a greeting, problem/observation, offer to show a 15-second demo, and signoff.

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

        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                responseMimeType: "application/json",
                temperature: 0.7
              }
            })
          }
        );

        if (res.ok) {
          const data = await res.json();
          const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawText) {
            const parsed = JSON.parse(rawText);
            return NextResponse.json({ success: true, source: "gemini", data: parsed });
          }
        }
      } catch (geminiErr) {
        console.warn("Gemini API call failed, falling back to smart presets:", geminiErr);
      }
    }

    // Smart Local Fallback (Instant, 100% reliable)
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
