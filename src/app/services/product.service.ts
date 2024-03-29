import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, Subject, map, of } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Product } from '../models/product';
import { ProductParams, UserParams } from '../models/userParams';
import { PaginatedResult } from '../models/pagination';
import { getPaginatedResult, getPaginationHeaders } from '../utils/paginationHelper';
import { CacheService } from './cache.service';

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
  private cacheKey = 'products';

  constructor(private http: HttpClient, private cacheService: CacheService) {
    this.productParams = new ProductParams();
  }

  getProducts(productParams: ProductParams): Observable<PaginatedResult<Product[]>> {
    const cachedProductKey = `${this.cacheKey}- ` + JSON.stringify(productParams);
    const cachedProductData = this.cacheService.get(cachedProductKey);

    if (cachedProductData) {
      return of(cachedProductData);
    }

    let params = getPaginationHeaders(productParams.pageNumber, productParams.pageSize);
    params = params.append('orderBy', productParams.orderBy);
    if (productParams.categoryIds) {
      params = params.append('categoryIds', productParams.categoryIds.join(','));
    }
    return getPaginatedResult<Product[]>(this.baseUrl + 'products', params, this.http).pipe(
      map((response) => {
        this.cacheService.set(cachedProductKey, response);
        return response;
      })
    );
  }

  getProduct(id: number) {
    const product = this.products.find((x) => x.id === id);
    if (product) return of(product);
    return this.http.get<Product>(this.baseUrl + 'products/' + id);
  }

  editProduct(id: number, model: Product) {
    return this.http.put<Product>(this.baseUrl + 'products/' + id, model);
  }

  createProduct(model: Product) {
    return this.http.post<Product>(this.baseUrl + 'products', model);
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
