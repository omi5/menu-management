import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScheduleTimeService {
  readonly url = "http://localhost:3000/mealtime"

  constructor( private http: HttpClient) { }

  createScheduleTime(scheduleObject: any){
    return this.http.post(this.url+'/create', scheduleObject);
  }
  getAllScheduleTime(){
    return this.http.get(this.url);
  }
  getScheduleTimeById(id: any){
    return this.http.get(this.url+`/${id}`);
  }
  updateScheduleTime(id:any, scheduleObject: any){
    return this.http.put(this.url + `/edit/${id}`, scheduleObject)
  }
  deleteScheduleTime(id: any){
    return this.http.delete(this.url + `/delete/${id}`);
  }
}
