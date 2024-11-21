interface DucklingCardBase {
  placement: number;
}

interface ImageCard extends DucklingCardBase {
  type: "imageCard";
  duckling: DucklingImage;
}

interface TextCard extends DucklingCardBase {
  type: "textCard";
  duckling: DucklingText;
}

interface VideoCard extends DucklingCardBase {
  type: "videoCard";
  duckling: DucklingVideo;
}

export interface DucklingCard extends DucklingCardBase {
  type: "imageCard" | "textCard" | "videoCard";
  duckling: string;
}

export type DucklingCardDetailed = ImageCard | TextCard | VideoCard;

export interface DucklingImage {
  id: string;
  imageId: string;
  imageCoverFit: boolean;
  caption?: string;
  audioId?: string;
}

export interface DucklingText {
  id: string;
  content: string;
  fontSize: number;
}

export interface DucklingVideo {
  id: string;
  videoId: string;
}
