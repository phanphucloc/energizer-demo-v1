import { ReportEmissionByField } from './../../models/report-energizer.model';
import { BaseDestroyableDirective } from 'src/app/common/abstract/base-destroyable';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { LoadingOnElementDirective } from 'src/app/common/directive/loading-on-element.directive';
import { ReportService } from '../../services/report.service';
import { MESSAGE } from 'src/app/common/data/message';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

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
  @ViewChild('loadingFormProduction')
  private elementLoadingFormProduction: LoadingOnElementDirective;
  @Input() public fieldId: number;
  @Output() public cancelEmitter = new EventEmitter<void>();

  public emissionFieldReport: ReportEmissionByField;
  constructor(private reportService: ReportService, private toastr: ToastrService) {
    super();
  }

  ngOnInit(): void {
    this.getEmissionReportByFieldId();
  }

  public getEmissionReportByFieldId() {
    this.elementFormDetail.showLoadingCenter();
    this.reportService
      .getEmissionReportByFieldId(this.fieldId)
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
}
