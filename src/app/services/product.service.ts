import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, Subject, map, of } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Product } from '../models/product';
import { ProductParams, UserParams } from '../models/userParams';
import { PaginatedResult } from '../models/pagination';
import { getPaginatedResult, getPaginationHeaders } from '../utils/paginationHelper';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  baseUrl = environment.apiUrl;
  products: Product[] = [];
  productParams: ProductParams | undefined;
  paginatedResult: PaginatedResult<Product[]> = new PaginatedResult<Product[]>();
  private reloadSubject = new Subject<void>();
  productCache = new Map();

  constructor(private http: HttpClient) {
    this.productParams = new ProductParams();
  }

  getProducts(productParams: ProductParams): Observable<PaginatedResult<Product[]>> {
    let params = getPaginationHeaders(productParams.pageNumber, productParams.pageSize);
    params = params.append('orderBy', productParams.orderBy);
    if (productParams.categoryIds) {
      params = params.append('categoryIds', productParams.categoryIds.join(','));
    }
    return getPaginatedResult<Product[]>(this.baseUrl + 'products', params, this.http).pipe(
      map((response) => {
        return response;
      })
    );
  }

  getProduct(id: number) {
    const product = this.products.find((x) => x.id === id);
    if (product) return of(product);
    return this.http.get<Product>(this.baseUrl + 'products/' + id);
  }

  editProduct(id: number, model: any) {
    return this.http.put<Product>(this.baseUrl + 'products/' + id, model);
  }

  setProductParams(params: ProductParams) {
    this.productParams = params;
  }

  getProductParams() {
    return this.productParams;
  }

  reloadProducts() {
    this.reloadSubject.next();
  }

  getReloadObservable() {
    return this.reloadSubject.asObservable();
  }
}
