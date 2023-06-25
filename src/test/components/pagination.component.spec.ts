import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from '../../app/components/pagination/pagination.component';
import { Pagination } from '../../app/models/pagination';
import { UserParams } from '../../app/models/userParams';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit loadObjects event when pageChanged is called', () => {
    const pagination: Pagination = {
      currentPage: 1,
      itemsPerPage: 10,
      totalItems: 100,
      totalPages: 10,
    };
    component.pagination = pagination;
    component.params = new UserParams();

    const loadObjectsSpy = jest.spyOn(component.loadObjects, 'emit');

    const page = 2;
    component.pageChanged(page);

    expect(loadObjectsSpy).toHaveBeenCalled();
  });
});
