import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-nz-sider',
  templateUrl: './nz-sider.component.html',
  styleUrls: ['./nz-sider.component.css']
})
export class NzSiderComponent {


  //For Routing
  onAllDay(){
    this.router.navigate(['/allDay']);
  }

  onBreakfast(){
    this.router.navigate(['/breakfast'])
  }
  onLunch(){
    this.router.navigate(['/lunch'])
  }
  onDinner(){
    this.router.navigate(['/dinner'])
  }
  

  //For Modal

  isVisible = false;

  constructor(private modalService: NzModalService, private router: Router) {}

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
    // this.submitedForm()
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  submitForm(){
    console.log("Submitted");
  }

 

  
}
