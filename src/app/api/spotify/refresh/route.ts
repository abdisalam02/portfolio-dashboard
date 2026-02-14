// app/api/spotify/refresh/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

  console.log("[Spotify] /api/spotify/refresh called");
  console.log("[Spotify] Env presence:", {
    hasClientId: !!client_id,
    hasClientSecret: !!client_secret,
    hasRefreshToken: !!refresh_token,
  });

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      // Buffer is available in Node environments
      'Authorization':
        'Basic ' + Buffer.from(`${client_id}:${client_secret}`).toString('base64'),
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refresh_token ?? '',
    }),
  });

  const text = await response.text();

  if (!response.ok) {
    console.error("[Spotify] Refresh token endpoint failed:", {
      status: response.status,
      bodySnippet: text.slice(0, 300),
    });
    return NextResponse.json({ error: "Failed to refresh token" }, { status: 500 });
  }

  const data = JSON.parse(text);

  if (data.error) {
    console.error("[Spotify] Refresh response contained error:", data.error);
    return NextResponse.json({ error: data.error }, { status: 500 });
  }

  console.log("[Spotify] Refresh succeeded, got new access_token");
  return NextResponse.json({ access_token: data.access_token });
}
