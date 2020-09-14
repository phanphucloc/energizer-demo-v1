import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingOnElementDirective } from 'src/app/common/directive/loading-on-element.directive';
import { MiningIndustryService } from '../../services/mining-industry.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { BaseDestroyableDirective } from 'src/app/common/abstract/base-destroyable';
import { IBranches, IEnergyConsumption, IFields, IProduct } from '../../abstract/mining-industry.interface';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { Fields } from 'src/app/common/models/field.model';

@Component({
  selector: 'app-form-add-declare-mining-industry',
  templateUrl: './form-add-declare-mining-industry.component.html',
  styleUrls: ['./form-add-declare-mining-industry.component.scss'],
})
export class FormAddDeclareMiningIndustryComponent extends BaseDestroyableDirective implements OnInit {
  @ViewChild('loadingFormAdd', { static: true }) private elementLoadingFormAdd: LoadingOnElementDirective;
  @ViewChild('buttonSubmit') private elementButtonSubmit: LoadingOnElementDirective;

  public formAddDMiningIndustry: FormGroup;
  public listBranches: IBranches[];
  public branchesSelected: IBranches;
  public listEnergyConsumption: IEnergyConsumption[];
  public listFields: IFields[];

  constructor(
    private router: Router,
    private miningIndustryService: MiningIndustryService,
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
          fieldsId: new FormControl()
        }),
      }),
    });
  }

  public loadData(){
    this.elementLoadingFormAdd.showLoadingCenter();
    forkJoin([
      this.miningIndustryService.getListBranchesByFieldsId(1),
      this.miningIndustryService.getListEnergyConsumption(),
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
    const fieldsId = this.formAddDMiningIndustry?.value?.baseInfo?.address?.fieldsId;
    if (!fieldsId){
      this.branchesSelected = null;
      return;
    }
    this.branchesSelected = this.listBranches.find((branches) => {
       return branches.id === Number(fieldsId);
    });
    this.elementLoadingFormAdd.showLoadingCenter();
    this.miningIndustryService
      .getListProductBranchesId(fieldsId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (result: IProduct[]) => {
          this.branchesSelected.listProduct = result;
          this.addFieldsProductionForForm(result);
          this.elementLoadingFormAdd.hideLoadingCenter();
        },
        () => {
          this.elementLoadingFormAdd.hideLoadingCenter();
        }
      );
  }

  public submit(): void {
    this.elementButtonSubmit.showLoadingCenter('16px', 'auto');
    this.miningIndustryService
      .addMiningIndustry()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {
          this.elementButtonSubmit.hideLoadingCenter();
          this.toastr.success('Thêm thành công', 'Thông báo');
          this.router.navigate(['/mining-industry/list-mining-industry']);
        },
        () => {
          this.elementButtonSubmit.hideLoadingCenter();
          this.toastr.error('Có lỗi xãy ra', 'Thông báo');
        }
      );
  }

  public cancel() {
    this.router.navigate(['/mining-industry/list-mining-industry']);
  }

  private addFieldsProductionForForm(listProduct: IProduct[]): void{
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
}
