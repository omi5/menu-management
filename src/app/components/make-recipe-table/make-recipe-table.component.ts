import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTablePaginationPosition, NzTablePaginationType, NzTableSize } from 'ng-zorro-antd/table/public-api';
import { MakeRecipeService } from 'src/app/services/make-recipe.service';

@Component({
  selector: 'app-make-recipe-table',
  templateUrl: './make-recipe-table.component.html',
  styleUrls: ['./make-recipe-table.component.css']
})
export class MakeRecipeTableComponent implements OnInit {

  isCollapsed = false;




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
  tableTitle = 'Recipe Table';
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
    this.createUpdateRecipeItem();
    this.visible = false;
  }

  refreshFields(): void {
    this.id = 0;
    this.recipeName = '';
    this.recipeItemDescription = '';
    this.recipeItemCost = '';
    this.recipeItemCalories = '';
  }

  recipeData: any[] = [];

  onCurrentPageDataChange(recipeData: any[]): void {
    this.recipeData = recipeData;
  }

  id!: number;
  recipeName!: string;
  recipeItemDescription!: string;
  recipeItemCost!: string;
  recipeItemCalories!: string;
  recipeItemPortionSize!: number;
  recipeItemPreparationTime!: number;


  constructor(private recipeService: MakeRecipeService) {}

  @Input() restaurantId: number = 1;

  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    this.recipeService.getAllRecipe().subscribe({
      next: (data: Object) => {
        this.recipeData = (data as any[]).map((recipe: any) => ({
          ...recipe,
        }));
        console.log('Recipe data loaded', this.recipeData);
      },
      error: (error) => {
        console.error('Error fetching recipe data', error);
      },
    });
  }

  createUpdateRecipeItem() {
    let newRecipeItem = {
      restaurantId: 1,
      recipeName: this.recipeName,
      recipeItemDescription: this.recipeItemDescription,
      recipeItemCost: this.recipeItemCost,
      recipeItemCalories: this.recipeItemCalories,
      recipeItemPortionSize: this.recipeItemPortionSize,
      recipeItemPreparationTime: this.recipeItemPreparationTime
    };

    console.log('New Recipe Item:', newRecipeItem);

    if (this.isEdit) {
      this.recipeService.updateRecipeItem(String(this.id), newRecipeItem).subscribe({
        next: (res) => {
          console.log('Recipe item updated successfully:', res);
        },
        error: (error) => {
          console.error('Error updating recipe item:', error);
        }
      });
    } else {
      this.recipeService.createRecipeItem(newRecipeItem).subscribe({
        next: (res) => {
          console.log('Recipe item created successfully:', res);
        },
        error: (error) => {
          console.error('Error creating recipe item:', error);
        }
      });
    }
  }
  

  onDelete(id: string): void {
    this.recipeService.deleteRecipeItem(id).subscribe({
      next: () => {
        this.recipeData = this.recipeData.filter(recipe => recipe._id !== id);
        console.log(`Recipe with ID ${id} deleted successfully.`);
      },
      error: (error: any) => {
        console.error(`Error deleting recipe with ID ${id}`, error);
      },
    });
  }
  

  onEdit(recipe: any): void {
    this.visible = true;
    this.isEdit = true;

    this.id = recipe._id;
    this.recipeName = recipe.recipeName;
    this.recipeItemDescription = recipe.recipeItemDescription;
    this.recipeItemCost = recipe.recipeItemCost;
    this.recipeItemCalories = recipe.recipeItemCalories;
    this.recipeItemPortionSize = recipe.recipeItemPortionSize
    this.recipeItemPreparationTime = recipe.recipeItemPreparationTime

    const editDetails ={
      restaurantId: 1,
      _id : recipe._id,
      recipeName : recipe.recipeName,
      recipeItemDescription : recipe.recipeItemDescription,
      recipeItemCost : recipe.recipeItemCost,
      recipeItemCalories : recipe.recipeItemCalories,
      recipeItemPortionSize: recipe.recipeItemPortionSize,
      recipeItemPreparationTime: recipe.recipeItemPreparationTime
    }

    console.log('Recipe =======', recipe);
    console.log("edit recipe details final====", editDetails);

    this.recipeService.updateRecipeItem(recipe._id,editDetails).subscribe(res=>{
      console.log('recipe updated details',res);
      
    })
  }


  //for Drawer

  visibleRecipeDrawer = false;

  openRecipeDrawer(): void {
    this.visibleRecipeDrawer = true;
  }

  closeRecipe(): void {
    this.visibleRecipeDrawer = false;
  }

  @ViewChild('recipeForm') recipeForm: any;

  createRecipeItems(): void {
    console.log('click');
    this.recipeForm.createRecipeItem();
  }
}
