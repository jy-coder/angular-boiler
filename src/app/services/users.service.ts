import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  public getUsers() {
    return this.http.get(
      'https://gist.github.com/saltukalakus/124bba04327d8e5eab605d4fb66c53b8'
    );
  }
}
