import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';


@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent {
  @Output() submittedFormData: EventEmitter<any> = new EventEmitter<any>();

  validateForm!: FormGroup;

  constructor(private fb: FormBuilder, private msg: NzMessageService) {
    this.validateForm = this.fb.group({
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      scheduleName: ['', Validators.required],
      description: [''],
      remember: [true]
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      const formData = this.validateForm.value;
      console.log(formData);
      
    // this.submittedFormData.(formData);
  }
    
  }

  //For Image Upload

  handleChange({ file, fileList }: NzUploadChangeParam): void {
    const status = file.status;
    if (status !== 'uploading') {
      console.log(file, fileList);
    }
    if (status === 'done') {
      this.msg.success(`${file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      this.msg.error(`${file.name} file upload failed.`);
    }
  }
  //For Image Upload


}
