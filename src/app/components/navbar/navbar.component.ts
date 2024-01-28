import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  logout () {
    localStorage.removeItem('accessToken');
    window.location.href = 'https://bento-client.vercel.app/logout';
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


    //For Modal For Category start Here
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
     this.modalFormForCategory.submitFormForCategory();
     this.isVisibleForCategory = false;
     // this.receiveSubmittedFormData(this.receivedFormData)
     // console.log(this.data);
     
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
  @ViewChild('recipeForm') recipeForm: any
  createRecipeItems(): void{
    console.log('click');
    this.recipeForm.createRecipeItem()
    this.visibleRecipeDrawer = false;
  }

}
