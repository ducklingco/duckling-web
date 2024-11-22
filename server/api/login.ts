import { isAccessTokenValid } from "~/utils/tokenHelpers";

const config = useRuntimeConfig();

export default defineEventHandler(async () => {
  await loginViewer();
  return accessToken;
});

let accessToken = "";
let refreshToken = "";

async function loginViewer() {
  if (accessToken.length > 0 && refreshToken.length > 0) {
    if (isAccessTokenValid(accessToken)) {
      return accessToken;
    }
  }

  const url = `${config.public.backendURL}/login`;
  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: "WebplayerViewUser",
      password: "Saturate3-Slum7-Acorn4-Putdown8",
    }),
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    accessToken = data.accessToken;
    refreshToken = data.refreshToken;
  } catch (error) {
    console.error("An error occurred while fetching the ducks:", error);
  }
}
