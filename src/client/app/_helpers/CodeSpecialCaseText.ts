import { Directive, ElementRef } from '@angular/core';
@Directive( {
               selector: '[codeSpecialCaseText]',
               host: {
                  '(input)': 'ref.nativeElement.value=$event.target.value.toUpperCase()',
               }

            } )
export class CodeSpecialCaseTextDirective {
   constructor( private ref: ElementRef ) {
   }
}