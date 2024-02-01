import { Component, Input, OnInit } from '@angular/core';
import { GetMenuItemBySchuduleService } from 'src/app/services/get-menu-item-by-schudule.service';
import { MenuItemServiceService } from 'src/app/services/menu-item-service.service';

@Component({
  selector: 'app-dinner',
  templateUrl: './dinner.component.html',
  styleUrls: ['./dinner.component.css']
})
export class DinnerComponent implements OnInit {
 
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

  ngOnInit(): void {
    this.getMenuItems();
    // this.getFilterItemForBreakfast(1);
  }

  filtercategoryList: any[]=[1,2]
  AllMenuItems : any[] = []
  listForDinnerMenu :any[] = []
  getMenuItems(){
    this.menuService.getAllMenuItems().subscribe(res=>{
      console.log('res',res);

      this.AllMenuItems = res;

      this.listForDinnerMenu = this.AllMenuItems.filter(item => item.item.timeOfDay.includes('Dinner'));
      
  
      // console.log('listOfDinnerMenu ====', this.listForDinnerMenu); 
    })
  }
  
}
