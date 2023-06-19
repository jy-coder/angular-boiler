import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { AuthUser } from '../models/user';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new BehaviorSubject<AuthUser | null>(null);
  currentUser$ = this.currentUserSource.asObservable();
  constructor(private http: HttpClient) {}

  login(model: any): Observable<any> {
    return this.http.post<AuthUser>(this.baseUrl + 'account/login', model).pipe(
      map((response: AuthUser) => {
        const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }

  register(model: any) {
    return this.http.post<AuthUser>(this.baseUrl + 'account/register', model).pipe(
      map((user) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
        }
      })
    );
  }

  setCurrentUser(user: AuthUser) {
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
