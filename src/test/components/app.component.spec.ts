import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from '../../app/components/pagination/pagination.component';
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

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit loadObjects event when pageChanged is called', () => {
    const pageNumber = 2;
    const userParams: UserParams = new UserParams();
    component.params = userParams;

    const emitMock = jest.fn();
    component.loadObjects = { emit: emitMock } as any;

    component.pageChanged(pageNumber);

    expect(emitMock).toHaveBeenCalled();
  });
});
