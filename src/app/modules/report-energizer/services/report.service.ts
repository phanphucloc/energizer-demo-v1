import { ReportComsumption } from './../models/report-energizer.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ReportEmission } from '../models/report-energizer.model';
import { IFields } from '../../declare-enterprises/abstract/enterprises.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private baseUrlFake = environment.baseURlFake;
  private baseUrl = environment.baseURl;

  constructor(public router: Router, private httpClient: HttpClient) {}

  public getAllEmissionReport(): Observable<ReportEmission[]> {
    return this.httpClient.get<ReportEmission[]>(`${this.baseUrl}/reports/emissions/enterprises`);
  }

  public getEmissionReportByEnterpriseId(enterpriseId: number): Observable<ReportEmission> {
    return this.httpClient.get<ReportEmission>(
      `${this.baseUrl}/reports/emissions/enterprises/${enterpriseId}`
    );
  }

  public getFieldReportByFieldId(fieldId: number): Observable<ReportComsumption> {
    return this.httpClient.get<ReportComsumption>(
      `${this.baseUrl}/reports/consumptions/fields/${fieldId}`
    );
  }

   public getListFields(): Observable<IFields[]> {
    return this.httpClient.get(this.baseUrl + 'fields').pipe(
      map((result: IFields[]) => {
        return result;
      })
    );
  }
}
