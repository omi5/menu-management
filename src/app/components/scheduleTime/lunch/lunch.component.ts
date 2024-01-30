import { Component } from '@angular/core';
import { GetMenuItemBySchuduleService } from 'src/app/services/get-menu-item-by-schudule.service';
import { MenuItemServiceService } from 'src/app/services/menu-item-service.service';
import { MenuItem } from 'src/app/test-component/test-component.component';

@Component({
  selector: 'app-lunch',
  templateUrl: './lunch.component.html',
  styleUrls: ['./lunch.component.css']
})
export class LunchComponent {

  constructor(private menuService: MenuItemServiceService , private scheduleService: GetMenuItemBySchuduleService){}
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

  filtercategoryList: any[]=[1,2]
  AllMenuItems : any[] = []
  listForLunchMenu :MenuItem[] = []
  getMenuItems(){
    this.menuService.menuItemsSubject.subscribe(res=>{
      this.AllMenuItems.push(res);
      // console.log('selected menu for Lunch',this.AllMenuItems);
      // console.log('New Menu item for Lunch',this.AllMenuItems[0][0].item.timeOfDay.includes('Lunch'));
      for(let i = 0; i <= this.AllMenuItems[0].length; i++){
        if(this.AllMenuItems[0][i].item.timeOfDay.includes('Lunch')){
              this.listForLunchMenu.push(this.AllMenuItems[0][i])
            }
      }
    })
    // console.log('listOfLunchMenu', this.listForLunchMenu);  
  }

  ngOnInit(): void {
    this.getMenuItems();
    // this.getFilterItemForBreakfast(1);
  }
}
