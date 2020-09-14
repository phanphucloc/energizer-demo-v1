import { Injectable, Injector } from '@angular/core';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import {
  usersData,
  listMiningIndustry, listFields
} from 'src/app/common/data/fake-back-end';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';

@Injectable()
export class BackendInterceptor implements HttpInterceptor {
  private usersData = usersData;
  private listMiningIndustry = listMiningIndustry;
  private listFields = listFields;

  constructor(private injector: Injector) { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method } = request;
    let newHttpResponse: Observable<HttpResponse<any>>;
    switch (true) {
      case method === 'GET' && url === 'http://localhost:4200/users':
        newHttpResponse = of(
          new HttpResponse({ status: 200, body: usersData })
        );
        break;
      case method === 'POST' && url === 'http://localhost:4200:/login':
        newHttpResponse = this.login(request);
        break;
      case method === 'GET' && url === 'http://localhost:4200:/get-list-fields':
        newHttpResponse = this.geListFields(request);
        break;
      case method === 'GET' &&
        url === 'http://localhost:4200:/get-list-mining-industry':
        newHttpResponse = this.getListMiningIndustry(request);
        break;
      case method === 'POST' &&
        url === 'http://localhost:4200:/add-mining-industry':
        newHttpResponse = this.addMiningIndustry(request);
        break;
      case method === 'GET' &&
        url.match(/\/detail-mining-industry\/\d+$/) != null:
        newHttpResponse = this.getMiningIndustry(request);
        break;
      case method === 'GET' &&
        url.match(/\/get-list-branches-production-of-fields\/\d+$/) != null:
        newHttpResponse = this.getListBranchesIndustryProductionOfFields(request);
        break;
      default:
        newHttpResponse = null;
        break;
    }
    return newHttpResponse || next.handle(request);

  }

  private login(request: HttpRequest<any>): Observable<HttpResponse<any>> {
    const email = request.body.email;
    const password = request.body.password;

    const user = this.usersData.find((resultUser) => {
      return resultUser.email === email && resultUser.password === password;
    });

    if (user) {
      return of(
        new HttpResponse({ status: 200, body: { status: 'SUCCESS', user } })
      ).pipe(delay(2000));
    }
    else {
      return of(
        new HttpResponse({
          status: 200,
          body: {
            status: 'ERROR',
            message: 'user name or password incorrect',
          },
        })
      ).pipe(delay(2000));
    }
  }

  private getListMiningIndustry(request: HttpRequest<any>): Observable<HttpResponse<any>> {
    return of(
      new HttpResponse({ status: 200, body: this.listMiningIndustry })
    ).pipe(delay(2000));
  }

  private addMiningIndustry(request: HttpRequest<any>): Observable<HttpResponse<any>> {
    // const miningIndustry = request.body.email;
    const miningIndustry = {
      id: new Date().getTime(),
      name: 'Doanh nghiệp phát triển nông thôn',
      foundedYear: '2010',
      province: 'Hà Nội',
      district: 'Hoàn kiếm',
      town: '-',
      xCoordinate: 'ABBS#@#@DSSA!D',
      yCoordinate: 'ABBS#@#@DSSA!D',
      productionValue: 50000,
      employees: 300,
    };

    listMiningIndustry.push(miningIndustry);

    return of(
      new HttpResponse({
        status: 200,
        body: { status: 'SUCCESS', miningIndustry },
      })
    ).pipe(delay(2000));
  }

  private getMiningIndustry(request: HttpRequest<any>): Observable<HttpResponse<any>> {
    const idMiningIndustry = Number(this.getIdParameterFromURL(request.url));

    const user = this.listMiningIndustry.find((resultMiningIndustry) => {
      return resultMiningIndustry.id === idMiningIndustry;
    });

    return of(new HttpResponse({ status: 200, body: user })).pipe(delay(2000));
  }

  private geListFields(request: HttpRequest<any>): Observable<HttpResponse<any>> {
    const resultListFields = this.listFields.map((itemField) => {
      return {
        id: itemField.id,
        name: itemField.name
      };
    });
    return of(new HttpResponse({ status: 200, body: resultListFields })).pipe(delay(2000));
  }


  private getListBranchesIndustryProductionOfFields(request: HttpRequest<any>): Observable<HttpResponse<any>> {
    const idFields = Number(this.getIdParameterFromURL(request.url));

    const itemFields = this.listFields.find((resultListFields) => {
      return resultListFields.id === idFields;
    });

    const listBranch = itemFields.listBranches.map((itemField) => {
      return {
        id: itemField.id,
        name: itemField.name,
        displayName : itemField.displayName,
        listProduct: itemField.listProduct
      };
    });

    return of(new HttpResponse({ status: 200, body: listBranch })).pipe(delay(2000));
  }

  private getIdParameterFromURL(url: string): string {
    const urlParts = url.split('/');
    return urlParts[urlParts.length - 1];
  }

}
