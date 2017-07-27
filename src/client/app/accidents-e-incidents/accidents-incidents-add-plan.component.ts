import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { SelectItem, Message, ConfirmationService } from 'primeng/primeng';
import { NavService } from '../_services/_nav.service';

@Component( {
               moduleId: module.id,
               selector: 'accidents-incidents-add-plan',
               templateUrl: 'accidents-incidents-add-plan.component.html',
               providers: [ ConfirmationService ]
            } )

export class AccidentIncidentAddPlanComponent implements OnInit {

   msgs: Message[] = [];
   listSupplies: SelectItem[] = [];
   es: any;
   minDateInicio: Date;
   minDateFin: Date;
   fechaFin: Date;
   fechaInicio: Date;
   rangeFin: string;

   constructor( private router: Router,
      private route: ActivatedRoute,
      private location: Location,
      private confirmationService: ConfirmationService,
      private _nav: NavService, ) {

   }

   ngOnInit() {
      this.es = {
         firstDayOfWeek: 1,
         dayNames: [ 'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado' ],
         dayNamesShort: [ 'dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb' ],
         dayNamesMin: [ 'D', 'L', 'M', 'X', 'J', 'V', 'S' ],
         monthNames: [ 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre',
            'diciembre'
         ],
         monthNamesShort: [ 'ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic' ]
      };
      let today = new Date();
      let year = today.getFullYear();
      let last40Year = year - 40;
      let next40Year = year + 40;
      this.minDateInicio = today;
      this.minDateFin = today;
      this.rangeFin = `${last40Year}:${next40Year}`;
   }

   onSubmit() {
   }

   capitalize( event: any ) {
      let input = event.target.value;
      event.target.value = input.substring( 0, 1 ).toUpperCase() + input.substring( 1 ).toLowerCase();
   }

   inputNumber( event: any ) {
      let input = event.target.value;
      event.target.value = input.toUpperCase().replace( /[^0-9]/g, '' );
   }


   goBack( fDirty: boolean ): void {

      if ( fDirty ) {
         this.confirmationService.confirm( {
                                              message: ` ¿Está seguro que desea salir sin guardar?`,
                                              header: 'Confirmación',
                                              icon: 'fa fa-question-circle',
                                              accept: () => {
                                              }
                                           } );
      } else {
      }
   }

}
