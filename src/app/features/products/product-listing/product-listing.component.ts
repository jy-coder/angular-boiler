import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Pagination } from 'src/app/models/pagination';
import { Product } from 'src/app/models/product';
import { UserParams } from 'src/app/models/userParams';
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
  userParams: UserParams | undefined;
  userTableColumns: string[] = ['id', 'description', 'price'];

  constructor(private productService: ProductsService) {}

  ngOnInit() {
    this.loadProducts();
    // this.products$ = this.productService.getProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (products: Product[]) => {
        this.products = products;
      },
      error: (error) => {
        console.log('Error:', error);
      },
    });
  }
}
