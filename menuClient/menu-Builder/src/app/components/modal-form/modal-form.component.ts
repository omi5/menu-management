import { Component } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';


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

  constructor(private fb: NonNullableFormBuilder) {}


  validateForm: FormGroup<{
    startTime: FormControl<string>;
    endTime: FormControl<string>;
    scheduleName: FormControl<string>;
    description: FormControl<string>;
    startDay: FormControl<string>;
    remember: FormControl<boolean>;
  }> = this.fb.group({
    startTime: ['', [Validators.required]],
    endTime: ['', [Validators.required]],
    scheduleName: ['', Validators.required],
    description: [''],
    startDay:[''],
    remember: [true]
  });

  msg: any;


  //getting all Input for the form 

  submitForm(): void {
    console.log('submit', this.validateForm.value);

    const selectedStartDay = this.days.find(day => day.selected && this.startDay === null);
      const selectedEndDay = this.days.find(day => day.selected && this.startDay !== null && day.value !== this.startDay);
  
      if (selectedStartDay) {
        this.startDay = selectedStartDay.value;
      }
  
      if (selectedEndDay) {
        this.endDay = selectedEndDay.value;
      }
  
      if (this.startDay !== null && this.endDay !== null) {
        console.log(this.startDay);
        console.log(this.endDay);
        
        console.log('Selected Day Range:', this.startDay, 'to', this.endDay);
        // Perform actions based on the selected start and end day
      } else {
        console.log('Please select start and end days.');
      }
  }

  days: Day[] = [
    { name: 'Sunday', value: 0, selected: false },
    { name: 'Monday', value: 1, selected: false },
    { name: 'Tuesday', value: 2, selected: false },
    { name: 'Wednesday', value: 3, selected: false },
    { name: 'Thursday', value: 4, selected: false },
    { name: 'Friday', value: 5, selected: false },
    { name: 'Saturday', value: 6, selected: false }
  ];
  startDay: number | null = null;
  endDay: number | null = null;

  onDaySelect(event: any, value: number): void {
    const isChecked = event.target.checked;
    const selectedDay = this.days.find(day => day.value === value);
    if (selectedDay) {
      selectedDay.selected = isChecked;
    }
  }

  isSelected(value: number): boolean {
    const selectedDay = this.days.find(day => day.value === value);
    return !!selectedDay?.selected;
  }
}
