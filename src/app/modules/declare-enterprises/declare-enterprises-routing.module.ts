import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/common/guard/auth.guard';
import { AddEnterprisesPagesComponent } from './pages/add-enterprises-pages/add-enterprises-pages.component';
import { DetailEnterprisesPagesComponent } from './pages/detail-enterprises-pages/detail-enterprises-pages.component';
import { ListEnterprisesPagesComponent } from './pages/list-enterprises-pages/list-enterprises-pages.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Lĩnh vực CN Khai khoáng',
    },
    children: [
      {
        path: 'list-enterprises',
        component: ListEnterprisesPagesComponent,
        data: {
          title: 'Danh sách lĩnh vực CN Khai khoáng'
        },
        canActivate: [AuthGuard]
      },
      {
        path: 'add-enterprises',
        component: AddEnterprisesPagesComponent,
        data: {
          title: 'Thêm danh sách lĩnh vực CN Khai khoáng'
        },
        canActivate: [AuthGuard]
      },
      {
        path: 'detail-enterprises/:id',
        component: DetailEnterprisesPagesComponent,
        data: {
          title: 'Chi tiết danh sách lĩnh vực CN Khai khoáng'
        },
        canActivate: [AuthGuard]
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list-enterprises',
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeclareMiningIndustryRoutingModule { }
