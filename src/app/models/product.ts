import { Category } from './category';
import { Photo } from './photo';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  created: string;
  photoUrl: string;
  photos: Photo[];
  categories: Category[];
}
