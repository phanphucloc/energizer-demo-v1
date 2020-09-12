import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMiningIndustry } from '../../abstract/mining-industry.interface';
import { MiningIndustryService } from '../../services/mining-industry.service';
import { BaseDestroyableDirective } from 'src/app/common/abstract/base-destroyable';
import { takeUntil, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LoadingOnElementDirective } from 'src/app/common/directive/loading-on-element.directive';

@Component({
  selector: 'app-detail-declare-mining-industry',
  templateUrl: './detail-declare-mining-industry.component.html',
  styleUrls: ['./detail-declare-mining-industry.component.scss'],
})
export class DetailDeclareMiningIndustryComponent extends BaseDestroyableDirective implements OnInit {
  @ViewChild('formDetail', { static: true }) private elementFormDetail: LoadingOnElementDirective;
  public id: number;
  public miningIndustry: IMiningIndustry;

  constructor(
    private activatedRoute: ActivatedRoute,
    private miningIndustryService: MiningIndustryService
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
      (result: IMiningIndustry) => {
        this.elementFormDetail.hideLoadingCenter();
        this.miningIndustry = result;
      },
      (error) => {
        this.elementFormDetail.hideLoadingCenter();
      }
    );
  }

}
