import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  // url = "https://bento-menu-omi5.koyeb.app"
  url = "http://localhost:3000"

  // readonly urlForIngredinets = "https://sak-skeleton-samiya-kazi.koyeb.app/inventory/ingredients/1"
  // readonly urlForDeliveryBox = "https://sak-skeleton-samiya-kazi.koyeb.app/inventory/delivery-box/1 "

  constructor( private http: HttpClient) { }

  getAllInventoryIngredients(): Observable<any>{
    return this.http.get<any>(this.url+'/inventory/getAll');
    // '/getall'
  }

  getAllPackingBox(): Observable<any>{
    return this.http.get<any>(this.url+'/inventory/getAllPacking')
  }
  // +'/getAllPacking'
}

