import { BaseDestroyableDirective } from 'src/app/common/abstract/base-destroyable';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoadingOnElementDirective } from 'src/app/common/directive/loading-on-element.directive';

@Component({
  selector: 'app-list-report-energizer',
  templateUrl: './list-report-energizer.component.html',
  styleUrls: ['./list-report-energizer.component.scss'],
})
export class ListReportEnergizerComponent extends BaseDestroyableDirective implements OnInit {
  public listReportEnergizer = [
    {
      id: 1,
      yearDeclare: 2020,
      enterpriseName: 'DHBK',
      taxCode: 34324234324,
      address: 'abc',
      productMajor: 'aslfsakfs',
      employeesPerYear: 123,
      co2Electric: 343,
      energyProcess: {
        co2: 33,
        ch4: 12,
        n2o: 30,
      },
      productionProcess: {
        co2: 33,
        ch4: 12,
        n2o: 30,
      },
      co2Total: 235,
    },
    {
      id:2,
      yearDeclare: 2020,
      enterpriseName: 'ABC',
      taxCode: 34324234324,
      address: 'abc',
      productMajor: 'aslfsakfs',
      employeesPerYear: 123,
      co2Electric: 343,
      energyProcess: {
        co2: 33,
        ch4: 12,
        n2o: 30,
      },
      productionProcess: {
        co2: 33,
        ch4: 12,
        n2o: 30,
      },
      co2Total: 235,
    },
  ];

  @ViewChild('table', { static: true }) private elementTable: LoadingOnElementDirective;

/*   @Input() public set fieldsId(value: number){
    this.listEnterprises = [];
    this.fieldsIdValue = value;
    this.getListMiningIndustry();
  } */

  @Output() public toEditPageEmitter = new EventEmitter<number>();

  public fieldsIdValue: number;
/*   public listEnterprises: IEnterprises[];
 */
  constructor(
   // private enterprisesService: EnterprisesService,
    private toastr: ToastrService,
    ) {
    super();
  }

  public ngOnInit(): void {
  }

  public redirectToEditPage(reportId: number): void {
    this.toEditPageEmitter.emit(reportId);
  }

  public trackByFn(index: number, item: any): number {
    return item.id;
  }


}
