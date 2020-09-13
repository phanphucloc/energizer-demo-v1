import { listMenu } from './../../data/list-menu';
import { takeUntil } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { BaseDestroyableDirective } from '../../abstract/base-destroyable';
import { AuthService } from '../../services/auth.service';
import { LayoutService } from '../../services/layout.service';
import { INavData } from '@coreui/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent extends BaseDestroyableDirective implements OnInit {
  public sidebarMinimized = false;
  public listMenu = listMenu;

  constructor(private authService: AuthService, private layoutService: LayoutService) {
    super();
  }

  public ngOnInit(): void {
  }

  // public getListFields() {
  //   let listMenu: INavData[] = [
  //     {
  //       title: true,
  //       name: 'Khai báo'
  //     }
  //   ];

  //   this.layoutService
  //     .getListFields()
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe((result) => {
  //       let itemMenu: INavData = {
  //         name: result.name,
  //         url: '/mining-industry/list-mining-industry',
  //         icon: 'icon-book-open'
  //       };
  //     });
  // }


  public toggleMinimize(e: boolean): void {
    this.sidebarMinimized = e;
  }

  public logout() {
    this.authService.logout();
  }
}
