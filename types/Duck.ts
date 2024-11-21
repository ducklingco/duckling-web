import type { DucklingCard } from "./Duckling";
import type { PublicUser } from "./User";

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

export interface DuckDetailed extends Duck {
  authorDetails?: PublicUser;
  mediaImage?: Blob;
}

export interface DuckWithContent extends DuckDetailed {
  ducklings: DucklingCard[];
}
