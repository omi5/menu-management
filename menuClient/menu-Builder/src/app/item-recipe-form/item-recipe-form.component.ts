import { Component, OnInit, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { MenuItemServiceService } from '../services/menu-item-service.service';
import { CloudinaryService } from '../services/cloudinary.service';
import { CategoryService } from '../services/category.service';
import { CategoryList } from '../interfaces/categoryList.interface';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-item-recipe-form',
  templateUrl: './item-recipe-form.component.html'
})

//for Ingredinet




//for Ingredinet
export class ItemRecipeFormComponent implements OnInit {
//for ingredients
public orderForm: FormGroup;
totalCostPerUnit: number = 0;
totalCaloriesPerUnit: number = 0;
totalCost: number = 0;
 measurementToolArray:any = [];
 measurementTools: any;
 typeOfMeasurement: any = ['liquid','solid']

 //mock data
  ingredentList ={
  "ingredients": [
      {
          "id": 111,
          "ingredientName": "Cheese",
          "unitOfStock": "gm",
          "costPerUnit": 200,
          "caloriesPerUnit": 150,
          "liquid": "No"
      },
      {
          "id": 2222,
          "ingredientName": "Cheese Cream",
          "unitOfStock": "ml",
          "costPerUnit": 300,
          "caloriesPerUnit": 150,
          "liquid": "Yes"
      }
  ]
}


  
  visible = false;
  cloudinary: any;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  owner = ["Burger","Pizza","Drinks"]
  howToDelivered = [ 
  'Cardboard Boxes',
  'Plastic Containers',
  'Styrofoam ',
  'Paper Bags',
  'Thermal Insulated Bags']
 

  //Array Of Portion Size
   portionSizes = [
    "Small",
    "Medium",
    "Large",
    "Extra Small",
    "Extra Large"
]




  //for Uploading a Image
  constructor(private _fb: FormBuilder,private msg: NzMessageService, private menuService: MenuItemServiceService, private categoryService: CategoryService) {
    this.getAllCategory()
    this.orderForm = this._fb.group({
      ingredientBatches: this._fb.array([this.createIngredientBatch()]),
      percentage: [0, Validators.required],
    });


    //for ingredients

    this.measurementTools = {
      "cup": {
        "liquid": {
          "quantity": 250,
          "unit": "ml"
        },
        "solid": {
          "quantity": 200,
          "unit": "g"
        }
      },
      "tablespoon": {
        "liquid": {
          "quantity": 15,
          "unit": "ml"
        },
        "solid": {
          "quantity": 15,
          "unit": "g"
        }
      },
      "teaspoon": {
        "liquid": {
          "quantity": 5,
          "unit": "ml"
        },
        "solid": {
          "quantity": 5,
          "unit": "g"
        }
      },
      
      'gram': 'gm',
      'mililiter': 'ml',
      
    };
    
    for (const tool in this.measurementTools) {
      if (this.measurementTools.hasOwnProperty(tool)) {
        this.measurementToolArray.push(tool);
      }
    }
    
    console.log('measurementToolArray',this.measurementToolArray);

  }

  // handleChange({ file, fileList }: NzUploadChangeParam): void {
  //   const status = file.status;
  //   if (status !== 'uploading') {
  //     console.log(file, fileList);
  //   }
  //   if (status === 'done') {
  //     this.msg.success(`${file.name} file uploaded successfully.`);
  //   } else if (status === 'error') {
  //     this.msg.error(`${file.name} file upload failed.`);
  //   }
  // }



  uploadedImageUrl: string | undefined;
  private successMessageDisplayed = false;

  handleChange(info: NzUploadChangeParam): void {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
      console.log('File information:', info.file);
    console.log('File list:', info.fileList);
    }
    if (info.file.status === 'done' && !this.successMessageDisplayed) {
      this.msg.success(`${info.file.name} file uploaded successfully`);
      this.successMessageDisplayed = true;
      console.log('Upload response:', info.file.response);
      this.uploadedImageUrl = info.file.response.url; 
    } 
    // else if (info.file.status === 'error') {
    //   this.msg.error(`${info.file.name} file upload failed.`);
    //   console.error('Upload error:', info.file.error);
    // }
  }
 

  selectFile(event: any): void {
    const file = event?.file?.originFileObj;

      this.cloudinary.cloudUpload(file, 'user123') 
      .subscribe(
        (response: any) => {
          console.log('Cloudinary API Response:', response);
          const fakeEvent: NzUploadChangeParam = {
            file: {
              ...event.file,
              status: 'done',
              response: response,
            },
            fileList: [...event.fileList],
          };
  
          this.handleChange(fakeEvent);
        },
        (error: any) => {
          console.error('Cloudinary API Error:', error);
          const fakeEvent: NzUploadChangeParam = {
            file: {
              ...event.file,
              status: 'error',
              response: error,
            },
            fileList: [...event.fileList],
          };
  
          this.handleChange(fakeEvent);
        }
      );
  
    
  }



  //For Ingredients
  @ViewChild('ingredients') ingredients: any

  includeIngredients(){
    return this.ingredients.submitForm();
  }

  //for allergens selection
  listOfOption: string[] = [];
  listOfSelectedValue = [];

  //For tastyTags

  listOfOptionForTastyTags: string[] = [];
  listOfSelectedValueForTastyTags = [];


  //For MealTime 
  listOfOptionForMealTime: string[] = []
  listOfSeletedValueForMealTime = []

  //For Type Of Food
  listOfOptionForTypeOfFood : string[] = []
  listOfSeletedValueForTypeOfFood: string[] = []


 categories: CategoryList[] = []

  ngOnInit(): void {
    //For allergens
    const allergens: string[] = [
      'Peanuts',
      'Shellfish',
      'Milk',
      'Eggs',
      'Soy',
      'Wheat',
      'Fish',
      'Tree nuts',
      'Sesame',
      'Sulfites',
      'Mustard',
      'Celery',
      'Lupin',
      'Molluscs',
      'Corn',
      'Gluten',
      'Red meat',
      'Pineapple',
      'Avocado',
      'Kiwi',
      // Add more allergens as needed
    ];

    //For tasty tags
    const tastyTags: string[] = [
      'Savory',
      'Spicy',
      'Sweet',
      'Sour',
      'Bitter',
      'Salty',
      'Rich',
      'Smoky',
      'Tangy',
      'Creamy',
      'Zesty',
      'Herby',
      'Fruity',
      'Nutty',
      'Floral',
      'Earthy',
      'Citrusy',
      'Buttery',
      'Tart',
      'Fresh'
    ];

    const mealTime = ['All Day', 'BreakFast', 'Lunch','Dinner']
    const  typeOfFood = ['Delivey Only', 'Pick Up', 'Eat Only','All']


    

  

    // for (let i = 10; i < 36; i++) {
    //   children.push(`${i.toString(36)}${i}`);
    // }
    this.listOfOption = allergens;
    this.listOfOptionForTastyTags= tastyTags;
    this.listOfOptionForMealTime = mealTime;
    this.listOfOptionForTypeOfFood = typeOfFood;
    
  }

  
  getAllCategory(){
    this.categoryService.getAllCategory().subscribe((res: CategoryList[])=>{
      // const categoryList = res as CategoryList;
      console.log('category List',res);
      this.categories.push(...res);
    })
  }


  //submit Data 
  restaurantId!: number;
  MealTimeId!: number;
  itemName! : string;
  itemProfileTastyTags! : string;
  categoryId! : any;
  typeOfFoods! : string;
  itemPortionsize!: string;
  itemPreparationtime!: string;
  servingTemperature! : string;
  itemLastingTime!: string;
  itemPrice! : number;
  itemCalories! : string;
  itemDescription! : string;
  itemDietaryRestrictions! : string;
  ItemHowToDelivery!: string;
  itemImage! : string

  
  
  createItem(){
    const ingredients = this.submitForm()
    // if(this.categoryId === 'Burger'){
    //   this.categoryId = 1;
    // }
    console.log('new ingredinte=======',ingredients);
    
    let newItem ={
      "restaurantId": 1,
      "mealTimeId": 1,
      "categoryId" : this.categoryId,
      "item":{
      "itemName":this.itemName,
      "timeOfDay": this.listOfSeletedValueForMealTime,
      "itemProfileTastyTags" : this.listOfSelectedValueForTastyTags ,
      "typeOfFoods" : this.typeOfFoods,
      // .split(',')[
      //   Math.floor(Math.random()*this.typeOfFood.length)] ,
        "itemPortionsize" : this.itemPortionsize,
        "itemPreparationtime" : parseInt(this.itemPreparationtime),
        "servingTemperature" : parseInt(this.servingTemperature) ,
        "itemLastingTime" : parseInt(this.itemLastingTime),
        "itemPrice" : this.itemPrice,
        "itemCalories" : parseInt(this.itemCalories),
        "itemDietaryRestrictions": this.listOfSelectedValue,
        "itemImage" : 'https://i.pinimg.com/236x/2f/8b/5d/2f8b5d0bf6e405594cc26a83dd3daaa4.jpg',
        "ingredients": ingredients
        ,
        "options":{
          "add": ingredients ,
          "no": ingredients
        }
      }
    }

    // console.log('ingredents',ingredients);
    
    console.log('===========item',newItem);

    //for adding data to backend
    this.menuService.createNewMenuItem(newItem).subscribe(res=>{
      alert("The Item has been added successfully");
      console.log('click',res);
      
    })
    
    // return newItem;
  }

  getMenuItemById(id:any){
    this.menuService.getMenuItemById(id).subscribe((res: any)=>{
      return {...res};
    })
  }

  // updatedMenuItem(id: any){
  //   const res = this.getMenuItemById(id);
  //   let updatedMenuItem = {
  //   "restaurantId": 1,
  //   "mealTimeId": 1,
  //   "categoryId" : res.categoryId,
  //   "item":{
  //   "itemName":res.itemName,
  //   "itemProfileTastyTags" : res.listOfSelectedValueForTastyTags ,
  //   "typeOfFoods" : res.typeOfFoods,
  //   // .split(',')[
  //   //   Math.floor(Math.random()*this.typeOfFood.length)] ,
  //     "itemPortionsize" : res.itemPortionsize,
  //     "itemPreparationtime" : parseInt(res.itemPreparationtime),
  //     "servingTemperature" : parseInt(res.servingTemperature) ,
  //     "itemLastingTime" : parseInt(res.itemLastingTime),
  //     "itemPrice" : res.itemPrice,
  //     "itemCalories" : parseInt(res.itemCalories),
  //     "itemDietaryRestrictions": res.listOfSelectedValue,
  //     "itemImage" : res.itemImage,
  //     "ingredients": ingredients,
  //     "options":{
  //       "add": res.ingredients ,
  //       "no": res.ingredients
  //     }
  //   }
  //  }
  // }


  //for Ingredinetn


  private createIngredientBatch(): FormGroup {
    return this._fb.group({
      id: 1,
      restuarantId: 1,
      ingredientName: [''],
      unitOfStock: [''],
      quantity: [''],
      costPerUnit: [0.559],
      caloriesPerUnit: [0.333],
    });
  }

  get ingredientBatchesArray(): FormArray {
    return <FormArray>this.orderForm.get('ingredientBatches');
  }

  addIngredientBatch(): void {
    this.ingredientBatchesArray.push(this.createIngredientBatch());
    this.updateTotals();
  }

  removeIngredientBatch(index: number): void {
    this.ingredientBatchesArray.removeAt(index);
    this.updateTotals();
  }

// ... (existing code)
onIngredientChange(index: number): void {
  const ingredientBatch = this.ingredientBatchesArray.at(index);

  // Find the selected ingredient in the mock data
  const selectedIngredient = this.ingredentList.ingredients.find(ingredient => ingredient.ingredientName === ingredientBatch.value.ingredientName);

  // Update the costPerUnit and caloriesPerUnit based on the selected ingredient
  if (selectedIngredient) {
    ingredientBatch.patchValue({
      costPerUnit: selectedIngredient.costPerUnit,
      caloriesPerUnit: selectedIngredient.caloriesPerUnit,
      id: selectedIngredient.id
    });

    setTimeout(() => {
      this.updateTotals();
    }, 100); // Optionally update totals when the ingredient changes

  }
  console.log("after change", selectedIngredient);
  
}

updateTotals(): void {
  console.log("Hit");
  this.totalCostPerUnit = 0;
  this.totalCaloriesPerUnit = 0;

  // Check if the 'percentage' control exists in the form
  const percentageControl = this.orderForm.get('percentage');

  if (percentageControl) {
    const percentage = percentageControl.value / 100;
    console.log("measurementTools", this.ingredientBatchesArray);

    this.ingredientBatchesArray.controls.forEach((control: AbstractControl, index) => {
      console.log(`Processing control at index ${index}`);

      // Add this log to check the value of the control
      console.log("Control value:", control.value);
      const costPerUnitControl = control.get('costPerUnit') as FormControl;
      const quantityControl = control.get('quantity') as FormControl;
      const caloriesPerUnitControl = control.get('caloriesPerUnit') as FormControl;
      const unitOfStockControl = control.get('unitOfStock') as FormControl;

      if (costPerUnitControl && quantityControl && caloriesPerUnitControl) {
        const costPerUnit = costPerUnitControl.value;
        const quantity = quantityControl.value;
        const caloriesPerUnit = caloriesPerUnitControl.value;
        const unitOfStock = unitOfStockControl.value;
        console.log("costPerUnit", costPerUnit);

        console.log("quantity", quantity);
        console.log("caloriesPerUnit", caloriesPerUnit);
        console.log("unitOfStock", unitOfStock);

        // Find the measurement details for the selected unitOfStock
        const measurementDetails = this.measurementTools[unitOfStock];

        if (measurementDetails) {
          // Determine the quantity based on measurementType

          // this.totalCostPerUnit += costPerUnit * measurementQuantity;
          this.totalCostPerUnit += costPerUnit * quantity;
          this.totalCaloriesPerUnit += caloriesPerUnit * quantity;
        }
      }
    });

    // Calculate the total cost by applying the percentage
    this.totalCost = this.totalCostPerUnit * (1 + percentage);
    console.log("Total Cost:", this.totalCost);
  } else {
    console.error("Percentage control not found in the form");
  }
}


submitForm(): void {
  if (this.orderForm.valid) {
    const formData = this.orderForm.value;
    this.updateTotals()

    console.log('Form Data:', formData);
    console.log('Total Cost Per Unit:', this.totalCostPerUnit);
    console.log('Total Calories Per Unit:', this.totalCaloriesPerUnit);
    return formData.ingredientBatches;

    // Uncomment the following lines to send the data to the service
    // this.menuService.createNewMenuItem(formData).subscribe({
    //   next: (response) => {
    //     console.log('Post successful', response);
    //   },
    //   error: (error) => {
    //     console.error('Error in post', error);
    //   },
    // });
  } else {
    console.error('Form invalid');
  }
}


  //for Ingredinetn



 

}
