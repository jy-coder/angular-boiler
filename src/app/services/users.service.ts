import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, map, of } from 'rxjs';
import { PaginatedResult, Pagination } from '../models/pagination';
import { getPaginatedResult, getPaginationHeaders } from '../utils/paginationHelper';
import { UserParams } from '../models/userParams';
import { environment } from 'src/environments/environment.prod';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  baseUrl = environment.apiUrl;
  users: User[] = [];
  userParams: UserParams | undefined;
  paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();
  private cacheKey = 'users';

  constructor(private http: HttpClient, private cacheService: CacheService) {
    this.userParams = new UserParams();
  }

  getUsers(userParams: UserParams): Observable<PaginatedResult<User[]>> {
    const response = this.cacheService.get(this.cacheKey + Object.values(userParams).join('-'));
    if (response) return of(response);
    let params = getPaginationHeaders(userParams.pageNumber, userParams.pageSize);
    params = params.append('orderBy', userParams.orderBy);
    return getPaginatedResult<User[]>(this.baseUrl + 'users', params, this.http).pipe(
      map((response) => {
        this.cacheService.set(this.cacheKey + Object.values(userParams).join('-'), response);
        return response;
      })
    );
  }

  getUser(id: number) {
    const user = this.users.find((x) => x.id === id);
    if (user) return of(user);
    return this.http.get<User>(this.baseUrl + 'users/' + id);
  }

  setUserParams(params: UserParams) {
    this.userParams = params;
  }

  getUserParams() {
    return this.userParams;
  }
}
