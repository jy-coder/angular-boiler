import { Component } from '@angular/core';
import { User } from 'src/app/components/models/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.css'],
})
export class UserListingComponent {
  users: User[] = [];

  constructor(private userService: UsersService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe({
      next: (users: User[]) => {
        this.users = users;
      },
      error: (error) => {
        console.log('Error:', error);
      },
    });
  }
}
