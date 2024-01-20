import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetMenuItemBySchuduleService {
  readonly url = "http://localhost:3000/mealtime"

  constructor( private http: HttpClient) { }

  getAllMenuItemsUnderScheduleTime(id: any){
    return this.http.get(this.url+`/${id}`)
  }
}
