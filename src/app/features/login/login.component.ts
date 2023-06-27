import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { AuthUser } from 'src/app/models/user';
import { Login } from 'src/app/models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  model: Login = { username: '', password: '' };
  currentUser$: Observable<AuthUser | null> = of(null);

  constructor(
    public accountService: AccountService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
  }

  getCurrentUser() {
    this.accountService.currentUser$.subscribe({
      next: () => {
        this.router.navigateByUrl('/users');
      },
      error: (error) => this.toastr.error(error.error),
    });
  }
  login() {
    this.accountService.login(this.model).subscribe({
      next: () => {
        this.router.navigateByUrl('/users');
      },
      error: (error) => this.toastr.error(error.error),
    });
  }

  // logout() {
  //   this.accountService.logout();
  //   this.router.navigateByUrl('/');
  // }
}
