export interface DucklingCard {
  type: "imageCard" | "textCard" | "videoCard";
  placement: number;
  ducklingCard: DucklingImage | DucklingText | DucklingVideo;
}

export interface DucklingImage {
  id: string;
  mediaId: string;
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
  mediaId: string;
}
