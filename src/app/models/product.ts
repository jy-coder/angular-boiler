import { Photo } from './photo';

export interface Product {
  id: number;
  description: string;
  price: number;
  created: string;
  photoUrl: string;
  photos: Photo[];
}
