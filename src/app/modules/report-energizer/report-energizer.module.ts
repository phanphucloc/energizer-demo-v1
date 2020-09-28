import { FormCustomModule } from './../../common/module/form-custom/form-custom.module';
import { LoadingModule } from 'src/app/common/module/loading/loading.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportEnergizerRoutingModule } from './report-energizer-routing.module';
import { ListReportEnergizerComponent } from './components/list-report-energizer/list-report-energizer.component';
import { FormDetailReportComponent } from './components/form-detail-report/form-detail-report.component';
import { ListReportPageComponent } from './pages/list-report-page/list-report-page.component';
import { DetailReportPageComponent } from './pages/detail-report-page/detail-report-page.component';
import { ListReportFieldPageComponent } from './pages/list-report-field-page/list-report-field-page.component';
import { DetailReportFieldPageComponent } from './pages/detail-report-field-page/detail-report-field-page.component';
import { FormDetailFieldReportComponent } from './components/form-detail-field-report/form-detail-field-report.component';
import { ListFieldReportComponent } from './components/list-field-report/list-field-report.component';

@NgModule({
  declarations: [
    ListReportEnergizerComponent,
    FormDetailReportComponent,
    ListReportPageComponent,
    DetailReportPageComponent,
    ListReportFieldPageComponent,
    DetailReportFieldPageComponent,
    FormDetailFieldReportComponent,
    ListFieldReportComponent,
  ],
  imports: [CommonModule, ReportEnergizerRoutingModule, LoadingModule, FormCustomModule],
})
export class ReportEnergizerModule {}
