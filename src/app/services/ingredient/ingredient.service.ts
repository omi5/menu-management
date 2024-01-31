import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor() { }

  ingredients: any[] = [];
  newIngredientsEvent = new Subject<any[]>();

  setNewIngredients (ingredients: any[]) {
    this.ingredients = ingredients;
    this.newIngredientsEvent.next(ingredients);
  }

}
