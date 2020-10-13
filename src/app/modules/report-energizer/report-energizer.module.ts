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
import { ListReportEmissionFieldPageComponent } from './pages/list-report-emission-field-page/list-report-emission-field-page.component';
import { DetailReportEmissionFieldPageComponent } from './pages/detail-report-emission-field-page/detail-report-emission-field-page.component';
import { ListEmissionFieldReportComponent } from './components/list-emission-field-report/list-emission-field-report.component';
import { FormDetailEmissionFieldReportComponent } from './components/form-detail-emission-field-report/form-detail-emission-field-report.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ReportEmissionRoutingModule } from './report-emission-routing.module';
import { ReportFieldRoutingModule } from './report-field-routing.module';

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
    ListReportEmissionFieldPageComponent,
    DetailReportEmissionFieldPageComponent,
    ListEmissionFieldReportComponent,
    FormDetailEmissionFieldReportComponent,
  ],
  imports: [
    CommonModule,
    ReportEnergizerRoutingModule,
    ReportEmissionRoutingModule,
    ReportFieldRoutingModule,
    LoadingModule,
    FormCustomModule,
    BsDropdownModule.forRoot()],
})
export class ReportEnergizerModule {}
