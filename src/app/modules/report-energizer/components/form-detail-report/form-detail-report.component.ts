import { ReportEmission } from './../../models/report-energizer.model';
import { BaseDestroyableDirective } from 'src/app/common/abstract/base-destroyable';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { ReportService } from './../../services/report.service';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { LoadingOnElementDirective } from 'src/app/common/directive/loading-on-element.directive';
import { MESSAGE } from 'src/app/common/data/message';
import {LocationService} from 'src/app/common/services/location.service';

@Component({
  selector: 'app-form-detail-report',
  templateUrl: './form-detail-report.component.html',
  styleUrls: ['./form-detail-report.component.scss'],
})
export class FormDetailReportComponent extends BaseDestroyableDirective implements OnInit {
  @ViewChild('formDetail', { static: true })
  private elementFormDetail: LoadingOnElementDirective;
  @Input() public reportId: number;
  @Output() public cancelEmitter = new EventEmitter<void>();

  public yearSelected = 2020 ;
  public listYears = [2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010];

  public detailEmissionReport: ReportEmission;
  constructor(private reportService: ReportService, private toastr: ToastrService, private locationService: LocationService) {
    super();
  }

  ngOnInit(): void {
    this.getEmissionReportByEnterpriseId();
  }

  public getEmissionReportByEnterpriseId() {
    this.elementFormDetail.showLoadingCenter();
    this.reportService
      .getEmissionReportByEnterpriseId(this.reportId, this.yearSelected)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res) => {
          this.detailEmissionReport = this.joinAllBranchName(res);
          this.detailEmissionReport.province = this.locationService.getProvince(this.detailEmissionReport.province).name;
          this.elementFormDetail.hideLoadingCenter();
        },
        () => {
          this.toastr.warning(MESSAGE.NOT_FOUND, MESSAGE.NOTIFICATION);
          this.detailEmissionReport = null;
          this.elementFormDetail.hideLoadingCenter();
        }
      );
  }
  public cancel(): void {
    this.cancelEmitter.emit();
  }

  public changeYearSelected(year): void {
    this.yearSelected = year;
    this.getEmissionReportByEnterpriseId();
  }

  private joinAllBranchName(report: ReportEmission): ReportEmission{
    const listBranchName = report.branches.map(branch => {
      return branch.name;
    });
    report.branchNameAll = listBranchName.join(' - ');
    return report;
  }
}
