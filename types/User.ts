export interface PublicUser {
  id: string;
  username: string;
  name: string;
  surname: string;
  bio?: string;
  imageId?: string;
  imageData?: Blob;
}
