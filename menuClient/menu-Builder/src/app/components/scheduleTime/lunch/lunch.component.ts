import { Component } from '@angular/core';

@Component({
  selector: 'app-lunch',
  templateUrl: './lunch.component.html',
  styleUrls: ['./lunch.component.css']
})
export class LunchComponent {
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
