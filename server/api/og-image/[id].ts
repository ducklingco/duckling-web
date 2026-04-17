export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const config = useRuntimeConfig();

  // Login to get token
  const loginResponse = await fetch(`${config.public.backendUrl}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: 'WebplayerViewUser',
      password: 'Saturate3-Slum7-Acorn4-Putdown8',
    }),
  });
  const { accessToken } = await loginResponse.json();

  // Fetch the duck to get mediaId
  const duckResponse = await fetch(`${config.public.backendUrl}/duck/${id}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const duck = await duckResponse.json();

  // Get the signed URL from the media endpoint
  const mediaResponse = await fetch(
    `${config.public.backendUrl}/media?id=${duck.mediaId}&mediaType=cover-image`,
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );

  // Parse the signed URL - it may be JSON encoded or plain text
  const mediaText = await mediaResponse.text();
  const parsedUrl = mediaText.startsWith('"') ? JSON.parse(mediaText) : mediaText;
  const signedUrl = parsedUrl.replace(/\\u0026/g, '&');

  // Fetch the actual image from the signed URL
  const imageResponse = await fetch(signedUrl);
  const buffer = await imageResponse.arrayBuffer();
  const contentType = imageResponse.headers.get('content-type') || 'image/jpeg';

  setHeader(event, 'Content-Type', contentType);
  setHeader(event, 'Cache-Control', 'public, max-age=3600');
  return Buffer.from(buffer);
});
