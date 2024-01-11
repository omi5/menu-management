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


  filtercategoryList: any[]=[1,2]
  AllMenuItems : any[] = []
  listForDinnerMenu :any[] = []
  getMenuItems(){
    this.menuService.getAllMenuItems().subscribe(res=>{
      this.AllMenuItems.push(res);
      console.log('selected menu for Lunch',this.AllMenuItems);
      console.log('New Menu item for Lunch',this.AllMenuItems[0][0].item.timeOfDay.includes('Lunch'));
      // for(let i of this.AllMenuItems[0]){
      //   if(this.AllMenuItems[0][i].item.timeOfDay.includes('Lunch')){
      //     this.listForLunchMenu.push(this.AllMenuItems[0][i])
      //   }
      // }
      for(let i = 0; i <= this.AllMenuItems[0].length; i++){
        if(this.AllMenuItems[0][i].item.timeOfDay.includes('Dinner')){
              this.listForDinnerMenu.push(this.AllMenuItems[0][i])
            }
      }

      // if(this.AllMenuItems[0][0].item.timeOfDay.includes('Lunch')){
      //   this.listForLunchMenu.push(this.AllMenuItems[0][0])
      // }

    })
    console.log('listOfDinnerMenu', this.listForDinnerMenu);
    
  }


  ngOnInit(): void {
    this.getMenuItems();
    // this.getFilterItemForBreakfast(1);
  
  }



  //For Category
  categories = [
    // {
    //   categoryName: 'Grilled Entrees',
    //   items: [
    //     { itemName: 'Grilled Salmon' , itemImage:"https://i.pinimg.com/236x/2f/8b/5d/2f8b5d0bf6e405594cc26a83dd3daaa4.jpg"},
    //     { itemName: 'BBQ Chicken' ,itemImage:"https://i.pinimg.com/236x/3f/43/ff/3f43ff5efb6e7116de529bc801918274.jpg"},
    //     { itemName: 'Tandoori Shrimp',itemImage:"https://i.pinimg.com/236x/4b/b6/e9/4bb6e9ae6026176cea5df08d0eb5433e.jpg" },
    //     { itemName: 'Tandoori Shrimp' ,itemImage:"https://i.pinimg.com/236x/86/df/33/86df3334b853e6b14e99d2d2ea54f030.jpg"}
    //   ]
    // },
    // {
    //   categoryName: 'Vegetarian Delights',
    //   items: [
    //     { itemName: 'Eggplant Parmesan', itemImage:"https://i.pinimg.com/236x/55/51/ea/5551ea01ff93eb81e63845f1e150cb25.jpg" },
    //     { itemName: 'Lentil Curry' ,itemImage:"https://i.pinimg.com/236x/a0/29/46/a02946d12ae473dc859b04c193373fa5.jpg"},
    //     { itemName: 'Stuffed Bell Peppers' , itemImage:"https://i.pinimg.com/236x/00/91/a4/0091a40c2d25be65fca82e3fec4c1113.jpg" },
    //     { itemName: 'Roasted Broccoli',itemImage:"https://i.pinimg.com/236x/a8/e5/65/a8e56507827fceecc70e33301788957b.jpg" },
    //     { itemName: 'Roasted Broccoli',itemImage:"https://i.pinimg.com/236x/a8/e5/65/a8e56507827fceecc70e33301788957b.jpg" }
    //   ]
    // },
    // {
    //   categoryName: 'Comfort Classics',
    //   items: [
    //     { itemName: 'Beef Stroganoff' ,itemImage:"https://i.pinimg.com/236x/ae/e0/af/aee0af1bd062c3ba4dd0c3851d289614.jpg" },
    //     { itemName: 'Chicken Pot Pie' ,itemImage:"https://i.pinimg.com/236x/ff/0f/cc/ff0fccbec0e5a652f01f561053912988.jpg"},
    //     { itemName: 'Shepherd Pie' ,itemImage:"https://i.pinimg.com/236x/77/65/d0/7765d08742f2791969d4693963b78955.jpg"},
    //   ]
    // }

    {
      categoryName: 'pizza',
      items: this.listForDinnerMenu
    }
  ];
}
