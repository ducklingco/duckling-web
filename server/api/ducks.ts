import type { Filter } from "~/types/Filter";
const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const { filter, page, accessToken } = getQuery(event);
  const filterTyped = filter as Filter;
  const ducks = await fetchDucks(
    filterTyped,
    Number(page),
    String(accessToken),
  );
  return ducks;
});

async function fetchDucks(filter: Filter, page = 1, accessToken: string) {
  const filterMap: { [key: string]: string } = {
    verified: "isVerified=true",
    featured: "isFeatured=true",
    all: "",
  };

  const url = `${config.public.backendURL}/ducks?${filterMap[filter]}&page=${page}&page_size=6&sort_by=-publishedAt`;

  console.log(url);
  const options: RequestInit = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
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
}
