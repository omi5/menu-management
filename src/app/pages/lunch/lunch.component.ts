import { Component } from '@angular/core';
import { GetMenuItemBySchuduleService } from 'src/app/services/get-menu-item-by-schudule.service';
import { MenuItemServiceService } from 'src/app/services/menu-item-service.service';
import { MenuItem } from 'src/app/components/category-container/category-container.component';
import { IItem } from 'src/app/interfaces/menuItem.interface';

@Component({
  selector: 'app-lunch',
  templateUrl: './lunch.component.html',
  styleUrls: ['./lunch.component.css']
})
export class LunchComponent {

  constructor(private menuService: MenuItemServiceService , private scheduleService: GetMenuItemBySchuduleService){}
  isSpinning = false;
  isCollapsed = true;
  //for modal
  isVisible = false;
  //use in Nz-sider
  showModal(): void {
    this.isVisible = true;
  }
  handleOk(): void {
    this.isVisible = false;
    // this.submitForm();
  }
  handleCancel(): void {
    this.isVisible = false;
  }

  // filtercategoryList: any[]=[1,2]
  AllMenuItems : IItem[] = []
  listForLunchMenu :IItem[] = []
  getMenuItems(){
    this.isSpinning = true;
    this.menuService.getAllMenuItemByRestaurantId().subscribe(res=>{
      this.AllMenuItems = res;
      this.listForLunchMenu = this.AllMenuItems.filter(item => item.item.timeOfDay.includes('Lunch'));
      this.isSpinning = false;
    })
     
  }

  ngOnInit(): void {
    this.getMenuItems();
    // this.getFilterItemForBreakfast(1);
  }
}
