import { Component, OnInit } from '@angular/core';
import { CategoryList } from 'src/app/interfaces/categoryList.interface';
import { CategoryService } from 'src/app/services/category.service';
import { GetMenuItemBySchuduleService } from 'src/app/services/get-menu-item-by-schudule.service';
import { MenuItemServiceService } from 'src/app/services/menu-item-service.service';
import { MenuItem } from 'src/app/test-component/test-component.component';

@Component({
  selector: 'app-breakfast',
  templateUrl: './breakfast.component.html',
  styleUrls: ['./breakfast.component.css']
})
export class BreakfastComponent implements OnInit {

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

  filtercategoryList: any[]=[1,2]
  AllMenuItems : any[] = []
  listForBreakfastMenu :MenuItem[] = []
  // getMenuItems(){
  //   this.menuService.getAllMenuItems().subscribe(res=>{
  //     this.AllMenuItems.push(res);
  //     console.log('selected menu for Lunch',this.AllMenuItems);
  //     console.log('New Menu item for Lunch',this.AllMenuItems[0][0].item.timeOfDay.includes('BreakFast'));

  //     for(let i = 0; i <= this.AllMenuItems[0].length; i++){
  //       if(this.AllMenuItems[0][i].item.timeOfDay.includes('BreakFast')){
  //             this.listForBreakfastMenu.push(this.AllMenuItems[0][i])
  //           }
  //     }


  //   })
  //   console.log('listOfLunchMenu', this.listForBreakfastMenu);
    
  // }
 
  getMenuItems() {
    this.menuService.getAllMenuItemByRestaurantId().subscribe(res => {
      this.AllMenuItems = res;

      this.listForBreakfastMenu = this.AllMenuItems.filter(item => item.item.timeOfDay.includes('Breakfast'));
 
    });
  }
  
  ngOnInit(): void {
    this.getMenuItems();
  }
}
