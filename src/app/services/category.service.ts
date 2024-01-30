import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryList,Category } from '../interfaces/categoryList.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  [x: string]: any;
   url = "https://bento-menu-omi5.koyeb.app"

  constructor( private http: HttpClient) { }

  createCategory(categoryObject: any){
    return this.http.post(this.url+'/category/create', categoryObject);
  }
  getAllCategory():Observable<CategoryList[]>{
    return this.http.get<CategoryList[]>(this.url+ '/category');
  }
  getCategoryById(id: any){
    return this.http.get(this.url+`/category/${id}`);
  }
  updateCategory(id:any, categoryObject: any){
    // console.log("service hit", categoryObject);
    
    let result = this.http.put(this.url + `/category/edit/${id}`, categoryObject)
    // console.log("from service", result);
    return result
    
  }
  deleteCategory(id: any){
    return this.http.delete(this.url + `/category/delete/${id}`);
  }
}
