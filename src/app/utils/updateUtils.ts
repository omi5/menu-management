export function getTotalCostAndCaloriesPerUnit(
    costPerUnitControl: any, 
    quantityControl: any, 
    caloriesPerUnitControl: any, 
    unitOfStockControl: any, 
    measurementTools: any 
) {
        const costPerUnit = costPerUnitControl.value;
        const quantity = quantityControl.value;
        const caloriesPerUnit = caloriesPerUnitControl.value;
        const unitOfStock = unitOfStockControl.value;
        // Find the measurement details for the selected unitOfStock
        const measurementDetails = measurementTools;
        if (measurementDetails) {
          // Determine the quantity based on measurementType
          let measurementQuantity: number;
          if (typeof measurementDetails === 'object') {
            // Handle object types like 'cup', 'tablespoon', 'teaspoon'
            measurementQuantity = measurementDetails[quantity > 1 ? 'solid' : 'liquid'].quantity;
          } else {
            // Handle simple types like 'gram', 'mililiter'
            measurementQuantity = 1;
          }

          return {
            costPerUnit: costPerUnit * measurementQuantity * quantity /100,
            caloriesPerUnit: Math.floor(caloriesPerUnit * quantity / 60)
          }
        }
        return
}

export function getTotalCostForAddOnsAndPriceValue(
    costPerUnitControlForAddOns: any,
    quantityControlForAddOns: any,
    percentage: any,
    measurementTools: any,
    totalCostPerUnitForAddOns: any
) {
        const costPerUnit = costPerUnitControlForAddOns.value;
        const quantity = quantityControlForAddOns.value;
        // Find the measurement details for the selected unitOfStock
        const measurementDetails = measurementTools
        if (measurementDetails) {
          // Determine the quantity based on measurementType
          let measurementQuantity: number;
          if (typeof measurementDetails === 'object') {
            // Handle object types like 'cup', 'tablespoon', 'teaspoon'
            measurementQuantity = measurementDetails[quantity > 1 ? 'solid' : 'liquid'].quantity;
          } else {
            // Handle simple types like 'gram', 'mililiter'
            measurementQuantity = 1;
          }
          totalCostPerUnitForAddOns += costPerUnit * measurementQuantity * quantity;
        }

        return {
            totalCostPerUnitForAddOns: totalCostPerUnitForAddOns,
            totalCostForAddOns: totalCostPerUnitForAddOns * (1 + percentage) /100,
            priceValue: (costPerUnit * quantity)* (1 + percentage)
        }
}

export function getTotalCostForRecipeAndPriceValue(
    costPerUnitControlForRecipe: any,
    quantityControlForRecipe: any,
    percentage: any,
    measurementTools: any,
    totalCostPerUnitForRecipe: any
) {
        const costPerUnit = costPerUnitControlForRecipe.value;
        const quantity = quantityControlForRecipe.value;
        // Find the measurement details for the selected unitOfStock
        const measurementDetails = measurementTools
        if (measurementDetails) {
          totalCostPerUnitForRecipe += costPerUnit * quantity;
        }

        return {
            totalCostPerUnitForRecipe: totalCostPerUnitForRecipe,
            totalCostForRecipe: totalCostPerUnitForRecipe * (1 + percentage)/100,
            priceValue: ( costPerUnit * quantity)* (1 + percentage) 
        }
}