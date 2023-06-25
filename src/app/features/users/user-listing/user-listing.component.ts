import { Component } from '@angular/core';
import { Pagination } from 'src/app/models/pagination';
import { Photo } from 'src/app/models/photo';
import { UserParams } from 'src/app/models/userParams';
import { UsersService } from 'src/app/services/users.service';

interface User {
  id: number;
  userName: string;
  created: string;
  photoUrl: string | null;
  photos: Photo[];
}

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.css'],
})
export class UserListingComponent {
  users: User[] = [];
  pagination: Pagination | undefined;
  userTableColumns: { key: string; type?: string }[] = [
    { key: 'id' },
    { key: 'userName' },
    { key: 'created' },
  ];
  userParams: UserParams | undefined;

  constructor(private userService: UsersService) {
    this.userParams = this.userService.getUserParams();
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    if (!this.userParams) {
      return;
    }

    this.userService.setUserParams(this.userParams);

    this.userService.getUsers(this.userParams).subscribe({
      next: (response) => {
        if (response.result && response.pagination) {
          this.users = response.result;
          this.pagination = response.pagination;
        }
      },
      error: (error) => {
        console.log('Error:', error);
      },
    });
  }
}
