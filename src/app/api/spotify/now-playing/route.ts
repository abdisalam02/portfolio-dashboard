import { NextResponse } from 'next/server';

// Disable all API route caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getAccessToken(): Promise<string> {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization':
        'Basic ' + Buffer.from(`${client_id}:${client_secret}`).toString('base64'),
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refresh_token ?? '',
    }),
    cache: 'no-store'
  });
  const data = await response.json();
  return data.access_token;
}

export async function GET() {
  const timestamp = new Date().toISOString();
  console.log(`API called at ${timestamp}`);
  
  try {
    const access_token = await getAccessToken();

    // Try to fetch the currently playing track
    let response = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
      headers: { 
        Authorization: `Bearer ${access_token}`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache'
      },
      cache: 'no-store',
      next: { revalidate: 0 }
    });

    console.log(`Currently playing API status: ${response.status}`);

    // If nothing's playing (204 No Content) or there's an error, fallback to recently played
    if (response.status === 204 || response.status > 400) {
      console.log("No currently playing track, falling back to recently played");
      response = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=1", {
        headers: { 
          Authorization: `Bearer ${access_token}`,
          'Cache-Control': 'no-cache'
        },
        cache: 'no-store'
      });
      
      const data = await response.json();
      if (data.items && data.items.length) {
        const track = data.items[0].track;
        const playedAt = data.items[0].played_at;
        
        return NextResponse.json({
          isPlaying: false,
          title: track.name,
          artist: track.artists.map((a: any) => a.name).join(', '),
          album: track.album.name,
          albumImageUrl: track.album.images[0]?.url,
          playedAt: playedAt,
          spotifyUrl: track.external_urls?.spotify,
          timestamp: timestamp
        });
      }
    } else {
      const data = await response.json();
      const track = data.item;
      
      // Use the actual is_playing value from Spotify
      return NextResponse.json({
        isPlaying: data.is_playing,
        title: track.name,
        artist: track.artists.map((a: any) => a.name).join(', '),
        album: track.album.name,
        albumImageUrl: track.album.images[0]?.url,
        spotifyUrl: track.external_urls?.spotify,
        timestamp: timestamp
      });
    }

    // Default response if no track data is available
    return NextResponse.json({ 
      isPlaying: false,
      timestamp: timestamp,
      message: "No track data available" 
    });
  } catch (error) {
    console.error("Spotify API error:", error);
    return NextResponse.json({ 
      error: "Internal server error",
      timestamp: timestamp 
    }, { status: 500 });
  }
}
