import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {UsersService} from '../services/users.service';

@Injectable()
export class HttpInterceptor implements HttpInterceptor {

  constructor(private userService: UsersService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const currentUser = this.userService.currentUserValue;
    if (currentUser && currentUser.token){
      request = request.clone({
        setHeaders : {
          Authorization: `Barear ${currentUser.token}`
        }
      });
    }
    return next.handle(request);
  }
}
