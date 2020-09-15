import { IEnterprises } from '../../abstract/enterprises.interface';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseDestroyableDirective } from 'src/app/common/abstract/base-destroyable';
import { EnterprisesService } from '../../services/enterprises.service';
import { takeUntil } from 'rxjs/operators';
import { LoadingOnElementDirective } from 'src/app/common/directive/loading-on-element.directive';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-enterprises',
  templateUrl: './list-enterprises.component.html',
  styleUrls: ['./list-enterprises.component.scss'],
})
export class ListEnterprisesComponent extends BaseDestroyableDirective implements OnInit {
  @ViewChild('table', { static: true }) private elementTable: LoadingOnElementDirective;
  public fieldsId: number;
  public listEnterprises: IEnterprises[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private enterprisesService: EnterprisesService
    ) {
    super();
  }

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.listEnterprises = [];
      this.fieldsId = Number(params.fieldsId);
      this.getListMiningIndustry();
    });
  }

  public getListMiningIndustry() {
    this.elementTable.showLoadingCenter();
    this.enterprisesService
      .getListEnterprisesByFieldId(this.fieldsId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (result: IEnterprises[]) => {
          this.elementTable.hideLoadingCenter();
          this.listEnterprises = result;
        },
        (error) => {
          this.elementTable.hideLoadingCenter();
        }
      );
  }

  public redirectToEditPage(enterprisesId: number): void {
    this.router.navigate(['/enterprises/' + this.fieldsId + '/detail-enterprises/' + enterprisesId]);
  }

  public trackByFn(index: number, item: any): number {
    return item.id;
  }
}
