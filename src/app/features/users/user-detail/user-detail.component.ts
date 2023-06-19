import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  user: User | undefined;
  users: User[] = [];
  constructor(private userService: UsersService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // this.http.get('https://localhost:5001/api/users').subscribe({
    //   next: response => this.users = response,
    //   error: error => console.log(error),
    //   complete: () => console.log('Request has completed')
    // })
  }

  loadUserDetails() {
    const id = parseInt(this.route.snapshot.paramMap.get('id') ?? '0');
    this.userService.getUser(id);
  }
}
