
import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
// import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
// import { NzUploadFile } from 'ng-zorro-antd/upload';
// import { Observable, Observer } from 'rxjs';


//For Day Selection
// interface Day {
//   name: string;
//   value: number;
//   selected: boolean;
// }

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  // use in Nz-sider
  isCollapsed = false;


  //for modal

  isVisible = false;

  constructor(private modalService: NzModalService) {}

  //use in Nz-sider
  showModal(): void {
    this.isVisible = true;
  }
  handleOk(): void {
    this.isVisible = false;
   
  }
  handleCancel(): void {
    this.isVisible = false;
  }
 

  
  //for form

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


  //getting all Input for the form 

  // submitForm(): void {
  //   console.log('submit', this.validateForm.value);

  //   const selectedStartDay = this.days.find(day => day.selected && this.startDay === null);
  //     const selectedEndDay = this.days.find(day => day.selected && this.startDay !== null && day.value !== this.startDay);
  
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
  // }

 


  //Uploading image file

  // loading =false;
  // avatarUrl?: string;

  // beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]): Observable<boolean> =>
  //   new Observable((observer: Observer<boolean>) => {
  //     const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  //     if (!isJpgOrPng) {
  //       this.msg.error('You can only upload JPG file!');
  //       observer.complete();
  //       return;
  //     }
  //     const isLt2M = file.size! / 1024 / 1024 < 2;
  //     if (!isLt2M) {
  //       this.msg.error('Image must smaller than 2MB!');
  //       observer.complete();
  //       return;
  //     }
  //     observer.next(isJpgOrPng && isLt2M);
  //     observer.complete();
  //   });

  // private getBase64(img: File, callback: (img: string) => void): void {
  //   const reader = new FileReader();
  //   reader.addEventListener('load', () => callback(reader.result!.toString()));
  //   reader.readAsDataURL(img);
  // }

  // handleChange(info: { file: NzUploadFile }): void {
  //   switch (info.file.status) {
  //     case 'uploading':
  //       this.loading = true;
  //       break;
  //     case 'done':
  //       // Get this url from response in real world.
  //       this.getBase64(info.file!.originFileObj!, (img: string) => {
  //         this.loading = false;
  //         this.avatarUrl = img;
  //       });
  //       break;
  //     case 'error':
  //       this.msg.error('Network error');
  //       this.loading = false;
  //       break;
  //   }
  // }



  //forDay Selection
 
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
  
    // onSubmit(): void {
    //   const selectedStartDay = this.days.find(day => day.selected && this.startDay === null);
    //   const selectedEndDay = this.days.find(day => day.selected && this.startDay !== null && day.value !== this.startDay);
  
    //   if (selectedStartDay) {
    //     this.startDay = selectedStartDay.value;
    //   }
  
    //   if (selectedEndDay) {
    //     this.endDay = selectedEndDay.value;
    //   }
  
    //   if (this.startDay !== null && this.endDay !== null) {
    //     console.log('Selected Day Range:', this.startDay, 'to', this.endDay);
    //     // Perform actions based on the selected start and end day
    //   } else {
    //     console.log('Please select start and end days.');
    //   }
    // }

  

}
