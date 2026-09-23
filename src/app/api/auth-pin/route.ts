import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { pin } = await req.json();
    const correctPin = (process.env.STUDIO_PIN || "2026").trim();

    if (pin && pin.trim() === correctPin) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { success: false, error: "Incorrect Studio PIN. Please try again." },
      { status: 401 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
