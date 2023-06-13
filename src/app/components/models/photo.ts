export interface Photo {
  id: number;
  url: string | null;
  isMain: boolean;
}

export interface Profile {
  photos: Photo[];
}
