import { NextResponse } from "next/server";

interface SendEmailRequest {
  to: string;
  subject: string;
  htmlBody: string;
  cardBase64?: string;
  brandName?: string;
  isPreview?: boolean;
}

export async function POST(req: Request) {
  try {
    const body: SendEmailRequest = await req.json();
    const { to, subject, htmlBody, cardBase64, brandName, isPreview = false } = body;

    if (!to || !to.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid recipient email address." },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY?.trim();
    const senderEmail = process.env.SENDER_EMAIL || "hello@abdisalam.space";
    const senderName = process.env.SENDER_NAME || "A.Gure";
    const replyTo = process.env.REPLY_TO_EMAIL || "hello@abdisalam.space";

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
        .map((paragraph) => `<p class="email-text" style="margin: 0 0 16px 0; line-height: 1.65; font-size: 15.5px; color: #27272a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">${paragraph.replace(/\n/g, "<br/>")}</p>`)
        .join("");

      // Automatically BCC hello@abdisalam.space as a precaution so Abdisalam receives a copy
      const bccList = to.trim().toLowerCase() === replyTo.toLowerCase() ? undefined : [replyTo];
      const timeTag = new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
      const cleanSubject = subject.replace(/^\[PREVIEW(?:\s+[\d:]+)?\]\s*/i, "").trim();
      const finalSubject = isPreview ? `[PREVIEW ${timeTag}] ${cleanSubject}` : cleanSubject;

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
        subject: finalSubject,
        html: `
          <!DOCTYPE html>
          <html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="color-scheme" content="light dark">
            <meta name="supported-color-schemes" content="light dark">
            <title>${cleanSubject}</title>
            <!--[if mso]>
            <noscript>
              <xml>
                <o:OfficeDocumentSettings>
                  <o:PixelsPerInch>96</o:PixelsPerInch>
                </o:OfficeDocumentSettings>
              </xml>
            </noscript>
            <![endif]-->
            <style type="text/css">
              :root {
                color-scheme: light dark;
                supported-color-schemes: light dark;
              }
              @media only screen and (max-width: 620px) {
                .email-container-td {
                  padding: 16px 8px !important;
                }
                .email-card-padding {
                  padding: 24px 18px !important;
                }
                .email-header-table {
                  margin-bottom: 18px !important;
                  padding-bottom: 14px !important;
                }
              }
              @media (prefers-color-scheme: dark) {
                body, .email-bg {
                  background-color: #050507 !important;
                }
                .email-card {
                  background-color: #0c0c10 !important;
                  border-color: #1e1e24 !important;
                  box-shadow: 0 20px 40px rgba(0,0,0,0.6) !important;
                }
                .email-heading {
                  color: #ffffff !important;
                }
                .email-border {
                  border-color: #1a1a20 !important;
                }
                .email-text {
                  color: #e4e4e7 !important;
                }
                .email-muted {
                  color: #71717a !important;
                }
                .email-author {
                  color: #f4f4f5 !important;
                }
                .email-subtle-link {
                  color: #a1a1aa !important;
                }
                .email-card-container {
                  border-color: #22222a !important;
                }
                .email-card-bar {
                  background-color: #0e0e13 !important;
                  border-top-color: #1a1a22 !important;
                }
                .email-card-bar-text {
                  color: #8a8a93 !important;
                }
                .email-card-bar-link {
                  color: #ffffff !important;
                }
                .email-btn {
                  background-color: #ffffff !important;
                  color: #000000 !important;
                }
                .email-preview-banner {
                  background-color: #18181f !important;
                  border-color: #3f3f46 !important;
                  color: #a1a1aa !important;
                }
                .email-preview-strong {
                  color: #ffffff !important;
                }
              }
              /* Outlook Dark Mode Support */
              [data-ogsc] body, [data-ogsc] .email-bg { background-color: #050507 !important; }
              [data-ogsc] .email-card { background-color: #0c0c10 !important; border-color: #1e1e24 !important; }
              [data-ogsc] .email-heading { color: #ffffff !important; }
              [data-ogsc] .email-border { border-color: #1a1a20 !important; }
              [data-ogsc] .email-text { color: #e4e4e7 !important; }
              [data-ogsc] .email-muted { color: #71717a !important; }
              [data-ogsc] .email-author { color: #f4f4f5 !important; }
              [data-ogsc] .email-subtle-link { color: #a1a1aa !important; }
              [data-ogsc] .email-card-container { border-color: #22222a !important; }
              [data-ogsc] .email-card-bar { background-color: #0e0e13 !important; border-top-color: #1a1a22 !important; }
              [data-ogsc] .email-card-bar-text { color: #8a8a93 !important; }
              [data-ogsc] .email-card-bar-link { color: #ffffff !important; }
              [data-ogsc] .email-btn { background-color: #ffffff !important; color: #000000 !important; }
            </style>
          </head>
          <body class="email-bg" style="margin: 0; padding: 0; background-color: #f4f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
            <!-- Outer centering wrapper table -->
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" class="email-bg" style="background-color: #f4f4f6; margin: 0; padding: 0; width: 100%;">
              <tr>
                <td align="center" class="email-container-td" style="padding: 40px 16px;">
                  
                  <!-- Main Content Card (max-width 600px) -->
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" class="email-card" style="max-width: 600px; width: 100%; background-color: #ffffff; border: 1px solid #e4e4e7; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05); text-align: left;">
                    <tr>
                      <td class="email-card-padding" style="padding: 36px 32px;">
                        
                        ${
                          isPreview
                            ? `
                        <div class="email-preview-banner" style="background-color: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 10px; padding: 12px 16px; margin-bottom: 24px; font-size: 11.5px; color: #475569; font-family: ui-monospace, Menlo, Monaco, Consolas, monospace; line-height: 1.5;">
                          ⚡ <strong class="email-preview-strong" style="color: #0f172a;">TEST PREVIEW COPY:</strong> This is an exact preview sent to your email. Check copy, visual layout, and attached card before sending live to businesses.
                        </div>
                        `
                            : ""
                        }

                        <!-- Header Branding -->
                        <table width="100%" border="0" cellpadding="0" cellspacing="0" class="email-header-table email-border" style="margin-bottom: 24px; border-bottom: 1px solid #ebebee; padding-bottom: 18px;">
                          <tr>
                            <td align="left">
                              <span class="email-heading" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 19px; font-weight: 800; letter-spacing: -0.04em; color: #09090b;">A.GURE</span>
                            </td>
                            <td align="right">
                              <span class="email-muted" style="font-family: ui-monospace, Menlo, Monaco, Consolas, monospace; font-size: 11px; color: #71717a; letter-spacing: 0.05em; text-transform: uppercase;">OSLO • WEB DEV</span>
                            </td>
                          </tr>
                        </table>

                        <!-- Email Message Content -->
                        <div style="margin-bottom: 24px;">
                          ${formattedHtml}
                        </div>

                        <!-- Visual Pitch Card Container -->
                        <div class="email-card-container" style="margin: 24px 0 24px 0; border: 1px solid #e4e4e7; border-radius: 12px; overflow: hidden; background-color: #09090b;">
                          <a href="https://abdisalam.space" target="_blank" style="display: block; text-decoration: none;">
                            <img src="https://abdisalam.space/outreach_pitch_card.png" alt="A.GURE Portfolio Overview" style="width: 100%; max-width: 100%; height: auto; display: block; border-bottom: 1px solid #1a1a22;" />
                          </a>
                          <table width="100%" border="0" cellpadding="0" cellspacing="0" class="email-card-bar email-border" style="padding: 11px 16px; background-color: #f8f8fa; border-top: 1px solid #e4e4e7;">
                            <tr>
                              <td align="left" class="email-card-bar-text" style="font-family: ui-monospace, Menlo, Monaco, Consolas, monospace; font-size: 11px; color: #71717a;">
                                🎴 Portfolio Overview (${attachmentFilename})
                              </td>
                              <td align="right">
                                <a href="https://abdisalam.space" class="email-card-bar-link" style="font-family: ui-monospace, Menlo, Monaco, Consolas, monospace; font-size: 11px; color: #09090b; text-decoration: none; font-weight: 600;">
                                  abdisalam.space ↗
                                </a>
                              </td>
                            </tr>
                          </table>
                        </div>

                        <!-- Call to Action Button -->
                        <div style="margin: 24px 0 28px 0; text-align: left;">
                          <a href="https://abdisalam.space" target="_blank" class="email-btn" style="display: inline-block; background-color: #09090b; color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 13px; font-weight: 600; text-decoration: none; padding: 12px 24px; border-radius: 8px; letter-spacing: -0.01em;">
                            View Live Client Work ↗
                          </a>
                        </div>

                        <!-- Signature & Footer -->
                        <div class="email-border" style="border-top: 1px solid #ebebee; padding-top: 20px; margin-top: 24px;">
                          <p class="email-author" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 13.5px; color: #09090b; margin: 0 0 3px 0; font-weight: 600;">
                            Abdisalam Gure (A.Gure)
                          </p>
                          <p class="email-muted" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 12px; color: #71717a; margin: 0; line-height: 1.45;">
                            Independent Web Developer &amp; Designer • Oslo, Norway<br/>
                            Portfolio: <a href="https://abdisalam.space" class="email-subtle-link" style="color: #52525b; text-decoration: underline;">abdisalam.space</a> • Direct: <a href="mailto:${replyTo}" class="email-subtle-link" style="color: #52525b; text-decoration: none;">${replyTo}</a>
                          </p>
                        </div>

                      </td>
                    </tr>
                  </table>

                </td>
              </tr>
            </table>
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
