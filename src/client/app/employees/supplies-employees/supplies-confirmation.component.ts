import { Component, Input } from '@angular/core';
import { EmployessSuppliesServices } from '../../_services/employeesSupplies.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { ConfirmationService, Message, SelectItem } from 'primeng/primeng';
import { NavService } from '../../_services/_nav.service';

import { ListaService } from '../../_services/lista.service';
import { ListaItem } from '../../_models/listaItem';
import { EmployessSuppliesProjection } from '../../_models/employessSuppliesProjection';
import { EmployessSuppliesProjectionSupply } from '../../_models/employessSuppliesProjectionSupply';

@Component( {
               moduleId: module.id,
               templateUrl: 'supplies-confirmation.component.html',
               selector: 'supplies-employees-confirmation-component',
               providers: [ ConfirmationService, EmployessSuppliesServices ]
            } )

export class SuppliesConfirmationComponent {

   confirmation: EmployessSuppliesProjection = new EmployessSuppliesProjection();
   confirmationDotaciones: EmployessSuppliesProjectionSupply[] = [];
   showForm: boolean = false;
   msgs: Message[] = [];
   reason: SelectItem[] = [];
   respuestasCheckbox: any[] = [];

   constructor( private employessSuppliesServices: EmployessSuppliesServices,
      private route: ActivatedRoute,
      private router: Router,
      private confirmationService: ConfirmationService,
      private navService: NavService,
      private listaService: ListaService ) {

      this.route.params
      .switchMap( ( params: Params ) => this.employessSuppliesServices.getEmployeeProjection( +params[ 'id' ] ) )
      .subscribe( res => {
         this.confirmation = res;
         this.employessSuppliesServices.getByProjectionByEmployees( res.idProyeccionDotacion, res.idTercero ).subscribe( obj => {
            this.confirmationDotaciones = obj;
         } );
      } );

      listaService.getMasterDetails( 'ListasMotivosInsatisfecho' ).subscribe( res => {
         this.reason.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.reason.push( { label: s.nombre, value: s.idLista } );
         } );
      } );
   }

   conform() {
      this.confirmationService.confirm( {
                                           message: ` ¿Está seguro que desea confirmar?`,
                                           header: 'Confirmación',
                                           icon: 'fa fa-question-circle',
                                           accept: () => {
                                              this.confirmation.indicadorSatisfecho = true;
                                              this.employessSuppliesServices.updateProjection( this.confirmation ).subscribe( res => {
                                                 this.navService.setMesage( 1, this.msgs );
                                                 this.router.navigate( [ '/dashboard' ] );
                                              }, error => {
                                                 this.navService.setMesage( 3, this.msgs );
                                              } );
                                           }
                                        } );
   }

   notConform() {
      this.showForm = true;
   }

   goBack( fDirty: boolean ): void {
      if ( fDirty ) {
         this.confirmationService.confirm( {
                                              message: ` ¿Está seguro que desea salir sin guardar?`,
                                              header: 'Confirmación',
                                              icon: 'fa fa-question-circle',
                                              accept: () => {
                                                 this.router.navigate( [ '/dashboard' ] );
                                              }
                                           } );
      } else {
         this.router.navigate( [ '/dashboard' ] );
      }
   }

   onSubmit() {
      this.confirmation.indicadorSatisfecho = false;
      this.employessSuppliesServices.updateProjection( this.confirmation ).subscribe( res => {
         this.employessSuppliesServices.updateProjectionSupplySatisfied( this.respuestasCheckbox ).subscribe( res => {
            this.navService.setMesage( 1, this.msgs );
            this.router.navigate( [ '/dashboard' ] );
         } );
      }, error => {
         this.navService.setMesage( 3, this.msgs );
      } );
   }

}
