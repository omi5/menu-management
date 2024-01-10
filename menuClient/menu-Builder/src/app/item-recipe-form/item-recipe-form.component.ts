import { Component, OnInit, ViewChild } from '@angular/core';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { MenuItemServiceService } from '../services/menu-item-service.service';

@Component({
  selector: 'app-item-recipe-form',
  templateUrl: './item-recipe-form.component.html'
})
export class ItemRecipeFormComponent implements OnInit {
  visible = false;

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
  typeOfFood = ['Delivey Only', 'Pick Up', 'Eat Only']

  //Array Of Portion Size
   portionSizes = [
    "Small",
    "Medium",
    "Large",
    "Extra Small",
    "Extra Large"
]


  //for Uploading a Image
  constructor(private msg: NzMessageService, private menuService: MenuItemServiceService) {}

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

  

    // for (let i = 10; i < 36; i++) {
    //   children.push(`${i.toString(36)}${i}`);
    // }
    this.listOfOption = allergens;
    this.listOfOptionForTastyTags= tastyTags;
    
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
    const ingredients = this.includeIngredients()
    if(this.categoryId === 'Burger'){
      this.categoryId = 1;
    }

    let newItem ={
      "restaurantId": 1,
      "mealTimeId": 1,
      "categoryId" : this.categoryId,
      "item":{
      "itemName":this.itemName,
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
        "itemImage" : this.itemImage,
        "ingredients": ingredients,
        "options":{
          "add": ingredients ,
          "no": ingredients
        }
      }
    }

    // console.log('ingredents',ingredients);
    
    console.log(newItem);

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





}
