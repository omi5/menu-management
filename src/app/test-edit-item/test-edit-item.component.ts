import { Component, Input, OnInit } from '@angular/core';
import { CategoryList } from '../interfaces/categoryList.interface';
import { CategoryService } from '../services/category.service';
import { InventoryService } from '../services/inventory.service';
import { FormArray, FormGroup } from '@angular/forms';
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
   listOfOptionForTypeOfFood : string[] = []
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

  
  constructor(private categoryService: CategoryService, private inventoryService: InventoryService){}

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
    const typeOfFood = ['Delivery', 'Pick Up', 'Eat-In', 'All'];
    
    
      this.listOfOption = allergens;
      this.listOfOptionForTastyTags= tastyTags;
      this.listOfOptionForTypeOfFood = typeOfFood;
      this.listOfOptionForMealTime = mealTime;

      this.editItem()
      this.getAllCategory()
      this.getAllPackingBox()
      this.addItem()

      this.rawIngredients = this.item.item.ingredients.rawIngredients;
      this.addons =  this.item.item.options.add;
      this.recipes = this.item.item.ingredients.recipes;
      this.categoryId = this.categoryName;
       console.log('ingredinerts===', this.rawIngredients)
       console.log('ingredinerts===', this.item)
      //  console.log('------->',this.items)


  }
 

  editItem(){
    console.log('click');
    
    this.itemName = this.item.item.itemCalories;
    this.itemProfileTastyTags = this.item.item.itemProfileTastyTags;
    this.categoryId = this.item.item.categoryId
    this.listOfSeletedValueForTypeOfFood = this.item.item.typeOfFoods;
    this.itemPortionsize = this.item.item.itemPortionSize;
    this.itemPreparationtime = this.item.item.itemPreparationTime;
    this.servingTemperature = this.item.item.servingTemperature;
    this.itemLastingTime = this.item.item.itemLastingTime;
    this.itemPrice = this.item.item.itemPrice;
    this.itemCalories = this.item.item.itemCalories;
    this.listOfSelectedValue = this.item.item.itemDietaryRestrictions;
    this.ItemHowToDelivery = this.item.item.itemPackingType;
    this.listOfSeletedValueForMealTime = this.item.item.timeOfDay;
    this.itemDescription = this.item.item.itemDescription;
    console.log('ingredinerts===', this.rawIngredients)
    // console.log('ingredinerts===', this.item.item.ingredients.rawIngredients)
     this.rawInField= this.item.item.ingredients.rawIngredients;
      this.singleIn = this.rawInField.map((item)=>[item])
     console.log(this.singleIn,"nested array---->")
     console.log(this.ingredentList.ingredients,"ingrediants---->")
     this.singleIn.forEach((item)=>{
      this.ingredentList.ingredients.forEach((a)=>{
        item.push(a)
      })
     })
     console.log(this.singleIn,"all item")


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
// private createIngredientBatch(): FormGroup {
//   return this._fb.group({
//     id: 1,
//     restuarantId: 1,
//     ingredientName: [''],
//     unitOfStock:  [''],
//     quantity:  [''],
//     costPerUnit: [0.559],
//     caloriesPerUnit: [0.333],
//   });
// }

// addIngredientBatch(): void {
//   this.ingredientBatchesArray.push(this.createIngredientBatch());
//   // this.updateTotals();
//   this.itemCalories = this.totalCaloriesPerUnit;
// }
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


name!: string;
ingredientName!: any;
quantity!: any
unitOfStock!: any
addItem() {
  // this.items.push();
}

removeItem(index: number) {
  // this.items.splice(index, 1);
}
  
}
