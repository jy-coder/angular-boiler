import { Component, OnInit } from '@angular/core';
import { AccountService } from './services/account.service';
import { AuthUser } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'client';
  isCursorDisabled = false;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user: AuthUser = JSON.parse(userString);
    const exp = user?.exp;

    if (exp && exp <= new Date().getTime()) {
      localStorage.removeItem('user');
      return;
    }
    this.accountService.setCurrentUser(user);
  }
}
