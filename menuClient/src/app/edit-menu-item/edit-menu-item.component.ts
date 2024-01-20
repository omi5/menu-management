import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CloudinaryService } from '../services/cloudinary.service';
import { CategoryService } from '../services/category.service';
import { CategoryList } from '../interfaces/categoryList.interface';

import { MenuItemServiceService } from '../services/menu-item-service.service';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload/interface';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-edit-menu-item',
  templateUrl: './edit-menu-item.component.html',
  styleUrls: ['./edit-menu-item.component.css']
})
export class EditMenuItemComponent implements OnInit{
  ngOnInit(): void {
    this.loadingData()
  }

  @Input() selectedMenuItem!: any; 
  


 form = new FormGroup({
  itemName: new FormControl(),
  itemProfileTastyTags: new FormControl(),
  itemPrice: new FormControl(),
  itemPreparationtime: new FormControl(),
  itemPortionsize: new FormControl(),
  
 })

 loadingData(){
  this.form.patchValue({
    itemName: this.selectedMenuItem[0].item.itemName,
    itemProfileTastyTags:this.selectedMenuItem[0].item.itemProfileTastyTags,
    itemPrice:this.selectedMenuItem[0].item.itemPrice,
    itemPreparationtime:this.selectedMenuItem[0].item.itemPreparationtime,
    itemPortionsize:this.selectedMenuItem[0].item.itemPortionsize,
  })
 }
 onsubmit(){
  console.log(this.form.value);
  
 }

  visible = false;
  cloudinary: any;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  owner = ["Burger","Pizza","Drinks"]
 

//For Remove Item
listOfOptionForTastyTags=[1,2,3]

}
