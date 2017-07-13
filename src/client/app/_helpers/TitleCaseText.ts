import { Directive, ElementRef } from '@angular/core';
@Directive( {
               selector: '[titleCaseText]',
               host: {
                  '(input)': 'ref.nativeElement.value=$event.target.value.substring(0,1).toUpperCase()+$event.target.value.substring(' +
                             ' 1 ).toLowerCase()',
               }
            } )
export class TitleCaseTextDirective {
   constructor( private ref: ElementRef ) {
   }
}