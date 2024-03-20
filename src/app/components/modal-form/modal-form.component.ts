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
      });
  }
  
}

days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

}