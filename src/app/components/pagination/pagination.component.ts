import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pagination } from 'src/app/models/pagination';
import { ProductParams, UserParams } from 'src/app/models/userParams';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent {
  @Input() pagination: Pagination | undefined;
  @Input() params: ProductParams | UserParams | undefined;
  @Output() loadObjects: EventEmitter<void> = new EventEmitter<void>();

  visiblePages: number[] = [];

  ngOnInit(): void {
    this.updateVisiblePages();
  }

  pageChanged(page: number) {
    if (!this.pagination || this.pagination?.currentPage === page) {
      return;
    }
    if (!this.params) {
      return;
    }

    this.pagination.currentPage = page;
    this.params.pageNumber = page;
    this.updateVisiblePages();
    this.loadObjects.emit();
  }

  updateVisiblePages() {
    const currentPage = this.pagination?.currentPage || 0;
    const totalPages = this.pagination?.totalPages || 0;
    this.visiblePages = this.getVisiblePages(currentPage, totalPages);
  }

  getVisiblePages(currentPage: number, totalPages: number): number[] {
    const visiblePages = 3; // Number of visible pagination links

    let start = currentPage - Math.floor(visiblePages / 2);
    let end = currentPage + Math.ceil(visiblePages / 2) - 1;

    if (totalPages <= visiblePages) {
      start = 1;
      end = totalPages;
    } else if (start < 1) {
      start = 1;
      end = visiblePages;
    } else if (end > totalPages) {
      end = totalPages;
      start = end - visiblePages + 1;
    }

    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  }
}
