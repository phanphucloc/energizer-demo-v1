import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultLayoutComponent } from './common/layout/default-layout/default-layout.component';
import { NotFoundComponent } from './common/pages/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./modules/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'enterprises/:fieldsId',
        loadChildren: () =>
          import(
            './modules/declare-enterprises/declare-enterprises.module'
          ).then((m) => m.DeclareMiningIndustryModule),
      },
    ],
  },
  {
    path: '',
    data: {
      title: 'Authentication',
    },
    children: [
      {
        path: 'not-found',
        component: NotFoundComponent,
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('./modules/authentication/authentication.module').then(
            (m) => m.AuthenticationModule
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
