import jwt from "jsonwebtoken";

export const isAccessTokenValid = (accessToken: string) => {
  if (accessToken.length > 0) {
    const accessTokenDecoded = jwt.decode(accessToken);
    if (typeof accessTokenDecoded === "object" && accessTokenDecoded !== null) {
      const exp = accessTokenDecoded.exp;
      const currentTime = Math.floor(Date.now() / 1000); // Convert to Unix timestamp
      if (exp && exp > currentTime) {
        const timeLeft = exp - currentTime;
        if (timeLeft < 120) {
          return false;
        }
        return true;
      }
    }
  }
  return false;
};
