import { Component } from '@angular/core';
import { GetMenuItemBySchuduleService } from 'src/app/services/get-menu-item-by-schudule.service';
import { MenuItemServiceService } from 'src/app/services/menu-item-service.service';

@Component({
  selector: 'app-all-day',
  templateUrl: './all-day.component.html',
  styleUrls: ['./all-day.component.css']
})
export class AllDayComponent {

  isCollapsed = false;
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


  //get All Menu
  filtercategoryList: any[]=[1,2]
  AllMenuItems : any[] = []
  listForAllDayMenu :any[] = []
  getMenuItems(){
    this.menuService.getAllMenuItems().subscribe(res=>{
      this.AllMenuItems.push(res);
      console.log('selected menu for breakfast',this.AllMenuItems);
      console.log('New Menu item',this.AllMenuItems[0][0].item.timeOfDay.includes('All Day'));

      for(let i = 0; i <= this.AllMenuItems[0].length; i++){
        if(this.AllMenuItems[0][i].item.timeOfDay.includes('All Day')){
              this.listForAllDayMenu.push(this.AllMenuItems[0][i])
            }
      }
      // if(this.AllMenuItems[0][0].item.timeOfDay.includes('BreakFast')){
      //   this.listForBreakfastMenu.push(this.AllMenuItems[0][0])
      // }

    })
    console.log('listOfBreakfastMenu', this.listForAllDayMenu);
    
  } 


  //For Category
  categories = [
    // {
    //   categoryName: 'Burger',
    //   items: [
    //     { itemName: 'Cheeseburger', itemImage:"https://i.pinimg.com/236x/43/7c/44/437c447768d443d33d9ee3743e87dd08.jpg"},
    //     { itemName: 'Veggie Burger' , itemImage:"https://i.pinimg.com/236x/1d/05/4f/1d054feca1cda7e0bfaa14f8177c34a3.jpg"},
    //     { itemName: 'Bacon Burger', itemImage:"https://i.pinimg.com/236x/6f/68/02/6f68022db1a7db64d167ee58463b4956.jpg" },
    //     { itemName: 'Mushroom Burger', itemImage:"https://i.pinimg.com/236x/3e/82/bc/3e82bc8c087db8b3e2ab52fdc071bd9c.jpg" }
    //   ]
    // },
    // {
    //   categoryName: 'Pizza',
    //   items: [
    //     { itemName: 'Margherita', itemImage:"https://i.pinimg.com/236x/0a/34/c1/0a34c17ac88f93878b0d3253ffd39e1f.jpg" },
    //     { itemName: 'Pepperoni' , itemImage:"https://i.pinimg.com/236x/03/84/94/038494436cde590b4c18fbd0b95e300c.jpg"},
    //     { itemName: 'Vegetarian' , itemImage:"https://i.pinimg.com/236x/fd/c8/53/fdc85341df5d203726a85a0512fc5e4a.jpg"},
    //     { itemName: 'Hawaiian', itemImage:"https://i.pinimg.com/236x/13/74/bf/1374bfa9356dde3206385ca2c8bdbe60.jpg" },
        
    //   ]
    // }
    {
      // categoryName: this.categoriesName,
      items: this.listForAllDayMenu
    }
  ];

}
