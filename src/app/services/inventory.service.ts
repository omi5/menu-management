import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  // url = "https://bento-menu-omi5.koyeb.app"
  // url = "https://inventory-server-klzl.onrender.com/v1/deliveryBox/restaurant/1"
  // url2 = "https://inventory-server-klzl.onrender.com/v1/ingredient/restaurant/1"

  // readonly urlForIngredinets = "https://sak-skeleton-samiya-kazi.koyeb.app/inventory/ingredients/1"
  // readonly urlForDeliveryBox = "https://sak-skeleton-samiya-kazi.koyeb.app/inventory/delivery-box/1 "
  url = "https://bento-menu-omi5.koyeb.app/inventory"

  constructor( private http: HttpClient) { }

  getAllInventoryIngredients(): Observable<any>{
    return this.http.get<any>(this.url+'/getAll');
    // '/getall'
  }

  getAllPackingBox(): Observable<any>{
    return this.http.get<any>(this.url+'/getAllPacking')
  }
  // +'/getAllPacking'
}

