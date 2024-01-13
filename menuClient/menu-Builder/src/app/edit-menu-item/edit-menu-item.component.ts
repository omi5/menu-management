import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CloudinaryService } from '../services/cloudinary.service';
import { CategoryService } from '../services/category.service';
import { CategoryList } from '../interfaces/categoryList.interface';

import { MenuItemServiceService } from '../services/menu-item-service.service';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload/interface';
import { NzMessageService } from 'ng-zorro-antd/message';


@Component({
  selector: 'app-edit-menu-item',
  templateUrl: './edit-menu-item.component.html',
  styleUrls: ['./edit-menu-item.component.css']
})
export class EditMenuItemComponent {

  @Input() selectedMenuItem!: any; 
  


 

  visible = false;
  cloudinary: any;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  owner = ["Burger","Pizza","Drinks"]
 



}
