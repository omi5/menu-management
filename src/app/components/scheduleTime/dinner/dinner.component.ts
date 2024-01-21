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


  filtercategoryList: any[]=[1,2]
  AllMenuItems : any[] = []
  listForDinnerMenu :any[] = []
  getMenuItems(){
    this.menuService.getAllMenuItems().subscribe(res=>{
      this.AllMenuItems.push(res);
      console.log('selected menu for Lunch',this.AllMenuItems);
      console.log('New Menu item for Lunch',this.AllMenuItems[0][0].item.timeOfDay.includes('Lunch'));
      
      for(let i = 0; i <= this.AllMenuItems[0].length; i++){
        if(this.AllMenuItems[0][i].item.timeOfDay.includes('Dinner')){
              this.listForDinnerMenu.push(this.AllMenuItems[0][i])
            }
      }

    })
    console.log('listOfDinnerMenu', this.listForDinnerMenu);
    
  }


  ngOnInit(): void {
    this.getMenuItems();
    // this.getFilterItemForBreakfast(1);
  
  }



 
}
