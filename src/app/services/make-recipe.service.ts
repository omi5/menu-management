import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MakeRecipeService {
   url = "https://bento-menu-omi5.koyeb.app"
  // readonly url = "http://localhost:3000/recipe"

  constructor(private http: HttpClient) { }

  createRecipeItem(recipeObject: any){
   return this.http.post(this.url+'/recipe/create', recipeObject);
  }
  getAllRecipe(){
    return this.http.get(this.url+'/recipe'); 
  }

  getRecipeItemById (id: any){
    return this.http.get(this.url+`/recipe/${id}`)
  }
  updateRecipeItem(id: string, updatedValue :any ){
    return this.http.put(this.url + `/recipe/edit/${id}`,updatedValue)
  }


  deleteRecipeItem(id: string){
    return this.http.delete(this.url+`/recipe/delete/${id}`);
  }
}
