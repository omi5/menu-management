import { Component, ViewChild } from '@angular/core';
import { CreateMenuFormComponent } from '../create-menu-form/create-menu-form.component';
import { CategoryFormComponent } from '../category-form/category-form.component';
import { RecipeFormComponent } from '../recipe-form/recipe-form.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  logout () {
    localStorage.removeItem('accessToken');
    window.location.href = 'https://getbento.vercel.app/logout';
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

    //For Modal For Category start Here
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
     this.modalFormForCategory.submitFormForCategory();
     this.isVisibleForCategory = false; 
   }
     //for Recipe Drawer
  visibleRecipeDrawer = false;
  openRecipeDrawer(): void {
    this.visibleRecipeDrawer = true;
  }
  closeRecipe(): void {
    this.visibleRecipeDrawer = false;
  }
  // for Create a  Recipe Items recipeForm
  @ViewChild('recipeForm') recipeForm!: RecipeFormComponent;
  createRecipeItems(): void{
    this.recipeForm.createRecipeItem()
    this.visibleRecipeDrawer = false;
  }

}
