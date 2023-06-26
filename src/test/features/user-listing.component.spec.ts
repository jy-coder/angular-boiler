import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PaginatedResult, Pagination } from '../../app/models/pagination';
import { User } from '../../app/models/user';
import { UsersService } from '../../app/services/users.service';
import { UserListingComponent } from '../../app/features/users/user-listing/user-listing.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  template: '',
})

// prevent the UserListingComponent from binding to the app-table component during testing
class MockAppTableComponent {
  @Input() columnKeys: { key: string; type?: string }[] = [];
  @Input() routeName: string = '';
  @Input() objectList: any = [];
}

describe('UserListingComponent', () => {
  let component: UserListingComponent;
  let fixture: ComponentFixture<UserListingComponent>;
  let userService: UsersService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserListingComponent, MockAppTableComponent],
      imports: [HttpClientTestingModule],
      providers: [UsersService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListingComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UsersService);
    fixture.detectChanges();
  });

  it('verify user data is being updated in component', () => {
    const users = [
      { id: 1, userName: 'User 1', created: '2023-06-12', photoUrl: null, photos: [] },
    ];
    const pagination: Pagination = {
      currentPage: 1,
      itemsPerPage: 10,
      totalItems: 100,
      totalPages: 10,
    };

    const getUsersSpy = jest
      .spyOn(userService, 'getUsers')
      .mockReturnValue(of({ result: users, pagination } as PaginatedResult<User[]>));

    component.loadUsers();

    expect(getUsersSpy).toHaveBeenCalled();
    expect(component.users).toEqual(users);
    expect(component.pagination).toEqual(pagination);
  });
});
