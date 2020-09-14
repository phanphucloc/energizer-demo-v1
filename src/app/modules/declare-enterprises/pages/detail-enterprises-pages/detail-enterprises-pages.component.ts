import { IEnterprises } from '../../abstract/enterprises.interface';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EnterprisesService } from '../../services/enterprises.service';
import { BaseDestroyableDirective } from 'src/app/common/abstract/base-destroyable';
import { takeUntil } from 'rxjs/operators';
import { LoadingOnElementDirective } from 'src/app/common/directive/loading-on-element.directive';

@Component({
  selector: 'app-detail-enterprises-pages',
  templateUrl: './detail-enterprises-pages.component.html',
  styleUrls: ['./detail-enterprises-pages.component.scss'],
})
export class DetailEnterprisesPagesComponent extends BaseDestroyableDirective implements OnInit {
  @ViewChild('formDetail', { static: true }) private elementFormDetail: LoadingOnElementDirective;
  public id: number;
  public enterprises: IEnterprises;

  constructor(
    private activatedRoute: ActivatedRoute,
    private miningIndustryService: EnterprisesService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getMiningIndustry();
  }

  public getMiningIndustry(): void{
    this.elementFormDetail.showLoadingCenter();
    this.miningIndustryService.getMiningIndustryById(this.id)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      (result: IEnterprises) => {
        this.elementFormDetail.hideLoadingCenter();
        this.enterprises = result;
      },
      (error) => {
        this.elementFormDetail.hideLoadingCenter();
      }
    );
  }

}
