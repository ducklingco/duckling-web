// ABOUTME: Pinia store for user state including access token management.
// ABOUTME: Tokens are fetched on-demand and cached client-side with expiry checking.

/**
 * Check if a JWT token is expired or expiring soon.
 * Uses client-safe base64 decoding (no Node.js dependencies).
 */
function isTokenExpiringSoon(token: string, bufferSeconds = 120): boolean {
  if (!token) return true;

  try {
    const parts = token.split(".");
    if (parts.length !== 3) return true;

    const payload = JSON.parse(
      atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")),
    );
    const exp = payload.exp;

    if (!exp) return true;

    const currentTime = Math.floor(Date.now() / 1000);
    return exp - currentTime < bufferSeconds;
  } catch {
    return true;
  }
}

export const useUserStore = defineStore("user", () => {
  const accessToken = ref("");

  const setAccessToken = async () => {
    if (accessToken.value && !isTokenExpiringSoon(accessToken.value)) {
      return;
    }
    accessToken.value = await $fetch("/api/login");
  };

  return {
    accessToken,
    setAccessToken,
  };
});
