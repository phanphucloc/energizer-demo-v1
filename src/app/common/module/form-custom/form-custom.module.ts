import { NgModule } from '@angular/core';
import { OnlyInputNumberDirective } from '../../directive/input-only-number.directive';



@NgModule({
  exports: [OnlyInputNumberDirective],
  declarations: [OnlyInputNumberDirective],
})
export class FormCustomModule { }
