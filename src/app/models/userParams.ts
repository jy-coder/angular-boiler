import { User } from './user';

export class UserParams {
  pageNumber = 1;
  pageSize = 5;
  orderBy = 'created';
}

export class ProductParams {
  pageNumber = 1;
  pageSize = 5;
  orderBy = 'created';
  categoryId?: number;
  categoryIds?: number[];

  constructor(categoryId?: number, categoryIds?: number[]) {
    this.categoryId = categoryId;
    this.categoryIds = categoryIds;
  }
}
