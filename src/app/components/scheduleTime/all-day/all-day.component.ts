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

  //get All Menu
  filtercategoryList: any[]=[1,2]
  AllMenuItems : any[] = []
  listForAllDayMenu :any[] = []
  getMenuItems(){
    this.isSpinning = true;
    this.menuService.getAllMenuItemByRestaurantId().subscribe(res=>{
      this.AllMenuItems = res;
      this.listForAllDayMenu = this.AllMenuItems.filter(item => item.item.timeOfDay.includes('All day')); 
      this.isSpinning = false;
    })
   
  } 
}

// if (this.AllMenuItems[0].length) {
      //   for(let i = 0; i <= this.AllMenuItems[0].length; i++){
      //     if (this.AllMenuItems[0][i]){
      //       if(this.AllMenuItems[0][i].item.timeOfDay.includes('All day')){
      //         this.listForAllDayMenu.push(this.AllMenuItems[0][i])
      //       }
      //     }
          
      //   }

      // }
    // console.log('listOfBreakfastMenu', this.listForAllDayMenu);