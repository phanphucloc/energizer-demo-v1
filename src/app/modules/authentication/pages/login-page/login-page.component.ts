import { Component, OnInit } from '@angular/core';
import { BaseDestroyableDirective } from 'src/app/common/abstract/base-destroyable';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent extends BaseDestroyableDirective implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
