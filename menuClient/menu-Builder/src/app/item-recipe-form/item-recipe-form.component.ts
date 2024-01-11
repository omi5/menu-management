import { Component, OnInit, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { MenuItemServiceService } from '../services/menu-item-service.service';
import { CloudinaryService } from '../services/cloudinary.service';

@Component({
  selector: 'app-item-recipe-form',
  templateUrl: './item-recipe-form.component.html'
})
export class ItemRecipeFormComponent implements OnInit {
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
  constructor(private msg: NzMessageService, private menuService: MenuItemServiceService) {}

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
