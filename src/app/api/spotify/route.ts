// // pages/api/spotify.js
// import { getAccessToken } from '../../utils/spotify'; // Your logic to get/refresh token

// export default async function handler(req, res) {
//   const accessToken = await getAccessToken(); // implement your OAuth logic here

//   // First, try to fetch the currently playing track
//   let response = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
//     headers: { Authorization: `Bearer ${accessToken}` }
//   });

//   if (response.status === 204 || response.status > 400) {
//     // If nothing's playing, fall back to recently played track
//     response = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=1", {
//       headers: { Authorization: `Bearer ${accessToken}` }
//     });
//     const data = await response.json();
//     if (data.items && data.items.length) {
//       const track = data.items[0].track;
//       return res.status(200).json({
//         isPlaying: false,
//         title: track.name,
//         artist: track.artists.map(a => a.name).join(', '),
//         albumImageUrl: track.album.images[0]?.url
//       });
//     }
//   } else {
//     const data = await response.json();
//     const track = data.item;
//     return res.status(200).json({
//       isPlaying: true,
//       title: track.name,
//       artist: track.artists.map(a => a.name).join(', '),
//       albumImageUrl: track.album.images[0]?.url
//     });
//   }
  
//   return res.status(200).json({ isPlaying: false });
// }
