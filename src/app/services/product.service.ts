import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, map, of } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  baseUrl = environment.apiUrl;
  products: Product[] = [];

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + 'products').pipe(
      map((products) => {
        this.products = products;
        return products;
      })
    );
  }

  getProduct(id: number) {
    const product = this.products.find((x) => x.id === id);
    console.log('product: ' + JSON.stringify(product));
    if (product) return of(product);
    return this.http.get<Product>(this.baseUrl + 'products/' + id);
  }

  editProduct(id: number, model: any) {
    return this.http
      .put<Product>(this.baseUrl + 'products/' + id, model)
      .pipe(map((product) => {}));
  }
}
