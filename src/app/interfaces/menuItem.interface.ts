import { IIngredient } from "./ingredient.interface";
import { IOption } from "./option.interface";
import { IPacking } from "./packing.interface";
import { IRecipe } from "./recipe.interface";

export interface IItem {
    _id: string;
  restaurantId: number;
  categoryId: string;
  categoryName: string;
  mealTimeId: number;
  item: {
    _id: string; //
    itemId: number; //
    itemName: string; //
    itemImage: string; //
    itemDescription: string;
    itemQuantity?: number;
    itemPreparationTime: number;
    itemPackingType?: IPacking[]; 
    // itemPackingDimension?: string[];  //PackingInterface
    itemLastingTime?: number; //needed for marketplace
    itemPortionSize: string;
    ingredients: { rawIngredients: IIngredient[]; recipes: IRecipe[] }; //IRecipe[]
    options: { add: IOption[]; no: IOption[] }; //
    chosenOptions?: { add: IOption[]; no: IOption[] };
    optionalNotes?: string;
    discount?: number;
    isDisabled?: boolean;
    itemPrice: number;
    itemCalories: number;
    timeOfDay: string[];
    itemProfileTastyTags: string[];
    typeOfFoods: string[];
    servingTemperature: number;
    itemDietaryRestrictions: string[];
  };
}