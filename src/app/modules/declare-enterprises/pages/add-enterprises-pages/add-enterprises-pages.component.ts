import { Component, OnInit } from '@angular/core';
import { Fields } from '../../models/enterprises.model';
import { EnterprisesService } from '../../services/enterprises.service';
import { takeUntil } from 'rxjs/operators';
import { BaseDestroyableDirective } from 'src/app/common/abstract/base-destroyable';
import { IFields } from '../../abstract/enterprises.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-enterprises-pages',
  templateUrl: './add-enterprises-pages.component.html',
  styleUrls: ['./add-enterprises-pages.component.scss']
})
export class AddEnterprisesPagesComponent extends BaseDestroyableDirective implements OnInit {
  public fieldsCurrent: Fields;

  constructor(
    private router: Router,
    private enterprisesService: EnterprisesService,
    private activatedRoute: ActivatedRoute,
  ) {
    super();
    this.fieldsCurrent = new Fields();
  }

  public ngOnInit(): void {
    this.fieldsCurrent.id = Number(this.activatedRoute.snapshot.paramMap.get('fieldsId'));
    this.getFieldsCurrent();
  }

  public cancel(): void {
    this.router.navigate(['/enterprises/' + this.fieldsCurrent.id + '/list-enterprises']);
  }

  public getFieldsCurrent(){
    this.enterprisesService.getFieldsByFieldsId(this.fieldsCurrent.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (result: IFields) => {
          this.fieldsCurrent.name = result.name.toLocaleLowerCase();
        },
        (error) => {
        }
      );
  }
}
