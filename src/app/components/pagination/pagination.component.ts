import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pagination } from 'src/app/models/pagination';
import { UserParams } from 'src/app/models/userParams';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent {
  @Input() pagination: Pagination | undefined;
  @Input() userParams: UserParams | undefined;
  @Output() loadObjects: EventEmitter<void> = new EventEmitter<void>();

  visiblePages: number[] = [];

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.updateVisiblePages();
  }

  pageChanged(page: number) {
    if (this.userParams && this.userParams?.pageNumber !== page) {
      this.userParams.pageNumber = page;
      this.loadObjects.emit();
    }
  }

  updateVisiblePages() {
    const currentPage = this.pagination?.currentPage || 0;
    const totalPages = this.pagination?.totalPages || 0;
    this.visiblePages = this.getVisiblePages(currentPage, totalPages);
  }

  getVisiblePages(currentPage: number, totalPages: number): number[] {
    const visiblePages = 3; // Number of visible pagination links
    let start = 1;
    let end = totalPages || 0;

    if (totalPages && currentPage) {
      if (totalPages <= visiblePages) {
        // Show all pages if the total number of pages is less than or equal to the visible range
        start = 1;
        end = totalPages;
      } else {
        // Calculate the start and end index for the visible range
        const halfVisible = Math.floor(visiblePages / 2);
        start = currentPage - halfVisible;
        end = currentPage + halfVisible;

        if (start < 1) {
          // Adjust the range if the start index is less than 1
          end += 1 - start;
          start = 1;
        } else if (end > totalPages) {
          // Adjust the range if the end index is greater than the total number of pages
          start -= end - totalPages;
          end = totalPages;
        }

        // Check if the visible range is still smaller than the desired number of visible pages
        const visibleRange = end - start + 1;
        if (visibleRange < visiblePages) {
          if (start > 1) {
            // Adjust the range to include more pages before the current page
            const missingPages = visiblePages - visibleRange;
            start = Math.max(1, start - missingPages);
            end = Math.min(totalPages, end + missingPages);
          } else if (end < totalPages) {
            // Adjust the range to include more pages after the current page
            const missingPages = visiblePages - visibleRange;
            end = Math.min(totalPages, end + missingPages);
            start = Math.max(1, end - visiblePages + 1);
          }
        }
      }
    }

    // Generate the array of visible page numbers
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  }
}
