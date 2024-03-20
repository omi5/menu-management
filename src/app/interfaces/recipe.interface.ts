import { IIngredient } from "./ingredient.interface";

export interface IRecipe{
    restaurantId?: number,
    categoryId: number,
    recipeId: number,
    recipeName: string,
    recipeItemPortionSize: number,
    recipeItemPreparationTime: number,
    recipeItemCost: number,
    recipeItemCalories: number,
    recipeItemDescription: string,
    ingredients: IIngredient[]
}