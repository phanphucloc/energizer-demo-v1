import { IProduction } from '../../abstract/enterprises.interface';
import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { LoadingOnElementDirective } from 'src/app/common/directive/loading-on-element.directive';
import { EnterprisesService } from '../../services/enterprises.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { BaseDestroyableDirective } from 'src/app/common/abstract/base-destroyable';
import { IBranches, IEnergyConsumption, IEnterprisesToServer, IFields } from '../../abstract/enterprises.interface';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { EnergyConsumption, EnterprisesToServer, Production } from '../../models/enterprises.model';

@Component({
  selector: 'app-form-enterprises',
  templateUrl: './form-declare-enterprises.component.html',
  styleUrls: ['./form-declare-enterprises.component.scss'],
})
export class FormDeclareEnterprisesComponent extends BaseDestroyableDirective implements OnInit {
  @ViewChild('loadingFormAdd', { static: true })
  private elementLoadingFormAdd: LoadingOnElementDirective;
  @ViewChild('buttonSubmit')
  private elementButtonSubmit: LoadingOnElementDirective;
  @ViewChild('loadingFormProduction')
  private elementLoadingFormProduction: LoadingOnElementDirective;

  @Input() public fieldsId: number;

  @Output() public cancelEmitter = new EventEmitter<void>();


  public formAddEnterprises: FormGroup;
  public listBranches: IBranches[];
  public branchesSelected: IBranches;
  public listEnergyConsumption: IEnergyConsumption[];
  public listFields: IFields[];

  constructor(
    private router: Router,
    private enterprisesService: EnterprisesService,
    private toastr: ToastrService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.loadData();
    this.createForm();
  }

  public createForm(): void {
    this.formAddEnterprises = new FormGroup({
      baseInfo: new FormGroup({
        name: new FormControl('', Validators.required),
        foundedYear: new FormControl('2020', Validators.required),
        address: new FormGroup({
          province: new FormControl('', Validators.required),
          district: new FormControl('', Validators.required),
          town: new FormControl('', Validators.required),
          xCoordinate: new FormControl('', Validators.required),
          yCoordinate: new FormControl('', Validators.required),
          productionValue: new FormControl('', Validators.required),
          employees: new FormControl('', Validators.required),
          branchesId: new FormControl(null, Validators.required),
        }),
      }),
    });
  }

  public loadData() {
    this.elementLoadingFormAdd.showLoadingCenter();
    forkJoin([
      this.enterprisesService.getListBranchesByFieldsId(this.fieldsId),
      this.enterprisesService.getListEnergyConsumption(),
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (result) => {
          const listBranches: IBranches[] = result[0];
          this.listBranches = listBranches;

          const listEnergyConsumption: IEnergyConsumption[] = result[1];
          this.listEnergyConsumption = listEnergyConsumption;
          this.addFieldsEnergyConsumptionForForm(listEnergyConsumption);

          this.elementLoadingFormAdd.hideLoadingCenter();
        },
        (error) => {
          this.toastr.error('Có lỗi xãy ra', 'Thông báo');
          this.elementLoadingFormAdd.hideLoadingCenter();
        }
      );
  }

  public selectFields(): void {
    const branchesId = this.formAddEnterprises?.value?.baseInfo?.address
      ?.branchesId;
    if (!branchesId) {
      this.branchesSelected = null;
      return;
    }

    this.branchesSelected = this.listBranches.find((branches) => {
      return branches.id === Number(branchesId);
    });

    this.formAddEnterprises.removeControl('production');

    this.elementLoadingFormProduction.showLoadingCenter();
    this.enterprisesService
      .getListProductBranchesId(branchesId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (result: IProduction[]) => {
          this.branchesSelected.listProduct = result;
          this.addFieldsProductionForForm(result);
          this.elementLoadingFormProduction.hideLoadingCenter();
        },
        () => {
          this.elementLoadingFormProduction.hideLoadingCenter();
        }
      );
  }

  public submit(): void {
    const valueFormatted = this.formatDataSendSever();
    console.log(JSON.stringify(valueFormatted));
    this.elementButtonSubmit.showLoadingCenter('16px', 'auto');
    this.enterprisesService
      .addEnterprises(valueFormatted)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {
          this.elementButtonSubmit.hideLoadingCenter();
          this.toastr.success('Thêm thành công', 'Thông báo');
          this.router.navigate([
            '/enterprises/' + this.fieldsId + '/list-enterprises',
          ]);
        },
        () => {
          this.elementButtonSubmit.hideLoadingCenter();
          this.toastr.error('Có lỗi xãy ra', 'Thông báo');
        }
      );
  }

  public cancel(): void {
    this.cancelEmitter.emit();
  }

  private addFieldsProductionForForm(listProduct: IProduction[]): void {
    const productionGroup: FormGroup = new FormGroup({});
    listProduct.forEach((production) => {
      const productControl = new FormControl('', Validators.required);
      productionGroup.addControl(production.name, productControl);
    });
    this.formAddEnterprises.addControl('production', productionGroup);
    this.formAddEnterprises.updateValueAndValidity();
  }

  private addFieldsEnergyConsumptionForForm(listEnergyConsumption: IEnergyConsumption[]): void {
    const energyConsumptionGroup: FormGroup = new FormGroup({});
    listEnergyConsumption.forEach((energyConsumption) => {
      const energyConsumptionControl = new FormControl('', Validators.required);
      energyConsumptionGroup.addControl(energyConsumption.name, energyConsumptionControl);
    });
    this.formAddEnterprises.addControl('energyConsumption', energyConsumptionGroup);
    this.formAddEnterprises.updateValueAndValidity();
  }

  private formatDataSendSever(): IEnterprisesToServer {
    let enterprises: EnterprisesToServer = new EnterprisesToServer();
    enterprises = this.formatBaseData();

    enterprises.listEnergyConsumption = this.formatEnergyConsumptionData();
    enterprises.listEnergyConsumption = this.formatProductionData();

    console.log(enterprises);
    return enterprises;
  }

  private formatBaseData(): IEnterprisesToServer {
    const enterprises: EnterprisesToServer = new EnterprisesToServer();
    enterprises.name = this.formAddEnterprises?.value?.baseInfo?.name;
    enterprises.foundedYear = this.formAddEnterprises?.value?.baseInfo?.foundedYear;
    enterprises.province = this.formAddEnterprises?.value?.baseInfo?.address?.province;
    enterprises.district = this.formAddEnterprises?.value?.baseInfo?.address?.district;
    enterprises.town = this.formAddEnterprises?.value?.baseInfo?.address?.town;
    enterprises.xCoordinate = this.formAddEnterprises?.value?.baseInfo?.address?.xCoordinate;
    enterprises.yCoordinate = this.formAddEnterprises?.value?.baseInfo?.address?.yCoordinate;
    enterprises.productionValue = this.formAddEnterprises?.value?.baseInfo?.address?.productionValue;
    enterprises.employees = this.formAddEnterprises?.value?.baseInfo?.address?.employees;
    enterprises.fieldId = this.fieldsId;
    enterprises.branchesId = this.formAddEnterprises?.value?.baseInfo?.address?.branchesId;
    enterprises.branchesName = this.branchesSelected.name;
    return enterprises;
  }

  private formatEnergyConsumptionData(): EnergyConsumption[]{
    const listEnergyConsumption: EnergyConsumption[] = [];
    if (this.formAddEnterprises?.value?.energyConsumption != null) {
      for (const field of Object.keys(this.formAddEnterprises?.value?.energyConsumption)) {
        const energyConsumptionFormValue = this.formAddEnterprises?.value?.energyConsumption[field];
        const energyConsumption: EnergyConsumption = new EnergyConsumption();
        energyConsumption.name = field;
        energyConsumption.value = energyConsumptionFormValue;
        listEnergyConsumption.push(energyConsumption);
      }
    }
    return listEnergyConsumption;
  }

  private formatProductionData(): Production[]{
    const listProduction: Production[] = [];
    if (this.formAddEnterprises?.value?.production != null) {
      for (const field of Object.keys( this.formAddEnterprises?.value?.production)) {
        const productionFormValue = this.formAddEnterprises?.value?.production[field];
        const production: EnergyConsumption = new EnergyConsumption();
        production.name = field;
        production.value = productionFormValue;
        listProduction.push(production);
      }
    }
    return listProduction;
  }
}

