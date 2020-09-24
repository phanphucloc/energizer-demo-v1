import { takeUntil } from 'rxjs/operators';
import { ReportService } from './../../services/report.service';
import { ReportEmission } from './../../models/report-energizer.model';
import { BaseDestroyableDirective } from 'src/app/common/abstract/base-destroyable';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoadingOnElementDirective } from 'src/app/common/directive/loading-on-element.directive';
import { MESSAGE } from 'src/app/common/data/message';

@Component({
  selector: 'app-list-report-energizer',
  templateUrl: './list-report-energizer.component.html',
  styleUrls: ['./list-report-energizer.component.scss'],
})
export class ListReportEnergizerComponent extends BaseDestroyableDirective implements OnInit {
  @ViewChild('table', { static: true }) private elementTable: LoadingOnElementDirective;

  /*   @Input() public set fieldsId(value: number){
    this.listEnterprises = [];
    this.fieldsIdValue = value;
    this.getListMiningIndustry();
  } */

  @Output() public toEditPageEmitter = new EventEmitter<number>();

  public fieldsIdValue: number;
  public listReportEnergizer: ReportEmission[];

  constructor(private reportService: ReportService, private toastr: ToastrService) {
    super();
  }

  public ngOnInit(): void {
    this.getEmissionReports();
  }

  public redirectToEditPage(reportId: number): void {
    this.toEditPageEmitter.emit(reportId);
  }

  public trackByFn(index: number, item: any): number {
    return item.id;
  }

  public getEmissionReports() {
    this.elementTable.showLoadingCenter();
    this.reportService
      .getAllEmissionReport()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res) => {
          this.listReportEnergizer = res;
          this.elementTable.hideLoadingCenter();
        },
        () => {
          this.toastr.error(MESSAGE.ERROR, MESSAGE.NOTIFICATION);
          this.elementTable.hideLoadingCenter();
        }
      );
  }
}
