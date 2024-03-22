export function createItemFactory(obj:any, cateName: any, rawIngredients: any, recipe: any, addOns: any) {
    return {
      "restaurantId": 0,
      "mealTimeId": 1,
      "categoryId" : obj.categoryId,
      "categoryName": cateName?.categoryName,
      "item":{
      "itemName":obj.itemName,
      "availableInPos" : true,
      "availableInMarketPlace": true,
      "timeOfDay": obj.listOfSeletedValueForMealTime,
      "itemProfileTastyTags" : obj.listOfSelectedValueForTastyTags ,
      "typeOfFoods" : obj.listOfSeletedValueForTypeOfFood,
      // .split(',')[
      //   Math.floor(Math.random()*this.typeOfFood.length)] ,
      "itemPortionSize" : obj.itemPortionsize,
      "itemPreparationTime" : parseInt(obj.itemPreparationtime),
      "servingTemperature" : parseInt(obj.servingTemperature) ,
      "itemLastingTime" : parseInt(obj.itemLastingTime),
      "itemPrice" : obj.itemPrice,
      "itemDescription": obj.itemDescription,
      "itemPackingType": obj.deliveryBoxDetails,
      "itemCalories" : parseInt(obj.itemCalories),
      "itemDietaryRestrictions": obj.listOfSelectedValue,
      "itemImage" : obj.uploadedImageUrl,
      "ingredients": {
        "rawIngredients": rawIngredients,
        "recipes": recipe
      },
      "options":{
        "add": addOns,
        "no": addOns
      }
    }
    }
  }