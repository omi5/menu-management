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

  //For Category
  categories = [
    {
      name: 'Sandwiches',
      items: [
        { name: 'BLT Sandwich' },
        { name: 'Turkey Club' },
        { name: 'Veggie Panini' },
        
      ]
    },
    {
      name: 'Salads',
      items: [
        { name: 'Caesar Salad' },
        { name: 'Greek Salad' },
        { name: 'Cobb Salad' },
       
      ]
    },
    {
      name: 'Pasta',
      items: [
        { name: 'Spaghetti Bolognese' },
        { name: 'Fettuccine Alfredo' },
        { name: 'Penne Arrabbiata' },
       
      ]
    }
  ];
}
