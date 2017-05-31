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
   vacancies: PersonnelRequirement[] = [];
   allEstados: ListaItem[] = [];
   allTipoSolicitud: ListaItem[] = [];
   cargoNuevo: number;
   cosntPerfil: number;
   requirementsAction: RequirementsAction[] = [];
   displayActions = false;


   constructor( private positionsService: PositionsService,
      private router: Router,
      private navService: NavService,
      private confirmationService: ConfirmationService,
      private vacanciesService: VacanciesService,
      private listaService: ListaService ) {
      this.busqueda = this.navService.getSearch( 'positions.component' );

      this.listaService.getMasterDetails( 'ListasTiposSolicitudes' ).subscribe( res => {
         res.map( ( l: ListaItem ) => {
            this.allTipoSolicitud.push( l );
         } );
         this.cargoNuevo = this.allTipoSolicitud.find( c => c.codigo === "CRGNVO" ).idLista;
         this.listaService.getMasterDetails( 'ListasEstadosRequerimientos' ).subscribe( res => {
            res.map( ( l: ListaItem ) => {
               this.allEstados.push( l );
            } );
            this.cosntPerfil = this.allEstados.find( c => c.codigo === "CTRPER" ).idLista;
            this.getData();
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
      this.vacancies = [];
      if ( this.cargoNuevo > 0 && this.cosntPerfil > 0 ) {
         this.vacanciesService.getNuevoCargo( this.cosntPerfil, this.cargoNuevo ).subscribe(
            vacancies => {
               vacancies.forEach( obj => {
                  this.vacancies.push( obj );
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

   newPosition( c: PersonnelRequirement ) {
      if(c.idCargo !== null && c.idCargo > 0){
         this.router.navigate( [ 'positions/update/' + c.idCargo ] );
      }else {
         this.router.navigate( [ 'positions/add/' + c.idRequerimiento ] );
      }
   }
}
