import { Component, OnInit } from '@angular/core';
import { Risks } from '../_models/risks';
import { RisksService } from '../_services/risks.service';
import { Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/primeng';
import { NavService } from '../_services/_nav.service';

@Component( {
               moduleId: module.id,
               templateUrl: 'risks-component.html',
               selector: 'risks-list',
               providers: [ ConfirmationService ]
            } )

export class RisksComponent implements OnInit {

   risk: Risks = new Risks();
   risks: Risks[] = [];
   dialogObjet: Risks = new Risks();
   habilitado: boolean;
   msgs: Message[] = [];
   busqueda: string;

   constructor( private risksService: RisksService,
      private router: Router,
      private navService:NavService,
      private confirmationService: ConfirmationService ) {
      this.busqueda = this.navService.getSearch( 'risks.component' );
   }

   ngOnInit() {
      this.risksService.getAll().subscribe(
         risks => {
            console.info(risks);
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
                                           message: ` ¿Está seguro que desea inactivar este registro?`,
                                           header: 'Confirmación',
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
         // this.msgs.push( { severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.' } );
         this.navService.setMesage(0,{severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.' });
      }, error => {
         // this.msgs.push( { severity: 'error', summary: 'Error', detail: 'Error al guardar.' } );
         this.navService.setMesage(0, {severity: 'error', summary: 'Error', detail: 'Error al guardar.'});
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
   setSearch() {
      this.navService.setSearch( 'risks.component', this.busqueda );
   }

}
