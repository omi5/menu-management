import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTablePaginationPosition, NzTablePaginationType, NzTableSize } from 'ng-zorro-antd/table/public-api';
import { Category } from 'src/app/interfaces/categoryList.interface';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.css']
})
export class CategoryTableComponent implements OnInit {
  isCollapsed = false;

  frontPagination = true;
  totalNumberOfData = 0;
  pageIndex = 1;
  pageSize = 10;
  showPagination = true;
  showQuickJumper = true;
  hidePaginationOnSinglePage = true;
  paginationPosition: NzTablePaginationPosition = 'bottom';
  paginationType: NzTablePaginationType = 'small';
  showBorder = true;
  outerBordered = true;
  sizeOfTable: NzTableSize = 'small';
  loadingStatus = false;
  tableTitle = 'Category Table';
  tableFooter = '';
  noResult = 'No Data Present';
  showDeleteButton = true;
  showEditButton = true;
  showAddButton = true;

  visible = false;
  isEdit = false;
  private _id!: string;
  msg: any;
  
  onAdd(): void {
    this.visible = true;
    this.isEdit = false;
    this.refreshFields();
  }

  close(): void {
    this.visible = false;
  }

  submitForm() {
    this.visible = false;
    this.onEdit({ 
      _id: this._id,
      restaurantId: 1,
      categoryName: this.categoryName,
      categoryDescription: this.categoryDescription,
      categoryImage: this.categoryImage,
     
    });
  }

  refreshFields(): void {
    this.id = '';
    this.categoryName = '';
    this.categoryDescription = '';
    this.categoryImage = '';
    this.categoryId = null;
  }

  categoryList: Category[] = []; 

  id = '';
  categoryName = '';
  categoryDescription = '';
  categoryImage = '';
  categoryId: number | null = null;

  constructor(private categoryService: CategoryService, private message: NzMessageService) {}

  ngOnInit(): void {
    this.loadAllCategories();
  }

  private loadAllCategories() {
    this.categoryService.getAllCategory().subscribe({
      next: (data: Object) => {
        this.categoryList = (data as any[]).map((ingredient: any) => ({
          ...ingredient,
        }));
        // console.log('Ingredient data loaded', this.categoryList);
      },
      error: (error) => {
        console.error('Error fetching ingredient data', error);
      },
    });
  }


  onDelete(id: string): void {
    this.categoryService.deleteCategory(id).subscribe({
      next: () => {
        this.categoryList = this.categoryList.filter(
          (category) => category._id !== id
        );
        // console.log(`Category with ID ${id} deleted successfully.`);
      },
      error: (error) => {
        console.error(`Error deleting category with ID ${id}`, error);
      },
    });
  }

  onEdit(category: Category): void {
    console.log('category table ',category);
    
    this.visible = true;
    this.isEdit = true;
    this._id = category._id;
    this.categoryName = category.categoryName;
    this.categoryDescription = category.categoryDescription;
    this.categoryImage = category.categoryImage;
    const editDetails = {
      restaurantId: 1,
      _id: category._id,
      categoryName: category.categoryName,
      categoryDescription: category.categoryDescription,
      categoryImage: category.categoryImage,
    };
    
    this.categoryService.updateCategory(category._id, editDetails).subscribe(res=>{
      console.log('====subscribe Data',res);
      
    })
  }


}
