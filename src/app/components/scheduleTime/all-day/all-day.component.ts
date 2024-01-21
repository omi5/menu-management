import { Component, OnInit } from '@angular/core';
import { GetMenuItemBySchuduleService } from 'src/app/services/get-menu-item-by-schudule.service';
import { MenuItemServiceService } from 'src/app/services/menu-item-service.service';
import { MenuItem } from 'src/app/test-component/test-component.component';

@Component({
  selector: 'app-all-day',
  templateUrl: './all-day.component.html',
  styleUrls: ['./all-day.component.css']
})
export class AllDayComponent implements OnInit{

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


  //get All Menu
  filtercategoryList: any[]=[1,2]
  AllMenuItems : any[] = []
  listForAllDayMenu :any[] = []
  // getMenuItems(){
  //   this.menuService.getAllMenuItems().subscribe(res=>{
  //     this.AllMenuItems.push(res);
  //     console.log('selected menu for breakfast',this.AllMenuItems);
  //     console.log('New Menu item',this.AllMenuItems[0][0].item.timeOfDay.includes('All Day'));

  //     for(let i = 0; i <= this.AllMenuItems[0].length; i++){
  //       if(this.AllMenuItems[0][i].item.timeOfDay.includes('All Day')){
  //             this.listForAllDayMenu.push(this.AllMenuItems[0][i])
  //           }
  //     }

  //   })
  //   console.log('listOfBreakfastMenu', this.listForAllDayMenu);
    
  // } 

  getMenuItems() {
    this.menuService.getAllMenuItems().subscribe(res => {
      this.AllMenuItems.push(res);
      console.log('Selected menu for all====', this.AllMenuItems);
  
      // this.AllMenuItems[0].forEach((item: MenuItem) => {
      //   if (item.item.timeOfDay.includes('BreakFast')) {
      //     console.log('Item added to breakfast menu====:', item);
      //     this.listForAllDayMenu.push(item);
      //   }
      // });
  
      // console.log('listOfLunchMenu====', this.listForAllDayMenu);
    });
  }


  

}
