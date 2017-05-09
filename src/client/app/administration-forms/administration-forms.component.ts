import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component( {
               moduleId: module.id,
               templateUrl: 'administration-forms.component.html',
            } )
export class AdministrationFormsComponent {

   constructor( private router: Router ) {
   }

   ngOnInit() {
   }
}
