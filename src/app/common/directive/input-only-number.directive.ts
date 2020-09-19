import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl, NgModel } from '@angular/forms';

@Directive({
    selector: '[appInputOnlyNumberForm]'
})
export class OnlyInputNumberFormDirective {

    constructor(private el: ElementRef, private control?: NgControl) { }

    @HostListener('input', ['$event']) onInputChange(event) {
        const value = this.el.nativeElement.value;
        const valueFormatted = value.replace(/[^0-9]*/g, '');
        this.control.control.patchValue(Number(valueFormatted));
        if ((!valueFormatted || valueFormatted.trim() === '')){
            this.control.control.patchValue(0);
        }
        if (value !== this.el.nativeElement.value) {
            event.stopPropagation();
        }
    }
}


@Directive({
    selector: '[appInputOnlyNumberModel]'
})
export class OnlyInputNumberModelDirective {

    constructor(private el: ElementRef, private model: NgModel) { }

    @HostListener('input', ['$event']) onInputChange(event) {
        const value = this.el.nativeElement.value;
        const valueFormatted = value.replace(/[^0-9]*/g, '');
        this.model.control.patchValue(Number(valueFormatted));
        if ((!valueFormatted || valueFormatted.trim() === '')){
            this.model.control.patchValue(0);
        }
        if (value !== this.el.nativeElement.value) {
            event.stopPropagation();
        }
    }
}
