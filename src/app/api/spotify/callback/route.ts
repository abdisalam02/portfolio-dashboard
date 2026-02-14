// app/api/spotify/callback/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const state = searchParams.get('state');

  // Validate 'state' if needed

  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirect_uri = process.env.SPOTIFY_REDIRECT_URI; // "http://localhost:3001/api/spotify/callback"

  console.log("[Spotify] Callback hit with code:", !!code);
  console.log("[Spotify] Env presence in callback:", {
    hasClientId: !!client_id,
    hasClientSecret: !!client_secret,
    hasRedirectUri: !!redirect_uri,
  });

  const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization':
        'Basic ' + Buffer.from(`${client_id}:${client_secret}`).toString('base64'),
    },
    body: new URLSearchParams({
      code: code || '',
      redirect_uri: redirect_uri || '',
      grant_type: 'authorization_code',
    }),
  });

  const text = await tokenResponse.text();

  if (!tokenResponse.ok) {
    console.error("[Spotify] Callback token exchange failed:", {
      status: tokenResponse.status,
      bodySnippet: text.slice(0, 300),
    });
    return NextResponse.json({ error: "Token exchange failed" }, { status: 500 });
  }

  const data = JSON.parse(text);

  if (data.error) {
    console.error("[Spotify] Callback response contained error:", data.error);
    return NextResponse.json({ error: data.error }, { status: 500 });
  }

  console.log('Refresh Token:', data.refresh_token);
  return NextResponse.json({ refresh_token: data.refresh_token });
}
