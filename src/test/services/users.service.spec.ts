import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { UserParams } from '../../app/models/userParams';
import { UsersService } from '../../app/services/users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService],
    });

    service = TestBed.inject(UsersService);
  });

  it('should retrieve user data with correct structure', async () => {
    const userParams: UserParams = new UserParams();

    const expectedUsers = [
      {
        id: expect.any(Number),
        userName: expect.any(String),
        created: expect.any(String),
        photoUrl: expect.anything(),
        photos: expect.arrayContaining([
          {
            id: expect.any(Number),
            url: expect.any(String),
            isMain: expect.any(Boolean),
          },
        ]),
      },
    ];

    service.getUsers(userParams).subscribe((users) => {
      expect(users).toEqual(expectedUsers);
    });
  });
});
