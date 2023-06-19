import { Photo } from './photo';

export interface Profile {
  id: number;
  userName: string;
  created: string;
  photoUrl: string | null;
  photos: Photo[];
}
