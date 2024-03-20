export interface IOption {
    id: number;
    ingredientName: string;
    unitOfStock: string;
    quantity: number;
    costPerUnit: number;
    caloriesPerUnit: number;
    price?: string;
    _id: string;
}