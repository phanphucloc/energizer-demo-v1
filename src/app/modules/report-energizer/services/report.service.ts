import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ReportEmission } from '../models/report-energizer.model';

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
}
