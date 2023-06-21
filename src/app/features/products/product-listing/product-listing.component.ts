import { Component } from '@angular/core';
import { Observable } from 'rxjs';
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
  userTableColumns: string[] = ['id', 'description', 'price'];

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
          this.products = response.result;
          this.pagination = response.pagination;
        }
      },
      error: (error) => {
        console.log('Error:', error);
      },
    });
  }
}
