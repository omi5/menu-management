import { Component, Input } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTablePaginationPosition, NzTablePaginationType, NzTableSize } from 'ng-zorro-antd/table/public-api';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.css']
})
export class CategoryTableComponent {

  frontPagination = true;
  totalNumberOfData = 0;
  pageIndex = 1;
  pageSize = 10;
  showPagination = true;
  paginationPosition: NzTablePaginationPosition = 'bottom';
  paginationType: NzTablePaginationType = 'small';
  showBorder = true;
  outerBordered = true;
  sizeOfTable: NzTableSize = 'small';
  loadingStatus = false;
  tableTitle = 'Ingredient Table';
  tableFooter = '';
  noResult = 'No Data Present';
  showQuickJumper = true;
  hidePaginationOnSinglePage = true;
  showDeleteButton = true;
  showEditButton = true;
  showAddButton = true;

  visible = false;
  isEdit = false;
  
  onAdd(): void {
    this.visible = true;
    this.isEdit = false;
    this.refreshFields();
  }

  close(): void {
    this.visible = false;
  }

  submitForm() {
    this.createUpdateIngredient();
    this.visible = false;
  }

  refreshFields(): void {
    this.id = 0;
    this.categoryName = '';
    this.unitOfStock = '';
    this.caloriesPerUnit = '';
    this.reorderPoint = '';
    this.idealStoringTemperature = '';
    this.unitOfIdealStoringTemperature = '';
    this.perishable = '';
    this.description = '';
    this.categoryId = 0;
    this.categoryName = '';
  }

  categoryList = [ 'Dairy', 'Vegetable', 'Meat', 'Seafood', 'Fruit', 'Beverage', 'Bread', 'Spice', 'Flour', 'Oil', 'Sauce'];
  unitList = ['ml', 'gm', 'piece', 'bottle', 'packet', 'kg', 'litre', 'pound'];
  temperatureUnitList = ['Celsius', 'Fahrenheit'];
  perishableList = ['Yes', 'No'];

  ingredientData: any[] = []; // Array of Ingredient objects

  onCurrentPageDataChange(ingredientData: any[]): void {
    this.ingredientData = ingredientData;
  }

  id!: number;
  categoryName!: string;
  unitOfStock!: string;
  categoryId!: number;
  caloriesPerUnit!: number | any;
  reorderPoint!: number | any;
  idealStoringTemperature!: number | any;
  unitOfIdealStoringTemperature!: string;
  perishable!: string;
  description!: string;
  // categoryName!: string;

  constructor(private ingredientService: CategoryService, private message: NzMessageService) {}

  //Have to make the restaurant id dynamic
  @Input() restaurantId: number = 1;

  ngOnInit(): void {

    // this.ingredientService.refreshNeeded$.subscribe(() => {
    //   this.loadAllIngredients(1);
    // });
    
    this.loadAllIngredients(1);
    
  }

  private loadAllIngredients(restaurantId: number) {
    this.ingredientService.getAllCategory().subscribe( res=>{
      console.log('categoryFound',res);
      
    })
    //   // next: (data) => {
    //   //   this.ingredientData = data.map(ingredient => ({
    //   //     ...ingredient,
    //       // updatedAt: formatDateToString(new Date(ingredient.updatedAt)),
    //       // costPerUnit: ingredient.costPerUnit ? Number(ingredient.costPerUnit.toFixed(2)) : 0,
    //     // }
    //     ));

    //     console.log('Ingredient data loaded', this.ingredientData);
    //   },
    //   error: (error: any) => {
    //     console.error('Error fetching ingredient data', error);
    //   },
    // });
  }

  createUpdateIngredient() {
    let newItem = {
      restaurantId: 1,
      categoryId: 1,
      ingredientName: this.categoryName,
      unitOfStock: this.unitOfStock,
      caloriesPerUnit: this.caloriesPerUnit,
      reorderPoint: this.reorderPoint,
      perishable: this.perishable,
      description: this.description,
      unitOfIdealStoringTemperature: this.unitOfIdealStoringTemperature,
      idealStoringTemperature: this.idealStoringTemperature,
    };

    console.log(newItem);

    // if (this.isEdit) {
    //   this.ingredientService.editIngredient(this.id, newItem).subscribe((res) => {
    //     console.log(res);
    //   });
    // } else {
    // this.ingredientService.addIngredient(newItem).subscribe((res) => {
    //   console.log(res);
    // });
    // }

  }

  onDelete(id: number): void {
    // this.ingredientService.deleteIngredient(id).subscribe({
    //   next: () => {
    //     this.ingredientData = this.ingredientData.filter(
    //       (ingredient) => ingredient.id !== id
    //     );
    //     console.log(`Ingredient with ID ${id} deleted successfully.`);
    //   },
    //   error: (error:any) => {
    //     console.error(`Error deleting ingredient with ID ${id}`, error);
    //   },
    // });
  }

  onEdit(ingredient: any): void {
    this.visible = true;
    this.isEdit = true
    this.id = ingredient.id;
    this.categoryName = ingredient.categoryName;
    this.unitOfStock = ingredient.unitOfStock;
    this.caloriesPerUnit = ingredient.caloriesPerUnit;
    this.reorderPoint = ingredient.reorderPoint;
    this.idealStoringTemperature = ingredient.idealStoringTemperature;
    this.unitOfIdealStoringTemperature = ingredient.unitOfIdealStoringTemperature;
    this.perishable = ingredient.perishable;
    this.description = ingredient.description;
    this.categoryId = ingredient.categoryId;
    this.categoryName = ingredient.category.categoryName;
  }

}
