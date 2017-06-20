import { Component } from '@angular/core';
import { GruposGestion } from '../_models/gruposGestion';
import { GruposGestionService } from '../_services/grupoGestion.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as moment from 'moment/moment';
import { NavService } from '../_services/_nav.service';
import { Message } from 'primeng/primeng';
import { FormSharedModule } from '../shared/form-shared.module';

@Component( {
               moduleId: module.id,
               templateUrl: 'gruposGestion-edit.component.html',
               selector: 'gruposgestion-edit'
            } )
export class GruposGestionEditComponent {

   grupoGestion: GruposGestion = new GruposGestion();
   gruposGestion: GruposGestion[];
   codeExists = false;
   currentDate: Date = new Date( Date.now() );
   displayDialog = false;
   isRequired = false;
   isGreater = true;
   public es: any;
   msg: Message;

   constructor( private gruposGestionService: GruposGestionService, private router: Router, private route: ActivatedRoute,
      private navService: NavService ) {
      route.params.switchMap( ( params: Params ) => gruposGestionService.viewGruposGestion( +params[ 'id' ] ) )
      .subscribe( data => {
         this.grupoGestion = data;
         if ( this.grupoGestion.fechaInicio !== null ) {
            this.isRequired = true;
            this.grupoGestion.fechaInicio = moment( this.grupoGestion.fechaInicio, 'YYYY-MM-DD' ).toDate();
            this.grupoGestion.fechaFin = moment( this.grupoGestion.fechaFin, 'YYYY-MM-DD' ).toDate();
            this.validateGreater();
         }
         gruposGestionService.listGruposGestion().subscribe( res => {
            this.gruposGestion = res.filter( t => t.idGrupoGestion !== this.grupoGestion.idGrupoGestion );
         } );
      } );

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
   }

   clearSelection() {
      this.isRequired = false;
      this.isGreater = true;
      this.grupoGestion.fechaFin = null;
      this.grupoGestion.fechaInicio = null;
   }

   validateGreater() {
      if ( this.grupoGestion.fechaInicio !== null && this.grupoGestion.fechaFin !== null &&
           this.grupoGestion.fechaInicio < this.grupoGestion.fechaFin ) {
         this.isGreater = true;
      } else {
         this.isGreater = false;
      }
   }

   createGruposGestion() {
      this.gruposGestionService.updateGruposGestion( this.grupoGestion ).then( data => {
         this.router.navigate( [ 'gruposGestion' ] );
         let typeMessage = 2; // 1 = Add, 2 = Update, 3 Error, 4 Custom
         this.navService.setMesage( typeMessage, this.msg );
      } );
   }

   validateCode() {
      this.codeExists = this.gruposGestion.filter( t => t.codigoGrupoGestion === this.grupoGestion.codigoGrupoGestion ).length > 0;
   }

   inputCleanUp( value: string ) {
      this.grupoGestion.codigoGrupoGestion = value.toUpperCase().replace( /[^A-Z0-9]/gi, '' ).trim();
   }

   goBack(): void {
      this.router.navigate( [ 'gruposGestion' ] );
   }

   capitalizeName() {
      let input = this.grupoGestion.grupoGestion;
      if ( input !== '' && input !== null && input !== undefined ) {
         this.grupoGestion.grupoGestion = input.substring( 0, 1 ).toUpperCase() + input.substring( 1 ).toLowerCase();
      }
   }
}
