import { Component, OnInit } from '@angular/core';
import { Risks } from '../_models/risks';
import { RisksService } from '../_services/risks.service';
import { Router } from '@angular/router';
import { ConfirmationService, Message, SelectItem } from 'primeng/primeng';
import { Location } from '@angular/common';
import { NavService } from '../_services/_nav.service';
@Component( {
               moduleId: module.id,
               templateUrl: 'risks-form.component.html',
               selector: 'risks-add',
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
   msg: Message;

   constructor( private risksService: RisksService,
      private router: Router,
      private location: Location,
      private confirmationService: ConfirmationService,
      private navService: NavService ) {
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
   }

}
