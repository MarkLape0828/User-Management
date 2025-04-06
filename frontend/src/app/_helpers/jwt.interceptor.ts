import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountService } from '../_services/account.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private accountService: AccountService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const account = this.accountService.accountValue;
    if (account?.jwtToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${account.jwtToken}`
        }
      });
    }
    return next.handle(request);
  }
}
