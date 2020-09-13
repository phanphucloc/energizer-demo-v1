import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IResultAddMiningIndustry, IMiningIndustry, IBranches } from '../abstract/mining-industry.interface';

@Injectable({ providedIn: 'root' })
export class MiningIndustryService {

  private baseUrl = environment.baseURl;

  constructor(public router: Router, private httpClient: HttpClient) {
  }

  public getListMiningIndustry(): Observable<IMiningIndustry[]> {
    return this.httpClient.get(this.baseUrl + 'get-list-mining-industry').pipe(
      map((result: IMiningIndustry[]) => {
        return result;
      })
    );
  }

  public addMiningIndustry(): Observable<IResultAddMiningIndustry> {
    return this.httpClient.post(this.baseUrl + 'add-mining-industry', { null: null }).pipe(
      map((result: IResultAddMiningIndustry) => {
        return result;
      })
    );
  }

  public getMiningIndustryById(id: number): Observable<IMiningIndustry> {
    return this.httpClient.get(this.baseUrl + 'detail-mining-industry/' + id).pipe(
      map((result: IMiningIndustry) => {
        return result;
      })
    );
  }

  public getListBranchesIndustryProductionOfFields(id: number): Observable<IBranches[]> {
    return this.httpClient.get(this.baseUrl + 'get-list-branches-production-of-fields/' + id).pipe(
      map((result: IBranches[]) => {
        return result;
      })
    );
  }
}
