import { Component, OnInit, ViewChild } from '@angular/core';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';

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

  owner = [1,2,3]
  typeOfFood = ['Delivey Only', 'Pick Up', 'Eat Only']


  //for Uploading a Image
  constructor(private msg: NzMessageService) {}

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
  itemName! : string;
  itemProfileTastyTags! : string;
  categoryId! : string;
  typeOfFoods! : string;
  itemPortionsize!: string;
  itemPreparationtime!: string;
  servingTemperature! : string;
  itemLastingTime!: string;
  itemPrice! : string;
  itemCalories! : string;
  itemDescription! : string;
  itemDietaryRestrictions! : string;
  imgUrls! : string

  
  createItem(){
    const ingredients = this.includeIngredients()
    let newItem ={
      "itemName":this.itemName,
      "profileTastyTags" : this.listOfSelectedValueForTastyTags ,
      "categoryId" : parseInt(this.categoryId),
      "typeOfFoods" : this.typeOfFoods,
      // .split(',')[
      //   Math.floor(Math.random()*this.typeOfFood.length)] ,
        "portionSize" : parseInt(this.itemPortionsize),
        "preparationTime" : parseInt(this.itemPreparationtime),
        "servingTemperature" : parseInt(this.servingTemperature) ,
        "lastingTime" : parseInt(this.itemLastingTime),
        "price" : parseInt(this.itemPrice),
        "calories" : parseInt(this.itemCalories),
        "itemDietaryRestrictions": this.listOfSelectedValue,
        "images" : this.imgUrls,
        "ingredients": ingredients
        
    }

    // console.log('ingredents',ingredients);
    
    console.log(newItem);
    
    // return newItem;
  }


}
