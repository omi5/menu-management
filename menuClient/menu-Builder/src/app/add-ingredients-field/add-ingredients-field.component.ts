import { Component, OnInit } from '@angular/core';
import { FormControl, FormRecord, NonNullableFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-ingredients-field',
  templateUrl: './add-ingredients-field.component.html',

  styleUrls: ['./add-ingredients-field.component.css']
})
export class AddIngredientsFieldComponent implements OnInit {
  validateForm: FormRecord<FormControl<string>> = this.fb.record({});
  listOfControl: any = [];

   jsonData = [
    {"name": "cup", "quantity": 10},
    {"name": "tablespoon", "quantity": 5},
    {"name": "plate", "quantity": 8}
  ];

  addField(e?: MouseEvent): void {
    e?.preventDefault();

    const id = this.listOfControl.length > 0 ? this.listOfControl[this.listOfControl.length - 1].id + 1 : 0;

    const control = {
      id,
      controlInstance: `passenger${id}`
    };
    // const index = this.listOfControl.push(control);
    // console.log(this.listOfControl[this.listOfControl.length - 1]);
    // this.validateForm.addControl(
    //   // this.listOfControl[index - 1].controlInstance,
    //   this.fb.control('', Validators.required)
    // );

    if(this.unitOfStock === 'cup'){
      const foundItem = this.jsonData.find(item => item.name === 'cup');
    
    if (foundItem) {
        const newQuantity = this.quantity * foundItem.quantity;
        this.quantity = newQuantity
        console.log(`Updated total quantity: ${newQuantity}`);
    } else {
        console.log(`${foundItem} not found in the list.`);
    }
    }

    const ingredientsDetails = {
        id: 1,
        restaurantId: 1,
        ingredientName: this.ingredientName,
        quantity: this.quantity,
        unitOfStock: this.unitOfStock,
        costPerUnit: 0.599,
        caloriesPerUnit: 150,
        preparation: this.preparation,
      }
      this.listOfControl.push(ingredientsDetails);
      // console.log(this.listOfControl);

      this.ingredientName = '';
      this.quantity = 0;
      this.unitOfStock = '';
      this.preparation = '';
      
  }

  removeField(i: { id: number; controlInstance: string }, e: MouseEvent): void {
    e.preventDefault();
    if (this.listOfControl.length > 1) {
      const index = this.listOfControl.indexOf(i);
      this.listOfControl.splice(index, 1);
      console.log(this.listOfControl);
      this.validateForm.removeControl(i.controlInstance);
    }
  }

  //for ngModel
  id! : number;
  restaurantId! : number;
  ingredientName! : string;
  quantity! : number;
  unitOfStock! : string;
  costPerUnit! : number;
  caloriesPerUnit!: number;
  preparation!: string;




  submitForm(): void {
    
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      console.log(this.listOfControl);
      return this.listOfControl;
      
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }

    // const ingredientsDetails = {
    //   ingredientName: this.ingredientName,
    //   quantity: parseInt(this.quantity),
    //   unitOfStock: this.unitOfStock,
    //   preparation: this.preparation,
    // }
    // console.log(ingredientsDetails);
    
  }

  constructor(private fb: NonNullableFormBuilder) {}

  ngOnInit(): void {
    this.addField();
    
  }



  //For Ingredients
  ingredients = ['eggs', 'milks', 'tomato', 'onion']
  //For Conversion ml to cup like this
  convertionList = ['cup', 'tablespoon'];
}
