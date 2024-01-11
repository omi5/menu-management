import { Component } from '@angular/core';
import { GetMenuItemBySchuduleService } from 'src/app/services/get-menu-item-by-schudule.service';
import { MenuItemServiceService } from 'src/app/services/menu-item-service.service';

@Component({
  selector: 'app-lunch',
  templateUrl: './lunch.component.html',
  styleUrls: ['./lunch.component.css']
})
export class LunchComponent {

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
  listForLunchMenu :any[] = []
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
        if(this.AllMenuItems[0][i].item.timeOfDay.includes('Lunch')){
              this.listForLunchMenu.push(this.AllMenuItems[0][i])
            }
      }

      // if(this.AllMenuItems[0][0].item.timeOfDay.includes('Lunch')){
      //   this.listForLunchMenu.push(this.AllMenuItems[0][0])
      // }

    })
    console.log('listOfLunchMenu', this.listForLunchMenu);
    
  }


  ngOnInit(): void {
    this.getMenuItems();
    // this.getFilterItemForBreakfast(1);
  
  }

  //For Category
  categories = [
    // {
    //   categoryName: 'Sandwiches',
    //   items: [
    //     { itemName: 'BLT Sandwich',itemImage:"https://i.pinimg.com/236x/db/ab/b8/dbabb83cb71d14f84fd41a602eafc432.jpg" },
    //     { itemName: 'Turkey Club' ,itemImage:"https://i.pinimg.com/236x/63/59/e8/6359e832806f808e9434387467765e09.jpg"},
    //     { itemName: 'Veggie Panini' ,itemImage:"https://i.pinimg.com/236x/79/a0/ec/79a0ece60f3906260e1cd9ed5dbf4ce1.jpg"},
        
    //   ]
    // },
    // {
    //   categoryName: 'Salads',
    //   items: [
    //     { itemName: 'Caesar Salad' ,itemImage:"https://i.pinimg.com/236x/57/27/31/57273172a58ecd485638c06f011ef94b.jpg"},
    //     { itemName: 'Greek Salad' ,itemImage:"https://i.pinimg.com/236x/1d/59/a9/1d59a97d28d4e7b8673175ad8a925497.jpg"},
    //     { itemName: 'Cobb Salad' ,itemImage:"https://i.pinimg.com/236x/8b/17/36/8b17365e4767762a00d09425d1aa832c.jpg"},
       
    //   ]
    // },
    // {
    //   ncategoryNameame: 'Pasta',
    //   items: [
    //     { itemName: 'Spaghetti Bolognese' ,itemImage:"https://i.pinimg.com/236x/f6/8f/36/f68f36d74796ae95326296076bf694b9.jpg"},
    //     { itemName: 'Fettuccine Alfredo' ,itemImage:"https://i.pinimg.com/236x/06/a4/3c/06a43cb43b194974783c243808936173.jpg"},
    //     { itemName: 'Penne Arrabbiata' ,itemImage:"https://i.pinimg.com/236x/25/94/92/2594928b6f79c9f83ef68edce7b4fd93.jpg"},
    //     { itemName: 'Penne' ,itemImage:"https://i.pinimg.com/236x/de/84/75/de84751ada10c5670706a9c216cdd79d.jpg"},
       
    //   ]
    // }
    {
      categoryName: 'pizza',
      items: this.listForLunchMenu
    }
  ];
}
