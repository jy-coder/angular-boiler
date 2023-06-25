import { Component, Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { Option } from 'src/app/models/options';
import { Renderer2 } from '@angular/core';

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
  @Input() selectedIds: number[] = [];
  @Input() selectedName: string[] = [];
  isSelected: boolean = false;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

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
  dropdownClicked(event: MouseEvent): boolean {
    const dropdownTrigger = this.elementRef.nativeElement.querySelector('.dropdown-trigger');
    const dropdownMenu = this.elementRef.nativeElement.querySelector('.dropdown-menu');

    return (
      (dropdownTrigger && dropdownTrigger.contains(event.target)) ||
      (dropdownMenu && dropdownMenu.contains(event.target))
    );
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.dropdownClicked(event)) {
      this.isSelected = false;
    }
  }
}
