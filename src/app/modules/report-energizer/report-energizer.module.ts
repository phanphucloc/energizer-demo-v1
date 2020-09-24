import { FormCustomModule } from './../../common/module/form-custom/form-custom.module';
import { LoadingModule } from 'src/app/common/module/loading/loading.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportEnergizerRoutingModule } from './report-energizer-routing.module';
import { ListReportEnergizerComponent } from './components/list-report-energizer/list-report-energizer.component';
import { FormDetailReportComponent } from './components/form-detail-report/form-detail-report.component';
import { ListReportPageComponent } from './pages/list-report-page/list-report-page.component';
import { DetailReportPageComponent } from './pages/detail-report-page/detail-report-page.component';


@NgModule({
  declarations: [ListReportEnergizerComponent, FormDetailReportComponent, ListReportPageComponent, DetailReportPageComponent],
  imports: [
    CommonModule,
    ReportEnergizerRoutingModule,
    LoadingModule,
    FormCustomModule
  ]
})
export class ReportEnergizerModule { }
