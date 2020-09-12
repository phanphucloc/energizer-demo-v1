import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MiningIndustryService } from '../../services/mining-industry.service';
import { takeUntil } from 'rxjs/operators';
import { BaseDestroyableDirective } from 'src/app/common/abstract/base-destroyable';
import { MiningIndustry } from '../../models/mining-industry.model';

@Component({
  selector: 'app-declare-mining-industry',
  templateUrl: './declare-mining-industry.component.html',
  styleUrls: ['./declare-mining-industry.component.scss']
})
export class DeclareMiningIndustryComponent extends BaseDestroyableDirective implements OnInit {
  public listMiningIndustry: MiningIndustry[];

  constructor(
    private router: Router,
    private miningIndustryService: MiningIndustryService
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
    .subscribe((result: MiningIndustry[]) => {
      this.listMiningIndustry = result;
    });
  }

  public redirectToAdd(){
    this.router.navigate(['/mining-industry/add-mining-industry']);
  }
}
