import { Component } from '@angular/core';

@Component({
  selector: 'app-all-day',
  templateUrl: './all-day.component.html',
  styleUrls: ['./all-day.component.css']
})
export class AllDayComponent {

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
