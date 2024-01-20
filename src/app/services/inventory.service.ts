import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  readonly url = "http://localhost:3000/inventory"

  constructor( private http: HttpClient) { }

  getAllInventoryIngredients(): Observable<any>{
    return this.http.get<any>(this.url+'/getall');
  }
}
