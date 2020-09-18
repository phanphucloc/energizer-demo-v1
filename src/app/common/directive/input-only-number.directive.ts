import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[appInputOnlyNumber]'
})
export class OnlyInputNumberDirective {

    constructor(private el: ElementRef) { }

    @HostListener('input', ['$event']) onInputChange(event) {
        const value = this.el.nativeElement.value;
        const valueFormatted = value.replace(/[^0-9]*/g, '');
        this.el.nativeElement.value = valueFormatted;
        if ((!valueFormatted || valueFormatted.trim() === '')){
            this.el.nativeElement.value = 0;
        }
        if (value !== this.el.nativeElement.value) {
            event.stopPropagation();
        }
    }
}
