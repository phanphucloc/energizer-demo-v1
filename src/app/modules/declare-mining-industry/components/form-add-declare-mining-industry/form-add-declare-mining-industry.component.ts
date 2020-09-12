import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingOnElementDirective } from 'src/app/common/directive/loading-on-element.directive';
import { MiningIndustryService } from '../../services/mining-industry.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { BaseDestroyableDirective } from 'src/app/common/abstract/base-destroyable';
import { IResultAddMiningIndustry } from '../../abstract/mining-industry.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-add-declare-mining-industry',
  templateUrl: './form-add-declare-mining-industry.component.html',
  styleUrls: ['./form-add-declare-mining-industry.component.scss'],
})
export class FormAddDeclareMiningIndustryComponent extends BaseDestroyableDirective implements OnInit {
  @ViewChild('buttonSubmit', { static: true }) private elementButtonSubmit: LoadingOnElementDirective;

  constructor(
    private router: Router,
    private miningIndustryService: MiningIndustryService,
    private toastr: ToastrService
  ) {
    super();
  }

  public ngOnInit(): void {}

  public submit(): void {
    this.elementButtonSubmit.showLoadingCenter('16px', 'auto');
    this.miningIndustryService
      .addMiningIndustry()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (result: IResultAddMiningIndustry) => {
          this.elementButtonSubmit.hideLoadingCenter();
          this.toastr.success('Thêm thành công', 'Thông báo');
          this.router.navigate(['/mining-industry/list-mining-industry']);
        },
        (error) => {
          this.toastr.error('Có lỗi xãy ra', 'Thông báo');
          this.elementButtonSubmit.hideLoadingCenter();
        }
      );
  }

  public cancel() {
    this.router.navigate(['/mining-industry/list-mining-industry']);
  }
}
