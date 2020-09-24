import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private baseUrlFake = environment.baseURlFake;
  private baseUrl = environment.baseURl;

  constructor(public router: Router, private httpClient: HttpClient) {}
}
