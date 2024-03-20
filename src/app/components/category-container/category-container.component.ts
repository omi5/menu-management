import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MenuItemServiceService } from '../../services/menu-item-service.service';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute} from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { IItem } from 'src/app/interfaces/menuItem.interface';
import { CreateMenuFormComponent } from '../create-menu-form/create-menu-form.component';
import { CategoryFormComponent } from '../category-form/category-form.component';

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
  selector: 'category-container',
  templateUrl: './category-container.component.html',
  styleUrls: ['./category-container.component.css'],
})
export class CategoryContainerComponent implements OnInit, OnChanges {
  @Input() menuItems: IItem[]= [];
  title = 'menu';
  allMenuItems: IItem[] = [];
  categories: Category[] = [];
  categorizedMenu: { [key: string]: IItem[] } = {};
  mealTimeName: string = '';
  Object = Object;

  constructor(private route: ActivatedRoute , private menuItemsService: MenuItemServiceService, private categoryService: CategoryService, private cdr: ChangeDetectorRef,private message: NzMessageService) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.categorizeMenuItems();
  }

  ngOnInit(): void {
    this.categoryService.getAllCategory().subscribe(
    (categories) => {
      this.categories.push(...categories);
      this.categorizeMenuItems();
    },
      error => {
        console.error('Error fetching data:', error);
      }
    );
    this.getMenuItems()
    this.subscribeToIngredientChanges()
   
    if(this.route.snapshot.url[0].path === 'BreakFast'){
      this.mealTimeName = 'Breakfast';
    }
    else if(this.route.snapshot.url[0].path === 'allDay'){
      this.mealTimeName = 'All Day';
    }
    else{
      this.mealTimeName = this.route.snapshot.url[0].path;
    }
  }

  categorizeMenuItems () {
    this.categories.forEach((category) => {
      this.categorizedMenu[category.categoryName] = [];
    });
    this.menuItems.forEach((menuItem:IItem) => {
      const category = this.categories.find((c) => c._id === menuItem.categoryId);
      if (category) {
        this.categorizedMenu[category.categoryName].push(menuItem);
      }
    });
  }

  private subscribeToIngredientChanges() {
    this.menuItemsService.refreshNeeded$.subscribe(() => {
      this.getMenuItems()
      this.categoryService.getAllCategory()
    });
  }

  //get All Menu Item 
  getMenuItems(){
    this.menuItemsService.menuItemsSubject.subscribe(res=>{
      this.allMenuItems.push(...res)
    })
  }

  categoryName!: string;
  id! : string
  categoryItem: Category[] = []

  editBtn(itemCategory: any) {
    // Find the category to edit in the categories array
    const categoryToEdit = this.categories.find(item => item.categoryName === itemCategory);
    if (categoryToEdit) {
      // If found, update categoryItem
      this.categoryItem.unshift(categoryToEdit);
      // Update other properties
      this.categoryName = this.categoryItem[0].categoryName;
      this.id = this.categoryItem[0]._id;
      // Show modal
      this.showModalForCategory();
      this.message.success('Successfully Edited.');
    } else {
      console.error('Category not found:', itemCategory);
    }
  }
  
  deleteBtn(){}

  filterMenuForMenu: IItem []= []
  filterMenuItemsForDeleteAllMenu: IItem[] = []
  deleteFromAllMenu(itemCategory:string){
    this.categories.map(item=>{
      if(item.categoryName === itemCategory){
        this.categoryItem.push(item)
      }
    })
   if(this.mealTimeName === 'allDay'){
    this.mealTimeName = 'All Day'
   }
    this.allMenuItems.map(item=>{
      if (item.categoryId == this.categoryItem[0]._id ) {
        this.filterMenuForMenu.push(item);
      } 
    })
    this.filterMenuForMenu.map(item =>{
      if(item.item.timeOfDay.includes(this.mealTimeName)){
        this.filterMenuItemsForDeleteAllMenu.push(item);
      }
    })
    
    this.filterMenuItemsForDeleteAllMenu.map(item=>{
      let index = item.item.timeOfDay.indexOf(this.mealTimeName);
      if(index > -1){
        item.item.timeOfDay = []
      }  
      this.filterMenuItemsForDeleteAllMenu.map((item: any) => {
        this.menuItemsService.deleteMenuItem(item._id).subscribe((res) => {
          // Backend delete successful, trigger a refresh
          next: this.menuItemsService.getAllMenuItems().subscribe(res =>{
            this.menuItemsService.menuItemsSubject.next(res);   
   })  
        });
      });  
    }) 
    this.message.success('Successfully deleted'); 
    window.location.reload();  
   }

   filterMenu: IItem []= []
   filterMenuItemsForDeleteThisMenu: IItem[] = []
  
  deleteFromThisMenu(itemCategory: string) {
    this.categories.forEach(item => {
      if (item.categoryName === itemCategory) {
        this.categoryItem.push(item);
      }
    });
    const categoryId = this.categoryItem[0]._id;
    this.filterMenu = this.allMenuItems.filter(item => item.categoryId === categoryId);
    this.filterMenuItemsForDeleteThisMenu = this.filterMenu.filter(item =>
      item.item.timeOfDay.includes(this.mealTimeName)
    );  
    this.filterMenuItemsForDeleteThisMenu.forEach(item => {
      const index = item.item.timeOfDay.indexOf(this.mealTimeName);
      if (index > -1) {
        item.item.timeOfDay.splice(index, 1);
      }
      this.menuItemsService.updateMenuItem(item._id, item).subscribe(res => {
        this.menuItemsService.getAllMenuItems().subscribe(updatedMenuItems => {
          this.menuItemsService.menuItemsSubject.next(updatedMenuItems);
        });
      });
    });
  
    // Optionally, if you want to update the local variable in the component
    const updatedItems = this.filterMenuItemsForDeleteThisMenu.filter(item =>
      item.item.timeOfDay.includes(this.mealTimeName)
    );
    this.filterMenuItemsForDeleteAllMenu = [...updatedItems];
    this.message.success('Successfully deleted');
    window.location.reload();
  }
  

  submitFormForCategory() {
   let editDetails = {
    categoryName:this.categoryName
   }
   this.categoryService.updateCategory(this.categoryItem[0]._id, editDetails).subscribe(res=> {
   })
  }
  nameOfCategory!: string;
  OpenDrawerForCreateMenuItem(itemCategory: string){
    this.nameOfCategory = itemCategory;
    this.open()
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
   @ViewChild('itemForm') itemForm!: CreateMenuFormComponent;

   createItems(): void{
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
   @ViewChild('modalFormForCategory') modalFormForCategory!: CategoryFormComponent;

   handleOkForCategory(): void {
    //  this.modalFormForCategory.submitFormForCategory();
    this.submitFormForCategory()
     this.isVisibleForCategory = false;
   }

  
   isVisibleForCreateCategory = false;
    showModalForCreateCategory(): void {
    this.isVisibleForCreateCategory = true;
  }
  
  handleCancelForCreateCategory(): void {
    this.isVisibleForCreateCategory = false;
  }
   //for Schedule modal
   @ViewChild('modalFormForCategory') modalFormForCreateCategory!: CategoryFormComponent;

   handleOkForCreateCategory(): void {
    this.modalFormForCreateCategory.submitFormForCategory()
     this.isVisibleForCreateCategory = false;
   }
  
}
