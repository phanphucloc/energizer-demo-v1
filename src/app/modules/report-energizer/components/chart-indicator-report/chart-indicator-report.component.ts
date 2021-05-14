import { ExportService } from './../../../../common/services/export.service';
import { IndicatorReport } from './../../models/report-energizer.model';
import { Component, OnInit } from '@angular/core';
import { listIndictorReports } from 'src/app/common/data/indicator-report-data';
import {ChartOptions, ChartType, ChartDataSets} from 'chart.js';
import {Label} from 'ng2-charts';

@Component({
  selector: 'app-chart-indicator-report',
  templateUrl: './chart-indicator-report.component.html',
  styleUrls: ['./chart-indicator-report.component.scss'],
})
export class ChartIndicatorComponent{

    public reports: IndicatorReport[] = listIndictorReports;

    barChartOptions: ChartOptions = {
        responsive: true,
      };
      barChartLabels: Label[] = ['2017', '2018', '2019'];
      barChartType: ChartType = 'bar';
      barChartLegend = true;
      barChartPlugins = [];

      greenhouseGasData: ChartDataSets[] = [
        { data: [this.reports[0].greenhouseGas, this.reports[1].greenhouseGas, this.reports[2].greenhouseGas], label: 'ktCO2' }
      ];

      renewableElectricData: ChartDataSets[] = [
        { data: [this.reports[0].renewableElectric, this.reports[1].renewableElectric, this.reports[2].renewableElectric], label: 'GWh' }
      ];

      capacityOfRenewableElecData: ChartDataSets[] = [
        { data: [this.reports[0].capacityOfRenewableElec, this.reports[1].capacityOfRenewableElec,
                 this.reports[2].capacityOfRenewableElec], label: 'MW' }
      ];

      electricData: ChartDataSets[] = [
        {data: [this.reports[0].electric + this.reports[0].electricCpmToProductionValue,
                this.reports[1].electric + this.reports[1].electricCpmToProductionValue,
                this.reports[2].electric + this.reports[2].electricCpmToProductionValue], label: 'kWh'}
      ];

      energyData: ChartDataSets[] = [
        {data: [this.reports[0].energy + this.reports[0].energyCpmToProductionValue,
          this.reports[1].energy + this.reports[1].energyCpmToProductionValue,
          this.reports[2].energy + this.reports[2].electricCpmToProductionValue], label: 'kJ'}
      ];

}
