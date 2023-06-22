import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, map, of } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Category } from '../models/category';
import { PaginatedResult } from '../models/pagination';
import { getPaginatedResult, getPaginationHeaders } from '../utils/paginationHelper';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  baseUrl = environment.apiUrl;
  categories: Category[] = [];
  categoryCache = new Map();

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    const url = this.baseUrl + 'categories';
    return this.http.get<Category[]>(url).pipe(
      map((categories) => {
        this.categories = categories;
        return categories;
      })
    );
  }
}
