const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

async function getAccessToken() {
  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: REFRESH_TOKEN }),
  });
  const json = await res.json();
  return json.access_token;
}

async function getNowPlaying(token) {
  const res = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.status === 204 || res.status >= 400) return null;
  const json = await res.json();
  if (!json?.item) return null;
  return { item: json.item, isPlaying: json.is_playing };
}

async function getRecentlyPlayed(token) {
  const res = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=1", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const json = await res.json();
  const track = json?.items?.[0]?.track;
  if (!track) return null;
  return { item: track, isPlaying: false };
}

function formatTrack({ item, isPlaying }) {
  return {
    isPlaying,
    title: item.name,
    artist: item.artists.map((a) => a.name).join(", "),
    album: item.album.name,
    albumArt: item.album.images[1]?.url ?? item.album.images[0]?.url,
    url: item.external_urls.spotify,
  };
}

exports.handler = async () => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
  };

  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    return { statusCode: 503, headers, body: JSON.stringify({ error: "not_configured" }) };
  }

  try {
    const token = await getAccessToken();
    const raw = (await getNowPlaying(token)) ?? (await getRecentlyPlayed(token));
    const track = raw ? formatTrack(raw) : null;
    return { statusCode: 200, headers, body: JSON.stringify(track ?? { title: null }) };
  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: String(err) }) };
  }
};
