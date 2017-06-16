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

@Component( {
               moduleId: module.id,
               templateUrl: 'candidates.component.html'
            } )
export class CandidatesComponent implements OnInit {

   msgs: Message[] = [];
   jwtHelper: JwtHelper = new JwtHelper();
   usuarioLogueado: any;
   private busqueda: string;
   public candidates: CandidateProgress[] = [];
   public steps: SelectionStep[] = [];
   publication: Publications = new Publications();
   private userRoles: VUsuarioRol[] = [];

   constructor( private rolesService: RolesService,
      private userService: UsuariosService,
      private route: ActivatedRoute,
      private router: Router,
      private navService: NavService,
      private publicationsService: PublicationsService,
      private candidateProcessService: CandidateProcessService,
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
           || (myStep !== undefined && myStep.idResponsable === this.usuarioLogueado.usuario.idUsuario)) {
         if ( myStep.interfazInterna ) {
            //candidate-revision/:idStep/terceroPublication/:idTerceroPublication/process/:idProceso
            //process-step/centralRisk/:idStep/terceroPublication/:idTerceroPublication/process/:idProceso

            this.router.navigate(
               [ myStep.interfazInterna.replace( ':idStep', myStep.idProcesoPaso.toString() )
                                       .replace( ':idTerceroPublication', step.idTerceroPublicacion.toString() )
                                       .replace( ':idProceso', myStep.idProcesoSeleccion ? myStep.idProcesoSeleccion.toString() : '0' )
               ] );
         } else {
            this.router.navigate(
               [ 'process-step/' + idStep + '/terceroPublication/' + step.idTerceroPublicacion + '/process/' + myStep.idProcesoSeleccion ] );
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

   setSearch() {
      this.navService.setSearch( 'selection-process.component', this.busqueda );
   }
}
