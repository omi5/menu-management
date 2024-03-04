import { Component, Input, OnInit } from '@angular/core';
import { CategoryList } from '../interfaces/categoryList.interface';
import { CategoryService } from '../services/category.service';
import { InventoryService } from '../services/inventory.service';
import { FormArray, FormGroup } from '@angular/forms';
import { IngredientService } from '../services/ingredient/ingredient.service';
import { MakeRecipeService } from '../services/make-recipe.service';
import { MenuItemServiceService } from '../services/menu-item-service.service';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload/public-api';
import { CloudinaryService } from '../services/cloudinary.service';
import { NzMessageService } from 'ng-zorro-antd/message';
interface ingredient {
  id: number
  ingredientName: [],
}

@Component({
  selector: 'app-test-edit-item',
  templateUrl: './test-edit-item.component.html',
  styleUrls: ['./test-edit-item.component.css']
})
export class TestEditItemComponent implements OnInit {

  listOfOptionForTastyTags: string[] = [];
  itemProfileTastyTag = [];
  @Input() item: any;
  //variables
  public orderForm!: FormGroup;
  categoryName: any
  deliveryBoxDetails: any[] =[];
  rawIngredients! :any;
  addons!: any;
  recipes!: any;

  //NgModel property
  itemName!: string;
  itemProfileTastyTags!: any;
  categoryId!: string;
  delivery!: any;
  itemPortionsize!: any;
  itemPreparationtime!: any;
  itemPreparationTimeInMinAndHour!: any;
  lastingtimeInMinAndHour!: any;
  servingTemperature!: any;
  itemLastingTime!: any;
  itemPrice!: any;
  itemCalories!: any;
  listOfSelectedValue!: any;
  ItemHowToDelivery!: any;
  listOfSeletedValueForMealTime!: any
  itemDescription!: any;
  rawInField!: any[];
  singleIn!:any[]

  categories: CategoryList[] = []
  packingBox: { deliveryBox: any[] } = { deliveryBox: [] };

   //For Type Of Food
   listOfOptionForTypeOfFood : string[] = ['Delivery only', 'Pickup only', 'Dine-In only', 'All']
   listOfSeletedValueForTypeOfFood: string[] = [] 

   
  //For MealTime 
  listOfOptionForMealTime: string[] = []
  // listOfSeletedValueForMealTime = []

   listOfOption: string[] = [];
   

     //Array Of Portion Size
     portionSizes = [
      "Small",
      "Medium",
      "Large",
      "Extra Small",
      "Extra Large"
    ]

    measurementToolArray : string[] = [
      "cup", "teaspoon", "tablespoon", "gm", "ml", "kg"
    ];

  
  constructor(private categoryService: CategoryService,private msg: NzMessageService, private inventoryService: InventoryService, private ingredientService: IngredientService, private RecipeService: MakeRecipeService, private menuService: MenuItemServiceService,private cloudinary: CloudinaryService,private message: NzMessageService){}

  ngOnInit(): void {

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
    const mealTime = ['All day', 'Breakfast', 'Lunch','Dinner']
    // const typeOfFood = ['Delivery', 'Pick Up', 'Eat-In', 'All'];
    
    
      this.listOfOption = allergens;
      this.listOfOptionForTastyTags= tastyTags;
      // this.listOfOptionForTypeOfFood = typeOfFood;
      this.listOfOptionForMealTime = mealTime;

      this.editItem()
      this.getAllCategory()
      this.getAllPackingBox();
      this.getAllRecipes();

      if(this.item){
        
      this.rawIngredients = this.item.item.ingredients.rawIngredients;
      this.addons =  this.item.item.options.add;
      this.recipes = this.item.item.ingredients.recipes;
      this.categoryId = this.categoryName;
      
      }

      //  console.log('------->',this.items)


  }
 

  editItem(){
    this.ingredentList.ingredients = this.ingredientService.ingredients;
    this.ingredientService.newIngredientsEvent.subscribe(data => this.ingredentList.ingredients = data);
  }

  getAllCategory(){
    this.categoryService.getAllCategory().subscribe((res: CategoryList[])=>{
      this.categories.push(...res);
    //  const selectCategoryItem = this.categories.find(item=> item.categoryName === this.categoryName)
    // this.categoryId = selectCategoryItem?._id
    })
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

  getAllIngredient(){
    this.inventoryService.getAllInventoryIngredients().subscribe(
      (res) => {
        res.forEach((items: any) => {
          this.ingredentList.ingredients.push(items);
        });
      },
      (error) => {
        console.error('Error fetching inventory:', error);
      }
    )
  }

  getAllRecipes(){
    this.RecipeService.getAllRecipe().subscribe(
      res=>{
        this.recipes = res;
      }
    )
  }

    //onPacking change

  onPackingChange(){
  const packingDetails =  this.ItemHowToDelivery;
  const selectedPacking = this.packingBox.deliveryBox.find(deliveryBox => deliveryBox.boxName === packingDetails);
  const finalPacking = {...selectedPacking }
  this.deliveryBoxDetails.push(finalPacking) 
}
get ingredientBatchesArray(): FormArray {
  return <FormArray>this.orderForm.get('ingredientBatches');
}

removeIngredientBatch(index: number): void {
  console.log('remove Index ====',index);
   this.ingredientBatchesArray.removeAt(index);
  // const removedCostPerUnit = removedBatch.get('costPerUnit').value || 0;
  // this.updateTotals();
}

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


select: any;
name!: string;
ingredientName!: any;
quantity!: any
unitOfStock!: any
listOfIngredient: any[]=[{}]
 rawIng: any = {};

addIngredient() {
  // console.log('this.select', this.select);
  
  // for (let key in this.select) {
  //   this.rawIng[key] = this.select[key];
  // }
  // this.rawIng["quantity"] = this.quantity
  
  this.item.item.ingredients.rawIngredients.push({
    // id:number ,

  });

}

removeIngredient(index: number) {
  this.item.item.ingredients.rawIngredients.splice(index, 1);
}

onIngredientChange(index: number): void {
  let ingredientBatch = this.item.item.ingredients.rawIngredients.at(index);
  // Find the selected ingredient in the mock data
  console.log('ingredientBatch', ingredientBatch);
  
  const selectedIngredient = this.ingredentList.ingredients.find(ingredient => ingredient.ingredientName === ingredientBatch.ingredientName);
  console.log('selectIngredient', selectedIngredient);
  
  this.item.item.ingredients.rawIngredients[index].id = selectedIngredient?.id;
  this.item.item.ingredients.rawIngredients[index].costPerUnit = selectedIngredient?.costPerUnit;
  this.item.item.ingredients.rawIngredients[index].caloriesPerUnit = selectedIngredient?.caloriesPerUnit;
}

selectAddOns !: any;
addAddOns() {
  // const rawIng: any = {};
  // for (let key in this.selectAddOns) {
  //  rawIng[key] = this.selectAddOns[key];
  // }
  // rawIng["quantity"] = this.quantity
  // rawIng["unitOfStock"] = this.quantity
  this.item.item.options.add.push({})
}

removeAddOns(index: number) {
  this.item.item.options.add.splice(index, 1);
}

onIngredientChangeForAddOns(index: number): void {
  const ingredientBatchForAddOns =this.item.item.options.add.at(index);
  console.log('ingredientBatchAddons', ingredientBatchForAddOns);
  
  // Find the selected ingredient in the mock data
  const selectedIngredient = this.ingredentList.ingredients.find(ingredient => ingredient.ingredientName === ingredientBatchForAddOns.ingredientName);
  console.log('selectIngredient', selectedIngredient);

  this.item.item.options.add[index].id = selectedIngredient?.id;
  this.item.item.options.add[index].costPerUnit = selectedIngredient?.costPerUnit;
  this.item.item.options.add[index].caloriesPerUnit = selectedIngredient?.caloriesPerUnit;
  // if (selectedIngredient) {
  //   ingredientBatchForAddOns.patchValue({
  //     costPerUnit: selectedIngredient.costPerUnit,
  //     caloriesPerUnit: selectedIngredient.caloriesPerUnit,
  //     id: selectedIngredient.id
  //   });
  //   // setTimeout(() => {
  //   //   this.updateTotalsForAddOns();
  //   // }, 100); // Optionally update totals when the ingredient changes

  // }
}


addRecipes(){
  this.item.item.ingredients.recipes.push({

  })
}
removeRecipes(index: number) {
  this.item.item.ingredients.recipes.splice(index, 1);
}

onsubmit(){
  this.item.item.itemImage = this.uploadedImageUrl
  const updatedItem = {...this.item}
  console.log('updatedItemForEdit',updatedItem);
  this.menuService.updateMenuItem(this.item._id, updatedItem).subscribe(res=>{
    this.message.success('Successfully Updated');
    console.log(res);
    
  })
}

//For uplaoding a image
uploadedImageUrl!: string | undefined
successMessageDisplayed!: any
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
  
}
