import { Component, OnInit } from '@angular/core';
import { RolesService } from '../_services/roles.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { NavService } from '../_services/_nav.service';
import { VacanciesService } from '../_services/vacancies.service';
import { ListaService } from '../_services/lista.service';
import { Message, SelectItem } from 'primeng/primeng';
import { JwtHelper } from 'angular2-jwt';
import moment = require('moment');
import { CandidateProgress } from '../_models/candidateProgress';
import { CandidateProcessService } from '../_services/candidate-process.service';
import { SelectionStep } from '../_models/selectionStep';
import { PublicationsService } from '../_services/publications.service';
import { Publications } from '../_models/publications';
import { SelectionStepService } from '../_services/selection-step.service';
import { UsuariosService } from '../_services/usuarios.service';
import { VUsuarioRol } from '../_models/vUsuarioRol';
import { PersonnelRequirementServices } from '../_services/personnelRequirement.service';
import { PersonnelRequirement } from '../_models/personnelRequirement';
import { VPersonnelRequirement } from '../_models/vPersonnelRequirement';
import { Location } from '@angular/common';

@Component( {
               moduleId: module.id,
               templateUrl: 'candidates.component.html',
               styleUrls: [ 'candidates.component.css' ],

            } )
export class CandidatesComponent implements OnInit {

   msgs: Message[] = [];
   jwtHelper: JwtHelper = new JwtHelper();
   usuarioLogueado: any;
   private busqueda: string;
   public candidates: CandidateProgress[] = [];
   public steps: SelectionStep[] = [];
   publication: Publications = new Publications();
   vPersonnelRequirement: VPersonnelRequirement = new VPersonnelRequirement();
   personnelRequirement: PersonnelRequirement = new PersonnelRequirement();
   private userRoles: VUsuarioRol[] = [];
   viewpostulations: boolean = false;
   idTercero: number = 0;
   numeroVacantes: number;
   showCloseReq: boolean= true;

   constructor( private rolesService: RolesService,
      private userService: UsuariosService,
      private route: ActivatedRoute,
      private router: Router,
      private navService: NavService,
      private location: Location,
      private publicationsService: PublicationsService,
      private candidateProcessService: CandidateProcessService,
      private personnelRequirementServices: PersonnelRequirementServices,
      private listaService: ListaService,
      private selectionStepService: SelectionStepService ) {

      this.busqueda = this.navService.getSearch( 'candidates.component' );

      let token = localStorage.getItem( 'token' );
      if ( token !== null ) {
         this.usuarioLogueado = this.jwtHelper.decodeToken( token );

         this.route.params.subscribe( ( params: Params ) => {

            // consultamos el rol del usuario de Talento humano para
            // determinar si el usuario tiene acceso a todos los pasos
            userService.readUserRoles( this.usuarioLogueado.usuario.idUsuario ).subscribe( roles => {
               this.userRoles = roles;

               this.publicationsService.getById( params[ 'idPublication' ] ).subscribe( publication => {
                  this.publication = publication;
                  this.personnelRequirementServices.getByIdRequirement( this.publication.idRequerimiento ).subscribe( data => {
                     this.numeroVacantes = data.cantidadVacantes;
                     this.vPersonnelRequirement = data;
                     this.listaService.getMasterDetails( 'ListasEstadosRequerimientos' ).subscribe( x => {
                        if ( x.find( c => c.idLista === this.vPersonnelRequirement.idEstado ).codigo ==='CRRD' ) {
                           this.showCloseReq = false;
                        }
                     } );

                  } );

                  this.selectionStepService.getAllByProcessAndType( this.publication.idProceso, this.publication.formaReclutamiento )
                  .subscribe( steps => {
                     this.steps = steps;
                     this.candidateProcessService.getCandidatesByPublication( params[ 'idPublication' ] )
                     .subscribe( candidates => {
                        this.candidates = candidates;
                     } );
                  } );

               } );

            } );
         } );

      }
   }

   ngOnInit() {

   }

   //Redirecciona a la pantalla dependiendo del paso y del rol del usuario
   redirecStep( step: CandidateProgress, idStep: number, btn: string ) {
      let myStep = step.pasos.find( s => s.idProcesoPaso === idStep );
      if ( this.userRoles.find( r => r.rol === 'ROLE_PROCESOSELECCION' )
           || (myStep !== undefined && myStep.idResponsable === this.usuarioLogueado.usuario.idUsuario) ) {
         if ( myStep.interfazInterna ) {
            // *Revision*
            // selection-process/process-step/candidate-revision/:idStep/terceroPublication/:idTerceroPublication/process/:idProceso
            // *Central de riesgos*
            // selection-process/process-step/:idStep/centralRisk/terceroPublication/:idTerceroPublication/process/:idProceso
            // *CallReferences*
            // selection-process/process-step/call-reference/:idStep/terceroPublication/:idTerceroPublication/process/:idProceso
            // *PruebasTecnicas*
            // selection-process/process-step/candidate-test/:idStep/terceroPublication/:idTerceroPublication/process/:idProceso *Examen
            // medico* selection-process/process-step/medical-exam/:idStep/terceroPublication/:idTerceroPublication/process/:idProceso
            // *Contratacion*
            // selection-process/process-step/contracting/:idStep/terceroPublication/:idTerceroPublication/process/:idProceso

            this.router.navigate(
               [ myStep.interfazInterna.replace( ':idStep', myStep.idProcesoPaso.toString() )
               .replace( ':idTerceroPublication', step.idTerceroPublicacion.toString() )
               .replace( ':idProceso', myStep.idProcesoSeleccion ? myStep.idProcesoSeleccion.toString() : '0' )
               ] );
         } else {
            let stepProcessUrl = 'selection-process/process-step/' + idStep.toString() + '/terceroPublication/' + step.idTerceroPublicacion.toString();
            if ( myStep.idProcesoSeleccion ) {
               stepProcessUrl += '/process/' + myStep.idProcesoSeleccion.toString();
            } else {
               stepProcessUrl += '/process/0';
            }
            this.router.navigate(
               [ stepProcessUrl ] );
         }
      }
   }

   // define si se debe deshabilitar ese botón dependiendo del estado del paso y del rol del usuario que visualiza
   isStepDisabled( step: CandidateProgress, idStep: number ): boolean {
      let myStep = step.pasos.find( s => s.idProcesoPaso === idStep );
      if ( this.userRoles.find( r => r.rol === 'ROLE_PROCESOSELECCION' ) ) {
         return false;
      } else if ( myStep !== undefined && myStep.idResponsable === this.usuarioLogueado.usuario.idUsuario ) {
         return false;
      } else {
         return true;
      }
   }

   // define si se debe pintar ese botón dependiendo del estado del paso y del rol del usuario que visualiza
   draw( step: CandidateProgress, idStep: number, btn: string ): boolean {
      let myStep = step.pasos.find( s => s.idProcesoPaso === idStep );
      if ( myStep !== undefined ) {
         if ( (myStep.codigoEstadoDiligenciado === btn || (myStep.codigoEstadoDiligenciado === null && btn === 'VAC')) ) {
            return true;
         } else {
            return false;
         }
      } else {
         return false;
      }
   }

   viewHistory( id: number ) {
      this.idTercero = id;
      this.viewpostulations = !this.viewpostulations;
   }

   toogleHistory() {
      this.viewpostulations = !this.viewpostulations;
   }

   cerrarProceso() {
      this.personnelRequirementServices.closeRequirement( this.publication.idRequerimiento ).subscribe( data => {
         this.personnelRequirement = data;
         this.location.back();
      } );
   }

   setSearch() {
      this.navService.setSearch( 'selection-process.component', this.busqueda );
   }
}
