export interface IngredientsInterface {
    id: number, //raw item
    restaurantId: number,
	ingredientName: string,
	unitOfStock: string,
	quantity: number,
	costPerUnit: number,
    unitOfPrice: string
	caloriesPerUnit: number
}


export interface recipeInterface{
    restaurantId?: number,
    categoryId: number,
    recipeId: number,
    recipeName: string,
    recipeItemPortionSize: number,
    recipeItemPreparationTime: number,
    recipeItemCost: number,
    recipeItemCalories: number,
    recipeItemDescription: string,
    ingredients: IngredientsInterface[]
}