import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptorInterceptor {

  // constructor() {}

  // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   const token = localStorage.getItem('accessToken');

  //   if(token){
  //     const authRequest = request.clone({
  //       setHeaders:{
  //         Authorization: `Bearer`$
  //       }
  //     })
  //   }

  //   return next.handle(request);
  // }
}
