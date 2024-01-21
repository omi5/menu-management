
import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
// import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
// import { NzUploadFile } from 'ng-zorro-antd/upload';
// import { Observable, Observer } from 'rxjs';


//For Day Selection
// interface Day {
//   name: string;
//   value: number;
//   selected: boolean;
// }

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  // use in Nz-sider
  isCollapsed = true;


  //for modal

  isVisible = false;

  constructor(private modalService: NzModalService) {}

  //use in Nz-sider
  showModal(): void {
    this.isVisible = true;
  }
  handleOk(): void {
    this.isVisible = false;
   
  }
  handleCancel(): void {
    this.isVisible = false;
  }
 

  
 

  

}
