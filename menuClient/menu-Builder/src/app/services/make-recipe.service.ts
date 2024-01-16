import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MakeRecipeService {
  readonly url = "http://localhost:3000/recipe"

  constructor(private http: HttpClient) { }

  createRecipeItem(recipeObject: any){
   return this.http.post(this.url+'/create', recipeObject);
  }
  getAllRecipe(){
    return this.http.get(this.url); 
  }

  getRecipeItemById (id: any){
    return this.http.get(this.url+`/${id}`)
  }
  updateRecipeItem(id: string, updatedValue :any ){
    return this.http.put(this.url + `/edit/${id}`,updatedValue)
  }


  deleteRecipeItem(id: string){
    return this.http.delete(this.url+`/delete/${id}`);
  }
}
