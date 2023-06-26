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
export class UserDetailComponent {
  user: User | undefined;
  users: User[] = [];
  constructor(private userService: UsersService, private route: ActivatedRoute) {}

  loadUserDetails() {
    const id = parseInt(this.route.snapshot.paramMap.get('id') ?? '0');
    this.userService.getUser(id);
  }
}
