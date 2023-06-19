import { Photo } from './photo';

export interface User {
  id: number;
  userName: string;
  created: string;
  photoUrl: string | null;
  photos: Photo[];
}

export interface AuthUser {
  userName: string;
  token: string | null;
}
