import { Component, Input, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { MenuItemServiceService } from 'src/app/services/menu-item-service.service';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {

  constructor(private menuService: MenuItemServiceService){}

  @Input() itemName!: string;
  @Input() src!: string;
  @Input() ingredients!: number
  @Input() preparationTime!: number
  @Input() itemId!: number

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
  visible = false;
  editMenuItem(id: number): void {
    this.visible = true;
    this.getMenuItemById(id);
    
  }
  close(): void {
    this.visible = false;
  }

  
  
  //Get All Menu Item
  AllMenuItems : any[] = []
  getMenuItems(){
    this.menuService.getAllMenuItems().subscribe(res=>{
      this.AllMenuItems.push(res);
      // console.log(res);
      
      console.log(this.AllMenuItems);
    })
  }

  //get Menu Item By Id
  selectedMenuItem :any = [];
  getMenuItemById(id: any){
    this.menuService.getMenuItemById(id).subscribe(res=>{
      this.selectedMenuItem.push(res);
      console.log(" Menu Item by", res);
    })
  }

  


  

  //Delete a Menu Item 
  deleteMenuItem(id: number){
    this.menuService.deleteMenuItem(id).subscribe(res=>{
      console.log("Deleted Successfully");
    })
  }

  //Update Menu Item
  updateMenuItem(id: number){

  }



  //submit Data 
  restaurantId!: number;
  MealTimeId!: number;
  // itemName! : string;
  itemProfileTastyTags! : string;
  categoryId! : string;
  typeOfFoods! : string;
  itemPortionsize!: string;
  itemPreparationtime!: string;
  servingTemperature! : string;
  itemLastingTime!: string;
  itemPrice! : string;
  itemCalories! : string;
  itemDescription! : string;
  itemDietaryRestrictions! : string;
  itemImage! : string



}
