import type { MediaType } from "~/types/MediaType";
import type { PublicUser } from "~/types/User";

export const getMedia = async (
  mediaId: string,
  mediaType: MediaType,
  accessToken: string,
): Promise<Blob> => {
  const config = useRuntimeConfig();
  const url = `${config.public.backendUrl}/media`;
  const params = new URLSearchParams({
    id: mediaId,
    mediaType: mediaType,
  });
  const options: RequestInit = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/text",
    },
  };
  try {
    const response = await fetch(`${url}?${params.toString()}`, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const signedUrl = (await response.text())
      .trim()
      .replaceAll('"', "")
      .replaceAll(/\\u0026/g, "&");
    if (!signedUrl) {
      throw new Error("Signed URL is empty");
    }
    const mediaBlob = await getMediaWithSignedUrl(signedUrl, mediaType);
    return mediaBlob;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      throw error;
    }
    console.error("An error occurred while fetching the media:", error);
    throw new Error("Internal Server Error");
  }
};

const getMediaWithSignedUrl = async (
  signedUrl: string,
  mediaType: MediaType,
): Promise<Blob> => {
  if (!signedUrl) {
    throw new Error("Signed URL is empty");
  }

  try {
    const response = await $fetch("/api/proxy", {
      method: "GET",
      params: { proxyUrl: signedUrl, mediaType: mediaType },
      responseType: "arrayBuffer",
    });

    if (!(response instanceof ArrayBuffer)) {
      console.error("Response is not an ArrayBuffer");
      throw new Error("Unexpected response type");
    }

    // Convert ArrayBuffer to Blob
    const blob = new Blob([response]);

    return blob;
  } catch (error) {
    console.error("Error in getMediaWithSignedUrl:", error);
    throw error;
  }
};

export const getAuthorDetails = async (
  userId: string,
  accessToken: string,
): Promise<PublicUser> => {
  const config = useRuntimeConfig();
  const url = `${config.public.backendUrl}/user/${userId}/public`;

  const options: RequestInit = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/text",
    },
  };
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (!data) {
      throw new Error("Public user data is empty");
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      throw error;
    }
    console.error("An error occurred while fetching the public user:", error);
    throw new Error("Internal Server Error");
  }
};

export const getVerificationCodeRequest = async (
  phoneNumber: string,
): Promise<void> => {
  const config = useRuntimeConfig();
  const url = `${config.public.backendUrl}/phone/send-verification-code`;

  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phoneNumber }),
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      throw error;
    }
    console.error(
      "An error occurred while sending the verification code:",
      error,
    );
    throw new Error("Internal Server Error");
  }
};

export const sendVerificationCodeRequest = async (
  phoneNumber: string,
  code: string,
): Promise<string> => {
  const config = useRuntimeConfig();
  const url = `${config.public.backendUrl}/user/verify-phone`;

  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phoneNumber, code }),
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const oneTimeCode = (await response.text())
      .trim()
      .replace(/^"|"$/g, "") // Remove quotes at start/end
      .replace(/\n/g, ""); // Remove newlines

    if (!oneTimeCode) {
      throw new Error("Verification code data is empty");
    }
    return oneTimeCode;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      throw error;
    }
    console.error(
      "An error occurred while sending the verification code:",
      error,
    );
    throw new Error("Internal Server Error");
  }
};

export const loginWithVerificationCodeRequest = async (
  phoneNumber: string,
  code: string,
): Promise<string> => {
  const config = useRuntimeConfig();
  const url = `${config.public.backendUrl}/login`;

  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phoneNumber, verificationCode: code }),
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (!data) {
      throw new Error("Verification code data is empty");
    }
    return data["accessToken"];
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      throw error;
    }
    console.error(
      "An error occurred while sending the verification code:",
      error,
    );
    throw new Error("Internal Server Error");
  }
};

export const acceptNestInviteLinkRequest = async (
  nestId: string,
  inviteLink: string,
  accessToken: string,
): Promise<void> => {
  const config = useRuntimeConfig();
  const url = `${config.public.backendUrl}/nest/${nestId}/invite/accept/${inviteLink}`;

  const options: RequestInit = {
    method: "PATCH",
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
    return;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      throw error;
    }
    console.error("An error occurred while accepting the invite link:", error);
    throw new Error("Internal Server Error");
  }
};

export const createAccountRequest = async (
  phoneNumber: string,
  oneTimeCode: string,
  username: string,
  surname: string,
  name: string,
): Promise<string> => {
  const config = useRuntimeConfig();
  const url = `${config.public.backendUrl}/user`;

  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      phoneNumber,
      oneTimeCode,
      name,
      surname,
    }),
  };
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      // Read the response text once
      const responseText = await response.text();

      // Create a custom error with more information
      if (responseText.includes("already exists")) {
        const error = new Error("User already exists");
        // Add a custom property to help identify this specific error type
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (error as any).code = "USER_EXISTS";
        throw error;
      }

      // For other errors
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${responseText}`,
      );
    }
    const data = await response.json();
    if (!data) {
      throw new Error("Verification code data is empty");
    }
    return data["accessToken"];
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      throw error;
    }
    console.error("An error occurred while accepting the invite link:", error);
    throw new Error("Internal Server Error");
  }
};
