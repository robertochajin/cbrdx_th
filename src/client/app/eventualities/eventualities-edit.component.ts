import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SelectItem, ConfirmationService } from 'primeng/primeng';
import { Location } from '@angular/common';
import { NavService } from '../_services/_nav.service';
import { ListaService } from '../_services/lista.service';
import { RolesService } from '../_services/roles.service';
import { ListaItem } from '../_models/listaItem';
import { EventualityServices } from '../_services/eventuality.service';
import { Eventuality } from '../_models/eventuality';
import { Rol } from '../_models/rol';
import { EventualityRoles } from '../_models/eventualityRoles';
import { EventualityRolesServices } from '../_services/eventualityRoles.service';

@Component( {
               moduleId: module.id,
               selector: 'eventualities-edit',
               templateUrl: 'eventualities-edit.component.html'
            } )
export class EventualitiesEditComponent implements OnInit {

   private eventuality: Eventuality = new Eventuality();
   public eventualityTypes: SelectItem[] = [];
   public thirdStates: SelectItem[] = [];
   public affectationTypes: SelectItem[] = [];
   public eventualityStates: SelectItem[] = [];
   public roles: SelectItem[] = [];
   public rolesToReport: SelectItem[] = [];
   public reportRol: number;
   public savingReportRol = false;
   public listReportRoles: EventualityRoles[] = [];
   public disabledReportRoles: EventualityRoles[] = [];

   constructor( private listaService: ListaService,
      private router: Router,
      private route: ActivatedRoute,
      private rolesService: RolesService,
      private location: Location,
      private confirmationService: ConfirmationService,
      private eventualityServices: EventualityServices,
      private eventualityRolesServices: EventualityRolesServices,
      private _nav: NavService ) {
   }

   ngOnInit() {

      this.listaService.getMasterDetails( 'ListasTiposNovedades' ).subscribe( res => {
         this.eventualityTypes.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => this.eventualityTypes.push( { label: s.nombre, value: s.idLista } ) );
      } );

      this.listaService.getMasterDetails( 'ListasEstadosTerceros' ).subscribe( res => {
         this.thirdStates.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => this.thirdStates.push( { label: s.nombre, value: s.idLista } ) );
      } );

      this.listaService.getMasterDetails( 'ListasTiposAfectaciones' ).subscribe( res => {
         this.affectationTypes.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => this.affectationTypes.push( { label: s.nombre, value: s.idLista } ) );
      } );

      this.listaService.getMasterDetails( 'ListasEstadosNovedades' ).subscribe( res => {
         this.eventualityStates.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => this.eventualityStates.push( { label: s.nombre, value: s.idLista } ) );
      } );

      this.rolesService.listRoles().subscribe( res => {
         this.roles.push( { label: 'Seleccione', value: null } );
         this.rolesToReport.push( { label: 'Seleccione', value: null } );
         res.map( ( s: Rol ) => {
            this.roles.push( { label: s.rol, value: s.idRol } );
            this.rolesToReport.push( { label: s.rol, value: s.idRol } );
         } );

         this.route.params.subscribe( ( params: Params ) => {
            if ( params[ 'idEventuality' ] ) {
               this.eventualityServices.get( +params[ 'idEventuality' ] ).subscribe( obj => {
                  this.eventuality = obj;
                  this.eventualityRolesServices.getAllByEventuality( this.eventuality.idNovedad ).subscribe( rRoles => {
                     rRoles.map( rr => {
                        if(rr.indicadorHabilitado){
                           this.rolesToReport.splice(this.rolesToReport.findIndex(r => r.value === rr.idRol ), 1);
                           this.listReportRoles.push(rr);
                        } else {
                           this.disabledReportRoles.push(rr);
                        }
                     });
                  });
               } );
            } else {
               this.eventuality = new Eventuality();
            }
         } );
      } );
   }

   onSubmit() {
      if ( this.eventuality.idNovedad !== undefined && this.eventuality.idNovedad !== null ) {
         this.eventualityServices.update( this.eventuality ).subscribe( res => {
            if ( res ) {
               this._nav.setMesage( 2 );
            }
         }, ( error ) => {
            this._nav.setMesage( 3 );
         } );
      } else {
         this.eventualityServices.add( this.eventuality ).subscribe( res => {
            this.eventuality = res;
            this._nav.setMesage( 1 );
         }, ( error ) => {
            this._nav.setMesage( 3 );
         } );
      }
   }

   onSubmitRoles() {
      this.savingReportRol = true;
      let foundRol = this.disabledReportRoles.find(drr => drr.idRol === this.reportRol);
      let selectedRol = this.rolesToReport.find(rtr => rtr.value === this.reportRol);
      if( foundRol !== undefined ){
         foundRol.indicadorHabilitado = true;
         this.eventualityRolesServices.update(foundRol).subscribe(res => {
            this.rolesToReport.splice(this.rolesToReport.indexOf(selectedRol), 1);
            this.listReportRoles.push(foundRol);
            this.savingReportRol = false;
            this._nav.setMesage( 2 );
         }, ( error ) => {
            this._nav.setMesage( 3 );
         } );
      } else {
         let newRol : EventualityRoles = new EventualityRoles();
         newRol.idNovedad = this.eventuality.idNovedad;
         newRol.rol = selectedRol.label;
         newRol.idRol = selectedRol.value;
         this.eventualityRolesServices.add(newRol).subscribe(res => {
            this.rolesToReport.splice(this.rolesToReport.indexOf(selectedRol), 1);
            res.rol = selectedRol.label;
            this.listReportRoles.push(res);
            this.savingReportRol = false;
            this._nav.setMesage( 1 );
         }, ( error ) => {
            this._nav.setMesage( 3 );
         });
      }
   }

   delReportRol( rRol: EventualityRoles ) {
      this.confirmationService.confirm( {
                                           message: ` ¿Está seguro que desea inhabilitar este registro?`,
                                           header: 'Confirmación',
                                           icon: 'fa fa-question-circle',
                                           accept: () => {
                                              rRol.indicadorHabilitado = false;
                                              this.eventualityRolesServices.update( rRol ).subscribe( res => {
                                                 this.listReportRoles.splice( this.listReportRoles.indexOf( rRol ), 1 );
                                                 this.rolesToReport.push( { label: rRol.rol, value: rRol.idRol } );
                                                 this.disabledReportRoles.push(rRol);
                                              } );
                                           }
                                        } );
   }

   goBack( fDirty: boolean ): void {
      if ( fDirty ) {
         this.confirmationService.confirm( {
                                              message: ` ¿Está seguro que desea salir sin guardar?`,
                                              header: 'Confirmación',
                                              icon: 'fa fa-question-circle',
                                              accept: () => {
                                                 this.router.navigate( [ 'eventualities' ] );
                                              }
                                           } );
      } else {
         this.router.navigate( [ 'eventualities' ] );
      }
   }
}