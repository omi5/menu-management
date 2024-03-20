import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  portionSizePath = "assets/datas/portionSizes.json"
  tastyTagsPath = "assets/datas/tastytags.json"
  allergensPath = "assets/datas/allergens.json"

  getPortionSizes(): Observable<any> {
    return this.http.get<any>(this.portionSizePath);
  }
  getTastyTags(): Observable<any> {
    return this.http.get<any>(this.tastyTagsPath);
  }
  getAllergens(): Observable<any> {
    return this.http.get<any>(this.allergensPath);
  }
  
}
