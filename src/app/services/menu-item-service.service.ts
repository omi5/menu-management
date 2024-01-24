import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuItemServiceService {

  public menuItemsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public menuItems$: Observable<any[]> = this.menuItemsSubject.asObservable();


  readonly url = "http://localhost:3000/menuItem"

  constructor( private http: HttpClient) { 
    this.getAllMenuItems().subscribe((menuItems)=>{
      this.menuItemsSubject.next(menuItems)
    })
  }

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

  // updateMenuItemsForCategory(categoryId: string, updateItems: any[]){
  //   const filteredItems = this.updateMenuItem(categoryId, updatedItems);
  //   this.menuItemsSubject.next(filteredItems);
  // }

  getMenuItemById (id: any){
    return this.http.get(this.url+`/${id}`)
  }
  // updateMenuItem(id: string, updatedValue :any ){
  //   const response = this.http.put(this.url + `/edit/${id}`,updatedValue)
  //   this.refreshNeeded$.next(response);

  //   this.menuItemsSubject.next(updatedMenuItems);
  //   return response;
  // }

  updateMenuItem(id: string, updatedValue: any) {
    const response = this.http.put(this.url + `/edit/${id}`, updatedValue)
      .pipe(
        tap(() => {
          // After the update is successful, fetch the updated menu items
          this.getAllMenuItems().subscribe(updatedMenuItems => {
            // Update the BehaviorSubject with the new value
            this.menuItemsSubject.next(updatedMenuItems);
          });
        })
      );
  
    this.refreshNeeded$.next(response);
  
    return response;
  }
  
  deleteMenuItem(id: string){
    return this.http.delete(this.url+`/delete/${id}`)
  }
}
