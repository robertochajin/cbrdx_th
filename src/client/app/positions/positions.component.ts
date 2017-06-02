import { Component, OnInit } from '@angular/core';
import { Positions } from '../_models/positions';
import { PositionsService } from '../_services/positions.service';
import { Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/primeng';
import { NavService } from '../_services/_nav.service';
import { PersonnelRequirement } from '../_models/personnelRequirement';
import { VacanciesService } from '../_services/vacancies.service';
import { ListaService } from '../_services/lista.service';
import { ListaItem } from '../_models/listaItem';
import { RequirementsAction } from '../_models/requirementsAction';
import { OrganizationalStructurePositionsServices } from '../_services/organizationalStructurePositions.service';
import { OrganizationalStructurePositions } from '../_models/organizationalStructurePositions';

@Component( {
               moduleId: module.id,
               templateUrl: 'positions.component.html',
               selector: 'positions-list',
               providers: [ ConfirmationService ]
            } )

export class PositionsComponent implements OnInit {

   position: Positions = new Positions();
   positions: Positions[];
   dialogObjet: Positions = new Positions();
   busqueda: string;
   newPosition: PersonnelRequirement[] = [];
   deletePosition: PersonnelRequirement[] = [];
   allEstados: ListaItem[] = [];
   allTipoSolicitud: ListaItem[] = [];
   cargoNuevo: number;
   cargoEliminar: number;
   cosntPerfil: number;
   eliminPerfil: number;
   aCerrar: number;
   requirementsAction: RequirementsAction[] = [];
   displayActions = false;
   displayPerson = false;
   cargoAElimiar: string;
   requirementAction: RequirementsAction = new RequirementsAction();
   organizationalStructurePositions: OrganizationalStructurePositions[];
   msg: Message;

   constructor( private positionsService: PositionsService,
      private router: Router,
      private navService: NavService,
      private confirmationService: ConfirmationService,
      private vacanciesService: VacanciesService,
      private OSPositionsServices: OrganizationalStructurePositionsServices,
      private listaService: ListaService ) {
      this.busqueda = this.navService.getSearch( 'positions.component' );

      this.listaService.getMasterDetails( 'ListasTiposSolicitudes' ).subscribe( res => {
         res.map( ( l: ListaItem ) => {
            this.allTipoSolicitud.push( l );
         } );
         this.cargoNuevo = this.allTipoSolicitud.find( c => c.codigo === "CRGNVO" ).idLista;
         this.cargoEliminar = this.allTipoSolicitud.find( c => c.codigo === "CRGELMN" ).idLista;
         this.listaService.getMasterDetails( 'ListasEstadosRequerimientos' ).subscribe( res => {
            res.map( ( l: ListaItem ) => {
               this.allEstados.push( l );
            } );
            this.cosntPerfil = this.allEstados.find( c => c.codigo === "CTRPER" ).idLista;
            this.eliminPerfil = this.allEstados.find( c => c.codigo === "PRCELIM" ).idLista;
            this.getData();
         } );
      } );
      this.listaService.getMasterDetails( 'ListasRequerimientosAcciones' ).subscribe( res => {
         res.map( ( l: ListaItem ) => {
            switch ( l.codigo ) {
               case 'CRRD':
                  this.aCerrar = l.idLista;
                  break;
            }
         } );
      } );

   }

   ngOnInit() {
      this.positionsService.getAll().subscribe(
         positions => {
            this.positions = positions;
         }
      );

   }

   del( positions: Positions ) {
      this.dialogObjet = positions;
      this.confirmationService.confirm( {
                                           message: ` ¿Esta seguro que lo desea eliminar?`,
                                           header: 'Corfirmación',
                                           icon: 'fa fa-question-circle',
                                           accept: () => {
                                              this.dialogObjet.indicadorHabilitado = false;
                                              this.positionsService.update( this.dialogObjet ).subscribe( r => {
                                                 this.positions.splice( this.positions.indexOf( this.dialogObjet ), 1 );
                                                 this.dialogObjet = null;
                                              } );
                                           },
                                           reject: () => {
                                              this.dialogObjet = null;
                                           }
                                        } );
   }

   detail( f: Positions ) {
      this.router.navigate( [ 'positions/detail/' + f.idCargo ] );
   }

   detailRequirement( id: number ) {
      this.router.navigate( [ 'position/requirement/detail/' + id ] );
   }

   add() {
      this.router.navigate( [ 'positions/add' ] );
   }

   update( c: Positions ) {
      this.router.navigate( [ 'positions/update/' + c.idCargo ] );
   }

   setSearch() {
      this.navService.setSearch( 'positions.component', this.busqueda );
   }

   getData() {
      this.newPosition = [];
      this.deletePosition = [];
      if ( this.cargoNuevo > 0 && this.cosntPerfil > 0 && this.eliminPerfil > 0 && this.cargoEliminar > 0 ) {
         this.vacanciesService.getNuevoCargo( this.cosntPerfil, this.cargoNuevo ).subscribe(
            newPosition => {
               newPosition.forEach( obj => {
                  this.newPosition.push( obj );
               } );
            }
         );
         this.vacanciesService.getNuevoCargo( this.eliminPerfil, this.cargoEliminar ).subscribe(
            deletePosition => {
               deletePosition.forEach( obj => {
                  this.deletePosition.push( obj );
               } );
            }
         );
      }
   }

   observations( pR: PersonnelRequirement ) {
      this.requirementsAction = [];
      this.vacanciesService.getActions( pR.idRequerimiento ).subscribe( acc => {
         this.requirementsAction = acc;
         this.displayActions = true;
      }, error => {
         let msg: Message;
         msg.severity = 'error';
         msg.detail = 'Falla';
         msg.summary = 'Imposible cargar la información';
      } );
   }

   addPosition( c: PersonnelRequirement ) {
      if(c.idCargo !== null && c.idCargo > 0){
         this.router.navigate( [ 'positions/update/' + c.idCargo ] );
      }else {
         this.router.navigate( [ 'positions/add/' + c.idRequerimiento ] );
      }
   }

   delPosition( c: PersonnelRequirement ) {
      this.cargoAElimiar = c.cargo;
      this.OSPositionsServices.check( c.idCargo ).subscribe( organizationalStructurePositions => {
         this.organizationalStructurePositions = organizationalStructurePositions;
         if(this.organizationalStructurePositions.length > 0){
            this.displayPerson = true;
         }else{
            this.displayPerson = false;
            this.confirmationService.confirm( {
                                                 message: ` ¿Esta seguro que lo desea eliminar el cargo?,recuerde que se deshabilitará para todos las las Areas`,
                                                 header: 'Corfirmación',
                                                 icon: 'fa fa-question-circle',
                                                 accept: () => {
                                                    this.requirementAction.idAccion = this.aCerrar;
                                                    this.requirementAction.idRequerimiento = c.idRequerimiento;
                                                    this.requirementAction.observacion = "Requerimiento de Eliminación Completado";
                                                    this.vacanciesService.setAction( this.requirementAction ).subscribe( requirementAction => {
                                                       this.navService.setMesage( 1, this.msg );
                                                       this.deletePosition.splice( this.deletePosition.indexOf( c ), 1 );
                                                    }, error => {
                                                       this.navService.setMesage( 3, this.msg );
                                                    } );
                                                 },
                                                 reject: () => {
                                                    this.requirementAction = new RequirementsAction();
                                                 }
                                              } );

         }
      });
   }
}
