import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScheduleTimeService {
  readonly url = "https://bento-menu-omi5.koyeb.app"
  // readonly url = "http://localhost:3000/mealtime"

  constructor( private http: HttpClient) { }

  createScheduleTime(scheduleObject: any){
    return this.http.post(this.url+'/mealtime/create', scheduleObject);
  }
  getAllScheduleTime(){
    return this.http.get(this.url+'/mealtime');
  }
  getScheduleTimeById(id: any){
    return this.http.get(this.url+`/mealtime/${id}`);
  }
  updateScheduleTime(id:any, scheduleObject: any){
    return this.http.put(this.url + `/mealtime/edit/${id}`, scheduleObject)
  }
  deleteScheduleTime(id: any){
    return this.http.delete(this.url + `/mealtime/delete/${id}`);
  }
}
