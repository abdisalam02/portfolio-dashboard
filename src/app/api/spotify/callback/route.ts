/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, react/no-unescaped-entities */

// app/api/spotify/callback/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  // Validate 'state' if needed

  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirect_uri = process.env.SPOTIFY_REDIRECT_URI; // "http://localhost:3001/api/spotify/callback"

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

  const data = await tokenResponse.json();

  if (data.error) {
    return NextResponse.json({ error: data.error }, { status: 500 });
  }

  console.log('Refresh Token:', data.refresh_token);
  return NextResponse.json({ refresh_token: data.refresh_token });
}
