import type { DucklingCard, DucklingCardDetailed } from "~/types/Duckling";

export interface Duck {
  id: string;
  title: string;
  mediaId: string;
  author: string;
  ducklingsMediaReady: boolean;
  isBlacklisted: boolean;
  isFeatured: boolean;
  isPublic: boolean;
  isPublished: boolean;
  isVerified: boolean;
  mediaReady: boolean;
  nests: null;
}

export interface DuckWithContent extends Duck {
  ducklings: DucklingCard[];
}

export interface DuckWithContentDetailed extends Duck {
  ducklings: DucklingCardDetailed[];
}
