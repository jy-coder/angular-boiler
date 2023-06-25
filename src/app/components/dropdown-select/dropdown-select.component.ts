import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Option } from 'src/app/models/options';

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

  select(item: Option) {
    this.selectFn.emit(item);
    this.toggleDropdown();
  }

  toggleDropdown() {
    this.isSelected = !this.isSelected;
  }
}
