import { MediaType } from "~/types/MediaType";

export const getMimeTypeFromMediaType = (mediaType: MediaType): string => {
  switch (mediaType) {
    case MediaType.IMAGE:
      return "image/png";
    case MediaType.VIDEO:
      return "video/mp4";
    case MediaType.COVER_IMAGE:
      return "image/png";
    case MediaType.PFP:
      return "image/png";
    case MediaType.AUDIO:
      return "audio/mpeg";
    case MediaType.NEST_IMAGE:
      return "image/png";
    default:
      return "application/octet-stream";
  }
};
