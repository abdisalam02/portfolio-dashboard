import { NextResponse } from "next/server";

interface SendEmailRequest {
  to: string;
  subject: string;
  htmlBody: string;
  cardBase64?: string;
  brandName?: string;
}

export async function POST(req: Request) {
  try {
    const body: SendEmailRequest = await req.json();
    const { to, subject, htmlBody, cardBase64, brandName } = body;

    if (!to || !to.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid recipient email address." },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY?.trim();
    const senderEmail = process.env.SENDER_EMAIL || "hello@abdisalam.space";
    const senderName = process.env.SENDER_NAME || "A.Gure";
    const replyTo = process.env.REPLY_TO_EMAIL || "niwache12@gmail.com";

    // If Resend API Key is configured, send the real email
    if (resendApiKey) {
      const cleanBrand = (brandName || "concept").toLowerCase().replace(/[^a-z0-9]/g, "-");
      const attachmentFilename = `${cleanBrand}-pitch-card.png`;
      const attachments: Array<{ filename: string; content: string }> = [];

      // If cardBase64 is passed from canvas, attach as real PNG file
      if (cardBase64 && cardBase64.length > 50) {
        const cleanBase64 = cardBase64.replace(/^data:image\/\w+;base64,/, "");
        attachments.push({
          filename: attachmentFilename,
          content: cleanBase64
        });
      }

      // Convert newline breaks into clean HTML paragraphs
      const formattedHtml = htmlBody
        .split("\n\n")
        .filter((p) => p.trim().length > 0)
        .map((paragraph) => `<p style="margin: 0 0 14px 0; line-height: 1.6; font-size: 15px; color: #e4e4e7;">${paragraph.replace(/\n/g, "<br/>")}</p>`)
        .join("");

      // Automatically BCC niwache12@gmail.com as a precaution so Abdisalam receives a copy
      const bccList = to.trim().toLowerCase() === replyTo.toLowerCase() ? undefined : [replyTo];

      const emailPayload: {
        from: string;
        to: string[];
        reply_to: string;
        subject: string;
        html: string;
        attachments?: Array<{ filename: string; content: string }>;
        bcc?: string[];
      } = {
        from: `${senderName} <${senderEmail}>`,
        to: [to.trim()],
        reply_to: replyTo,
        subject: subject.trim(),
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; background-color: #050507; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
            <div style="max-width: 580px; margin: 0 auto; padding: 32px 20px;">
              <!-- Container Card -->
              <div style="background-color: #0a0a0e; border: 1px solid #1f1f24; border-radius: 16px; padding: 28px 24px; box-shadow: 0 20px 40px rgba(0,0,0,0.6);">
                
                <!-- Header Branding -->
                <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 22px; border-bottom: 1px solid #1a1a20; padding-bottom: 16px;">
                  <tr>
                    <td align="left">
                      <span style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 19px; font-weight: 800; letter-spacing: -0.04em; color: #ffffff;">A.GURE</span>
                    </td>
                    <td align="right">
                      <span style="font-family: ui-monospace, Menlo, Monaco, Consolas, monospace; font-size: 11px; color: #71717a; letter-spacing: 0.05em; text-transform: uppercase;">OSLO • WEB DEV</span>
                    </td>
                  </tr>
                </table>

                <!-- Email Message Content -->
                <div style="color: #e4e4e7;">
                  ${formattedHtml}
                </div>

                <!-- Visual Pitch Card Container -->
                <div style="margin: 22px 0 20px 0; border: 1px solid #22222a; border-radius: 12px; overflow: hidden; background-color: #08080a;">
                  <a href="https://abdisalam.space" target="_blank" style="display: block; text-decoration: none;">
                    <img src="https://abdisalam.space/outreach_pitch_card.png" alt="Concept Preview Card" style="width: 100%; max-width: 540px; height: auto; display: block; border-bottom: 1px solid #1a1a22;" />
                  </a>
                  <table width="100%" border="0" cellpadding="0" cellspacing="0" style="padding: 10px 14px; background-color: #0e0e13;">
                    <tr>
                      <td align="left" style="font-family: ui-monospace, Menlo, Monaco, Consolas, monospace; font-size: 11px; color: #8a8a93;">
                        🎴 Concept Card (${attachmentFilename})
                      </td>
                      <td align="right">
                        <a href="https://abdisalam.space" style="font-family: ui-monospace, Menlo, Monaco, Consolas, monospace; font-size: 11px; color: #ffffff; text-decoration: none; font-weight: 600;">
                          abdisalam.space ↗
                        </a>
                      </td>
                    </tr>
                  </table>
                </div>

                <!-- Call to Action Button -->
                <div style="margin: 22px 0 24px 0; text-align: left;">
                  <a href="https://abdisalam.space" target="_blank" style="display: inline-block; background-color: #ffffff; color: #000000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 12.5px; font-weight: 700; text-decoration: none; padding: 10px 20px; border-radius: 8px; letter-spacing: -0.01em;">
                    View Live Client Work ↗
                  </a>
                </div>

                <!-- Signature & Footer -->
                <div style="border-top: 1px solid #1a1a20; padding-top: 18px; margin-top: 20px;">
                  <p style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 13.5px; color: #f4f4f5; margin: 0 0 3px 0; font-weight: 600;">
                    Abdisalam Gure (A.Gure)
                  </p>
                  <p style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 12px; color: #71717a; margin: 0; line-height: 1.4;">
                    Independent Web Developer &amp; Designer • Oslo, Norway<br/>
                    Portfolio: <a href="https://abdisalam.space" style="color: #a1a1aa; text-decoration: underline;">abdisalam.space</a> • Direct: <a href="mailto:${replyTo}" style="color: #a1a1aa; text-decoration: none;">${replyTo}</a>
                  </p>
                </div>

              </div>
            </div>
          </body>
          </html>
        `
      };

      if (attachments.length > 0) {
        emailPayload.attachments = attachments;
      }
      if (bccList) {
        emailPayload.bcc = bccList;
      }

      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(emailPayload)
      });

      const resData = await res.json();
      if (!res.ok) {
        console.error("Resend API error:", resData);
        return NextResponse.json(
          {
            success: false,
            error: resData.message || "Failed to send email through Resend API."
          },
          { status: res.status }
        );
      }

      return NextResponse.json({
        success: true,
        sent: true,
        id: resData.id,
        recipient: to,
        replyTo,
        attachedImage: attachments.length > 0,
        bccCopy: bccList ? bccList[0] : null
      });
    }

    // Fallback if no API key
    return NextResponse.json({
      success: true,
      sent: false,
      mocked: true,
      message: `Draft ready! Resend API key not configured yet.`,
      recipient: to,
      replyTo,
      subject
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
