import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { AuthUser } from '../models/user';
import { environment } from 'src/environments/environment.prod';
import { Credential } from '../models/credential';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new BehaviorSubject<AuthUser | null>(null);
  currentUser$ = this.currentUserSource.asObservable();
  constructor(private http: HttpClient) {}

  login(model: Credential): Observable<void> {
    return this.http.post<AuthUser>(this.baseUrl + 'account/login', model).pipe(
      map((response: AuthUser) => {
        const user = response;
        if (user) {
          const exp = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;
          localStorage.setItem('user', JSON.stringify({ ...user, exp }));

          this.currentUserSource.next(user);
        }
      })
    );
  }

  register(model: Credential) {
    return this.http.post<AuthUser>(this.baseUrl + 'account/register', model);
  }

  setCurrentUser(user: AuthUser) {
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
