import { Injectable, Injector } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';

const usersData = [
  {
    email: 'ppldhsp@gmail.com',
    password: '123456',
    uid: '0001',
    name: 'test',
    accessToken: 'TEST-TOKEN',
  },
  {
    email: 'test@gmail.com',
    password: '123456',
    uid: '0001',
    name: 'test',
    accessToken: 'TEST-TOKEN',
  },
];

@Injectable()
export class BackendInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      request.method === 'GET' &&
      request.url === 'http://localhost:4201/users'
    ) {
      return of(new HttpResponse({ status: 200, body: usersData }));
    } else if (
      request.method === 'POST' &&
      request.url === 'http://localhost:4200:/login'
    ) {
      const email = request.body.email;
      const password = request.body.password;

      const user = usersData.find((resultUser) => {
        return resultUser.email === email && resultUser.password === password;
      });

      if (user) {
        return of(
          new HttpResponse({ status: 200, body: { status: 'SUCCESS', user } })
        ).pipe(
            delay(3000),
        );
      } else {
        return of(
          new HttpResponse({
            status: 200,
            body: {
              status: 'ERROR',
              message: 'user name or password incorrect',
            },
          })
        ).pipe(
            delay(3000),
        );
      }
    }
    return next.handle(request);
  }
}
