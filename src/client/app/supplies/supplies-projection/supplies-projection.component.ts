import { Component, Input } from '@angular/core';
import { ConfirmationService } from 'primeng/components/common/api';
import { SelectItem, Message } from 'primeng/primeng';
import { ListaService } from '../../_services/lista.service';
import { NavService } from '../../_services/_nav.service';
import { Router } from '@angular/router';
import { SuppliesProjectionServices } from '../../_services/suppliesProjection.service';
import { SuppliesProjection } from '../../_models/suppliesProjection';

@Component( {
               moduleId: module.id,
               templateUrl: 'supplies-projection.component.html',
               selector: 'supplies-projection',
               providers: [ ConfirmationService ]
            } )
export class SuppliesProjectionComponent {

   msg: Message;
   suppliesProjection: SuppliesProjection = new SuppliesProjection();
   listSuppliesProjection: SuppliesProjection [];
   listUsers: SelectItem [];
   busqueda: string;
   idUsuario: number;
   es: any;
   minDateInicio: Date;
   minDateFin: Date;
   fechaFin: Date;
   fechaInicio: Date;
   rangeFin: string;

   constructor( private listaService: ListaService,
      private suppliesProjectionServices: SuppliesProjectionServices,
      private router: Router,
      private _nav: NavService,
      private confirmationService: ConfirmationService ) {
      this.busqueda = _nav.getSearch( 'supplies-projection' );
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
      this.suppliesProjectionServices.getAll().subscribe( data => {
         this.listSuppliesProjection = data;
      } );
   }

   changeUser() {

   }

   selectInicio() {
      this.fechaFin = null;
      let temp = new Date( this.fechaInicio );
      this.minDateFin = new Date( temp.setHours( 24 ) );
   }

   selectFinal() {
   }
   add(){
      this.router.navigate( [ 'supplies-projection/add' ] );
   }

}
