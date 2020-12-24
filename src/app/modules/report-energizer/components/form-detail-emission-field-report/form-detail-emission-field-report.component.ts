import { ReportEmissionByField } from './../../models/report-energizer.model';
import { BaseDestroyableDirective } from 'src/app/common/abstract/base-destroyable';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { LoadingOnElementDirective } from 'src/app/common/directive/loading-on-element.directive';
import { ReportService } from '../../services/report.service';
import { MESSAGE } from 'src/app/common/data/message';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-form-detail-emission-field-report',
  templateUrl: './form-detail-emission-field-report.component.html',
  styleUrls: ['./form-detail-emission-field-report.component.scss'],
})
export class FormDetailEmissionFieldReportComponent
  extends BaseDestroyableDirective
  implements OnInit {
  @ViewChild('formDetail', { static: true })
  private elementFormDetail: LoadingOnElementDirective;
  @Input() public fieldId: number;
  @Output() public cancelEmitter = new EventEmitter<void>();

  public emissionFieldReport: ReportEmissionByField;
  public yearSelected = 2020 ;
  public listYears = [2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010];
  constructor(private reportService: ReportService, private toastr: ToastrService) {
    super();
  }

  ngOnInit(): void {
    this.getEmissionReportByFieldId();
  }

  public getEmissionReportByFieldId() {
      this.elementFormDetail.showLoadingCenter();
      this.reportService
        .getEmissionReportByFieldId(this.fieldId, this.yearSelected)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (res) => {
            this.emissionFieldReport = res;
            this.elementFormDetail.hideLoadingCenter();
          },
          () => {
            this.toastr.error(MESSAGE.ERROR, MESSAGE.NOTIFICATION);
            this.elementFormDetail.hideLoadingCenter();
          }
        );
  }

  public cancel(): void {
    this.cancelEmitter.emit();
  }

  public changeYearSelected(year): void {
    this.yearSelected = year;
    this.getEmissionReportByFieldId();
  }

}
