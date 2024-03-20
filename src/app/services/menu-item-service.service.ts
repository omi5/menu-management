import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from '../interceptors/token/token.service';
import { BehaviorSubject,interval, Observable, Subject, tap } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IItem } from '../interfaces/menuItem.interface';

@Injectable({
  providedIn: 'root'
})
export class MenuItemServiceService {

  public menuItemsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public menuItems$: Observable<any[]> = this.menuItemsSubject.asObservable();


  // readonly url = "http://localhost:3000/menuItem"
  readonly url = "https://bento-menu-omi5.koyeb.app"

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
    return this.http.post(this.url+'/menuItem/create', itemDetails).pipe(
      tap(() => {
        // this._refreshNeeded$.next();
      })
    );
  }

  // getAllMenuItems(): Observable<any>{
  //   return this.http.get<any>(this.url+'/menuItem'); 
  // }
  getAllMenuItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/menuItem`).pipe(
      tap(data => {
        // Update the BehaviorSubject with the fetched menu items
        this.menuItemsSubject.next(data);
      })
    );
    
  }
  

  getAllMenuItemByRestaurantId(): Observable<IItem[]>{
    return this.http.get<IItem[]>(this.url+`/menuItem/restaurant`)
  }

  getAllmenuForMP(id:any): Observable<any>{
    return this.http.get<any>(this.url+`/menuItem/restaurant/${id}`)
  }

  // updateMenuItemsForCategory(categoryId: string, updateItems: any[]){
  //   const filteredItems = this.updateMenuItem(categoryId, updatedItems);
  //   this.menuItemsSubject.next(filteredItems);
  // }

  getMenuItemById (id: any){
    return this.http.get(this.url+`/menuItem/${id}`)
  }
  // updateMenuItem(id: string, updatedValue :any ){
  //   const response = this.http.put(this.url + `/edit/${id}`,updatedValue)
  //   this.refreshNeeded$.next(response);

  //   this.menuItemsSubject.next(updatedMenuItems);
  //   return response;
  // }

  updateMenuItem(id: string, updatedValue: any) {
    const response = this.http.put(this.url + `/menuItem/edit/${id}`, updatedValue)
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
  
  deleteMenuItem(id: string): Observable<any> {
    return this.http.delete(this.url + `/menuItem/delete/${id}`).pipe(
      tap(() => {
        // After the deletion is successful, fetch the updated menu items
        this.getAllMenuItems().subscribe(
          () => {
            // Optional: You can perform any additional logic here
            // For example, displaying a success message
          },
          error => {
            console.error('Failed to fetch updated menu items:', error);
            // Optionally, handle the error here
          }
        );
      })
    );
  }
  
}




