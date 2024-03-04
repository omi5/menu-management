import { Component, OnInit, ViewChild } from '@angular/core';
import { InventoryService } from './services/inventory.service';
import { IngredientService } from './services/ingredient/ingredient.service';
import { SelectedItemService } from './services/selected-item/selected-item.service';
import { DrawerService } from './services/drawer/drawer.service';
import { MenuItemServiceService } from './services/menu-item-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor (private inventoryService: InventoryService, private ingredientService: IngredientService, private selectedItemService: SelectedItemService, private drawerService: DrawerService, private menuService: MenuItemServiceService) {}

  selectedItem : any = null;
  infoDrawerVisibility: boolean = false;

  ngOnInit(): void {
    this.inventoryService.getAllInventoryIngredients().subscribe(data => {
      this.ingredientService.setNewIngredients(data);
    });

    this.selectedItem = this.selectedItemService.selectedItem;
    this.selectedItemService.newItem.subscribe(data => {
      this.selectedItem = data;
      // console.log('Selected Item:', this.selectedItem)
      this.drawerService.setDrawerVisibility(true);
    });

    this.infoDrawerVisibility = this.drawerService.visible;
    this.drawerService.drawerVisibilityChange.subscribe(state => this.infoDrawerVisibility = state);
    // console.log('selectedItemFrom app', this.selectedItemService.selectedItem);
    
  }



  @ViewChild('EditItem') EditItem: any;
  //Update Menu Item
  updateMenuItem(){
  this.EditItem.onsubmit()
  this.closeForEdit()
  }

  visibleForEdit = false;
  openForEdit(){
   this.visibleForEdit = true;
   }

  closeForEdit(){
    this.visibleForEdit = false;
  }

  
  title = 'menu-Builder';

  closeInfoDrawer () {
    this.drawerService.setDrawerVisibility(false);
  }

  OpenADrawerForEdit(){
    this.openForEdit()
  }
}
