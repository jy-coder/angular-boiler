import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category';
import { Pagination } from 'src/app/models/pagination';
import { Product } from 'src/app/models/product';
import { ProductParams } from 'src/app/models/userParams';
import { ProductsService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css'],
})
export class ProductListingComponent {
  // products$: Observable<Product[]> | undefined;
  products: Product[] | undefined;
  pagination: Pagination | undefined;
  productParams: ProductParams | undefined;
  productTableColumns: { key: string; type?: string }[] = [
    { key: 'id' },
    { key: 'description' },
    { key: 'price' },
    { key: 'categories', type: 'tag' },
  ];

  constructor(private productService: ProductsService) {
    this.productParams = this.productService.getProductParams();
  }

  ngOnInit() {
    this.loadProducts();
    // this.products$ = this.productService.getProducts();
  }

  loadProducts() {
    if (!this.productParams) {
      return;
    }
    this.productService.getProducts(this.productParams).subscribe({
      next: (response) => {
        if (response.result && response.pagination) {
          this.products = response.result.map((product) => {
            const categoryNames = product.categories.map((category) => category.name);
            const categories: Category[] = categoryNames.map((name) => ({ name }));

            return { ...product, categories };
          });
          this.pagination = response.pagination;
        }
      },
      error: (error) => {
        console.log('Error:', error);
      },
    });
  }
}
