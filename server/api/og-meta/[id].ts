export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const config = useRuntimeConfig();

  const loginResponse = await fetch(`${config.public.backendUrl}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: 'WebplayerViewUser',
      password: 'Saturate3-Slum7-Acorn4-Putdown8',
    }),
  });
  const { accessToken } = await loginResponse.json();

  const duckResponse = await fetch(`${config.public.backendUrl}/duck/${id}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const duck = await duckResponse.json();

  const authorResponse = await fetch(`${config.public.backendUrl}/user/${duck.owner}/public`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const author = await authorResponse.json();

  return {
    title: duck.title ?? null,
    authorName: author.name ?? null,
  };
});
