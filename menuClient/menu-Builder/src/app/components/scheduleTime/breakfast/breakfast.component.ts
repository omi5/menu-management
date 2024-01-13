import { Component, OnInit } from '@angular/core';
import { CategoryList } from 'src/app/interfaces/categoryList.interface';
import { CategoryService } from 'src/app/services/category.service';
import { GetMenuItemBySchuduleService } from 'src/app/services/get-menu-item-by-schudule.service';
import { MenuItemServiceService } from 'src/app/services/menu-item-service.service';

@Component({
  selector: 'app-breakfast',
  templateUrl: './breakfast.component.html',
  styleUrls: ['./breakfast.component.css']
})
export class BreakfastComponent implements OnInit {

  categorizedMenu: { [key: string]: any[] } = {};
  categories: CategoryList[] = [];
  Object = Object;
 
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
  constructor(
    private menuService: MenuItemServiceService,
    private scheduleService: GetMenuItemBySchuduleService,
    private categoryService: CategoryService
  ) {
    this.getAllCategory();
  }

  getAllCategory() {
    this.categoryService.getAllCategory().subscribe((res: CategoryList[]) => {
      this.categories.push(...res);
      console.log('category List', res);
    });
  }

  getMenuItems() {
    this.menuService.getAllMenuItems().subscribe((res: any[]) => {
      console.log('selected menu for breakfast', res);

      for (const menuItem of res) {
        if (menuItem.item.timeOfDay.includes('BreakFast')) {
          const categoryName = this.getCategoryNameById(menuItem.categoryId);
          if (!this.categorizedMenu[categoryName]) {
            this.categorizedMenu[categoryName] = [];
          }
          this.categorizedMenu[categoryName].push(menuItem);
        }
      }

      console.log('Categorized Menu', this.categorizedMenu);
    });
  }

  getCategoryNameById(categoryId: number): string {
    const category = this.categories.find(c => c.categoryId === categoryId);
    return category ? category.categoryName : '';
  }

  ngOnInit(): void {
    this.getMenuItems();
  }
}
