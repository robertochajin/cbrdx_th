import { Directive, ElementRef } from '@angular/core';
@Directive( {
               selector: '[uperCaseText]',
               host: {
                  '(input)': 'ref.nativeElement.value=$event.target.value.toUpperCase()',
               }

            } )
export class UperCaseTextDirective {
   constructor( private ref: ElementRef ) {
   }
}