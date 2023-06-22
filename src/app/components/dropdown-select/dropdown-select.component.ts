import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Category } from 'src/app/models/category';
import { ProductParams } from 'src/app/models/userParams';
import { CategoriesService } from 'src/app/services/category.service';
import { ProductsService } from 'src/app/services/product.service';

@Component({
  selector: 'app-dropdown-select',
  templateUrl: './dropdown-select.component.html',
  styleUrls: ['./dropdown-select.component.css'],
})
export class DropdownSelectComponent {
  @Input() options: any | undefined;
  @Output() selectFn: EventEmitter<any> = new EventEmitter<void>();
  @Input() selectedItem: any | undefined;
  @Input() displayLabel: any | undefined;

  isSelected = false;

  // constructor() {}
  select(item: any) {
    console.log('emit select');
    this.selectFn.emit(item);
    this.toggleDropdown();
  }

  toggleDropdown() {
    this.isSelected = !this.isSelected;
  }
}
