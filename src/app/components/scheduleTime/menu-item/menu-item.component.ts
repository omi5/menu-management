import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CategoryList } from 'src/app/interfaces/categoryList.interface';
import { MenuItemServiceService } from 'src/app/services/menu-item-service.service';
import { SelectedItemService } from 'src/app/services/selected-item/selected-item.service';
import { DrawerService } from 'src/app/services/drawer/drawer.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {
  constructor(private menuService: MenuItemServiceService , private location: Location, private selectedItemService: SelectedItemService, private drawerService: DrawerService,private message: NzMessageService){
  }

  @Input() menuitem! : any;
  @Input() itemName!: string;
  @Input() src!: string;
  @Input() ingredients!: any
  @Input() preparationTime!: number
  @Input() itemPrice!: number
  @Input() id!: string
  @Input() itemCalories!: number
  @Input() itemPortionSize!: string
  @Input() itemservingTemp!: number
  @Input() itemLastingTime!: number
  @Input() timeOfDay!: any
  @Input() categoryName! : string
  @Input() itemProfileTastyTags!: any
  @Input() itemDietaryRestrictions!: any
  @Input() recipes!: any

  ngOnInit(): void {
    this.getMenuItems();
    // this.getMenuItemById(13);
  }
  // For Modal
  // isVisible = false;
  // constructor(private modalService: NzModalService) {}
  // showModal(): void {
  //   this.isVisible = true;
  // }
  // handleOk(): void {
  //   this.isVisible = false;
  // }
  // handleCancel(): void {
  //   this.isVisible = false;
  // }

  //For Menu Item Drawer
  ItemForEdit : any;
  visible = false;

  viewMenuItem () {
    console.log("From menu item:", this.menuitem);
    this.selectedItemService.setNewItem(this.menuitem);
  }

  close(): void {
    this.visible = false;
  }
  //Get All Menu Item
  AllMenuItems : any[] = []
  getMenuItems(){
    this.menuService.getAllMenuItems().subscribe(res=>{
      this.AllMenuItems.push(...res);
    })
  }
  //get Menu Item By Id
  selectedMenuItem :any = [] ;


  //Delete a Menu Item 
  deleteMenuItem(id: string){
    this.menuService.deleteMenuItem(id).subscribe(res=>{
      this.message.success('Successfully deleted');
      window.location.reload();
    })
  }

  // @ViewChild('EditItem') EditItem: any;
  //Update Menu Item
  // updateMenuItem(){
  // console.log('click from updateMenu');
  
  // this.EditItem.onsubmit()
  // }
  //For Edit item
  item : any;
//   OpenADrawerForEdit(id: string){
//     console.log('click');
    
//      this.item = this.AllMenuItems.find(item => item._id  === id);
//      this.openForEdit();
//      this.EditItem.editItem()
//      console.log('item===', this.item);
     
//   } 
//   visibleForEdit = false;
//  openForEdit(){
//   this.visibleForEdit = true;
//   }
//   closeForEdit(){
//     this.visibleForEdit = false;
//   }

  // onItemClick () {
  //   this.selectedItemService.selectedItem = this.item;
  // }
}
