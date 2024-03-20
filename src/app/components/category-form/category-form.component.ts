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
  @Output() submittedFormData: EventEmitter<any> = new EventEmitter<any>();

  validateForm!: FormGroup;

  constructor(private fb: FormBuilder, private msg: NzMessageService, private categoryService: CategoryService) {
    this.validateForm = this.fb.group({
      restaurantId: 0,
      categoryName: ['', Validators.required],
    });
  }

  submitFormForCategory(): void {
      const formData = this.validateForm.value;
      this.categoryService.createCategory(formData).subscribe(res=>{
        alert('categoryCreated'); 
      })
  }

}
