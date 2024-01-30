import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  private apiUrl = 'https://bento-menu-omi5.koyeb.app';
  private tokenKey = 'token';

  constructor(private http: HttpClient) { }

  registerUser(userData: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/applicant/signup`, userData)
  }

  createEmployee(userData:any): Observable<any>{
    return this.http.post(`${this.apiUrl}/employee/create/1`, userData);
  }

  getAllEmployee(): Observable<any> {
    return this.http.get(`${this.apiUrl}/employee/restaurant/1`);
  }

  postPosition( userData:any): Observable<any>{
    const url = `${this.apiUrl}/position/1`
    return this.http.post(url, userData);
  }

  postJob(userData:any): Observable<any> {
    const url = `${this.apiUrl}/job/new/1`
    return this.http.post(url,userData)
  }

  postSchedule(userData:any): Observable<any> {
    const url = `${this.apiUrl}/schedule/1/restaurant`
    return this.http.post(url,userData)
  }

  getAllScheduleForRestaurant(): Observable<any> {
    return this.http.get(`${this.apiUrl}/schedule/restaurant/1`)
  }

  getAllScheduleOfEmployee(): Observable<any> {
    return this.http.get(`${this.apiUrl}/schedule/2/restaurant/1`)
  }

  getAllJobForRestaurant(): Observable<any> {
    return this.http.get(`${this.apiUrl}/job/1`)
  }

  getAllJob(): Observable<any> {
    return this.http.get(`${this.apiUrl}/job/all`)
  }
  
  getAllFullTimeJob(): Observable<any> {
    return this.http.get(`${this.apiUrl}/job/allFullTime`)
  }
  
  getAllPartTimeJob(): Observable<any> {
    return this.http.get(`${this.apiUrl}/job/allPartTime`)
  }

  searchJob(searchTerm: string): Observable<any> {
    // console.log(searchTerm);
    return this.http.get(`${this.apiUrl}/job/search/jobs`, { params: {searchTerm: searchTerm}});
  }

  postPayroll(userData:any): Observable<any> {
    const url = `${this.apiUrl}/payroll/1/`
    return this.http.post(url,userData)
  }

  getPayroll(employeeId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/payroll/${employeeId}`)
  }

  loginUser(loginData: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/applicant/login`, loginData)
  }

  deleteApplicant(applicantId: number) {
    const url = `${this.apiUrl}/applicant/${applicantId}`
    return this.http.delete<void>(url);
  }

  getRegisterData(applicantId: number): Observable<any> {
    const url = `${this.apiUrl}/applicant/loginData/${applicantId}`
    return this.http.get(url);
  }
  
  getApplicantData(applicantId: number): Observable<any> {
    const url = `${this.apiUrl}/applicant/${applicantId}`
    return this.http.get(url);
  }

  applyJob(selectedJobId:number, selectedRestaurantId: number, applicantId: number): Observable<any> {
    const url = `${this.apiUrl}/jobApplicant/applyJob/${applicantId}`
    const requestData = {
      jobId: selectedJobId,
      restaurantId: selectedRestaurantId
    };
    return this.http.post(url,requestData)
  }

  getAppliedApplicant(): Observable<any> {
    const url = `${this.apiUrl}/jobApplicant/applicantTracking/1`
    return this.http.get(url);
  }

  postApplicantToEmployee(applicantData:any, applicantId: number): Observable<any> {
    const url = `${this.apiUrl}/employee/1/restaurant/${applicantId}`
    const requestData = {
      name: applicantData.name,
      email: applicantData.email,
      experience: applicantData.experience,
      phoneNumber: applicantData.phoneNumber,
      skillTags: applicantData.skillTags,
      address: applicantData.address,
      hourlyRate: applicantData.hourlyRate,
      imageUrl: applicantData.imageUrl
    }
    return this.http.post(url,requestData)
  }

  updateApplicantData(applicantId: number, mergedData: any): Observable<any> {
    const url = `${this.apiUrl}/applicant/${applicantId}`
    return this.http.put(url, mergedData);
  }

  authenticate(code: string) {
    const url = `${this.apiUrl}/auth/token/${code}`;
    return this.http.get(url)
  }

  updateJobApplicantData(jobApplicantId: number, mergedData: any): Observable<any> {
    const url = `${this.apiUrl}/jobApplicant/${jobApplicantId}`;
    return this.http.put(url, mergedData);
  }

  // private getHeaders(): HttpHeaders {
  //   const token = localStorage.getItem(this.tokenKey);
  //   return new HttpHeaders({
  //     Authorization: `Bearer ${token}`,
  //   });
  // }
}
