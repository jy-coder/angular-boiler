import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Option } from 'src/app/models/options';

@Component({
  selector: 'app-dropdown-multi-select',
  templateUrl: './dropdown-multi-select.component.html',
  styleUrls: ['./dropdown-multi-select.component.css'],
})
export class DropdownMultiSelectComponent {
  @Input() options: any[] | undefined;
  @Output() selectFn: EventEmitter<any> = new EventEmitter<void>();
  @Input() displayLabel: string | undefined;
  @Input() createOptions: Function = () => {};
  selectedIds: number[] = [];
  selectedName: string[] = [];
  isSelected: boolean = false;

  select(item: any) {
    this.selectFn.emit(item);
    this.toggleDropdown();
  }

  toggleDropdown() {
    this.isSelected = !this.isSelected;
  }

  toggleCheckbox(option: Option, event: Event) {
    option.isSelected = (event.target as HTMLInputElement).checked;
  }

  toggleSelection(option: Option) {
    if (option.isSelected) {
      this.selectedIds.push(option.id);
      this.selectedName.push(option.name);
    } else {
      const index = this.selectedIds.indexOf(option.id);
      if (index !== -1) {
        this.selectedIds.splice(index, 1);
        this.selectedName.splice(index, 1);
      }
    }
    this.selectFn.emit(this.selectedIds);
  }

  reset() {
    this.selectedIds = [];
    this.selectedName = [];
    this.options = this.options?.map((option: Option) => {
      return {
        ...option,
        isSelected: false,
      };
    });
  }
}
