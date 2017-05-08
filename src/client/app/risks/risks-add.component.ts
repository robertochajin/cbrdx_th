import { Component, OnInit } from '@angular/core';
import { Risks } from '../_models/risks';
import { RisksService } from '../_services/risks.service';
import { Router } from '@angular/router';
import { ConfirmationService, Message, SelectItem } from 'primeng/primeng';
import { Location } from '@angular/common';

@Component( {
               moduleId: module.id,
               templateUrl: 'risks-form.component.html',
               selector: 'risks-list',
               providers: [ ConfirmationService ]
            } )

export class RisksAddComponent implements OnInit {

   risk: Risks = new Risks();
   risks: Risks[] = [];
   listTypeRisks: SelectItem[] = [];
   listSubTypeRisks: SelectItem[] = [];
   header = 'Agregando Riesgo';
   dialogObjet: Risks = new Risks();
   habilitado: boolean;
   msgs: Message[] = [];

   constructor( private risksService: RisksService,
      private router: Router,
      private location: Location,
      private confirmationService: ConfirmationService ) {
   }

   ngOnInit() {
      this.risksService.getTypeRisks().subscribe( rest => {
         this.listTypeRisks.push( { label: 'Seleccione...', value: null } );
         for ( let dp of rest ) {
            this.listTypeRisks.push( {
                                        label: dp.riesgoTipo,
                                        value: dp.idRiesgoTipo
                                     } );
         }
      } );
      this.risk.riesgo = null;
   }

   onSubmit() {
      this.risksService.add( this.risk )
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

   changeType() {
      this.listSubTypeRisks = [];
      this.risksService.getSubTypeRisks().subscribe( rest => {
         this.listSubTypeRisks.push( { label: 'Seleccione...', value: null } );
         for ( let dp of rest ) {
            if ( dp.idRiesgoTipo === this.risk.idTipoRiesgo ) {
               this.listSubTypeRisks.push( {
                                              label: dp.riesgoSubTipo,
                                              value: dp.idRiesgoSubTipo
                                           } );
            }
         }
      } );
      ;
   }

}
