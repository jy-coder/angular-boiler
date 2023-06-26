import { Component, Input } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryOptions, createCategoryOption } from 'src/app/models/options';
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
  createCategoryOption = createCategoryOption;
  @Input() reload = false;
  @Input() multi: boolean | undefined;

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
    if (!this.reload) {
      return;
    }
    this.selectedCategory = category;
    const params = new ProductParams(category.id);
    this.productService.productParams = params;
    this.productService.reloadProducts();
  }

  // multiple
  selectCategoryOptions(selectedCategoryIds: number[]) {
    if (!this.reload) {
      return;
    }
    const params = new ProductParams(undefined, selectedCategoryIds);
    this.productService.productParams = params;
    this.productService.reloadProducts();
  }
}
