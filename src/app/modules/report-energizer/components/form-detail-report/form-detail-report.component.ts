import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-detail-report',
  templateUrl: './form-detail-report.component.html',
  styleUrls: ['./form-detail-report.component.scss'],
})
export class FormDetailReportComponent implements OnInit {
  public detailReport = {
    id: 1,
    year: 2020,
    enterpriseName: 'Petrolimex Hòa Bình',
    taxCode: '1',
    province: 'Hòa Bình',
    branches: [
      {
        id: 2,
        name: 'Khai thác dầu khí',
        groupCode: '',
        industryCode: '06',
        fieldId: 1,
      },
    ],
    employees: 246,
    energyProcess: {
      co2: 1.97903381e9,
      ch4: 110496.8,
      n2o: 16104.050000000001,
    },
    productionProcess: {
      co2: 1898552.0000000002,
      ch4: 1906232.8800000001,
      n2o: 25.157999999999998,
    },
    totalCO2: 1.980932362e9,
  };

  constructor() {}

  ngOnInit(): void {}
}
