import { Category } from './category';

export interface CategoryOptions {
  id: number;
  name: string;
  isSelected: boolean;
}

export function createCategoryOption(category: Category, event: Event): CategoryOptions {
  return {
    id: category.id || 0,
    name: category.name,
    isSelected: (event.target as HTMLInputElement).checked,
  };
}
export type Option = CategoryOptions;
