import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthenticationService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var token = this.authService.getToken()
    if (token) {
      return next.handle(
        req.clone({
          headers: req.headers.append('Authorization', 'Token ' + token)
        })
      );
    }
    return  next.handle(req).pipe(
      

      // tap((event: HttpEvent<any>) => {
      //   if (event instanceof HttpResponse) {
      //       console.log('event--->>>', event);
      //       // this.errorDialogService.openDialog(event);
      //   }
      //   return event;
      //   }), 
        catchError((err: any) => {
          console.log('eroora', err);
          if (err.status == 401) {
            this.router.navigate(['login'])
          }
          return throwError(err);
        })
    )
  }
}
