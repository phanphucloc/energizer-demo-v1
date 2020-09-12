import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/common/guard/auth.guard';
import { DeclareMiningIndustryComponent } from './pages/declare-mining-industry/declare-mining-industry.component';
import { AddDeclareMiningIndustryComponent } from './pages/add-declare-mining-industry/add-declare-mining-industry.component';
import { DetailDeclareMiningIndustryComponent } from './pages/detail-declare-mining-industry/detail-declare-mining-industry.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Lĩnh vực CN Khai khoáng',
    },
    children: [
      {
        path: 'list-mining-industry',
        component: DeclareMiningIndustryComponent,
        data: {
          title: 'Danh sách lĩnh vực CN Khai khoáng'
        },
        canActivate: [AuthGuard]
      },
      {
        path: 'add-mining-industry',
        component: AddDeclareMiningIndustryComponent,
        data: {
          title: 'Thêm danh sách lĩnh vực CN Khai khoáng'
        },
        canActivate: [AuthGuard]
      },
      {
        path: 'detail-mining-industry/:id',
        component: DetailDeclareMiningIndustryComponent,
        data: {
          title: 'Chi tiết danh sách lĩnh vực CN Khai khoáng'
        },
        canActivate: [AuthGuard]
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list-mining-industry',
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeclareMiningIndustryRoutingModule { }
