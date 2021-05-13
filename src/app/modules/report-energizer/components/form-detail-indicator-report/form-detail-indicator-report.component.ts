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
    this.exportService.exportExcel(this.dataExport, 'BÁO_CÁO_CHỈ_TIÊU_TỔNG_HỢP_');
  }

  public convertIndicatorReportToIndicatorReport() {
    this.dataExport.push(new ExcelReport('Lượng phát thải khí nhà kính',
     this.reports[0].greenhouseGas + '',
     this.reports[1].greenhouseGas + '',
     this.reports[2].greenhouseGas + '',
      'ktCO2'));
    this.dataExport.push(new ExcelReport('Phát thải gián tiếp',
     this.reports[0].indirect + '',
     this.reports[1].indirect + '',
     this.reports[2].indirect + '',
     'ktCO2'));
    this.dataExport.push(new ExcelReport('Phát thải do QTNL',
     this.reports[0].energyProcess + '',
     this.reports[1].energyProcess + '',
     this.reports[2].energyProcess + '',
      'ktCO2'));
    this.dataExport.push(new ExcelReport('Phát thải do QTCN',
     this.reports[0].productionProcess + '',
     this.reports[1].productionProcess + '',
     this.reports[2].productionProcess + '',
      'ktCO2'));
    this.dataExport.push(new ExcelReport('Phát thải do phát tán',
     this.reports[0].scatter + '',
     this.reports[1].scatter + '',
     this.reports[2].scatter + '',
      'ktCO2'));
    this.dataExport.push(new ExcelReport('Lượng phát thải khí nhà kính so với GTSX',
     this.reports[0].greenhouseGasCpmToProductionValue + '',
     this.reports[1].greenhouseGasCpmToProductionValue + '',
     this.reports[2].greenhouseGasCpmToProductionValue + '',
      'tCO2/tr.đồng'));
    this.dataExport.push(new ExcelReport('Lượng phát thải khí nhà kính bình quân đầu người',
      this.reports[0].emissionPerCapita + '',
      this.reports[1].emissionPerCapita + '',
      this.reports[2].emissionPerCapita + '',
       'tCO2/người'));
    this.dataExport.push(new ExcelReport('Tổng tiêu hao năng lượng cuối cùng(TT điện)',
     this.reports[0].electric + '',
     this.reports[1].electric + '',
     this.reports[2].electric + '',
      'GWh'));
    this.dataExport.push(new ExcelReport('Tổng tiêu hao năng lượng cuối cùng(TT năng lượng)',
     this.reports[0].energy + '',
     this.reports[1].energy + '',
     this.reports[2].energy + '', 'TJ'));
    this.dataExport.push(new ExcelReport('Tiêu hao năng lượng so với GTSX(TT điện)',
      this.reports[0].electricCpmToProductionValue + '',
      this.reports[1].electricCpmToProductionValue + '',
      this.reports[2].electricCpmToProductionValue + '',
       'kWh/tr.đồng'));
    this.dataExport.push(new ExcelReport('Tiêu hao năng lượng so với GTSX(TT năng lượng)',
     this.reports[0].energyCpmToProductionValue + '',
     this.reports[1].energyCpmToProductionValue + '',
     this.reports[2].energyCpmToProductionValue + '', 'kJ/tr.đồng'));
    this.dataExport.push(new ExcelReport('Tổng lượng nước sử dụng cho sản xuất',
     this.reports[0].water + '',
     this.reports[1].water + '',
     this.reports[2].water + '',
      'm3'));
    this.dataExport.push(new ExcelReport('Mức độ sử dụng nước trên một đơn vị GTSX',
     this.reports[0].waterPerProductionValue + '',
     this.reports[1].waterPerProductionValue + '',
     this.reports[2].waterPerProductionValue + '',
      'm3/tỷ đồng'));
    this.dataExport.push(new ExcelReport('Công sức lắp đặt điện năng lượng tái tạo',
     this.reports[0].capacityOfRenewableElec + '',
     this.reports[1].capacityOfRenewableElec + '',
     this.reports[2].capacityOfRenewableElec + '', 'MW'));
    this.dataExport.push(new ExcelReport('Sản lượng điện năng lương tái tạo', 
    this.reports[0].renewableElectric + '',
    this.reports[1].renewableElectric + '',
    this.reports[2].renewableElectric + '', 'GWh'));
    this.dataExport.push(new ExcelReport('Tỷ lệ doanh nghiệp được cấp giấy chứng nhận TCVN ISO 14001/ISO 14001',
      this.reports[0].proportionOfEnterpriseCertified + '',
      this.reports[1].proportionOfEnterpriseCertified + '',
      this.reports[2].proportionOfEnterpriseCertified + '', '%'));
  }
}
