import { Component, Input, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { MenuItemServiceService } from 'src/app/services/menu-item-service.service';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {

  constructor(private menuService: MenuItemServiceService){}

  @Input()
  itemName!: string;
  @Input()
  src!: string;

  ngOnInit(): void {
    
  }


  // For Modal
  // isVisible = false;
  // constructor(private modalService: NzModalService) {}
  // showModal(): void {
  //   this.isVisible = true;
  // }
  // handleOk(): void {
  //   this.isVisible = false;
  // }
  // handleCancel(): void {
  //   this.isVisible = false;
  // }

  //For Menu Item Drawer
  visible = false;
  open(): void {
    this.visible = true;
  }
  close(): void {
    this.visible = false;
  }


  //Delete a Menu Item 
  deleteMenuItem(id: number){
    this.menuService.deleteMenuItem(id).subscribe(res=>{
      console.log("Deleted Successfully");
    })
  }

  //Update Menu Item
  updateMenuItem(id: number){

  }


}
