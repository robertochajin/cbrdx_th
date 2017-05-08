import { Component } from '@angular/core';
import { Risks } from '../_models/risks';
import { RisksService } from '../_services/risks.service';
import { Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/primeng';

@Component( {
               moduleId: module.id,
               templateUrl: 'risks-component.html',
               selector: 'risks',
               providers: [ ConfirmationService ]
            } )

export class RisksComponent {

   risk: Risks = new Risks();
   risks: Risks[] = [];
   dialogObjet: Risks = new Risks();
   habilitado: boolean;
   msgs: Message[] = [];

   constructor( private risksService: RisksService,
      private router: Router,
      private confirmationService: ConfirmationService ) {
   }

   ngOnInit() {
      this.risksService.getAll().subscribe(
         risks => {
            for ( let r of risks ) {
               this.risksService.getTypeRiskById( r.idTipoRiesgo ).subscribe(
                  res => {
                     r.tipo = res.riesgoTipo;
                  } );
               this.risksService.getSubTypeRiskById( r.idSubTipoRiesgo ).subscribe(
                  res => {
                     r.subtipo = res.riesgoSubTipo;
                  } );
               this.risks.push( r );
            }
         }
      );

   }

   del( risks: Risks ) {
      this.dialogObjet = risks;
      this.confirmationService.confirm( {
                                           message: ` ¿Esta seguro que lo desea eliminar?`,
                                           header: 'Corfirmación',
                                           icon: 'fa fa-question-circle',
                                           accept: () => {
                                              this.dialogObjet.indicadorHabilitado = false;
                                              this.risksService.update( this.dialogObjet ).subscribe( r => {
                                                 this.risks.splice( this.risks.indexOf( this.dialogObjet ), 1 );
                                                 this.dialogObjet = null;
                                              } );
                                           },
                                           reject: () => {
                                              this.dialogObjet = null;
                                           }
                                        } );
   }

   change( r: Risks ) {
      this.risksService.update( r )
      .subscribe( data => {
         this.msgs.push( { severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.' } );
      }, error => {
         this.msgs.push( { severity: 'error', summary: 'Error', detail: 'Error al guardar.' } );
      } );
   }

   // detail(r: Risks) {
   //    this.router.navigate(['risks/detail/' + r.idRiesgo]);
   // }

   add() {
      this.router.navigate( [ 'risks/add' ] );
   }

   update( r: Risks ) {
      this.router.navigate( [ 'risks/update/' + r.idRiesgo ] );
   }

}
