import { ListReportEmissionFieldPageComponent } from './pages/list-report-emission-field-page/list-report-emission-field-page.component';
import { DetailReportEmissionFieldPageComponent } from './pages/detail-report-emission-field-page/detail-report-emission-field-page.component';
import { ListEmissionFieldReportComponent } from './components/list-emission-field-report/list-emission-field-report.component';
import { ListReportFieldPageComponent } from './pages/list-report-field-page/list-report-field-page.component';
import { DetailReportPageComponent } from './pages/detail-report-page/detail-report-page.component';
import { ListReportPageComponent } from './pages/list-report-page/list-report-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/common/guard/auth.guard';
import { DetailReportFieldPageComponent } from './pages/detail-report-field-page/detail-report-field-page.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Báo cáo',
    },
    children: [
      {
        path: 'list-reports',
        component: ListReportPageComponent,
        data: {
          title: 'Danh sách báo cáo',
        },
        canActivate: [AuthGuard],
      },
      {
        path: 'detail-reports/:reportId',
        component: DetailReportPageComponent,
        data: {
          title: 'Chi tiết báo cáo',
        },
        canActivate: [AuthGuard],
      },
      {
        path: 'fields/list-reports',
        component: ListReportFieldPageComponent,
        data: {
          title: 'Danh sách báo cáo',
        },
        canActivate: [AuthGuard],
      },
      {
        path: 'fields/detail-reports/:fieldId',
        component: DetailReportFieldPageComponent,
        data: {
          title: 'Chi tiết báo cáo',
        },
        canActivate: [AuthGuard],
      },
      {
        path: 'emission-by-fields/list-reports',
        component: ListReportEmissionFieldPageComponent,
        data: {
          title: 'Danh sách báo cáo',
        },
        canActivate: [AuthGuard],
      },
      {
        path: 'emission-by-fields/detail-reports/:fieldId',
        component: DetailReportEmissionFieldPageComponent,
        data: {
          title: 'Chi tiết báo cáo',
        },
        canActivate: [AuthGuard],
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list-reports',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportEnergizerRoutingModule {}
