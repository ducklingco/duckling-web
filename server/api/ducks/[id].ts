const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  if (!event.context.params?.id) {
    throw createError({ statusCode: 404, statusMessage: "Duck not found" });
  }
  const id = event.context.params.id;
  // Fetch a single duck from the API
  const url = `${config.public.backendURL}/duck/${id}`;

  const options = {
    method: "GET",
    headers: {
      Authorization: "Bearer 51851|Vhz7JKBxH2olMUWDE72d4n3ALG1U2wwxln2ABU2n",
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, options);
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
