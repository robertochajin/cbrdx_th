import { Component, OnInit } from '@angular/core';
import { PersonnelRequirement } from '../_models/personnelRequirement';
import { PersonnelRequirementServices } from '../_services/personnelRequirement.service';
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import { Location } from '@angular/common';
import { ConfirmationService, Message } from 'primeng/primeng';
import { VacanciesService } from '../_services/vacancies.service';
import { RequirementsAction } from '../_models/requirementsAction';
import { NavService } from '../_services/_nav.service';
import { ListaService } from '../_services/lista.service';
import { ListaItem } from '../_models/listaItem';

@Component( {
               moduleId: module.id,
               templateUrl: 'personnel-requirement.component.html',
               selector: 'personnel-requirement',
               providers: [ ConfirmationService ]
            } )

export class PersonnelRequirementComponent implements OnInit {

   personnelRequirement: PersonnelRequirement = new PersonnelRequirement();
   dialogObjet: PersonnelRequirement = new PersonnelRequirement();
   personnelRequirements: PersonnelRequirement[];
   jwtHelper: JwtHelper = new JwtHelper();
   creationProccesState: ListaItem;
   revertedState: ListaItem;
   tokendecoded: any = { sub: '', usuario: '', nombre: '' };
   public requirementsAction: RequirementsAction[] = [];
   public displayActions = false;
   busqueda: string;

   constructor( private personnelRequirementServices: PersonnelRequirementServices,
      private location: Location,
      private vacanciesService: VacanciesService,
      private _nav: NavService,
      private listaService: ListaService,
      private router: Router,
      private confirmationService: ConfirmationService ) {
      this.busqueda = this._nav.getSearch( 'personnel-requirement.component' );

   }

   ngOnInit() {
      this.listaService.getMasterDetailsByCode( 'ListasEstadosRequerimientos', 'PRCREQ' ).subscribe( x => {
         this.creationProccesState = x
         this.listaService.getMasterDetailsByCode( 'ListasEstadosRequerimientos', 'DVLT' ).subscribe( x => {
            this.revertedState = x
            let token = localStorage.getItem( 'token' );

            if ( token !== null && token !== undefined ) {
               this.tokendecoded = this.jwtHelper.decodeToken( token );
            } else {
               this.location.back();
            }
            this.personnelRequirementServices.getAllEnabledByUser(this.tokendecoded.usuario.idUsuario).subscribe(
               personnelRequirements => {
                  this.personnelRequirements = personnelRequirements;
               }
            );
         } );
      } );
   }

   del( FaS: PersonnelRequirement ) {
      this.dialogObjet = FaS;
      this.confirmationService.confirm( {
                                           message: ` ¿Esta seguro que lo desea eliminar?`,
                                           header: 'Corfirmación',
                                           icon: 'fa fa-question-circle',
                                           accept: () => {
                                              this.personnelRequirementServices.update( this.dialogObjet ).subscribe( r => {
                                                 this.personnelRequirements.splice( this.personnelRequirements.indexOf( this.dialogObjet ), 1 );
                                                 this.dialogObjet = null;
                                              } );
                                           },
                                           reject: () => {
                                              this.dialogObjet = null;
                                           }
                                        } );
   }

   add() {
      this.router.navigate( [ 'personnel-requirement/add' ] );
   }

   update( FaS: PersonnelRequirement ) {
      this.router.navigate( [ 'personnel-requirement/update/' + FaS.idRequerimiento ] );
   }

   detail( FaS: PersonnelRequirement ) {
      this.router.navigate( [ 'personnel-requirement/detail/' + FaS.idRequerimiento ] );
   }

   observations(pR: PersonnelRequirement) {
      this.requirementsAction = [];
      this.vacanciesService.getActions(pR.idRequerimiento).subscribe(acc => {
         this.requirementsAction = acc;
         this.displayActions = true;
      }, error => {
         let msg: Message;
         msg.severity = 'error';
         msg.detail = 'Falla';
         msg.summary = 'Imposible cargar la información';
         this._nav.setMesage( 4, msg );
      });
   }
   setSearch() {
      this._nav.setSearch( 'personnel-requirement.component', this.busqueda );
   }

}
