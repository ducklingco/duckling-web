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
