import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, map, of } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  baseUrl = environment.apiUrl;
  users: User[] = [];

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'users').pipe(
      map((users) => {
        this.users = users;
        return users;
      })
    );
  }

  getUser(id: number) {
    const user = this.users.find((x) => x.id === id);
    console.log('user: ' + user);
    if (user) return of(user);
    return this.http.get<User>(this.baseUrl + 'users/' + id);
  }
}
