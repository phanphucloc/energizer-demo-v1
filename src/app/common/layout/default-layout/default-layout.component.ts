import { listMenuReport } from './../../data/list-menu';
import { takeUntil } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { BaseDestroyableDirective } from '../../abstract/base-destroyable';
import { AuthService } from '../../services/auth.service';
import { LayoutService } from '../../services/layout.service';
import { INavData } from '@coreui/angular';
import { IFields } from 'src/app/modules/declare-enterprises/abstract/enterprises.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent extends BaseDestroyableDirective implements OnInit {
  public sidebarMinimized = false;
  public listMenu: INavData[] = [{
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW'
      }
  }];

  constructor(
    private authService: AuthService,
    private layoutService: LayoutService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.getListFields();
  }

  public getListFields() {
    this.layoutService
      .getListFields()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (listFields: IFields[]) => {
          this.updateMenu(listFields);
        },
        (err) => {
          console.error(err);
        }
      );
  }

  public toggleMinimize(e: boolean): void {
    this.sidebarMinimized = e;
  }

  public logout() {
    this.authService.logout();
  }

  public onActivate(event: Event) {
    window.scrollTo(0, 0);
  }

  private updateMenu(listFields: IFields[]){
    const titleMenuAdd: INavData = { title: true, name: 'Khai báo' };
    this.listMenu.push(titleMenuAdd);

    if (listFields) {
      listFields.forEach((fields) => {
        const itemMenuAdd: INavData = {
          name: fields.name,
          url: '/enterprises/' + fields.id + '/list-enterprises',
          icon: 'icon-book-open',
        };
        this.listMenu.push(itemMenuAdd);
      });
    }
    this.listMenu = [...this.listMenu, ...listMenuReport];
  }
}
