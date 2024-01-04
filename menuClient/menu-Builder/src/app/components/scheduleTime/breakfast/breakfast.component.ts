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



  //For Category
  categories = [
    {
      name: 'Pancake',
      items: [
        { name: 'Scotch Pancakes' },
        { name: 'American Pancakes' },
        { name: 'Russian Blinis' },
        { name: 'Moroccan ' }
      ]
    },
    {
      name: 'Breakfast Sandwich',
      items: [
        { name: 'Sunrise Sandwiches' },
        { name: 'Morning Delight Deli' },
        { name: 'Early Bird Bites' },
        { name: 'Daybreak Deli' },
        
      ]
    }
  ];



}
