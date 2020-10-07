import { ReportComsumption } from './../../models/report-energizer.model';
import { BaseDestroyableDirective } from 'src/app/common/abstract/base-destroyable';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { LoadingOnElementDirective } from 'src/app/common/directive/loading-on-element.directive';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';
import { MESSAGE } from 'src/app/common/data/message';
import { ReportEmission } from '../../models/report-energizer.model';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-form-detail-field-report',
  templateUrl: './form-detail-field-report.component.html',
  styleUrls: ['./form-detail-field-report.component.scss'],
})
export class FormDetailFieldReportComponent extends BaseDestroyableDirective implements OnInit {
  @ViewChild('formDetail', { static: true })
  private elementFormDetail: LoadingOnElementDirective;
  @Input() public fieldId: number;
  @Output() public cancelEmitter = new EventEmitter<void>();

  public fieldReport: ReportComsumption;
  constructor(private reportService: ReportService, private toastr: ToastrService) {
    super();
  }

  ngOnInit(): void {
    this.getComsumptionReportByFieldId();
  }

  public getComsumptionReportByFieldId() {
    this.elementFormDetail.showLoadingCenter();
    this.reportService
      .getFieldReportByFieldId(this.fieldId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res) => {
          this.fieldReport = res;
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
}
