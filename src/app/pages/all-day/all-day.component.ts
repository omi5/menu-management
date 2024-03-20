import { Component, OnInit } from '@angular/core';
import { GetMenuItemBySchuduleService } from 'src/app/services/get-menu-item-by-schudule.service';
import { MenuItemServiceService } from 'src/app/services/menu-item-service.service';
import { MenuItem } from 'src/app/components/category-container/category-container.component';
import { IItem } from 'src/app/interfaces/menuItem.interface';

@Component({
  selector: 'app-all-day',
  templateUrl: './all-day.component.html',
  styleUrls: ['./all-day.component.css']
})
export class AllDayComponent implements OnInit{

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
  constructor(private menuService: MenuItemServiceService , private scheduleService: GetMenuItemBySchuduleService){}
  ngOnInit(): void {
   this.getMenuItems()
  }

  AllMenuItems : IItem[] = []
  listForAllDayMenu :IItem[] = []
  getMenuItems(){
    this.isSpinning = true;
    this.menuService.getAllMenuItemByRestaurantId().subscribe(res=>{
      this.AllMenuItems = res;
      this.listForAllDayMenu = this.AllMenuItems.filter(item => item.item.timeOfDay.includes('All day')); 
      this.isSpinning = false;
    })
   
  } 
}