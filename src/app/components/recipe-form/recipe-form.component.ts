import { Component, ViewChild } from '@angular/core';
import { MakeRecipeService } from '../../services/make-recipe.service';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuItemServiceService } from '../../services/menu-item-service.service';
import { CategoryList } from '../../interfaces/categoryList.interface';
import { CategoryService } from '../../services/category.service';
import { InventoryService } from '../../services/inventory.service';


@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent {
//for add ingredient
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
  
  //For CheckBox
  checked = true;

  categories: CategoryList[] = []
  getAllCategory(){
    this.categoryService.getAllCategory().subscribe((res: CategoryList[])=>{
      this.categories.push(...res);
    })
  }

   constructor(private _fb: FormBuilder, private inventoryService: InventoryService ,private menuService: MenuItemServiceService,private recipeService:MakeRecipeService,private categoryService: CategoryService) {
    this.getAllCategory()
    this.orderForm = this._fb.group({
      ingredientBatches: this._fb.array([this.createIngredientBatch()]),
      percentage: [0, Validators.required],
    });

    //for unit

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
    
    // const measurementToolArray = [];
    
    for (const tool in this.measurementTools) {
      if (this.measurementTools.hasOwnProperty(tool)) {
        this.measurementToolArray.push(tool);
      }
    }
    //for unit 
  }

  ngOnInit(): void {
    this.getAllIngredinets()

  }

   //submit Data 
  restaurantId! : number;
  recipeName! : string;
  categoryId! : string;
  // itemProfileTastyTags! : string;
  // typeOfFoods! : string;
  recipeItemPortionsize!: string;
  recipeItemPreparationtime!: any;
  // servingTemperature! : string;
  // itemLastingTime!: string;
  recipeItemCost! : string;
  recipeItemCalories! : any;
  recipeItemDescription! : string;
  recipeItemPreparationtimeInMinAndHour! : string
  // itemDietaryRestrictions! : string;
  // imgUrls! : string

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


  createRecipeItem(){ 
    const ingredients = this.submitForm()
    if(this.recipeItemPreparationtimeInMinAndHour === 'hours'){
      this.recipeItemPreparationtime =(this.recipeItemPreparationtime  * 60);
    }
    
    const newRecipe= {
      "restaurantId" : 0 ,
      "recipeName":this.recipeName,
      "categoryId":this.categoryId,
      "recipeItemPortionSize":this.recipeItemPortionsize,
      "recipeItemPreparationTime":this.recipeItemPreparationtime,
      "recipeItemCost":this.recipeItemCost,
      "recipeItemCalories":this.recipeItemCalories,
      "recipeItemDescription":this.recipeItemDescription,
      // "dietary_restrictions":this.itemDietaryRestrictions,
      "ingredients":ingredients
      }   
      this.recipeService.createRecipeItem(newRecipe).subscribe(res=>{
        alert('recipe created');  
      })
      
    }

    //For add Ingredient

    private createIngredientBatch(): FormGroup {
      return this._fb.group({
        id: 1,
        restuarantId: 0,
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
      this.recipeItemCalories = this.totalCaloriesPerUnit
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
  }
  
  
  
  //===== new
  // updateTotals(): void {
  //   console.log("Hit");
    
  //   this.totalCostPerUnit = 0;
  //   this.totalCaloriesPerUnit = 0;
    
  //   console.log("measurementTools", this.ingredientBatchesArray);
  
  //   this.ingredientBatchesArray.controls.forEach((control: AbstractControl, index) => {
  //     console.log(`Processing control at index ${index}`);
      
  //     // Add this log to check the value of the control
  //     console.log("Control value:", control.value);
  //     const costPerUnitControl = control.get('costPerUnit') as FormControl;
  //     const quantityControl = control.get('quantity') as FormControl;
  //     const caloriesPerUnitControl = control.get('caloriesPerUnit') as FormControl;
  //     const unitOfStockControl = control.get('unitOfStock') as FormControl;
  
  //     if (costPerUnitControl && quantityControl && caloriesPerUnitControl) {
  //       const costPerUnit = costPerUnitControl.value;
  //       const quantity = quantityControl.value;
  //       const caloriesPerUnit = caloriesPerUnitControl.value;
  //       const unitOfStock = unitOfStockControl.value;
  //       console.log("costPerUnit", costPerUnit);
        
  //     console.log("quantity", quantity);
  //     console.log("caloriesPerUnit", caloriesPerUnit);
  //     console.log("unitOfStock", unitOfStock);
  
  //       // Find the measurement details for the selected unitOfStock
  //       const measurementDetails = this.measurementTools[unitOfStock];
  
  //       if (measurementDetails) {
  //         // Determine the quantity based on measurementType
  
  //         // this.totalCostPerUnit += costPerUnit * measurementQuantity;
  //         this.totalCostPerUnit += costPerUnit * quantity;
  //         this.totalCaloriesPerUnit += caloriesPerUnit * quantity;
  //       }
  //     }
      
  //   });
    
  // }
  
  
  
  // =====New update
  
  updateTotals(): void {
    this.totalCostPerUnit = 0;
    this.totalCaloriesPerUnit = 0;
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
            // this.totalCostPerUnit += costPerUnit * measurementQuantity;
            this.totalCostPerUnit +=  costPerUnit * quantity /100;
            this.totalCaloriesPerUnit += caloriesPerUnit * quantity;
          }
        }
      });
      // Calculate the total cost by applying the percentage
      this.totalCost = this.totalCostPerUnit * (1 + percentage);
    } else {
      console.error("Percentage control not found in the form");
    }
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


}

