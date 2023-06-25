import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Category } from '../models/category';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  baseUrl = environment.apiUrl;
  private cacheKey = 'categories';

  constructor(private http: HttpClient, private cacheService: CacheService) {}

  getCategories(): Observable<Category[]> {
    const url = this.baseUrl + 'categories';

    const cachedCategories = this.cacheService.get<Category[]>(this.cacheKey);
    if (cachedCategories) {
      return of(cachedCategories);
    }

    return this.http.get<Category[]>(url).pipe(
      tap((categories) => {
        this.cacheService.set(this.cacheKey, categories);
        return categories;
      })
    );
  }
}
