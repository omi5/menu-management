import { Component } from '@angular/core';

@Component({
  selector: 'app-breakfast',
  templateUrl: './breakfast.component.html',
  styleUrls: ['./breakfast.component.css']
})
export class BreakfastComponent {

  isCollapsed = false;


  //for modal
  isVisible = false;

  //use in Nz-sider
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
    // this.submitForm();
    
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
