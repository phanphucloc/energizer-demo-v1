import { ChartIndicatorReportPageComponent } from './pages/chart-indicator-report-page/chart-indicator-report-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/common/guard/auth.guard';
import { IndicatorReportPageComponent } from './pages/indicator-report-page/indicator-report-page.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Báo cáo',
    },
    children: [
      {
        path: 'detail',
        component: IndicatorReportPageComponent,
        data: {
          title: 'Chi tiết báo cáo',
        },
        canActivate: [AuthGuard],
      },
      {
        path: 'chart',
        component: ChartIndicatorReportPageComponent,
        data: {
          title: 'Biểu đồ',
        },
        canActivate: [AuthGuard],
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'detail',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndicatorReportRoutingModule {}
