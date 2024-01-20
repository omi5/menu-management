import { Component, Input, OnInit } from '@angular/core';
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
    itemPortionsize: string;
    itemPreparationtime: number;
    itemLastingTime: number;
    servingTemperature: number;
    itemDietaryRestrictions: string[];
    ingredients: {
      id: number;
      restaurantId: number;
      costPerUnit: number;
      caloriesPerUnit: number;
      _id: string;
      ingredientName?: string;
      unitOfStock?: string;
      quantity?: number;
    }[];
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
  // menuItems: MenuItem[] = [];
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
        // this.menuItems.push(...menuItems);

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
  }
}
