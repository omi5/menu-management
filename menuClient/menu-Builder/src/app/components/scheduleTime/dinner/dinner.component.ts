import { Component } from '@angular/core';

@Component({
  selector: 'app-dinner',
  templateUrl: './dinner.component.html',
  styleUrls: ['./dinner.component.css']
})
export class DinnerComponent {

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
      name: 'Grilled Entrees',
      items: [
        { name: 'Grilled Salmon' },
        { name: 'BBQ Chicken' },
        { name: 'Tandoori Shrimp' },
        { name: 'Tandoori Shrimp' }
      ]
    },
    {
      name: 'Vegetarian Delights',
      items: [
        { name: 'Eggplant Parmesan' },
        { name: 'Lentil Curry' },
        { name: 'Stuffed Bell Peppers' },
        { name: 'Roasted Broccoli' }
      ]
    },
    {
      name: 'Comfort Classics',
      items: [
        { name: 'Beef Stroganoff' },
        { name: 'Chicken Pot Pie' },
        { name: 'Shepherd Pie' },
      ]
    }
  ];
}
