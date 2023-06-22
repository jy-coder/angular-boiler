import { Component } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryOptions } from 'src/app/models/options';
import { ProductParams } from 'src/app/models/userParams';
import { CategoriesService } from 'src/app/services/category.service';
import { ProductsService } from 'src/app/services/product.service';

@Component({
  selector: 'app-category-listing',
  templateUrl: './category-listing.component.html',
  styleUrls: ['./category-listing.component.css'],
})
export class CategoryListingComponent {
  categories: Category[] | undefined;
  selectedCategory: any;
  selectedMultiCategory: any;
  isSelected = false;

  constructor(
    private categoryService: CategoriesService,
    private productService: ProductsService
  ) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.log('Error:', error);
      },
    });
  }

  //single
  selectCategory(category: Category) {
    this.selectedCategory = category;
    const params = new ProductParams(category.id);
    this.productService.productParams = params;
    this.productService.reloadProducts();
  }

  // multiple
  selectCategoryOptions(selectedCategoryIds: number[]) {
    const params = new ProductParams(undefined, selectedCategoryIds);
    this.productService.productParams = params;
    this.productService.reloadProducts();
  }

  createCategoryOption(category: Category, event: Event): CategoryOptions {
    return {
      id: category.id || 0,
      name: category.name,
      isSelected: (event.target as HTMLInputElement).checked,
    };
  }
}
