import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  readonly url = "https://bento-menu-omi5.koyeb.app"

  constructor( private http: HttpClient) { }

  getAllInventoryIngredients(): Observable<any>{
    return this.http.get<any>(this.url+'/getall');
  }

  getAllPackingBox(): Observable<any>{
    return this.http.get<any>(this.url+'/getAllPacking')
  }
}

