import { Component, OnInit } from '@angular/core';
import { GetMenuItemBySchuduleService } from 'src/app/services/get-menu-item-by-schudule.service';
import { MenuItemServiceService } from 'src/app/services/menu-item-service.service';

@Component({
  selector: 'app-breakfast',
  templateUrl: './breakfast.component.html',
  styleUrls: ['./breakfast.component.css']
})
export class BreakfastComponent implements OnInit {
  
  
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
  
  
    //getAll Item for backend for breakfast
    AllMenuItems : any[] = []
    getMenuItems(){
      this.menuService.getAllMenuItems().subscribe(res=>{
        this.AllMenuItems.push(res);
        console.log('selected menu for breakfast',this.AllMenuItems);
      })
    }  
  
    categoriesName : string = '' ;
    MenuForBreakfast: any[]= []
    onlyForBreakfast: any[] = []
    listForBurger: any[] = []
    categoryList: any[] = []
    filtercategoryList: any[]=[]
  
    getFilterItemForBreakfast(id: any){
      this.scheduleService.getAllMenuItemsUnderScheduleTime(id).subscribe(res=>{
      this.MenuForBreakfast.push(res);
      console.log("filtered Menu",this.MenuForBreakfast[0][0].listOfItems);
      this.onlyForBreakfast.push(this.MenuForBreakfast[0][0].listOfItems)
      console.log('listOfItem', this.onlyForBreakfast);

      for(let item of this.onlyForBreakfast){
          for(let i of item){
            this.categoryList.push(i.categoryId);
            console.log('i',i.categoryId);
            if (i.categoryId == 1){
              this.listForBurger.push(i)
            }
            
          }
          const filtercategory = [...new Set (this.categoryList)];
          this.filtercategoryList.push(filtercategory);
          console.log('categoryIdListFiltered',this.filtercategoryList[0]);
          
          
          console.log('listOfBurger', this.listForBurger);
          

        console.log('categoryId', item[0].categoryId);
        
        if(item[0].categoryId === 1){
          console.log('burger');
          this.categoriesName = 'Burger';
        }
        else{
          console.log('Not Found');
          
        }
      }
      console.log(this.categoriesName);
      
      
    });

 

}



// getTheCategory(onlyForBreakfast: any){
//   console.log('onlyForBreakFast', this.onlyForBreakfast);
  
//     for(let item of onlyForBreakfast){
//       console.log('categoryId', item.categoryId);
      
//       if(item.categoryId === 1){
//         console.log('Breakfast');
//       }
//       else{
//         console.log('Not Found');
        
//       }
//     }
// }

  ngOnInit(): void {
    this.getMenuItems();
    this.getFilterItemForBreakfast(1);
    console.log('Name',this.categoriesName);
    
    
  }
  
  
  
 
  

  //For Category
  categories = [
    // {
    //   categoryName: 'Pancake',
    //   items: [
    //     { itemName: 'Scotch Pancakes', itemImage:"https://i.pinimg.com/236x/0f/3d/f2/0f3df249931c091154ff928e3967166f.jpg" },
    //     { itemName: 'American Pancakes' ,itemImage:"https://i.pinimg.com/236x/58/03/32/58033214f1ba8a7d86d3d643642c4e40.jpg"},
    //     { itemName: 'Russian Blinis' ,itemImage:"https://i.pinimg.com/236x/ee/ec/09/eeec09bb683234e7e6688577246ef160.jpg"},
    //     { itemName: 'Moroccan ',itemImage:"https://i.pinimg.com/236x/ce/96/fb/ce96fbc5a14262a8c87d498ad2ae7926.jpg" }
    //   ]
    // },
    // {
    //   categoryName: 'Breakfast Sandwich',
    //   items: [
    //     { itemName: 'Sunrise Sandwiches' ,itemImage:"https://i.pinimg.com/236x/fc/ca/3e/fcca3e65a4c7a66642e3c2d1b5eeae54.jpg"},
    //     { itemName: 'Morning Delight Deli' ,itemImage:"https://i.pinimg.com/236x/22/05/56/220556f05be2ca4aa993364ec23759e5.jpg"},
    //     { itemName: 'Crispy Chicken Wrap' ,itemImage:"https://i.pinimg.com/236x/01/97/0a/01970a7426bb7f59cbf915008b5337b6.jpg"},
    //     { itemName: 'Daybreak Deli' ,itemImage:"https://i.pinimg.com/236x/d0/02/35/d002357b8ba5e6f6fe69b72dceff3a7c.jpg"},
        
    //   ]
    // },
    {
      categoryName: this.categoriesName,
      items: this.listForBurger
    }
  ];

  

}


