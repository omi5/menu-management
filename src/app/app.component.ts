import { Component, OnInit } from '@angular/core';
import { InventoryService } from './services/inventory.service';
import { IngredientService } from './services/ingredient/ingredient.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor (private inventoryService: InventoryService, private ingredientService: IngredientService) {}

  ngOnInit(): void {
    this.inventoryService.getAllInventoryIngredients().subscribe(data => {
      this.ingredientService.setNewIngredients(data);
    })
  }
  title = 'menu-Builder';
}
