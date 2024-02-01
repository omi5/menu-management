import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectedItemService {

  constructor() { }

  selectedItem: any = null;
  newItem = new Subject<any>();

  setNewItem (item: any) {
    this.selectedItem = item;
    this.newItem.next(item);
  }
}
