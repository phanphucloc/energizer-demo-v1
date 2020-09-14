import { IProduction } from '../../abstract/enterprises.interface';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingOnElementDirective } from 'src/app/common/directive/loading-on-element.directive';
import { EnterprisesService } from '../../services/enterprises.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { BaseDestroyableDirective } from 'src/app/common/abstract/base-destroyable';
import { IBranches, IEnergyConsumption, IEnterprisesToServer, IFields } from '../../abstract/enterprises.interface';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { EnergyConsumption, EnterprisesToServer, Production } from '../../models/enterprises.model';

@Component({
  selector: 'app-form-enterprises',
  templateUrl: './form-declare-enterprises.component.html',
  styleUrls: ['./form-declare-enterprises.component.scss'],
})
export class FormDeclareEnterprisesComponent extends BaseDestroyableDirective implements OnInit {
  @ViewChild('loadingFormAdd', { static: true }) private elementLoadingFormAdd: LoadingOnElementDirective;
  @ViewChild('buttonSubmit') private elementButtonSubmit: LoadingOnElementDirective;
  @ViewChild('loadingFormProduction') private elementLoadingFormProduction: LoadingOnElementDirective;

  public formAddDMiningIndustry: FormGroup;
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

  public createForm(){
   this.formAddDMiningIndustry = new FormGroup({
      baseInfo: new FormGroup({
        name: new FormControl(),
        foundedYear: new FormControl(),
        address: new FormGroup({
          province: new FormControl(),
          district: new FormControl(),
          town: new FormControl(),
          xCoordinate: new FormControl(),
          yCoordinate: new FormControl(),
          productionValue: new FormControl(),
          employees: new FormControl(),
          branchesId: new FormControl()
        }),
      }),
    });
  }

  public loadData(){
    this.elementLoadingFormAdd.showLoadingCenter();
    forkJoin([
      this.enterprisesService.getListBranchesByFieldsId(1),
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

  public selectFields(): void{
    const branchesId = this.formAddDMiningIndustry?.value?.baseInfo?.address?.branchesId;
    if (!branchesId){
      this.branchesSelected = null;
      return;
    }

    this.branchesSelected = this.listBranches.find((branches) => {
       return branches.id === Number(branchesId);
    });

    this.formAddDMiningIndustry.removeControl('production');

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
    const valueFormatted =  this.formatDataSendSever();
    this.elementButtonSubmit.showLoadingCenter('16px', 'auto');
    this.enterprisesService
      .addMiningIndustry(valueFormatted)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {
          this.elementButtonSubmit.hideLoadingCenter();
          this.toastr.success('Thêm thành công', 'Thông báo');
          this.router.navigate(['/enterprises/list-enterprises']);
        },
        () => {
          this.elementButtonSubmit.hideLoadingCenter();
          this.toastr.error('Có lỗi xãy ra', 'Thông báo');
        }
      );
  }

  public cancel(): void{
    this.router.navigate(['/enterprises/list-enterprises']);
  }

  private addFieldsProductionForForm(listProduct: IProduction[]): void{
    const productionGroup: FormGroup = new FormGroup({});
    listProduct.forEach(product => {
      const productControl = new FormControl();
      productionGroup.addControl(product.name, productControl);
    });
    this.formAddDMiningIndustry.addControl('production', productionGroup);
    this.formAddDMiningIndustry.updateValueAndValidity();
  }

  private addFieldsEnergyConsumptionForForm(listEnergyConsumption: IEnergyConsumption[]): void{
    const energyConsumptionGroup: FormGroup = new FormGroup({});
    listEnergyConsumption.forEach(energyConsumption => {
      const energyConsumptionControl = new FormControl();
      energyConsumptionGroup.addControl(energyConsumption.name, energyConsumptionControl);
    });
    this.formAddDMiningIndustry.addControl('energyConsumption', energyConsumptionGroup);
    this.formAddDMiningIndustry.updateValueAndValidity();
    console.log(this.formAddDMiningIndustry.value);
  }

  private formatDataSendSever(): IEnterprisesToServer{
    const enterprises: EnterprisesToServer = new EnterprisesToServer();
    enterprises.name = this.formAddDMiningIndustry?.value?.baseInfo?.name;
    enterprises.foundedYear = this.formAddDMiningIndustry?.value?.baseInfo?.foundedYear;
    enterprises.province = this.formAddDMiningIndustry?.value?.baseInfo?.address?.province;
    enterprises.district = this.formAddDMiningIndustry?.value?.baseInfo?.address?.district;
    enterprises.town = this.formAddDMiningIndustry?.value?.baseInfo?.address?.town;
    enterprises.xCoordinate = this.formAddDMiningIndustry?.value?.baseInfo?.address?.xCoordinate;
    enterprises.yCoordinate = this.formAddDMiningIndustry?.value?.baseInfo?.address?.yCoordinate;
    enterprises.productionValue = this.formAddDMiningIndustry?.value?.baseInfo?.address?.productionValue;
    enterprises.employees = this.formAddDMiningIndustry?.value?.baseInfo?.address?.employees;
    enterprises.branchesId = this.formAddDMiningIndustry?.value?.baseInfo?.address?.branchesId;
    enterprises.branchesName = this.branchesSelected.name;

    const listEnergyConsumption: EnergyConsumption[] = [];
    if (this.formAddDMiningIndustry?.value?.energyConsumption != null){
      for (const field of Object.keys(this.formAddDMiningIndustry?.value?.energyConsumption)) {
        const energyConsumptionFormValue = this.formAddDMiningIndustry?.value?.energyConsumption[field];
        const energyConsumption: EnergyConsumption = new EnergyConsumption();
        energyConsumption.name = field;
        energyConsumption.value = energyConsumptionFormValue;
        listEnergyConsumption.push(energyConsumption);
     }
      enterprises.listEnergyConsumption = listEnergyConsumption;
    }

    const listProduction: Production[] = [];
    if (this.formAddDMiningIndustry?.value?.production != null){
      for (const field of Object.keys(this.formAddDMiningIndustry?.value?.production)) {
        const productionFormValue = this.formAddDMiningIndustry?.value?.production[field];
        const production: EnergyConsumption = new EnergyConsumption();
        production.name = field;
        production.value = productionFormValue;
        listProduction.push(production);
     }
      enterprises.listProduction = listProduction;
    }

    console.log(enterprises);
    return enterprises;
  }
}

