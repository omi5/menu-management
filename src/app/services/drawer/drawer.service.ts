import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {

  constructor() { }

  visible: boolean = false;
  drawerVisibilityChange = new Subject<boolean>();

  setDrawerVisibility (state: boolean) {
    this.visible = state;
    this.drawerVisibilityChange.next(state);
  }
}
