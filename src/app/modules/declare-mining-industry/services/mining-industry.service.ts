import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IResultAddMiningIndustry, IMiningIndustry, IBranches, IEnergyConsumption, IProduct } from '../abstract/mining-industry.interface';

@Injectable({ providedIn: 'root' })
export class MiningIndustryService {

  private baseUrlFake = environment.baseURlFake;
  private baseUrl = environment.baseURl;

  constructor(public router: Router, private httpClient: HttpClient) {
  }

  public getListMiningIndustry(): Observable<IMiningIndustry[]> {
    return this.httpClient.get(this.baseUrlFake + 'get-list-mining-industry').pipe(
      map((result: IMiningIndustry[]) => {
        return result;
      })
    );
  }

  public addMiningIndustry(): Observable<IResultAddMiningIndustry> {
    return this.httpClient.post(this.baseUrlFake + 'add-mining-industry', { null: null }).pipe(
      map((result: IResultAddMiningIndustry) => {
        return result;
      })
    );
  }

  public getMiningIndustryById(id: number): Observable<IMiningIndustry> {
    return this.httpClient.get(this.baseUrlFake + 'detail-mining-industry/' + id).pipe(
      map((result: IMiningIndustry) => {
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

  public getListProductBranchesId(id: number): Observable<IProduct[]> {
    return this.httpClient.get(this.baseUrlFake + 'get-list-product-by-branches-id/' + id).pipe(
      map((result: IProduct[]) => {
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
