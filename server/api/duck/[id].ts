const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  if (!event.context.params?.id) {
    throw createError({ statusCode: 404, statusMessage: "Duck not found" });
  }
  const id = event.context.params.id;
  const { accessToken } = getQuery(event);
  // Fetch a single duck from the API
  const url = `${config.public.backendURL}/duck/${id}`;

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${String(accessToken)}`,
      "Content-Type": "application/json",
    },
  };

  const params = new URLSearchParams({
    detailed: "true",
  });

  try {
    const response = await fetch(`${url}?${params.toString()}`, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("An error occurred while fetching the ducks:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
  return id;
});
