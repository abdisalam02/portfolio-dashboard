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
      const attachments = [];
      if (cardBase64) {
        // Strip data:image/png;base64, prefix if present
        const cleanBase64 = cardBase64.replace(/^data:image\/\w+;base64,/, "");
        attachments.push({
          filename: `${(brandName || "concept").toLowerCase().replace(/[^a-z0-9]/g, "-")}-preview.png`,
          content: cleanBase64
        });
      }

      // Convert newline breaks in plain text to clean HTML
      const formattedHtml = htmlBody
        .split("\n\n")
        .map((paragraph) => `<p style="margin-bottom: 16px; line-height: 1.6; font-size: 15px; color: #1c1917;">${paragraph.replace(/\n/g, "<br/>")}</p>`)
        .join("");

      const emailPayload = {
        from: `${senderName} <${senderEmail}>`,
        to: [to.trim()],
        reply_to: replyTo,
        subject: subject.trim(),
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1c1917;">
            ${formattedHtml}
            <hr style="border: none; border-top: 1px solid #e7e5e4; margin: 32px 0 16px 0;" />
            <p style="font-size: 12px; color: #78716c; line-height: 1.4;">
              <strong>${senderName}</strong> • Independent Web Developer & Designer<br/>
              Portfolio: <a href="https://abdisalam.space" style="color: #0284c7; text-decoration: none;">abdisalam.space</a> • Direct: ${replyTo}
            </p>
          </div>
        `,
        attachments
      };

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
        replyTo
      });
    }

    // If no Resend API key is present yet (sandbox / manual verification mode)
    return NextResponse.json({
      success: true,
      sent: false,
      mocked: true,
      message: `Draft ready! Resend API key not configured yet. Set RESEND_API_KEY in .env.local to send live emails from ${senderEmail} to ${to}.`,
      recipient: to,
      replyTo,
      subject
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
