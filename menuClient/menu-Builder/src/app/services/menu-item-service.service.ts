import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuItemServiceService {

  readonly url = "http://localhost:3000/menuItem/"

  constructor( private http: HttpClient) { }

  createNewMenuItem(itemDetails: any): Observable<any>{
    return this.http.post(this.url+'create', itemDetails);
  }

  getAllMenuItems(){
    return this.http.get(this.url); 
  }
  deleteMenuItem(id: number){
    return this.http.delete(this.url+`delete/${id}`);
  }
}
