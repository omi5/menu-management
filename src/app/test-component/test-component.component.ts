import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MenuItemServiceService } from '../services/menu-item-service.service';
import { CategoryService } from '../services/category.service';
import { forkJoin } from 'rxjs';

export interface MenuItem {
  _id: string;
  restaurantId: number;
  categoryId: string;
  mealTimeId: number;
  item: {
    options: {
      add: {
        _id: string;
        ingredients: any[];
      }[];
      no: {
        _id: string;
        ingredients: any[];
      }[];
    };
    itemName: string;
    itemImage: string;
    itemPrice: number;
    itemCalories: number;
    timeOfDay: string[];
    itemProfileTastyTags: string[];
    itemPortionSize: string;
    itemPreparationTime: number;
    itemLastingTime: number;
    servingTemperature: number;
    itemDietaryRestrictions: string[];
    ingredients: {
      rawIngredients: any[];
      recipes: any[]
    };
    _id: string;
    itemId: number;
  };
  __v: number;
}

export interface Category {
  _id: string;
  restaurantId: number;
  categoryName: string;
  categoryDescription: string;
  categoryImage: string;
}

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.css'],
})
export class TestComponentComponent implements OnInit {
  @Input() menuItems1: any;
  menuItems: any;
  title = 'menu';
  allMenuItems: MenuItem[] = [];
  categories: Category[] = [];
  categorizedMenu: { [key: string]: MenuItem[] } = {};

  Object = Object;

  constructor(private menuItemsService: MenuItemServiceService, private categoryService: CategoryService) {
    
  }

  ngOnInit(): void {
    forkJoin([
      this.categoryService.getAllCategory(),
      // this.menuItemsService.getAllMenuItems()
    ]).subscribe(
      ([categories]) => {
        // this.menuItems = [];
        // this.menuItem.push(...menuItems);

        this.categories.push(...categories);
      
        console.log("cat...",categories);
        // console.log("cat...menu",menuItems);
       

        this.categories.forEach((category) => {
          this.categorizedMenu[category.categoryName] = [];
        });

        this.menuItems1.forEach((menuItem:any) => {
          const category = this.categories.find((c) => c._id === menuItem.categoryId);
          if (category) {
            this.categorizedMenu[category.categoryName].push(menuItem);
          }
        });

        console.log('sorted menu', this.categorizedMenu);
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
    this.getMenuItems()
    this.subscribeToIngredientChanges()
  }


  private subscribeToIngredientChanges() {
    this.menuItemsService.refreshNeeded$.subscribe(() => {
      this.getMenuItems()
      this.categoryService.getAllCategory()
    });
  }
  //get All Menu Item 

  getMenuItems(){
    this.menuItemsService.getAllMenuItems().subscribe(res=>{
      this.allMenuItems.push(...res)
    })
  }


  categoryName!: string;
  id! : string
  categoryItem: any[] = []
  //edit button
  editBtn(itemCategory: any){
    console.log('edit Button click',itemCategory);
    this.categories.map(item=>{
      if(item.categoryName === itemCategory){
        this.categoryItem.push(item)
      }
    })
    this.categoryName = this.categoryItem[0].categoryName
    this.id = this.categoryItem[0]._id
    this.showModalForCategory()
    console.log('new cateee=====',this.categoryItem[0].categoryName);
    
  }
  deleteBtn(){
    console.log('delete Button is click');
    
  }
  
  deleteFromAllMenu(itemCategory:any){
    console.log('click from all delete');
    
   }


   filterMenu: any []= []
   filterMenuItemsForDeleteThisMenu: any[] = []
   deleteFromThisMenu(itemCategory:any){
    console.log('click from this menu delete');
    console.log('edit Button click',itemCategory);
    this.categories.map(item=>{
      if(item.categoryName === itemCategory){
        this.categoryItem.push(item)
      }
    })
    // this.categoryName = this.categoryItem[0].categoryName
    // this.id = this.categoryItem[0]._id
    console.log('new cateee for delete=====',this.categoryItem[0]._id);
    console.log('All menu Item for delete', this.allMenuItems);

    this.allMenuItems.map(item=>{
      if (item.categoryId == this.categoryItem[0]._id ) {
        this.filterMenu.push(item);
      }
      
    })
    this.filterMenu.map(item =>{
      if(item.item.timeOfDay.includes('BreakFast')){
        this.filterMenuItemsForDeleteThisMenu.push(item);
      }
    })
    
    this.filterMenuItemsForDeleteThisMenu.map(item=>{
     
      let index = item.item.timeOfDay.indexOf('BreakFast');
      if(index > -1){
        item.item.timeOfDay.splice(index,1);
      }
      
      this.filterMenuItemsForDeleteThisMenu.map((item: any) => {
        this.menuItemsService.updateMenuItem(item._id,item).subscribe((res) => {
          // Backend delete successful, trigger a refresh
          console.log('Inside subscribe==',res);
          
          // this.menuItemsService.refreshNeeded$.next();
        });
      });
      
      console.log('filter by category item', this.filterMenuItemsForDeleteThisMenu);
      
    }) 
   }


  submitFormForCategory() {
   let editDetails = {
    categoryName:this.categoryName
   }
  //  this.categoryName = this.categoryItem[0].categoryName
   console.log("tadaaaaa", this.categoryItem[0].categoryName);
   


   this.categoryService.updateCategory(this.categoryItem[0]._id, editDetails).subscribe(res=> {
    console.log('Updated the category', res);
   })
  }

  OpenDrawerForCreateMenuItem(itemCategory: any){
    this.open()
    console.log('click for open a drawer',itemCategory);
    
  }


    //For Menu Item Drawer

    visible = false;
    open(): void {
      this.visible = true;
    }
    close(): void {
      this.visible = false;
    }

   //for item form drawer
   @ViewChild('itemForm') itemForm: any

   createItems(): void{
     // console.log('click');
     this.itemForm.createItem()
     this.visible = false;
   }


   isVisibleForCategory = false;
  showModalForCategory(): void {
    this.isVisibleForCategory = true;
  }
  
  handleCancelForCategory(): void {
    this.isVisibleForCategory = false;
  }
   //for Schedule modal
   @ViewChild('modalFormForCategory') modalFormForCategory: any

   handleOkForCategory(): void {
    //  this.modalFormForCategory.submitFormForCategory();
    this.submitFormForCategory()
     this.isVisibleForCategory = false;
     // this.receiveSubmittedFormData(this.receivedFormData)
     // console.log(this.data);
     
   }

  
  
}
