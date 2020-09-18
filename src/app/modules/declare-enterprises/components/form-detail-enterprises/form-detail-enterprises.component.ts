import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { EnterprisesService } from '../../services/enterprises.service';
import { LoadingOnElementDirective } from 'src/app/common/directive/loading-on-element.directive';
import { takeUntil } from 'rxjs/operators';
import { BaseDestroyableDirective } from 'src/app/common/abstract/base-destroyable';
import {
  IEnterprisesToServer,
  IBranches,
  IEnergyData,
  IProductionData,
  IBranchesValue,
  IEnergy,
  IProduction,
} from '../../abstract/enterprises.interface';
import { forkJoin } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MESSAGE } from 'src/app/common/data/message';

@Component({
  selector: 'app-form-detail-enterprises',
  templateUrl: './form-detail-enterprises.component.html',
  styleUrls: ['./form-detail-enterprises.component.scss'],
})
export class FormDetailEnterprisesComponent extends BaseDestroyableDirective implements OnInit {
  @ViewChild('formDetail', { static: true })
  private elementFormDetail: LoadingOnElementDirective;
  @ViewChild('loadingFormProduction')
  private elementLoadingFormProduction: LoadingOnElementDirective;

  @Input() public enterprisesId: number;
  @Input() public fieldsId: number;

  @Output() public cancelEmitter = new EventEmitter<void>();

  public settingDropdown = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    enableCheckAll: false,
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: false,
  };
  public formDetailEnterprises: FormGroup;
  public enterprises: IEnterprisesToServer;
  public listBranches: IBranches[];
  public branchesSelected: IBranches[];
  public listEnergyConsumption: IEnergy[];

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

  public loadData() {
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

          const listEnergyConsumption: IEnergy[] = result[2];
          this.listEnergyConsumption = listEnergyConsumption;
          this.addFieldsEnergyConsumptionForForm(listEnergyConsumption);

          this.branchesSelected = this.enterprises.branches as IBranches[];
          this.addFieldsProductionForForm(this.branchesSelected);
          this.elementFormDetail.hideLoadingCenter();
        },
        () => {
          this.toastr.error(MESSAGE.ERROR, MESSAGE.NOTIFICATION);
          this.elementFormDetail.hideLoadingCenter();
        }
      );
  }

  public cancel(): void {
    this.cancelEmitter.emit();
  }

  private fetchBaseData(): void {
    this.formDetailEnterprises.patchValue({
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
  }

  private getFieldsProductionForForm(branchesIds: number[]): void {
    this.elementLoadingFormProduction.showLoadingCenter();
    this.enterprisesService
      .getListProductBranchesIds(branchesIds)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (resultListProduct: IProduction[]) => {
          this.branchesSelected.forEach((branch) => {
            const listProduct = resultListProduct.filter((resultProduct) => {
              return resultProduct.branchId === branch.id;
            });
            branch.listProduct = listProduct;
          });
          this.addFieldsProductionForForm(this.branchesSelected);
          this.elementLoadingFormProduction.hideLoadingCenter();
        },
        () => {
          this.toastr.error(MESSAGE.ERROR, MESSAGE.NOTIFICATION);
          this.elementLoadingFormProduction.hideLoadingCenter();
        }
      );
  }

  private addFieldsProductionForForm(listBranches: IBranches[]): void {
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
              { value: production.volume, disabled: true },
              Validators.required
            );

            productionGroup.addControl(
              production.productionId.toString(),
              productControl
            );

          }
        });
        this.formDetailEnterprises.addControl(
          'production' + branch.id,
          productionGroup
        );
      });
    }
  }

  private addFieldsEnergyConsumptionForForm(listEnergyConsumption: IEnergy[]): void {
    if (listEnergyConsumption) {
      const energyConsumptionGroup: FormGroup = new FormGroup({});
      listEnergyConsumption.forEach((energyConsumption) => {

        const energyConsumptionItem = this.enterprises.energies.find((energyConsumptionData) => {
            return energyConsumptionData.energyId === energyConsumption.id;
          }
        );

        let energyConsumptionControl: FormControl;
        if (energyConsumptionItem){
           energyConsumptionControl = new FormControl(
            { value: energyConsumptionItem.volume, disabled: true },
            Validators.required
          );
        }
        else{
            energyConsumptionControl = new FormControl(
            { value: 0, disabled: true },
            Validators.required
          );
        }

        energyConsumptionGroup.addControl(
          energyConsumption.id.toString(),
          energyConsumptionControl
        );
      });

      this.formDetailEnterprises.addControl(
        'energyConsumption',
        energyConsumptionGroup
      );
    }
  }
}
