import { IProduction, IDropdown, IBranchesValue } from '../../abstract/enterprises.interface';
import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { LoadingOnElementDirective } from 'src/app/common/directive/loading-on-element.directive';
import { EnterprisesService } from '../../services/enterprises.service';
import { takeUntil } from 'rxjs/operators';
import { BaseDestroyableDirective } from 'src/app/common/abstract/base-destroyable';
import { IBranches, IEnergyConsumption, IEnterprisesToServer, IFields } from '../../abstract/enterprises.interface';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { EnergyConsumption, EnterprisesToServer, Production, Branches, Dropdown } from '../../models/enterprises.model';
import { MESSAGE } from 'src/app/common/data/message';

@Component({
  selector: 'app-form-declare-enterprises',
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
  @Output() public submitEmitter = new EventEmitter<string>();

  public settingDropdown = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    enableCheckAll: false,
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: false
  };
  public formAddEnterprises: FormGroup;
  public listBranches: IBranches[];
  public branchesSelected: IBranches[] = [];
  public listEnergyConsumption: IEnergyConsumption[];
  public listFields: IFields[];

  constructor(
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
        foundedYear: new FormControl(
          { value: '2020', disabled: true },
          Validators.required
        ),
        address: new FormGroup({
          province: new FormControl('', Validators.required),
          district: new FormControl('', Validators.required),
          town: new FormControl('', Validators.required),
          xCoordinate: new FormControl('', Validators.required),
          yCoordinate: new FormControl('', Validators.required),
          productionValue: new FormControl('', Validators.required),
          employees: new FormControl('', Validators.required),
          branchesId: new FormControl([], Validators.required),
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
        () => {
          this.toastr.error(MESSAGE.ERROR, MESSAGE.NOTIFICATION);
          this.elementLoadingFormAdd.hideLoadingCenter();
        }
      );
  }

  public dropDownClose(): void {
    this.formAddEnterprises.get('baseInfo.address.branchesId').markAsTouched();
  }

  public selectBranch(branch: IBranches): void {
    this.elementLoadingFormProduction.showLoadingCenter();
    this.enterprisesService
      .getListProductBranchesId(branch.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (result: IProduction[]) => {
          branch.listProduct = result;
          this.branchesSelected.push(branch);
          this.addFieldsProductionForForm(branch);
          this.elementLoadingFormProduction.hideLoadingCenter();
        },
        () => {
          this.toastr.error(MESSAGE.ERROR, MESSAGE.NOTIFICATION);
          this.elementLoadingFormProduction.hideLoadingCenter();
        }
      );
  }

  public deSelectBranch(branch: IBranches): void {
    this.formAddEnterprises.removeControl('production' + branch.id);
    this.branchesSelected = this.branchesSelected.filter((branchSelected) => {
      return branchSelected.id !== branch.id;
    });
  }

  public submit(): void {
    const valueFormatted = this.formatDataSendSever();
    this.elementButtonSubmit.showLoadingCenter('16px', 'auto');
    this.enterprisesService
      .addEnterprises(valueFormatted)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {
          this.elementButtonSubmit.hideLoadingCenter();
          this.submitEmitter.emit('SUCCESS');
        },
        () => {
          this.elementButtonSubmit.hideLoadingCenter();
          this.submitEmitter.emit('ERROR');
        }
      );
  }

  public cancel(): void {
    this.cancelEmitter.emit();
  }


  private addFieldsProductionForForm(branch: IBranches): void {
    if (branch) {
      const productionGroup: FormGroup = new FormGroup({});
      branch.listProduct.forEach((production) => {
        const productControl = new FormControl('', Validators.required);
        productionGroup.addControl(production.productionId.toString(), productControl);
      });
      this.formAddEnterprises.addControl('production' + branch.id, productionGroup);
      this.formAddEnterprises.updateValueAndValidity();
    }
  }

  private addFieldsEnergyConsumptionForForm(listEnergyConsumption: IEnergyConsumption[]): void {
    if (listEnergyConsumption) {
      const energyConsumptionGroup: FormGroup = new FormGroup({});
      listEnergyConsumption.forEach((energyConsumption) => {
        const energyConsumptionControl = new FormControl('', Validators.required);
        energyConsumptionGroup.addControl(energyConsumption.energyId.toString(), energyConsumptionControl);
      });
      this.formAddEnterprises.addControl('energyConsumption', energyConsumptionGroup);
      this.formAddEnterprises.updateValueAndValidity();
    }
  }

  private formatDataSendSever(): IEnterprisesToServer {
    let enterprises: EnterprisesToServer = new EnterprisesToServer();
    enterprises = this.formatBaseData();
    enterprises.energies = this.formatEnergyConsumptionData();
    enterprises.productions = this.formatProductionData();
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
    enterprises.branches = this.formatBranchesData(this.branchesSelected);

    return enterprises;
  }

  private formatEnergyConsumptionData(): EnergyConsumption[] {
    const listEnergyConsumption: EnergyConsumption[] = [];
    if (this.formAddEnterprises?.value?.energyConsumption != null) {
      for (const field of Object.keys(this.formAddEnterprises?.value?.energyConsumption)) {
        const energyConsumptionVolume = this.formAddEnterprises?.value?.energyConsumption[field];
        const energyConsumption: EnergyConsumption = new EnergyConsumption();
        energyConsumption.energyId = Number(field);
        energyConsumption.volume = energyConsumptionVolume;
        listEnergyConsumption.push(energyConsumption);
      }
    }
    return listEnergyConsumption;
  }

  private formatProductionData(): Production[] {
    const listProduction: Production[] = [];
    if (this.branchesSelected){
      this.branchesSelected.forEach(branch => {
        const productionControl = this.formAddEnterprises.get('production' + branch.id);
        if (productionControl?.value != null) {
          for (const field of Object.keys(productionControl?.value)) {
            const productionVolume = productionControl?.value[field.toString()];
            const production: Production = new Production();
            production.productionId = Number(field);
            production.volume = productionVolume;
            listProduction.push(production);
          }
        }
      });
    }
    return listProduction;
  }

  private formatBranchesData(branches: IBranches[]): IBranchesValue[] {
    let branchesFormate: IBranchesValue[] = [];
    if (branches) {
      branchesFormate = branches.map(branch => {
        return {id : branch.id, name : branch.name };
      });
    }
    return branchesFormate;
  }
}

