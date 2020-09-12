import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseDestroyableDirective } from 'src/app/common/abstract/base-destroyable';
import { MiningIndustryService } from '../../services/mining-industry.service';
import { takeUntil } from 'rxjs/operators';
import { LoadingOnElementDirective } from 'src/app/common/directive/loading-on-element.directive';
import { IMiningIndustry } from '../../abstract/mining-industry.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-declare-mining-industry',
  templateUrl: './list-declare-mining-industry.component.html',
  styleUrls: ['./list-declare-mining-industry.component.scss'],
})
export class ListDeclareMiningIndustryComponent extends BaseDestroyableDirective implements OnInit {
  @ViewChild('table', { static: true }) private elementTable: LoadingOnElementDirective;

  public listMiningIndustry: IMiningIndustry[];

  constructor(
    private router: Router,
    private miningIndustryService: MiningIndustryService
    ) {
    super();
  }

  public ngOnInit(): void {
    this.getListMiningIndustry();
  }

  public getListMiningIndustry() {
    this.elementTable.showLoadingCenter();
    this.miningIndustryService
      .getListMiningIndustry()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (result: IMiningIndustry[]) => {
          this.elementTable.hideLoadingCenter();
          this.listMiningIndustry = result;
        },
        (error) => {
          this.elementTable.hideLoadingCenter();
        }
      );
  }

  public redirectToEditPage(id: number): void {
    this.router.navigate(['/mining-industry/detail-mining-industry/' + id]);
  }

  public trackByFn(index: number, item: any): number {
    return item.id;
  }
}
