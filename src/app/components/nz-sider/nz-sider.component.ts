import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder, FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ModalFormComponent } from '../modal-form/modal-form.component';



interface Day {
  name: string;
  value: number;
  selected: boolean;
}

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
    this.router.navigate(['/BreakFast'])
  }
  onLunch(){
    this.router.navigate(['/Lunch'])
  }
  onDinner(){
    this.router.navigate(['/Dinner'])
  }

  category(){
    this.router.navigate(['/category'])
  }
  recipe(){
    this.router.navigate(['/recipe'])
  }
  schedule(){
    this.router.navigate(['/schedule'])
  }
  

  //For Modal For Schedule Start Here

  constructor(private modalService: NzModalService, private router: Router,private fb: NonNullableFormBuilder) {}
  isVisible = false;
  showModal(): void {
    this.isVisible = true;
  }
  handleCancel(): void {
    this.isVisible = false;
  }
   //for Schedule modal
   @ViewChild('modalForm') modalForm: any

   handleOk(): void {
     this.isVisible = false;
     this.modalForm.submitForm()
     // this.receiveSubmittedFormData(this.receivedFormData)
     // console.log(this.data);
     
   }
  //For Modal For Schedule End Here

  //For Modal For Category start Here
  isVisibleForCategory = false;
  showModalForCategory(): void {
    this.isVisibleForCategory = true;
  }
  
  handleCancelForCategory(): void {
    this.isVisibleForCategory = false;
  }
   //for Schedule modal
   @ViewChild('modalFormForCategory') modalFormForCategory: any

   handleOkForCategory(): void {
     this.modalFormForCategory.submitFormForCategory();
     this.isVisibleForCategory = false;
     // this.receiveSubmittedFormData(this.receivedFormData)
     // console.log(this.data);
     
   }

  //For Modal For Category end Here

  
  data : any ;
  submitedForm(data: any){
    this.data= data;
  }

 


  //For Menu Item Drawer

  visible = false;
  open(): void {
    this.visible = true;
  }
  close(): void {
    this.visible = false;
  }

  //for Recipe Drawer
  visibleRecipeDrawer = false;
  openRecipeDrawer(): void {
    this.visibleRecipeDrawer = true;
  }
  closeRecipe(): void {
    this.visibleRecipeDrawer = false;
  }


 

  //for item form drawer
  @ViewChild('itemForm') itemForm: any

  createItems(): void{
    // console.log('click');
    this.itemForm.createItem()
    this.visible = false;
  }

  // for Create a  Recipe Items recipeForm
  @ViewChild('recipeForm') recipeForm: any
  createRecipeItems(): void{
    console.log('click');
    this.recipeForm.createRecipeItem()
    this.visibleRecipeDrawer = false;
  }
  


  ngOnInit(): void {
  }



  //modal form


  // days: Day[] = [
  //   { name: 'Sunday', value: 0, selected: false },
  //   { name: 'Monday', value: 1, selected: false },
  //   { name: 'Tuesday', value: 2, selected: false },
  //   { name: 'Wednesday', value: 3, selected: false },
  //   { name: 'Thursday', value: 4, selected: false },
  //   { name: 'Friday', value: 5, selected: false },
  //   { name: 'Saturday', value: 6, selected: false }
  // ];

  // startDay: number | null = null;
  // endDay: number | null = null;
 

  // onDaySelect(event: any, value: number): void {
  //   console.log('click');
    
  //   const isChecked = event.target.checked;
  //   const selectedDay = this.days.find(day => day.value === value);
  //   console.log(selectedDay);
    
  //   if (selectedDay) {
  //     selectedDay.selected = isChecked;
  //   }
  // }

  // isSelected(value: number): boolean {
  //   const selectedDay = this.days.find(day => day.value === value);
  //   // console.log(!!selectedDay?.selected);
    
  //   return !!selectedDay?.selected;
  // }
  
  
  // validateForm!: FormGroup;
  
  // constructor(private modalService: NzModalService, private router: Router,private fb: FormBuilder) {
  //   this.validateForm = this.fb.group({
  //     startTime: ['', [Validators.required]],
  //     endTime: ['', [Validators.required]],
  //     scheduleName: ['', Validators.required],
  //     description: [''],
  //     startDay: [this.startDay],
  //     endDay: [this.endDay],
  //     remember: [true]
  //   });
  // }


  
  // submitForm(): void {
  //   const data = {...this.validateForm.value, startDay: this.startDay,endDay:this.endDay}
  //   console.log('submit', data);
    
  //   const selectedStartDay = this.days.find(day => day.selected && this.startDay === null);
  //   const selectedEndDay = this.days.find(day => day.selected && this.startDay !== null && day.value !== this.startDay);
    
  //   if (selectedStartDay) {
  //     this.startDay = selectedStartDay.value;
  //   }
    
  //   if (selectedEndDay) {
  //     this.endDay = selectedEndDay.value;
  //   }
  //   console.log(this.startDay, this.endDay);
    
    
  //   if (this.startDay !== null && this.endDay !== null) {
  //     console.log(this.startDay);
  //     console.log(this.endDay);
      
  //     console.log('Selected Day Range:', this.startDay, 'to', this.endDay);
  //     // Perform actions based on the selected start and end day
  //   } else {
  //     console.log('Please select start and end days.');
  //   }
    
  // }
  
  
}
  







  // receivedFormData: any;

  // receiveSubmittedFormData(data: any): void {
  //   console.log('Received form data in parent:', data);
  //   this.receivedFormData = data; // Store the received form data
  //   // Perform actions with the received form data as needed
  // }


  // constructor(private fb: NonNullableFormBuilder) {}
  

  // validateForm: FormGroup<{
  //   startTime: FormControl<string>;
  //   endTime: FormControl<string>;
  //   scheduleName: FormControl<string>;
  //   description: FormControl<string>;
  //   startDay: FormControl<string>;
  //   remember: FormControl<boolean>;
  // }> = this.fb.group({
  //   startTime: ['', [Validators.required]],
  //   endTime: ['', [Validators.required]],
  //   scheduleName: ['', Validators.required],
  //   description: [''],
  //   startDay:[''],
  //   remember: [true]
  // });

  // msg: any;


  // //getting all Input for the form 

  // submitForm(): void {
  //   console.log('submit', this.validateForm.value);

  //   const selectedStartDay = this.days.find(day => day.selected && this.startDay === null);
  //   const selectedEndDay = this.days.find(day => day.selected && this.startDay !== null && day.value !== this.startDay);
  
  //     if (selectedStartDay) {
  //       this.startDay = selectedStartDay.value;
  //     }
  
  //     if (selectedEndDay) {
  //       this.endDay = selectedEndDay.value;
  //     }
  
  //     if (this.startDay !== null && this.endDay !== null) {
  //       console.log(this.startDay);
  //       console.log(this.endDay);
        
  //       console.log('Selected Day Range:', this.startDay, 'to', this.endDay);
  //       // Perform actions based on the selected start and end day
  //     } else {
  //       console.log('Please select start and end days.');
  //     }

  //     // this.submitedFormData.emit(this.submitForm())
  //   }
    

  // days: Day[] = [
  //   { name: 'Sunday', value: 0, selected: false },
  //   { name: 'Monday', value: 1, selected: false },
  //   { name: 'Tuesday', value: 2, selected: false },
  //   { name: 'Wednesday', value: 3, selected: false },
  //   { name: 'Thursday', value: 4, selected: false },
  //   { name: 'Friday', value: 5, selected: false },
  //   { name: 'Saturday', value: 6, selected: false }
  // ];

  // startDay: number | null = null;
  // endDay: number | null = null;
 

  // onDaySelect(event: any, value: number): void {
  //   const isChecked = event.target.checked;
  //   const selectedDay = this.days.find(day => day.value === value);
  //   if (selectedDay) {
  //     selectedDay.selected = isChecked;
  //   }
  // }

  // isSelected(value: number): boolean {
  //   const selectedDay = this.days.find(day => day.value === value);
  //   return !!selectedDay?.selected;
  // }

  
 

  
// }
