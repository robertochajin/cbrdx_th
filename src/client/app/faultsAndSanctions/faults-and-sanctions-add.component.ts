import 'rxjs/add/operator/switchMap';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FaultsAndSanctions } from '../_models/faultsAndSanctions';
import { SelectItem, Message, ConfirmationService } from 'primeng/primeng';
import { FaultsAndSanctionsService } from '../_services/faultsAndSanctions.service';
import { ListaItem } from '../_models/listaItem';
import { ListaService } from '../_services/lista.service';
import { NavService } from '../_services/_nav.service';
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
   msg: Message;

   constructor( private listaService: ListaService,
      private faultsAndSanctionsService: FaultsAndSanctionsService,
      private router: Router,
      private location: Location,
      private confirmationService: ConfirmationService,
      private navService: NavService ) {
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
      this.faultsAndSanctionsService.add( this.fault )
      .subscribe( data => {
         let typeMessage = 1; // 1 = Add, 2 = Update, 3 Error, 4 Custom
         this.navService.setMesage( typeMessage, this.msg );
         this.location.back();
      }, error => {
         let typeMessage = 3; // 1 = Add, 2 = Update, 3 Error, 4 Custom
         this.navService.setMesage( typeMessage, this.msg );
      } );
   }

    goBack(fDirty : boolean): void {

        if ( fDirty ){
            this.confirmationService.confirm( {
                message: ` ¿Está seguro que desea salir sin guardar?`,
                header: 'Confirmación',
                icon: 'fa fa-question-circle',
                accept: () => {
                    this.location.back();
                }
            } );
        }else {
            this.location.back();
        }
    }

   capitalize( event: any , specialChars: boolean) {
      let input = event.target.value;
      if(specialChars){
         event.target.value = (input.substring( 0, 1 ).toUpperCase()
                               + input.substring( 1 ).toLowerCase()).replace( /[^ÑA-Z0-9 /]/gi, '' );
      } else {
         event.target.value = input.substring( 0, 1 ).toUpperCase() + input.substring( 1 ).toLowerCase();
      }
   }

}
