import { Directive, ElementRef } from '@angular/core';
@Directive( {
              selector: '[lowerCaseText]',
              host: {
                 '(input)': 'ref.nativeElement.value=$event.target.value.toLowerCase()',
              }

           })
export class LowerCaseTextDirective {
   constructor(private ref: ElementRef) {
   }
}