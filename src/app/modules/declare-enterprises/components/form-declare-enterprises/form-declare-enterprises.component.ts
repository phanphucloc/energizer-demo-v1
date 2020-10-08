import { IProductionData, IDropdown, IBranchesValue, IEnergy, IProduction } from '../../abstract/enterprises.interface';
import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { LoadingOnElementDirective } from 'src/app/common/directive/loading-on-element.directive';
import { EnterprisesService } from '../../services/enterprises.service';
import { takeUntil } from 'rxjs/operators';
import { BaseDestroyableDirective } from 'src/app/common/abstract/base-destroyable';
import { IBranches, IEnergyData, IEnterprisesToServer, IFields } from '../../abstract/enterprises.interface';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { EnergyData, EnterprisesToServer, ProductionData, Branches, Dropdown } from '../../models/enterprises.model';
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
  @Input() public enterprisesId: number;

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
    allowSearchFilter: false,
    defaultOpen: false
  };
  public enterprises: IEnterprisesToServer;
  public formAddEnterprises: FormGroup;
  public listBranches: IBranches[];
  public branchesSelected: IBranches[] = [];
  public listEnergyConsumption: IEnergy[];
  public listFields: IFields[];
  private isOpenedDropDown = false;

  constructor(
    private enterprisesService: EnterprisesService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef
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
          2020,
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
          branchesId: new FormControl([]),
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

          const listEnergyConsumption: IEnergy[] = result[1];
          this.listEnergyConsumption = listEnergyConsumption;
          this.addFieldsEnergyConsumptionForForm(listEnergyConsumption);

          this.elementLoadingFormAdd.hideLoadingCenter();
          if (this.enterprisesId) {
            this.elementLoadingFormAdd.showLoadingCenter();
            this.enterprisesService
              .getEnterprisesById(this.enterprisesId)
              .pipe(takeUntil(this.destroy$))
              .subscribe(
                (enterprises) => {
                  this.enterprises = enterprises;
                  this.fetchBaseData();
                  this.addFieldsEnergyConsumptionForForm(listEnergyConsumption);
                  this.branchesSelected = this.enterprises.branches as IBranches[];
                  this.addFieldsProductionDetailForForm(this.branchesSelected);
                  this.formAddEnterprises.updateValueAndValidity();
                  this.elementLoadingFormAdd.hideLoadingCenter();
                },
                () => {
                  this.toastr.error(MESSAGE.ERROR, MESSAGE.NOTIFICATION);
                  this.elementLoadingFormAdd.hideLoadingCenter();
               }
            );
          }
        },
        () => {
          this.toastr.error(MESSAGE.ERROR, MESSAGE.NOTIFICATION);
          this.elementLoadingFormAdd.hideLoadingCenter();
        }
      );
  }

  private fetchBaseData(): void {
    this.formAddEnterprises.patchValue({
      baseInfo: {
        name: this.enterprises.name,
        foundedYear: this.enterprises.foundedYear,
        address: {
          province: this.enterprises.province,
          district: this.enterprises.district,
          town: this.enterprises.town,
          xCoordinate: this.enterprises.xcoordinate,
          yCoordinate: this.enterprises.ycoordinate,
          productionValue: this.enterprises.productionValue,
          employees: this.enterprises.employees,
          branchesId: this.enterprises.branches,
        },
      },
    });
    this.cdr.detectChanges();
  }

  public dropDownClose(): void {
    if (this.isOpenedDropDown){
      this.formAddEnterprises.get('baseInfo.address.branchesId').markAsTouched();
    }
    this.isOpenedDropDown = false;
  }

  public dropDownOpen(): void {
    this.isOpenedDropDown = true;
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
    if (this.validateForm()){
      const valueFormatted = this.formatDataSendSever();
      // this.elementButtonSubmit.showLoadingCenter('16px', 'auto');
      console.log(valueFormatted);
      // this.enterprisesService
      //   .addEnterprises(valueFormatted)
      //   .pipe(takeUntil(this.destroy$))
      //   .subscribe(
      //     () => {
      //       this.elementButtonSubmit.hideLoadingCenter();
      //       this.submitEmitter.emit('SUCCESS');
      //     },
      //     () => {
      //       this.elementButtonSubmit.hideLoadingCenter();
      //       this.submitEmitter.emit('ERROR');
      //     }
      //   );
    }
  }

  public cancel(): void {
    this.cancelEmitter.emit();
  }

  private addFieldsProductionDetailForForm(listBranches: IBranches[]): void {
    if (listBranches) {
      listBranches.forEach((branch) => {
        const productionGroup: FormGroup = new FormGroup({});
        branch.listProduct = [];

        this.enterprises.productions.forEach((production) => {
          if (production.branchId === branch.id) {

            branch.listProduct.push({
              branchId: branch.id,
              id: production.productionId,
              name: production.production,
              unit: production.unit,
            });

            const productControl = new FormControl(
              production.volume,
              Validators.required
            );

            productionGroup.addControl(
              production.productionId.toString(),
              productControl
            );

          }
        });
        this.formAddEnterprises.addControl(
          'production' + branch.id,
          productionGroup
        );
        this.formAddEnterprises.updateValueAndValidity();
      });
    }
  }


  private addFieldsProductionForForm(branch: IBranches): void {
    if (branch) {
      const productionGroup: FormGroup = new FormGroup({});
      branch.listProduct.forEach((production) => {
        const productControl = new FormControl(0, [Validators.required]);
        productionGroup.addControl(production.id.toString(), productControl);
      });
      this.formAddEnterprises.addControl('production' + branch.id, productionGroup);
      this.formAddEnterprises.updateValueAndValidity();
    }
  }

  private addFieldsEnergyConsumptionForForm(listEnergyConsumption: IEnergy[]): void {
    if (listEnergyConsumption) {
      const energyConsumptionGroup: FormGroup = new FormGroup({});
      listEnergyConsumption.forEach((energyConsumption) => {

        const energyConsumptionItem = this.enterprises?.energies.find((energyConsumptionData) => {
            return energyConsumptionData.energyId === energyConsumption.id;
          }
        );

        let energyConsumptionControl: FormControl;
        if (energyConsumptionItem){
           energyConsumptionControl = new FormControl(energyConsumptionItem.volume, Validators.required);
        }
        else{
            energyConsumptionControl = new FormControl(0, Validators.required);
        }

        energyConsumptionGroup.addControl(
          energyConsumption.id.toString(),
          energyConsumptionControl
        );
      });
      this.formAddEnterprises.setControl('energyConsumption', energyConsumptionGroup);
      this.formAddEnterprises.updateValueAndValidity();
    }
  }

  private validateForm(): boolean {
    const statusValidate = this.validateEnergy() && this.validateBranch();
    return statusValidate;
  }

  private validateEnergy(): boolean {
    let countEnergyEmpty = 0;
    let countEnergy = 0;
    if (this.formAddEnterprises?.value?.energyConsumption != null) {
      for (const field of Object.keys(this.formAddEnterprises?.value?.energyConsumption)) {
        const energyConsumptionVolume = this.formAddEnterprises?.value?.energyConsumption[field];
        if (! energyConsumptionVolume || Number(energyConsumptionVolume) === 0){
          countEnergyEmpty++;
        }
        countEnergy++;
      }
    }
    if (countEnergyEmpty === countEnergy){
      this.formAddEnterprises
        .get('energyConsumption')
        ?.setErrors({ energyIncorrect: true, message : MESSAGE.ENERGY_INCORRECT });
      return false;
    }
    else{
      return true;
    }
  }

  private validateBranch(): boolean {
    let statusValidateBranch = true;
    if (this.branchesSelected) {
      for (const branch of this.branchesSelected) {
        let countProductionEmpty = 0;
        let countProduction = 0;
        const productionControl = this.formAddEnterprises.get('production' + branch.id);
        if (productionControl?.value != null) {
          for (const field of Object.keys(productionControl?.value)) {
            const productionVolume = productionControl?.value[field.toString()];
            if (!productionVolume || Number(productionVolume) === 0) {
              countProductionEmpty++;
            }
            countProduction++;
          }
        }
        if (countProductionEmpty === countProduction && countProduction) {
          this.formAddEnterprises
            .get('production' + branch.id)
            ?.setErrors({ productIncorrect: true, message : MESSAGE.PRODUCT_INCORRECT + ' ' +  branch.name});
          statusValidateBranch =  false;
        }
      }
    }
    else {
      this.formAddEnterprises.setErrors({ productNoSelect: true, message : MESSAGE.BRANCHES_NO_SELECT });
      statusValidateBranch = false;
    }
    return statusValidateBranch;
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
    enterprises.xcoordinate = this.formAddEnterprises?.value?.baseInfo?.address?.xCoordinate;
    enterprises.ycoordinate = this.formAddEnterprises?.value?.baseInfo?.address?.yCoordinate;
    enterprises.productionValue = this.formAddEnterprises?.value?.baseInfo?.address?.productionValue;
    enterprises.employees = this.formAddEnterprises?.value?.baseInfo?.address?.employees;
    enterprises.fieldId = this.fieldsId;
    enterprises.branches = this.formatBranchesData(this.branchesSelected);

    return enterprises;
  }

  private formatEnergyConsumptionData(): EnergyData[] {
    const listEnergyConsumption: EnergyData[] = [];
    if (this.formAddEnterprises?.value?.energyConsumption != null) {
      for (const field of Object.keys(this.formAddEnterprises?.value?.energyConsumption)) {
        const energyConsumptionVolume = this.formAddEnterprises?.value?.energyConsumption[field];
        const energyConsumption: EnergyData = new EnergyData();
        energyConsumption.energyId = Number(field);
        energyConsumption.volume = energyConsumptionVolume || 0;
        listEnergyConsumption.push(energyConsumption);
      }
    }
    return listEnergyConsumption;
  }

  private formatProductionData(): ProductionData[] {
    const listProduction: ProductionData[] = [];
    if (this.branchesSelected){
      this.branchesSelected.forEach(branch => {
        const productionControl = this.formAddEnterprises.get('production' + branch.id);
        if (productionControl?.value != null) {
          for (const field of Object.keys(productionControl?.value)) {
            const productionVolume = productionControl?.value[field.toString()];
            const production: ProductionData = new ProductionData();
            production.productionId = Number(field);
            production.volume = productionVolume || 0;
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

