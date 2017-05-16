import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActividadEconomicaService } from '../_services/actividadEconomica.service';
import { Message, SelectItem } from 'primeng/primeng';
import { NavService } from '../_services/_nav.service';
import { Employee } from '../_models/employees';

@Component( {
               moduleId: module.id,
               templateUrl: 'assignment-professional-component.html',
               selector: 'assignment-professional'
            } )
export class AssignmentProfessionalComponent {

   msg: Message;
   employee: Employee = new Employee();

   constructor( private router: Router,
      private actividadEconomicaService: ActividadEconomicaService,
      private navService: NavService ) {

   }

   goBack(): void {
   }

   save() {

   }

}

