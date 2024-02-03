import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { MenuItemServiceService } from '../services/menu-item-service.service';
import { CloudinaryService } from '../services/cloudinary.service';
import { CategoryService } from '../services/category.service';
import { CategoryList } from '../interfaces/categoryList.interface';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MakeRecipeService } from '../services/make-recipe.service';
import { inventoryIngredient } from '../interfaces/inventoryIngredints.interface';
import { recipeInterface } from '../interfaces/recipeIngredints.interface';
import { InventoryService } from '../services/inventory.service';

@Component({
  selector: 'app-item-recipe-form',
  templateUrl: './item-recipe-form.component.html'
})

//for Ingredinet
//for Ingredinet
export class ItemRecipeFormComponent implements OnInit {
//for ingredients
public orderForm: FormGroup;
public orderFormForAddOns: FormGroup;
public orderFormForRecipe: FormGroup;
totalCostPerUnit: number = 0;
totalCaloriesPerUnit: number = 0;
totalCaloriesPerUnitForAddOns: number = 0;
totalCostPerUnitForAddOns: number =0;
totalCostPerUnitForRecipe: number =0;
totalCaloriesPerUnitForRecipe: number =0;
totalCostForRecipe: number =0;
marginCost : number = 0;
totalCost: number = 0;
totalCostForAddOns: number = 0;
 measurementToolArray:any = [];
 measurementTools: any;
 typeOfMeasurement: any = ['liquid','solid']

 @Input() categoryName!: string;
 selectedCategoryItem !: any[];
  visible = false;
  // cloudinary: any;
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
  constructor(private _fb: FormBuilder, private inventoryService: InventoryService, private cloudinary: CloudinaryService, private msg: NzMessageService, private menuService: MenuItemServiceService, private categoryService: CategoryService,private recipeService:MakeRecipeService) {
    
    this.orderForm = this._fb.group({
      // ingredientBatches: this._fb.array([this.createIngredientBatch()]),
      ingredientBatches: this._fb.array([]),
      raw_ingredients: this._fb.array([]),
      recipes: this._fb.array([]),
      percentage: [0, Validators.required],
    });
    this.orderFormForAddOns = this._fb.group({
      ingredientBatchesForAddOns: this._fb.array([this.createIngredientBatchForAddOns()]),
      percentageForAddOns: [0, Validators.required],
    });
    this.orderFormForRecipe = this._fb.group({
      ingredientBatchesForRecipe: this._fb.array([this.createIngredientBatchForRecipe()]),
      percentageForRecipe: [0, Validators.required],
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
      
      'gm': 'gm',
      'ml': 'ml',
      
    };
    
    for (const tool in this.measurementTools) {
      if (this.measurementTools.hasOwnProperty(tool)) {
        this.measurementToolArray.push(tool);
      }
    }

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
      this.uploadedImageUrl = info.file.response.url; 
    } 
    
  }

  selectFile(event: any): void {
    const file = event?.file?.originFileObj;
      this.cloudinary.cloudUpload(file, 'dkfnaltqp') 
      .subscribe(
        (response: any) => {
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

  //New handle fun
  
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
            "caloriesPerUnit": 250,
            "liquid": "Yes"
        }
    ]
  }

  packingBox: { deliveryBox: any[] } = { deliveryBox: [] };

  ngOnInit(): void {
    //get recipe
    this.subscribeToIngredientChanges()
    this.getAllRecipe()
    this.getAllCategory()
    this.getAllIngredinets()
    this.getAllPackingBox()
    this.addIngredientBatch()
    this.selectedCategory()
    this.categoryId = this.categoryName;
    //For allergens
    const allergens: string[] = [
      'Cereals',
      'Gluten',
      'Crustaceans',
      'Eggs',
      'Fish',
      'Peanuts',
      'Soybeans',
      'Milk',
      'Nuts',
      'Celery',
      'Mustard',
      'Sesame seeds',
      'Sulphur dioxide and sulphites',
      'Lupin',
      'Molluscs'
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
    const typeOfFood = ['Delivery', 'Pick Up', 'Eat-In', 'All'];
   
    this.listOfOption = allergens;
    this.listOfOptionForTastyTags= tastyTags;
    this.listOfOptionForMealTime = mealTime;
    this.listOfOptionForTypeOfFood = typeOfFood;
    
  }

  private subscribeToIngredientChanges() {
    this.menuService.refreshNeeded$.subscribe(() => {
    this.getAllRecipe()
    this.getAllIngredinets()
    this.getAllPackingBox()
    this.addIngredientBatch()
    });
  }

  selectedCategory(){
    this.categories.length && this.categories.map((item:any) => {
      if(item.categoryName === this.categoryName){
        return item
      }
      else{
        console.log('else', item);  
      }
    })
  }
  
  //submit Data 
  restaurantId!: number;
  MealTimeId!: number;
  itemName! : string;
  itemProfileTastyTags! : string;
  categoryId : any = this.categoryName  ;
  typeOfFoods! : string;
  itemPortionsize!: string;
  itemPreparationtime!: any;
  servingTemperature! : string;
  itemLastingTime!: any ;
  itemPrice! : number;
  itemCalories! : any;
  itemDescription! : string;
  itemDietaryRestrictions! : string;
  ItemHowToDelivery!: string;
  itemImage! : string;
  lastingtimeInMinAndHour!: string;
  itemPreparationTimeInMinAndHour!: string
  deliveryBoxDetails: any[] =[];
  NameOfCategory!: any;


  getAllCategory(){
    this.categoryService.getAllCategory().subscribe((res: CategoryList[])=>{
      this.categories.push(...res);
     const selectCategoryItem = this.categories.find(item=> item.categoryName === this.categoryName)
     this.categoryId = selectCategoryItem?._id
    })
  }
 
  //for get recipe and ingredinets   inventoryIngredient | recipeInterface
  // combainedRecipeAndIngredinets: any = []
  // getAllRecipeAndIngredients(){
  //   this.recipeService.getAllRecipe().subscribe(res=>{
  //     this.combainedRecipeAndIngredinets = this.combainedRecipeAndIngredinets.concat(res);
  //     this.inventoryService.getAllInventoryIngredients().subscribe(res =>{
  //       this.combainedRecipeAndIngredinets = this.combainedRecipeAndIngredinets.concat(res);
  //     })
  //   })  
  // }


// For getting all recipes
// getAllrecipe() {
//   this.recipeService.getAllRecipe().subscribe((res: any) => {
//     console.log("Get All Recipes", res);

//     // Assuming the response is an array of recipes
//     this.ingredients = res;

//     // For each recipe, create an ingredient object and add it to the ingredients array
//     this.ingredients.forEach((recipe: any) => {
//       const ingredient = {
//         id: recipe.id,
//         ingredientName: recipe.itemName,
//         unitOfStock: 0, // You might need to adjust this based on your data
//         costPerUnit: recipe.itemPrice, // Adjust based on your data
//         caloriesPerUnit: recipe.itemCalories, // Adjust based on your data
//         liquid: 0, // You might need to adjust this based on your data
//       };

//       // Push the ingredient to the array
//       this.ingredientBatchesArray.push(this._fb.group(ingredient));

//       // Optionally, you might want to update the totals here
//       this.updateTotals();
//     });
//   });
// }

//getAll recipe 
  recipeCollections: any =[]
  getAllRecipe(){
    this.recipeService.getAllRecipe().subscribe(res=>{
      this.recipeCollections.push(res) 
    })
  }
  // getAll Ingredients
  getAllIngredinets() {
    this.inventoryService.getAllInventoryIngredients().subscribe(
      (res) => {
        res.forEach((items: any) => {
          this.ingredentList.ingredients.push(items);
        });
      },
      (error) => {
        console.error('Error fetching inventory:', error);
      }
    );
  }

  //get all Packing box
  getAllPackingBox(){
    this.inventoryService.getAllPackingBox().subscribe(
      (res) => {
        res.forEach((items: any) => {
          this.packingBox.deliveryBox.push(items);
        });
      },
      (error) => {
        console.error('Error fetching deliveryBox:', error);
      }
    )
  }
  
  createItem(){
    const ingredients = this.submitForm()
    const addOns = this.submitFormForAddOns()
    const recipe = this.submitFormForRecipe()
    const rawIngredients =  this.ingredientBatchesArray.controls.map((control: AbstractControl) => control.value)
    if(this.lastingtimeInMinAndHour === 'hours'){
      this.itemLastingTime =(this.itemLastingTime  * 60);
    }
    if(this.itemPreparationTimeInMinAndHour === 'hours'){
      this.itemPreparationtime =(this.itemPreparationtime  * 60);
    }
    const cateName =this.categories.find(item => item._id === this.categoryId);
    this.categories
  
    let newItem ={
      "restaurantId": 0,
      "mealTimeId": 1,
      "categoryId" : this.categoryId,
      "categoryName": cateName?.categoryName,
      "item":{
      "itemName":this.itemName,
      "timeOfDay": this.listOfSeletedValueForMealTime,
      "itemProfileTastyTags" : this.listOfSelectedValueForTastyTags ,
      "typeOfFoods" : this.listOfSeletedValueForTypeOfFood,
      // .split(',')[
      //   Math.floor(Math.random()*this.typeOfFood.length)] ,
        "itemPortionSize" : this.itemPortionsize,
        "itemPreparationTime" : parseInt(this.itemPreparationtime),
        "servingTemperature" : parseInt(this.servingTemperature) ,
        "itemLastingTime" : parseInt(this.itemLastingTime),
        "itemPrice" : this.itemPrice,
        "itemDescription": this.itemDescription,
        "itemPackingType": this.deliveryBoxDetails,
        "itemCalories" : parseInt(this.itemCalories),
        "itemDietaryRestrictions": this.listOfSelectedValue,
        "itemImage" : this.uploadedImageUrl,
        "ingredients": {
          "rawIngredients": rawIngredients,
          "recipes": recipe
        },
        "options":{
          "add": addOns,
          "no": addOns
        }
      }
    }
 
    //for adding data to backend
    this.menuService.createNewMenuItem(newItem).subscribe(res=>{
      alert("The Item has been added successfully");  
    })
  }

  getMenuItemById(id:any){
    this.menuService.getMenuItemById(id).subscribe((res: any)=>{
      return {...res};
    })
  }


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
  private createIngredientBatchForRecipe(): FormGroup {
    return this._fb.group({
      id: 1,
      restuarantId: 1,
      recipeName: [''],
      unitOfStockForRecipe: [''],
      quantityForRecipe: [''],
      recipeItemPortionSize:[''],
      recipeItemPreparationTime: [''],
      recipeItemCost:[''],
      recipeItemCalories:[''],
      recipeItemDescription:[''],
      ingredients:[]

     
    });
  }
  
  private createIngredientBatchForAddOns(): FormGroup {
    return this._fb.group({
      id: 1,
      restuarantId: 1,
      ingredientName: [''],
      unitOfStock: [''],
      quantity: [''],
      costPerUnit: [0.559],
      caloriesPerUnit: [0.333],
      price: 0
    });
  }
  

  get ingredientBatchesArray(): FormArray {
    return <FormArray>this.orderForm.get('ingredientBatches');
  }
  get ingredientBatchesArrayForAddOns(): FormArray {
    return <FormArray>this.orderFormForAddOns.get('ingredientBatchesForAddOns');
  }
  get ingredientBatchesArrayForRecipe(): FormArray {
    return <FormArray>this.orderFormForRecipe.get('ingredientBatchesForRecipe');
  }

  addIngredientBatch(): void {
    this.ingredientBatchesArray.push(this.createIngredientBatch());
    this.updateTotals();
    this.itemCalories = this.totalCaloriesPerUnit;
  }

  addIngredientBatchForAddOns(): void {
    this.ingredientBatchesArrayForAddOns.push(this.createIngredientBatchForAddOns());
    this.updateTotalsForAddOns();
  }

  addIngredientBatchForRecipe(): void {
    const recipeBatch = this.createIngredientBatchForRecipe();
    this.ingredientBatchesArrayForRecipe.push(recipeBatch);
    this.updateTotals();
  }
  
  removeIngredientBatch(index: number): void {
     this.ingredientBatchesArray.removeAt(index);
    this.updateTotals();
  }
  removeIngredientBatchForAddOns(index: number): void {
    this.ingredientBatchesArrayForAddOns.removeAt(index);
    this.updateTotals();
  }
  removeIngredientBatchForRecipe(index: number): void {
    this.ingredientBatchesArrayForRecipe.removeAt(index);
    this.updateTotalsForRecipe();
  }
//onPacking change

onPackingChange(){
  const packingDetails =  this.ItemHowToDelivery;
  const selectedPacking = this.packingBox.deliveryBox.find(deliveryBox => deliveryBox.boxName === packingDetails);
  const finalPacking = {...selectedPacking }
  this.deliveryBoxDetails.push(finalPacking) 
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
    }, 100); 
    // Optionally update totals when the ingredient changes
  }
}
//old One
onIngredientChangeForAddOns(index: number): void {
  const ingredientBatchForAddOns = this.ingredientBatchesArrayForAddOns.at(index);
  // Find the selected ingredient in the mock data
  const selectedIngredient = this.ingredentList.ingredients.find(ingredient => ingredient.ingredientName === ingredientBatchForAddOns.value.ingredientName);
 
  if (selectedIngredient) {
    ingredientBatchForAddOns.patchValue({
      costPerUnit: selectedIngredient.costPerUnit,
      caloriesPerUnit: selectedIngredient.caloriesPerUnit,
      id: selectedIngredient.id
    });
    setTimeout(() => {
      this.updateTotalsForAddOns();
    }, 100); // Optionally update totals when the ingredient changes

  }
}


recipeListArray: any = []
onIngredientChangeForRecipe(index: number): void {
  const ingredientBatchForRecipe = this.ingredientBatchesArrayForRecipe.at(index);
  // Find the selected ingredient in the mock data
  const selectedIngredient = this.recipeCollections[0].find((ingredient: { recipeName: any; }) => ingredient.recipeName === ingredientBatchForRecipe.value.recipeName);
  // Update the costPerUnit and caloriesPerUnit based on the selected ingredient
  // if (selectedIngredient) {
  //   ingredientBatchForAddOns.patchValue({
  //     costPerUnitForAddOns: selectedIngredient.costPerUnit,
  //     // caloriesPerUnitForAddOns: selectedIngredient.caloriesPerUnit,
  //     id: selectedIngredient.id
  //   });
  if (selectedIngredient) {
    ingredientBatchForRecipe.patchValue({
      totalCostPerUnitForRecipe: selectedIngredient.recipeItemCost,
      caloriesPerUnit: selectedIngredient.caloriesPerUnit,
      id: selectedIngredient.id
    });

    setTimeout(() => {
      this.updateTotalsForRecipe();
    }, 100); // Optionally update totals when the ingredient changes

  }
  this.recipeListArray.push(selectedIngredient);
}

//new One
// onIngredientChangeForAddOns(index: number): void {
//   const ingredientBatchForAddOns = this.ingredientBatchesArray.at(index);
//   console.log('index =====', index);
//   console.log('index Name=====', ingredientBatchForAddOns.value.ingredientNameForAddOns);

//   // Find the selected ingredient in the mock data
//   const selectedIngredient = this.ingredentList.ingredients.find(ingredient => ingredient.ingredientName === ingredientBatchForAddOns.value.ingredientNameForAddOns);
//   console.log('selectedIngredient =======', selectedIngredient);

//   // Update the costPerUnit and caloriesPerUnit based on the selected ingredient
//   if (selectedIngredient) {
//     ingredientBatchForAddOns.patchValue({
//       costPerUnitForAddOns: selectedIngredient.costPerUnit,
//       caloriesPerUnitForAddOns: selectedIngredient.caloriesPerUnit,
//       id: selectedIngredient.id
//     });

//     setTimeout(() => {
//       this.updateTotalsForAddOns();
//     }, 100); // Optionally update totals when the ingredient changes
//   }
//   console.log("after change ", selectedIngredient);
// }


// updateTotals(): void {
//   console.log("Hit");
//   this.totalCostPerUnit = 0;
//   this.totalCaloriesPerUnit = 0;

//   // Check if the 'percentage' control exists in the form
//   const percentageControl = this.orderForm.get('percentage');

//   if (percentageControl) {
//     const percentage = percentageControl.value / 100;
//     console.log("measurementTools", this.ingredientBatchesArray);

//     this.ingredientBatchesArray.controls.forEach((control: AbstractControl, index) => {
//       console.log(`Processing control at index ${index}`);

//       // Add this log to check the value of the control
//       console.log("Control value:", control.value);
//       const costPerUnitControl = control.get('costPerUnit') as FormControl;
//       const quantityControl = control.get('quantity') as FormControl;
//       const caloriesPerUnitControl = control.get('caloriesPerUnit') as FormControl;
//       const unitOfStockControl = control.get('unitOfStock') as FormControl;

//       if (costPerUnitControl && quantityControl && caloriesPerUnitControl) {
//         const costPerUnit = costPerUnitControl.value;
//         const quantity = quantityControl.value;
//         const caloriesPerUnit = caloriesPerUnitControl.value;
//         const unitOfStock = unitOfStockControl.value;
//         console.log("costPerUnit", costPerUnit);

//         console.log("quantity", quantity);
//         console.log("caloriesPerUnit", caloriesPerUnit);
//         console.log("unitOfStock", unitOfStock);

//         // Find the measurement details for the selected unitOfStock
//         const measurementDetails = this.measurementTools[unitOfStock];

//         if (measurementDetails) {
//           // Determine the quantity based on measurementType

//           // this.totalCostPerUnit += costPerUnit * measurementQuantity;
//           this.totalCostPerUnit += costPerUnit * quantity;
//           this.totalCaloriesPerUnit += caloriesPerUnit * quantity;
//         }
//       }
//     });

//     // Calculate the total cost by applying the percentage
//     this.totalCost = this.totalCostPerUnit * (1 + percentage);
//     console.log("Total Cost:", this.totalCost);
//   } else {
//     console.error("Percentage control not found in the form");
//   }
// }

//new updatedTotal
updateTotals(): void {
  this.totalCostPerUnit = 0;
  this.totalCaloriesPerUnit = 0;
  this.marginCost = 0;
  // Check if the 'percentage' control exists in the form
  const percentageControl = this.orderForm.get('percentage');
  if (percentageControl) {
    const percentage = percentageControl.value / 100;
    this.ingredientBatchesArray.controls.forEach((control: AbstractControl, index) => {
      // Add this log to check the value of the control
      const costPerUnitControl = control.get('costPerUnit') as FormControl;
      const quantityControl = control.get('quantity') as FormControl;
      const caloriesPerUnitControl = control.get('caloriesPerUnit') as FormControl;
      const unitOfStockControl = control.get('unitOfStock') as FormControl;

      if (costPerUnitControl && quantityControl && caloriesPerUnitControl) {
        const costPerUnit = costPerUnitControl.value;
        const quantity = quantityControl.value;
        const caloriesPerUnit = caloriesPerUnitControl.value;
        const unitOfStock = unitOfStockControl.value;
        // Find the measurement details for the selected unitOfStock
        const measurementDetails = this.measurementTools[unitOfStock];
        if (measurementDetails) {
          // Determine the quantity based on measurementType
          let measurementQuantity: number;
          if (typeof measurementDetails === 'object') {
            // Handle object types like 'cup', 'tablespoon', 'teaspoon'
            measurementQuantity = measurementDetails[quantity > 1 ? 'solid' : 'liquid'].quantity;
          } else {
            // Handle simple types like 'gram', 'mililiter'
            measurementQuantity = 1;
          }

          this.totalCostPerUnit += costPerUnit * measurementQuantity * quantity / 100;
          this.totalCaloriesPerUnit += caloriesPerUnit  * quantity / 100;
        }
      }
    });
    // Calculate the total cost by applying the percentage
    console.log(this.itemPrice);
    console.log(((this.itemPrice - this.totalCostPerUnit) / this.itemPrice) * 100);
    
    this.marginCost =  ((this.itemPrice - this.totalCostPerUnit)/ this.itemPrice) * 100; 
    this.totalCost = this.totalCostPerUnit * (1 + percentage);
    
  } else {
    console.error("Percentage control not found in the form");
  }
}


updateTotalsForAddOns(): void {
  
  this.totalCostPerUnitForAddOns = 0;
  this.totalCaloriesPerUnitForAddOns = 0;
  // Check if the 'percentage' control exists in the form
  const percentageControlForAddOns = this.orderFormForAddOns.get('percentageForAddOns');
  if (percentageControlForAddOns) {
    const percentage = percentageControlForAddOns.value / 100;
    this.ingredientBatchesArrayForAddOns.controls.forEach((control: AbstractControl, index) => {
      // Add this log to check the value of the control
      const costPerUnitControlForAddOns = control.get('costPerUnit') as FormControl;
      const quantityControlForAddOns = control.get('quantity') as FormControl;
      // const caloriesPerUnitControlForAddOns = control.get('caloriesPerUnitForAddOns') as FormControl;
      const unitOfStockControlForAddOns = control.get('unitOfStock') as FormControl;
      const price = control.get('price') as FormControl;

      if (costPerUnitControlForAddOns && quantityControlForAddOns && price) {
        const costPerUnit = costPerUnitControlForAddOns.value;
        const quantity = quantityControlForAddOns.value;
        const unitOfStock = unitOfStockControlForAddOns.value;
        // Find the measurement details for the selected unitOfStock
        const measurementDetails = this.measurementTools[unitOfStock];
        if (measurementDetails) {
          // Determine the quantity based on measurementType
          let measurementQuantity: number;
          if (typeof measurementDetails === 'object') {
            // Handle object types like 'cup', 'tablespoon', 'teaspoon'
            measurementQuantity = measurementDetails[quantity > 1 ? 'solid' : 'liquid'].quantity;
          } else {
            // Handle simple types like 'gram', 'mililiter'
            measurementQuantity = 1;
          }
          this.totalCostPerUnitForAddOns += costPerUnit * measurementQuantity * quantity / 100;
          // this.totalCaloriesPerUnit += caloriesPerUnit * measurementQuantity * quantity;
        }
        this.totalCostForAddOns = this.totalCostPerUnitForAddOns * (1 + percentage);
        price.setValue(( costPerUnit * quantity)* (1 + percentage) )
      }
    });

    // Calculate the total cost by applying the percentage
   
  } else {
    console.error("Percentage control not found in the form");
  }
}
updateTotalsForRecipe(): void { 
  this.totalCostPerUnitForRecipe = 0;
  this.totalCaloriesPerUnitForRecipe = 0;
  // Check if the 'percentage' control exists in the form
  const percentageControlForRecipe = this.orderFormForRecipe.get('percentageForRecipe');
  if (percentageControlForRecipe) {
    const percentage = percentageControlForRecipe.value / 100;
    this.ingredientBatchesArrayForRecipe.controls.forEach((control: AbstractControl, index) => {
      // Add this log to check the value of the control
      const costPerUnitControlForRecipe = control.get('costPerUnit') as FormControl;
      const quantityControlForRecipe = control.get('quantity') as FormControl;
      // const caloriesPerUnitControlForAddOns = control.get('caloriesPerUnitForAddOns') as FormControl;
      const unitOfStockControlForRecipe = control.get('unitOfStock') as FormControl;
      const price = control.get('price') as FormControl;

      if (costPerUnitControlForRecipe && quantityControlForRecipe && price) {
        const costPerUnit = costPerUnitControlForRecipe.value;
        const quantity = quantityControlForRecipe.value;
        const unitOfStock = unitOfStockControlForRecipe.value;
        // Find the measurement details for the selected unitOfStock
        const measurementDetails = this.measurementTools[unitOfStock];
        if (measurementDetails) {
          this.totalCostPerUnitForRecipe += costPerUnit * quantity;
        }
        this.totalCostForRecipe = this.totalCostPerUnitForRecipe * (1 + percentage);
        price.setValue(( costPerUnit * quantity)* (1 + percentage) )
      }
    });

    // Calculate the total cost by applying the percentage
  } else {
    console.error("Percentage control not found in the form");
  }
}


submitFormForAddOns(): void {
  if (this.orderFormForAddOns.valid) {
    const formData = this.orderFormForAddOns.value;
    this.updateTotalsForAddOns()
    return formData.ingredientBatchesForAddOns;
  } else {
    console.error('Form invalid');
  }
}

submitFormForRecipe(): void {

return this.recipeListArray;

}

submitForm(): void {
  if (this.orderForm.valid) {
    const formData = this.orderForm.value;
    this.updateTotals()

    // console.log('Form Data:', formData);
    // console.log('Total Cost Per Unit:', this.totalCostPerUnit);
    // console.log('Total Calories Per Unit:', this.totalCaloriesPerUnit);
    return formData.ingredientBatches;
  } else {
    console.error('Form invalid');
  }
}
  //for Ingredinetn

}
