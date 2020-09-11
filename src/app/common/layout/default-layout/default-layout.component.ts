import { Component, OnInit } from '@angular/core';
import { listMenu } from 'src/app/common/data/list-menu';
import { BaseDestroyableDirective } from '../../abstract/base-destroyable';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent extends BaseDestroyableDirective implements OnInit {
  public sidebarMinimized = false;
  public listMenu = listMenu;

  constructor(private authService: AuthService) {
    super();
  }

  public ngOnInit(): void {
  }

  public toggleMinimize(e: boolean): void{
    this.sidebarMinimized = e;
  }

  public logout(){
    this.authService.logout();
  }
}
