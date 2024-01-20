import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryList,Category } from '../interfaces/categoryList.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  [x: string]: any;
  readonly url = "http://localhost:3000/category"

  constructor( private http: HttpClient) { }

  createCategory(categoryObject: any){
    return this.http.post(this.url+'/create', categoryObject);
  }
  getAllCategory():Observable<CategoryList[]>{
    return this.http.get<CategoryList[]>(this.url);
  }
  getCategoryById(id: any){
    return this.http.get(this.url+`/${id}`);
  }
  updateCategory(id:any, categoryObject: Category){
    console.log("service hit", categoryObject);
    
    let result = this.http.put(this.url + `/edit/${id}`, categoryObject)
    console.log("from service", result);
    return result
    
  }
  deleteCategory(id: any){
    return this.http.delete(this.url + `/delete/${id}`);
  }
}