import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeclareMiningIndustryRoutingModule } from './declare-mining-industry-routing.module';
import { DeclareMiningIndustryComponent } from './pages/declare-mining-industry/declare-mining-industry.component';
import { AddDeclareMiningIndustryComponent } from './pages/add-declare-mining-industry/add-declare-mining-industry.component';
import { DetailDeclareMiningIndustryComponent } from './pages/detail-declare-mining-industry/detail-declare-mining-industry.component';
import { FormAddDeclareMiningIndustryComponent } from './components/form-add-declare-mining-industry/form-add-declare-mining-industry.component';
import { FormDetailDeclareMiningIndustryComponent } from './components/form-detail-declare-mining-industry/form-detail-declare-mining-industry.component';
import { ListDeclareMiningIndustryComponent } from './components/list-declare-mining-industry/list-declare-mining-industry.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingModule } from 'src/app/common/module/loading/loading.module';

@NgModule({
  declarations: [
    DeclareMiningIndustryComponent,
    AddDeclareMiningIndustryComponent,
    DetailDeclareMiningIndustryComponent,
    FormAddDeclareMiningIndustryComponent,
    FormDetailDeclareMiningIndustryComponent,
    ListDeclareMiningIndustryComponent,
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
