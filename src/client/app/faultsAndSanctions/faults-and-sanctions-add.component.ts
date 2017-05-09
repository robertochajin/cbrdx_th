import 'rxjs/add/operator/switchMap';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FaultsAndSanctions } from '../_models/faultsAndSanctions';
import { SelectItem, Message, ConfirmationService } from 'primeng/primeng';
import { FaultsAndSanctionsService } from '../_services/faultsAndSanctions.service';
import { ListaItem } from '../_models/listaItem';
import { ListaService } from '../_services/lista.service';

@Component( {
               moduleId: module.id,
               templateUrl: 'faults-and-sanctions-form.component.html',
               selector: 'faults-and-sanctions-form',
               providers: [ ConfirmationService ]
            } )

export class FaultsAndSanctionsAddComponent {
   @Input()

   fault: FaultsAndSanctions = new FaultsAndSanctions();
   header = 'Agregando Falta o Sanción';
   faultsTypes: SelectItem[] = [];
   faultsStatus: SelectItem[] = [];
   msgs: Message[] = [];

   constructor( private listaService: ListaService,
      private faultsAndSanctionsService: FaultsAndSanctionsService,
      private router: Router,
      private location: Location,
      private confirmationService: ConfirmationService ) {
      this.listaService.getMasterDetails( 'ListasTiposFaltas' ).subscribe( res => {
         this.faultsTypes.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.faultsTypes.push( { label: s.nombre, value: s.idLista } );
         } );
      } );
      this.listaService.getMasterDetails( 'ListasEstadosFaltas' ).subscribe( res => {
         this.faultsStatus.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.faultsStatus.push( { label: s.nombre, value: s.idLista } );
         } );
      } );
   }

     onSubmit() {
      this.msgs = [];
      this.faultsAndSanctionsService.add( this.fault )
      .subscribe( data => {
         this.msgs.push( { severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.' } );
         this.location.back();
      }, error => {
         this.msgs.push( { severity: 'error', summary: 'Error', detail: 'Error al guardar.' } );
      } );
   }

   goBack(): void {
      this.confirmationService.confirm( {
                                           message: ` ¿Esta seguro que desea salir sin guardar?`,
                                           header: 'Corfirmación',
                                           icon: 'fa fa-question-circle',
                                           accept: () => {
                                              this.location.back();
                                           }
                                        } );
   }

   capitalize( event: any ) {
      let input = event.target.value;
      event.target.value = input.substring( 0, 1 ).toUpperCase() + input.substring( 1 ).toLowerCase();
   }

}
