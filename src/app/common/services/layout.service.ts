import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from '../models/auth.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Fields } from '../models/field.model';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  public user: UserModel;

  private baseUrl = environment.baseURl;

  constructor(public router: Router, private httpClient: HttpClient) {
  }

  public getListFields(): Observable<Fields> {
    return this.httpClient.get(this.baseUrl + 'get-list-fields').pipe(
      map((result: Fields) => {
        return result;
      })
    );
  }

}
