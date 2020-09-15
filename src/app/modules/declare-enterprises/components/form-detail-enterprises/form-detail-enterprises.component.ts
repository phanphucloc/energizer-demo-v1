import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { EnterprisesService } from '../../services/enterprises.service';
import { LoadingOnElementDirective } from 'src/app/common/directive/loading-on-element.directive';
import { takeUntil } from 'rxjs/operators';
import { BaseDestroyableDirective } from 'src/app/common/abstract/base-destroyable';
import { IEnterprisesToServer, IBranches, IEnergyConsumption, IProduction } from '../../abstract/enterprises.interface';
import { forkJoin } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-detail-enterprises',
  templateUrl: './form-detail-enterprises.component.html',
  styleUrls: ['./form-detail-enterprises.component.scss']
})
export class FormDetailEnterprisesComponent extends BaseDestroyableDirective implements OnInit {
  @ViewChild('formDetail', { static: true }) private elementFormDetail: LoadingOnElementDirective;
  @ViewChild('loadingFormProduction') private elementLoadingFormProduction: LoadingOnElementDirective;

  @Input() public enterprisesId: number;
  @Input() public fieldsId: number;

  @Output() public cancelEmitter = new EventEmitter<void>();

  public formDetailEnterprises: FormGroup;
  public enterprises: IEnterprisesToServer;
  public listBranches: IBranches[];
  public branchesSelected: IBranches;
  public listEnergyConsumption: IEnergyConsumption[];

  constructor(
    private enterprisesService: EnterprisesService,
    private toastr: ToastrService,
  ) {
    super();
  }

  public ngOnInit(): void {
    this.loadData();
    this.createForm();
  }

  public createForm(): void{
    this.formDetailEnterprises = new FormGroup({
      baseInfo: new FormGroup({
        name: new FormControl(
          { value: '', disabled: true },
          Validators.required
        ),
        foundedYear: new FormControl(
          { value: '2020', disabled: true },
          Validators.required
        ),
        address: new FormGroup({
          province: new FormControl(
            { value: '', disabled: true },
            Validators.required
          ),
          district: new FormControl(
            { value: '', disabled: true },
            Validators.required
          ),
          town: new FormControl(
            { value: '', disabled: true },
            Validators.required
          ),
          xCoordinate: new FormControl(
            { value: '', disabled: true },
            Validators.required
          ),
          yCoordinate: new FormControl(
            { value: '', disabled: true },
            Validators.required
          ),
          productionValue: new FormControl(
            { value: '', disabled: true },
            Validators.required
          ),
          employees: new FormControl(
            { value: '', disabled: true },
            Validators.required
          ),
          branchesId: new FormControl(
            { value: null, disabled: true },
            Validators.required
          ),
        }),
      }),
    });
   }

   public loadData(){
     this.elementFormDetail.showLoadingCenter();
     forkJoin([
       this.enterprisesService.getEnterprisesById(this.enterprisesId),
       this.enterprisesService.getListBranchesByFieldsId(this.fieldsId),
       this.enterprisesService.getListEnergyConsumption(),
     ])
       .pipe(takeUntil(this.destroy$))
       .subscribe(
         (result) => {
            this.enterprises = result[0];
            this.fetchBaseData();

            const listBranches: IBranches[] = result[1];
            this.listBranches = listBranches;

            const listEnergyConsumption: IEnergyConsumption[] = result[2];
            this.listEnergyConsumption = listEnergyConsumption;
            this.addFieldsEnergyConsumptionForForm(listEnergyConsumption);

            this.branchesSelected  = listBranches.find((branches) => {
              return branches.id === Number(result[0].branchesId);
            });
            this.getFieldsProductionForForm(this.branchesSelected.id);

            this.elementFormDetail.hideLoadingCenter();
         },
         (error) => {
           this.toastr.error('Có lỗi xãy ra', 'Thông báo');
           this.elementFormDetail.hideLoadingCenter();
         }
       );
   }

  public cancel(): void{
    this.cancelEmitter.emit();
  }

  private fetchBaseData(): void{
    this.formDetailEnterprises.patchValue({
      baseInfo: {
        name: this.enterprises.name,
        foundedYear: this.enterprises.foundedYear,
        address: {
          province: this.enterprises.province,
          district: this.enterprises.district,
          town: this.enterprises.town,
          xCoordinate: this.enterprises.xCoordinate,
          yCoordinate: this.enterprises.yCoordinate,
          productionValue: this.enterprises.productionValue,
          employees: this.enterprises.employees,
          branchesId: this.enterprises.branchesId
        },
      },
     });
  }

  private getFieldsProductionForForm(branchesId: number): void{
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

  private addFieldsProductionForForm(listProduct: IProduction[]): void{
    const productionGroup: FormGroup = new FormGroup({});

    listProduct.forEach(production => {

      const value = this.enterprises.listProduction.find((productionData) => {
        return production.name === productionData.name;
     }).value;

      const productControl = new FormControl({value, disabled: true}, Validators.required);
      productionGroup.addControl(production.name, productControl);

    });

    this.formDetailEnterprises.addControl('production', productionGroup);
  }

  private addFieldsEnergyConsumptionForForm(listEnergyConsumption: IEnergyConsumption[]): void{
    const energyConsumptionGroup: FormGroup = new FormGroup({});

    listEnergyConsumption.forEach(energyConsumption => {

      const value = this.enterprises.listEnergyConsumption.find((energyConsumptionData) => {
         return energyConsumptionData.name === energyConsumption.name;
      }).value;

      const energyConsumptionControl = new FormControl({value, disabled: true}, Validators.required);
      energyConsumptionGroup.addControl(energyConsumption.name, energyConsumptionControl);

    });

    this.formDetailEnterprises.addControl('energyConsumption', energyConsumptionGroup);
  }


}
