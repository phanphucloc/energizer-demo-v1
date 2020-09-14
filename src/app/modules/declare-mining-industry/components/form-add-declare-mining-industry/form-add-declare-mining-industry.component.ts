import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingOnElementDirective } from 'src/app/common/directive/loading-on-element.directive';
import { MiningIndustryService } from '../../services/mining-industry.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { BaseDestroyableDirective } from 'src/app/common/abstract/base-destroyable';
import { IBranches, IResultAddMiningIndustry } from '../../abstract/mining-industry.interface';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup } from '@angular/forms';

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

  constructor(
    private router: Router,
    private miningIndustryService: MiningIndustryService,
    private toastr: ToastrService
  ) {
    super();
  }

  public ngOnInit(): void {
     this.createForm();
   }

  public createForm(): void{
    this.getProductFromFields();
  }

  public submit(): void {
    this.elementButtonSubmit.showLoadingCenter('16px', 'auto');
    this.miningIndustryService
      .addMiningIndustry()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (result: IResultAddMiningIndustry) => {
          this.elementButtonSubmit.hideLoadingCenter();
          this.toastr.success('Thêm thành công', 'Thông báo');
          this.router.navigate(['/mining-industry/list-mining-industry']);
        },
        (error) => {
          this.toastr.error('Có lỗi xãy ra', 'Thông báo');
          this.elementButtonSubmit.hideLoadingCenter();
        }
      );
  }

  public cancel() {
    this.router.navigate(['/mining-industry/list-mining-industry']);
  }

  private getProductFromFields(): void{
    this.elementLoadingFormAdd.showLoadingCenter();
    this.miningIndustryService
      .getListBranchesIndustryProductionOfFields(1)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (result: IBranches[]) => {
          this.elementLoadingFormAdd.hideLoadingCenter();
          this.addFieldsForForm(result);
        },
        (error) => {
          this.toastr.error('Có lỗi xãy ra', 'Thông báo');
          this.elementLoadingFormAdd.hideLoadingCenter();
        }
      );

  }

  private addFieldsForForm(listBranches: IBranches[]): void{
    const newGroups: FormGroup = new FormGroup({
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
        }),
      }),
    });

    listBranches.forEach(branches => {
      const newGroup: FormGroup = new FormGroup({});

      branches.listProduct.forEach(product => {
        const control = new FormControl();
        newGroup.addControl(product.name, control);
      });

      newGroups.addControl(branches.name, newGroup);
    });
    this.listBranches = listBranches;
    this.formAddDMiningIndustry = newGroups;
  }
}
