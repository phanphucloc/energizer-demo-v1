import { IEnterprises, IResultAddEnterprises, IProduction, IFields } from '../abstract/enterprises.interface';
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IBranches, IEnergyConsumption, IEnterprisesToServer } from '../abstract/enterprises.interface';

@Injectable({ providedIn: 'root' })
export class EnterprisesService {

  private baseUrlFake = environment.baseURlFake;
  private baseUrl = environment.baseURl;

  constructor(
    public router: Router,
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    ) {
  }

  public get idFields(): number{
    return Number(this.activatedRoute.snapshot.paramMap.get('fieldsId'));
  }

  public getFieldsByFieldsId(fieldId: number): Observable<IFields> {
    return this.httpClient.get(this.baseUrlFake + 'get-fields-by-fields-id/' + fieldId).pipe(
      map((result: IFields) => {
        return result;
      })
    );
  }

  public getListEnterprisesByFieldId(fieldId: number): Observable<IEnterprises[]> {
    return this.httpClient.get(this.baseUrlFake + 'get-list-enterprises-by-field-id/' + fieldId).pipe(
      map((result: IEnterprises[]) => {
        return result;
      })
    );
  }

  public addEnterprises(enterprises: IEnterprisesToServer): Observable<IResultAddEnterprises> {
    return this.httpClient.post(this.baseUrlFake + 'add-enterprises', { enterprises }).pipe(
      map((result: IResultAddEnterprises) => {
        return result;
      })
    );
  }

  public getEnterprisesById(id: number): Observable<IEnterprisesToServer> {
    return this.httpClient.get(this.baseUrlFake + 'detail-enterprises/' + id).pipe(
      map((result: IEnterprisesToServer) => {
        return result;
      })
    );
  }

  public getListBranchesIndustryProductionOfFields(id: number): Observable<IBranches[]> {
    return this.httpClient.get(this.baseUrlFake + 'get-list-branches-production-of-fields/' + id).pipe(
      map((result: IBranches[]) => {
        return result;
      })
    );
  }

  public getListBranchesByFieldsId(id: number): Observable<IBranches[]> {
    return this.httpClient.get(this.baseUrlFake + 'get-list-branches-by-fields-id/' + id).pipe(
      map((result: IBranches[]) => {
        return result;
      })
    );
  }

  public getListProductBranchesId(id: number): Observable<IProduction[]> {
    return this.httpClient.get(this.baseUrlFake + 'get-list-product-by-branches-id/' + id).pipe(
      map((result: IProduction[]) => {
        return result;
      })
    );
  }

  public getListProductBranchesIds(ids: number[]): Observable<IProduction[]> {
    return this.httpClient.post(this.baseUrlFake + 'get-list-product-by-branches-ids/', {ids} ).pipe(
      map((result: IProduction[]) => {
        return result;
      })
    );
  }

  public getListEnergyConsumption(){
    return this.httpClient.get(this.baseUrlFake + 'get-list-energy-consumption/').pipe(
      map((result: IEnergyConsumption[]) => {
        return result;
      })
    );
  }

  public getListFieldsByFieldsId(fieldsId: number){
    return this.httpClient.get(this.baseUrlFake + 'get-list-fields-by-fields-id/' + fieldsId).pipe(
      map((result: IEnergyConsumption[]) => {
        return result;
      })
    );
  }
}
