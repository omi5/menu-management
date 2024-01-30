import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder, FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ModalFormComponent } from '../modal-form/modal-form.component';

interface Day {
  name: string;
  value: number;
  selected: boolean;
}

@Component({
  selector: 'app-nz-sider',
  templateUrl: './nz-sider.component.html',
  styleUrls: ['./nz-sider.component.css']
})
export class NzSiderComponent {
  //For Modal For Schedule Start Here

  constructor(private modalService: NzModalService, private router: Router,private fb: NonNullableFormBuilder) {}
  isVisible = false;
  showModal(): void {
    this.isVisible = true;
  }
  handleCancel(): void {
    this.isVisible = false;
  }
   //for Schedule modal
   @ViewChild('modalForm') modalForm: any

   handleOk(): void {
     this.isVisible = false;
     this.modalForm.submitForm() 
   }
  //For Modal For Schedule End Here

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
   }

  //For Modal For Category end Here
  data : any ;
  submitedForm(data: any){
    this.data= data;
  }

  //For Menu Item Drawer
  visible = false;
  open(): void {
    this.visible = true;
  }
  close(): void {
    this.visible = false;
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
  this.recipeForm.createRecipeItem()
  this.visibleRecipeDrawer = false;
}
  //for item form drawer
  @ViewChild('itemForm') itemForm: any

  createItems(): void{
    // console.log('click');
    this.itemForm.createItem()
    this.visible = false;
  }

  ngOnInit(): void {
  }
   
}
