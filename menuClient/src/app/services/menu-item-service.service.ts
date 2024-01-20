import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuItemServiceService {

  readonly url = "http://localhost:3000/menuItem"

  constructor( private http: HttpClient) { }

  createNewMenuItem(itemDetails: any){
    return this.http.post(this.url+'/create', itemDetails);
  }

  getAllMenuItems(): Observable<any>{
    return this.http.get<any>(this.url); 
  }

  getMenuItemById (id: any){
    return this.http.get(this.url+`/${id}`)
  }
  updateMenuItem(id: string, updatedValue :any ){
    return this.http.put(this.url + `/edit/${id}`,updatedValue)
  }
  deleteMenuItem(id: string){
    return this.http.delete(this.url+`/delete/${id}`);
  }
}
