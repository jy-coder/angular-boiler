export interface Category {
  id?: number;
  name: string;
}

class CategoryOptions implements Category {
  id?: number;
  name: string;
  isSelected: boolean;

  constructor(category: Category) {
    this.id = category.id;
    this.name = category.name;
    this.isSelected = false;
  }
}
