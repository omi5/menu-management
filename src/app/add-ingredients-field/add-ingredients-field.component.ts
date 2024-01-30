import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-ingredients-field',
  templateUrl: './add-ingredients-field.component.html',
  styleUrls: ['./add-ingredients-field.component.css']
})
export class AddIngredientsFieldComponent implements OnInit {
  validateForm!: FormGroup;
  listOfControl: any[] = [];
  ingredients: string[] = ['eggs', 'milks', 'tomato', 'onion'];
  convertionList: string[] = ['cup', 'tablespoon', 'pieces', 'slice'];
  loading: boolean = false;
  quantity: number = 0;
  unitOfStock: string = '';

  constructor(private fb: FormBuilder) {
    this.validateForm = this.fb.group({
      ingredients: this.fb.array([]),
      costPerUnit: [0.599],
      caloriesPerUnit: [150],
      totalCost: [null], // Add more form controls as needed
    });
  }

  ngOnInit(): void {
    this.addField();
  }

  addField(e?: MouseEvent): void {
    e?.preventDefault();

    const id = this.listOfControl.length > 0 ? this.listOfControl[this.listOfControl.length - 1].id + 1 : 0;

    const control = {
      id,
      controlInstance: `passenger${id}`
    };

    const ingredientControl = this.fb.group({
      ingredientName: ['', Validators.required],
      quantity: [0, Validators.required],
      unitOfStock: ['', Validators.required],
      costPerUnit: [0.599],
      caloriesPerUnit: [150],
    });

    const ingredientsArray = this.validateForm.get('ingredients') as FormArray;
   
    if (ingredientsArray) {
      ingredientsArray.push(ingredientControl);
    }

    this.listOfControl.push(control);
  }


  removeField(controlInstance: string, e: MouseEvent): void {
    e.preventDefault();

    const index = this.listOfControl.findIndex(item => item.controlInstance === controlInstance);

    const ingredientsArray = this.validateForm.get('ingredients') as FormArray;
    if (ingredientsArray) {
      ingredientsArray.removeAt(index);
    }

    this.listOfControl.splice(index, 1);
  }

  submitForm(): void {
    // console.log('Form Valid:', this.validateForm.valid);
  
    if (this.validateForm.valid) {
      // Handle form submission here
      // console.log('Form Submitted:', this.validateForm.value);
    } else {
      console.log('Form is not valid. Please check the fields.');
    }
  }
  
}
