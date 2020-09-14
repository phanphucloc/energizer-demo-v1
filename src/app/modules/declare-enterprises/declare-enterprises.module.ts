import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeclareMiningIndustryRoutingModule } from './declare-enterprises-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingModule } from 'src/app/common/module/loading/loading.module';
import { ListEnterprisesPagesComponent } from './pages/list-enterprises-pages/list-enterprises-pages.component';
import { DetailEnterprisesPagesComponent } from './pages/detail-enterprises-pages/detail-enterprises-pages.component';
import { AddEnterprisesPagesComponent } from './pages/add-enterprises-pages/add-enterprises-pages.component';
import { ListEnterprisesComponent } from './components/list-enterprises/list-enterprises.component';
import { FormDetailEnterprisesComponent } from './components/form-detail-enterprises/form-detail-enterprises.component';
import { FormDeclareEnterprisesComponent } from './components/form-declare-enterprises/form-declare-enterprises.component';

@NgModule({
  declarations: [
    FormDeclareEnterprisesComponent,
    FormDetailEnterprisesComponent,
    ListEnterprisesComponent,
    ListEnterprisesPagesComponent,
    DetailEnterprisesPagesComponent,
    AddEnterprisesPagesComponent
  ],
  imports: [
    CommonModule,
    DeclareMiningIndustryRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingModule,
  ],
})
export class DeclareMiningIndustryModule {}
