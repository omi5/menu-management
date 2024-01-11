import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ScheduleTimeService } from 'src/app/services/schedule-time.service';


interface Day {
  name: string;
  value: number;
  selected: boolean;
}


@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.css']
})
export class ModalFormComponent {

 //For Time 

 time: Date | null = null;

  log(value: Date): void {
    console.log(value);
  }


  @Output() submittedFormData: EventEmitter<any> = new EventEmitter<any>();

  validateForm!: FormGroup;

  constructor(private fb: FormBuilder, private scheduleService: ScheduleTimeService) {
    this.validateForm = this.fb.group({
      restaurantId: 1,
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      mealTimeName: ['', Validators.required],
      description: [''],
      startDay:[''],
      endDay: [''],
      remember: [true]
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      const formData = this.validateForm.value;
      this.scheduleService.createScheduleTime(formData).subscribe(res=>{
        alert('ScheduleTime Created');
        console.log('scheduleCreated', res);
        
      });
      console.log(formData);
      
    //   const selectedStartDay = this.days.find(day => day.selected && this.startDay === null);
    //   const selectedEndDay = this.days.find(day => day.selected && this.startDay !== null && day.value !== this.startDay);

    //   if (selectedStartDay) {
    //     this.startDay = selectedStartDay.value;
    //   }

    //   if (selectedEndDay) {
    //     this.endDay = selectedEndDay.value;
    //   }

    //   if (this.startDay !== null && this.endDay !== null) {
    //     console.log(this.startDay);
    //     console.log(this.endDay);
        
    //   } else {
    //     console.log('Please select start and end days.');
    //   }
    // } else {
    //   console.log('Form is invalid');
    // }
    // this.submittedFormData.(formData);
  }
    

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
}

days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

}