export interface IIngredient {
    id: number;
    restaurantId?: number;
    ingredientName: string;
    unitOfStock: string;
    quantity: number;
    costPerUnit: number;
    caloriesPerUnit: number;    //spelling change to calories
    _id: string;
}