import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetMenuItemBySchuduleService {
  readonly url = "https://bento-menu-omi5.koyeb.app"

  constructor( private http: HttpClient) { }

  getAllMenuItemsUnderScheduleTime(id: any){
    return this.http.get(this.url+`/${id}`)
  }
}
