export interface IPacking {
    id: number;
    boxName: string;
    currentStockQuantity: number;
    unitOfPrice: string;
    costPerUnit: number;
    reorderPoint: number;
    unitOfDimentions: string;
    dimensions: string;
    weightLimit: number;
    temperatureLimit: number;
    waterproof: string;
    expectedStockForToday: number;
    expectedStockForTomorrow: number;
    restaurantId: number;
    createdAt: Date;
    updatedAt: Date;
}