import { Injectable, Injector } from '@angular/core';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import {
  usersData,
  listEnterprises, listFields, energyConsumption
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
  private listEnterprises = listEnterprises;
  private listFields = listFields;
  private listEnergyConsumption = energyConsumption;

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
        newHttpResponse = this.getListEnterprises(request);
        break;
      case method === 'POST' &&
        url === 'http://localhost:4200:/add-mining-industry':
        newHttpResponse = this.addEnterprises(request);
        break;
      case method === 'GET' &&
        url.match(/\/detail-mining-industry\/\d+$/) != null:
        newHttpResponse = this.getEnterprises(request);
        break;
      case method === 'GET' &&
        url.match(/\/get-list-branches-production-of-fields\/\d+$/) != null:
        newHttpResponse = this.getListBranchesIndustryProductionOfFields(request);
        break;
      case method === 'GET' &&
        url.match(/\/get-list-branches-by-fields-id\/\d+$/) != null:
        newHttpResponse = this.getListBranchesByFieldsId(request);
        break;
      case method === 'GET' &&
        url.match(/\/get-list-product-by-branches-id\/\d+$/) != null:
        newHttpResponse = this.getListProductBranchesId(request);
        break;
      case method === 'GET' &&
        url === 'http://localhost:4200:/get-list-energy-consumption/':
        newHttpResponse = this.getListEnergyConsumption(request);
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
      ).pipe(delay(500));
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
      ).pipe(delay(500));
    }
  }

  private getListEnterprises(request: HttpRequest<any>): Observable<HttpResponse<any>> {
    return of(
      new HttpResponse({ status: 200, body: this.listEnterprises })
    ).pipe(delay(500));
  }

  private addEnterprises(request: HttpRequest<any>): Observable<HttpResponse<any>> {
    const enterprises = request.body.enterprises;

    const enterprisesClone = {
      id : new Date().getTime(),
      name : enterprises.name,
      foundedYear : enterprises.foundedYear,
      province : enterprises.province,
      district : enterprises.district,
      town : enterprises.town,
      xCoordinate : enterprises.xCoordinate,
      yCoordinate : enterprises.yCoordinate,
      productionValue : enterprises.productionValue,
      employees : enterprises.employees,
      branchesId: enterprises.branchesId,
      branchesName: enterprises.branchesName,
      branchesDisplayName: enterprises.branchesName,
    };

    listEnterprises.push(enterprisesClone);

    return of(
      new HttpResponse({
        status: 200,
        body: { status: 'SUCCESS', enterprisesClone },
      })
    ).pipe(delay(500));
  }

  private getEnterprises(request: HttpRequest<any>): Observable<HttpResponse<any>> {
    const idEnterprises = Number(this.getIdParameterFromURL(request.url));

    const user = this.listEnterprises.find((resultEnterprises) => {
      return resultEnterprises.id === idEnterprises;
    });

    return of(new HttpResponse({ status: 200, body: user })).pipe(delay(500));
  }

  private geListFields(request: HttpRequest<any>): Observable<HttpResponse<any>> {
    const resultListFields = this.listFields.map((itemField) => {
      return {
        id: itemField.id,
        name: itemField.name
      };
    });
    return of(new HttpResponse({ status: 200, body: resultListFields })).pipe(delay(500));
  }

  private getListBranchesByFieldsId(request: HttpRequest<any>): Observable<HttpResponse<any>> {
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

    return of(new HttpResponse({ status: 200, body: listBranch })).pipe(delay(500));
  }

  private getListProductBranchesId(request: HttpRequest<any>): Observable<HttpResponse<any>> {
    const branchesId = Number(this.getIdParameterFromURL(request.url));

    const itemFields = this.listFields.find((fields) => {
      return fields.listBranches.find((branch) => {
        return branch.id === branchesId;
      });
    });

    const itemBranches = itemFields.listBranches.find((branch) => {
      return branch.id === branchesId;
    });

    const listProduct = itemBranches.listProduct;

    return of(new HttpResponse({ status: 200, body: listProduct })).pipe(delay(500));
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

    return of(new HttpResponse({ status: 200, body: listBranch })).pipe(delay(500));
  }

  private getListEnergyConsumption(request: HttpRequest<any>): Observable<HttpResponse<any>>{
    const listEnergyConsumption = this.listEnergyConsumption;
    return of(new HttpResponse({ status: 200, body: listEnergyConsumption })).pipe(delay(500));
  }

  private getIdParameterFromURL(url: string): string {
    const urlParts = url.split('/');
    return urlParts[urlParts.length - 1];
  }

}
