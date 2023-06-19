import { Component } from '@angular/core';
import { Photo } from 'src/app/models/photo';
import { UsersService } from 'src/app/services/users.service';
import { getObjectKeys } from 'src/app/utils/helper';

interface User {
  id: number;
  userName: string;
  created: string;
  photoUrl: string | null;
  photos: Photo[];
}
const user: User = {} as User;
@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.css'],
})
export class UserListingComponent {
  users: User[] = [];
  userTableColumns: string[] = ['id', 'userName', 'created', 'photoUrl'];

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
