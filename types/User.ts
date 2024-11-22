export interface PublicUser {
  id: string;
  username: string;
  name: string;
  surname: string;
  imageId?: string;
  imageData?: Blob;
}
