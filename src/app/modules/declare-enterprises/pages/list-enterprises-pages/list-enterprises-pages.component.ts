import { IEnterprises } from '../../abstract/enterprises.interface';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EnterprisesService } from '../../services/enterprises.service';
import { takeUntil } from 'rxjs/operators';
import { BaseDestroyableDirective } from 'src/app/common/abstract/base-destroyable';

@Component({
  selector: 'app-list-enterprises-pages',
  templateUrl: './list-enterprises-pages.component.html',
  styleUrls: ['./list-enterprises-pages.component.scss']
})
export class ListEnterprisesPagesComponent extends BaseDestroyableDirective implements OnInit {
  public listEnterprises: IEnterprises[];

  constructor(
    private router: Router,
    private miningIndustryService: EnterprisesService
    ) {
    super();
  }

  public ngOnInit(): void {
    this.getListMiningIndustry();
  }

  public getListMiningIndustry(){
    this.miningIndustryService.getListMiningIndustry()
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe((result: IEnterprises[]) => {
      this.listEnterprises = result;
    });
  }
  public redirectToAdd(){
    this.router.navigate(['/enterprises/add-enterprises']);
  }
}
