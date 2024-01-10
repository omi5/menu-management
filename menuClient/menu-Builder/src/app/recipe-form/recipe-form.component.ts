import { Component, ViewChild } from '@angular/core';
import { MakeRecipeService } from '../services/make-recipe.service';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent {
  category = [1,2,3]

  //For CheckBox
  checked = true;



   //For Ingredients
   @ViewChild('ingredients') ingredients: any

   includeIngredients(){
     return this.ingredients.submitForm();
   }


   //submit Data 
  restaurantId! : number;
  recipeName! : string;
  categoryId! : string;
  // itemProfileTastyTags! : string;
  // typeOfFoods! : string;
  recipeItemPortionsize!: string;
  recipeItemPreparationtime!: string;
  // servingTemperature! : string;
  // itemLastingTime!: string;
  recipeItemCost! : string;
  recipeItemCalories! : string;
  recipeItemDescription! : string;
  // itemDietaryRestrictions! : string;
  // imgUrls! : string

  constructor(private recipeService:MakeRecipeService){}

  createRecipeItem(){
    const ingredients = this.includeIngredients()
    console.log(this.recipeItemDescription);
    
    const newRecipe= {
      "restaurantId" : 1 ,
      "recipeName":this.recipeName,
      "category_id":parseInt(this.categoryId),
      "recipeItemPortionsize":this.recipeItemPortionsize,
      "recipeItemPreparationtime":this.recipeItemPreparationtime,
      "recipeItemCost":this.recipeItemCost,
      "recipeItemCalories":this.recipeItemCalories,
      "recipeItemDescription":this.recipeItemDescription,
      // "dietary_restrictions":this.itemDietaryRestrictions,
      "ingredients":ingredients
      }

      console.log(newRecipe);
      this.recipeService.createRecipeItem(newRecipe).subscribe(res=>{
        alert('recipe created');
        console.log('make recipe response', res);
        
      })
      
    }




}

