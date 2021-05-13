import { IndicatorReport } from './../../models/report-energizer.model';
import { Component } from '@angular/core';
import { listIndictorReports } from 'src/app/common/data/indicator-report-data';
import {ChartOptions, ChartType, ChartDataSets} from 'chart.js';
import {Label} from 'ng2-charts';

@Component({
  selector: 'app-chart-indicator-report',
  templateUrl: './chart-indicator-report.component.html',
  styleUrls: ['./chart-indicator-report.component.scss'],
})
export class ChartIndicatorComponent{

    public listYears = [2019, 2018, 2017];
    public reports: IndicatorReport[] = listIndictorReports;
    public selectedReport = this.reports.find((report) => report.year === 2019);

    barChartOptions: ChartOptions = {
        responsive: true,
      };
      barChartLabels: Label[];
      barChartType: ChartType = 'bar';
      barChartLegend = true;
      barChartPlugins = [];

      barChartData: ChartDataSets[] = [
        { data: [45, 37, 60, 70, 46, 33], label: 'Best Fruits' }
      ];
  public onSelectYear(year: number): void {
    this.selectedReport = this.reports.find((report) => report.year === year);
    this.barChartLabels = []
  }
}
