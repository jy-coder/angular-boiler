import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent<T> {
  @Input() columnKeys: string[] = [];
  @Input() objectList: any = [];
  @Input() routeName: string = '';
  constructor() {}

  ngOnInit() {}

  getRouterLink(param: string): string {
    return this.routeName + param;
  }
}
