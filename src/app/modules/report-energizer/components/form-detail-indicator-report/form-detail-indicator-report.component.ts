import { ExcelReport } from './../../models/excel-report.model';
import { ExportService } from './../../../../common/services/export.service';
import { Component, OnInit } from '@angular/core';
import { listIndictorReports } from 'src/app/common/data/indicator-report-data';
import { IndicatorReport } from '../../models/report-energizer.model';

@Component({
  selector: 'app-form-detail-indicator-report',
  templateUrl: './form-detail-indicator-report.component.html',
  styleUrls: ['./form-detail-indicator-report.component.scss'],
})
export class FormDetailIndicatorReportComponent implements OnInit {
  public listYears = [2019, 2018, 2017];
  public reports: IndicatorReport[] = listIndictorReports;
  public dataExport: ExcelReport[] = [];
  public selectedReport = this.reports.find((report) => report.year === 2019);
  constructor( private exportService: ExportService) {}

  ngOnInit(): void {}

  public onSelectYear(year: number): void {
    this.selectedReport = this.reports.find((report) => report.year === year);
  }

  export() {
    this.dataExport = [];
    this.convertIndicatorReportToIndicatorReport();
    this.exportService.exportExcel(this.dataExport, 'BÁO_CÁO_CHỈ_TIÊU_TỔNG_HỢP_' + this.selectedReport.year);
  }

  public convertIndicatorReportToIndicatorReport() {
    this.dataExport.push(new ExcelReport('Lượng phát thải khí nhà kính', this.selectedReport.greenhouseGas + '', 'ktCO2'));
    this.dataExport.push(new ExcelReport('Phát thải gián tiếp', this.selectedReport.indirect + '', 'ktCO2'));
    this.dataExport.push(new ExcelReport('Phát thải do QTNL', this.selectedReport.energyProcess + '', 'ktCO2'));
    this.dataExport.push(new ExcelReport('Phát thải do QTCN', this.selectedReport.productionProcess + '', 'ktCO2'));
    this.dataExport.push(new ExcelReport('Phát thải do phát tán', this.selectedReport.scatter + '', 'ktCO2'));
    this.dataExport.push(new ExcelReport('Lượng phát thải khí nhà kính so với GTSX', this.selectedReport.greenhouseGasCpmToProductionValue + '', 'tCO2/tr.đồng'));
    this.dataExport.push(new ExcelReport('Lượng phát thải khí nhà kính bình quân đầu người',
      this.selectedReport.emissionPerCapita + '', 'tCO2/người'));
    this.dataExport.push(new ExcelReport('Tổng tiêu hao năng lượng cuối cùng(TT điện)', this.selectedReport.electric + '', 'GWh'));
    this.dataExport.push(new ExcelReport('Tổng tiêu hao năng lượng cuối cùng(TT năng lượng)', this.selectedReport.energy + '', 'TJ'));
    this.dataExport.push(new ExcelReport('Tiêu hao năng lượng so với GTSX(TT điện)',
      this.selectedReport.electricCpmToProductionValue + '', 'kWh/tr.đồng'));
    this.dataExport.push(new ExcelReport('Tiêu hao năng lượng so với GTSX(TT năng lượng)', this.selectedReport.energyCpmToProductionValue + '', 'kJ/tr.đồng'));
    this.dataExport.push(new ExcelReport('Tổng lượng nước sử dụng cho sản xuất', this.selectedReport.water + '', 'm3'));
    this.dataExport.push(new ExcelReport('Mức độ sử dụng nước trên một đơn vị GTSX', this.selectedReport.waterPerProductionValue + '', 'm3/tỷ đồng'));
    this.dataExport.push(new ExcelReport('Công sức lắp đặt điện năng lượng tái tạo', this.selectedReport.capacityOfRenewableElec + '', 'MW'));
    this.dataExport.push(new ExcelReport('Sản lượng điện năng lương tái tạo', this.selectedReport.renewableElectric + '', 'GWh'));
    this.dataExport.push(new ExcelReport('Tỷ lệ doanh nghiệp được cấp giấy chứng nhận TCVN ISO 14001/ISO 14001',
      this.selectedReport.proportionOfEnterpriseCertified + '', '%'));
  }
}
