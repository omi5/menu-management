import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuItemServiceService {

  readonly url = "http://localhost:3000/menuItem"

  constructor( private http: HttpClient) { }

  private _refreshNeeded$ = new Subject<any>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  } 
  
  
  createNewMenuItem(itemDetails: any){
    return this.http.post(this.url+'/create', itemDetails).pipe(
      tap(() => {
        // this._refreshNeeded$.next();
      })
    );
  }

  getAllMenuItems(): Observable<any>{
    return this.http.get<any>(this.url); 
  }

  getMenuItemById (id: any){
    return this.http.get(this.url+`/${id}`)
  }
  updateMenuItem(id: string, updatedValue :any ){
    const response = this.http.put(this.url + `/edit/${id}`,updatedValue)
    this.refreshNeeded$.next(response);
    return response;
  }
  deleteMenuItem(id: string){
    return this.http.delete(this.url+`/delete/${id}`)
  }
}
