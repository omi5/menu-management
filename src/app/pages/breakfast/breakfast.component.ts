import { Component, OnInit } from '@angular/core';
import { CategoryList } from 'src/app/interfaces/categoryList.interface';
import { CategoryService } from 'src/app/services/category.service';
import { GetMenuItemBySchuduleService } from 'src/app/services/get-menu-item-by-schudule.service';
import { MenuItemServiceService } from 'src/app/services/menu-item-service.service';
import { IItem } from 'src/app/interfaces/menuItem.interface';

@Component({
  selector: 'app-breakfast',
  templateUrl: './breakfast.component.html',
  styleUrls: ['./breakfast.component.css']
})
export class BreakfastComponent implements OnInit {

  isSpinning = false;

  categorizedMenu: { [key: string]: any[] } = {};
  categories: CategoryList[] = [];
  Object = Object;
 
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
  constructor(
    private menuService: MenuItemServiceService,
    private scheduleService: GetMenuItemBySchuduleService,
    private categoryService: CategoryService
  ) { }

  // filtercategoryList: any[]=[1,2]
  AllMenuItems : IItem[] = []
  listForBreakfastMenu :IItem[] = []
 
  getMenuItems() {
    this.isSpinning = true;
    this.menuService.getAllMenuItemByRestaurantId().subscribe(res => {
      this.AllMenuItems = res;      
      this.listForBreakfastMenu = this.AllMenuItems.filter(item => item.item.timeOfDay.includes('Breakfast'));
      this.isSpinning = false;
    });
    
  }
  
  ngOnInit(): void {
    this.getMenuItems();
  }
}
