import { Component, Input } from '@angular/core';
import { getObjectKeys } from 'src/app/utils/helper';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent<T> {
  @Input() columnKeys: { key: string; type?: string }[] = [];
  @Input() objectList: any = [];
  @Input() routeName: string = '';
  getObjectKeys = getObjectKeys;

  constructor() {}

  ngOnInit() {}

  getRouterLink(param: string): string {
    return this.routeName + param;
  }
}
