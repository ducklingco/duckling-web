export const useUserStore = defineStore("user", () => {
  const accessToken = ref("");

  const setAccessToken = async () => {
    accessToken.value = await $fetch("/api/login");
  };

  const keepAccessTokenValid = async () => {
    const checkAndRefreshToken = async () => {
      setAccessToken();
    };
    await checkAndRefreshToken();

    setInterval(checkAndRefreshToken, 2000);
  };

  onMounted(() => {
    keepAccessTokenValid();
  });

  return {
    accessToken,
    setAccessToken,
  };
});
