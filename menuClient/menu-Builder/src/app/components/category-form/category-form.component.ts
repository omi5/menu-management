import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { CategoryService } from 'src/app/services/category.service';


@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent {

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

  @Output() submittedFormData: EventEmitter<any> = new EventEmitter<any>();

  validateForm!: FormGroup;

  constructor(private fb: FormBuilder, private msg: NzMessageService, private categoryService: CategoryService) {
    this.validateForm = this.fb.group({
      restaurantId: 1,
      categotyId: 1,
      categoryName: ['', Validators.required],
      categoryDescription: [''],
      categoryImage: 'image',
    });
  }

  submitFormForCategory(): void {
      const formData = this.validateForm.value;
      this.categoryService.createCategory(formData).subscribe(res=>{
        alert('categoryCreated');
        console.log(res);
        
      })
      console.log(formData);
      
    // this.submittedFormData.(formData);
  
    
  }

 


}
