import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NavService } from '../_services/_nav.service';
import { EmployeesService } from '../_services/employees.service';
import { Employee } from '../_models/employees';
import * as moment from 'moment/moment';
import { SelectItem, ConfirmationService } from 'primeng/components/common/api';
import { CandidateProcess } from '../_models/candidateProcess';
import { CandidateProcessService } from '../_services/candidate-process.service';
import { ListaService } from '../_services/lista.service';
import { ListaItem } from '../_models/listaItem';
import { JwtHelper } from 'angular2-jwt';
import { MedicalExam } from '../_models/medicalExam';
import { MedicalExamService } from '../_services/medical-exam.service';
import { OrganizationalStructureService } from '../_services/organizationalStructure.service';

@Component( {
               moduleId: module.id,
               selector: 'medical-exam-consent-period',
               templateUrl: 'informed-consent-period.component.html',
               providers: [ ConfirmationService ]
            } )
export class MedicalExamInformedConsentPeriodComponent implements OnInit {

   private candidate: Employee = new Employee();
   public indApproval: string;
   public approvalOptions: SelectItem[] = [];
   public candidateProcess: CandidateProcess = new CandidateProcess();
   private es: any;
   svcThUrlAvatar = '<%= SVC_TH_URL %>/api/upload';

   usuarioLogueado: any;
   idRol: number;
   jwtHelper: JwtHelper = new JwtHelper();
   medicalExam: MedicalExam = new MedicalExam();
   listEstExaMed: ListaItem[];
   enesperarespuesta: boolean = true;
   sinprogramar: boolean = true;
   respondido: boolean = false;
   institucionMedica: boolean = true;
   consentimiennto: boolean = false;
   codigoVerificacion: string;
   cargo: string;
   estructuraFisica: string;
   area: string;

   constructor( private route: ActivatedRoute,
      private _nav: NavService,
      private router: Router,
      private listaService: ListaService,
      private confirmationService: ConfirmationService,
      private employeesService: EmployeesService,
      private candidateProcessService: CandidateProcessService,
      private medicalExamService: MedicalExamService,
      private organizationalStructureService: OrganizationalStructureService ) {

      let token = localStorage.getItem( 'token' );
      if ( token !== null ) {
         this.usuarioLogueado = this.jwtHelper.decodeToken( token );
         this.candidateProcess.idResponsable = this.usuarioLogueado.usuario.idUsuario;
      }

      this.listaService.getMasterDetails( 'ListasEstadosExamenesMedicos' ).subscribe( res => {
         this.listEstExaMed = res;
      } );

      this.route.params.subscribe( ( params: Params ) => {
         if ( params[ 'idExamen' ] !== undefined ) {
            // obtener examen medico
            this.medicalExamService.getById( params[ 'idExamen' ] ).subscribe( rs => {
               this.medicalExam = rs;
               if ( rs.indicadorVerificado ) {
                  this.consentimiennto = true;
               } else {
                  this.consentimiennto = false;
               }
               this.employeesService.get( rs.idTercero ).subscribe( cndt => {
                  this.candidate = cndt;
                  this.candidate.nombreCompleto = this.candidate.primerNombre + ' ' +
                                                  this.candidate.segundoNombre + ' ' +
                                                  this.candidate.primerApellido + ' ' +
                                                  this.candidate.segundoApellido;
                  this.candidate.edad = moment().diff( this.candidate.fechaNacimiento, 'years', false ).toString();
               } );
               this.employeesService.getEmployeePositionByIdEmployee( rs.idTercero ).subscribe( rs => {
                  this.cargo = rs.cargo;
                  this.organizationalStructureService.viewOrganizationalStructure( rs.idEstructuraOrganizacional ).subscribe( res => {
                     this.estructuraFisica = res.estructuraFisica;
                     this.area = res.nombre;
                  } );
               } );
            } );
         } else {
            this._nav.setMesage( 3 );
            this.router.navigate( [ 'dashboard' ] );
         }
      } );

   }

   ngOnInit() {
   }

   onSubmitCon() {
      if ( this.medicalExam.codigoVerificacion === this.codigoVerificacion ) {
         if ( this.medicalExam.idExamenMedico ) {
            let temp = this.listEstExaMed.find( c => c.idLista === this.medicalExam.idEstadoExamenMedico ).codigo;
            if ( temp === 'ENESPR' ) {
               if ( (this.medicalExam.idAdjunto && this.medicalExam.idMedicoResponsable) || this.medicalExam.indicadorVerificado ) {
                  this.medicalExam.idEstadoExamenMedico = this.getIdStateExamByCode( 'RESPOND' );
               } else {
                  this.medicalExam.idEstadoExamenMedico = this.getIdStateExamByCode( 'ENESPR' );
               }
            }
            this.medicalExamService.update( this.medicalExam ).subscribe( data => {
               this._nav.setMesage( 4, {
                  severity: 'success', summary: 'Exito', detail: 'Su aplicación se realizó' +
                                                                 ' exitosamente.'
               } );

               localStorage.removeItem( 'token' );
               this.router.navigate( [ '/login' ] );
            }, error => {
               this._nav.setMesage( 4, {
                  severity: 'success', summary: 'Exito', detail: 'El proceso de aplicación falló' +
                                                                 ' intente nuevamente.'
               } );
            } );
         } else {
            this.medicalExam.idEstadoExamenMedico = this.getIdStateExamByCode( 'ENESPR' );
            this.medicalExam.idProcesoSeleccion = this.candidateProcess.idProcesoSeleccion;
            this.medicalExamService.add( this.medicalExam ).subscribe( data => {
               this.medicalExam = data;
               this._nav.setMesage( 1 );
               localStorage.removeItem( 'token' );
               this.router.navigate( [ '/login' ] );
            }, error => {
               this._nav.setMesage( 3 );
               localStorage.removeItem( 'token' );
               this.router.navigate( [ '/login' ] );
            } );
         }
      } else {
         this._nav.setMesage( 4, {
            severity: 'error', summary: 'Error', detail: 'El codigo ingresado es incorrecto, intente' +
                                                         ' nuevamente por favor.'
         } );
      }
   }

   getIdStateExamByCode( code: string ): number {
      let state: ListaItem = this.listEstExaMed.find( s => s.codigo === code );
      if ( state !== undefined ) {
         return state.idLista;
      } else {
         return 0;
      }
   }

   goBack( fDirty: boolean ) {
      if ( fDirty ) {
         this.confirmationService.confirm( {
                                              message: ` ¿Está seguro que desea salir sin guardar?`,
                                              header: 'Confirmación',
                                              icon: 'fa fa-question-circle',
                                              accept: () => {
                                                 this.router.navigate( [ 'dashboard' ] );
                                              }
                                           } );
      } else {
         this.router.navigate( [ 'dashboard' ] );
      }

   }

   generarCodigo() {
      // this.candidate.telefonoCelular
      this.medicalExam.codigoVerificacion = (Math.floor( Math.random() * (9999 - 1000 + 1) ) + 1000).toString();

      this.medicalExamService.update( this.medicalExam ).subscribe( data => {
         this.candidate.telefonoCelular = this.candidate.telefonoCelular.replace( /\(|\)|\-/g, "" );
         this.candidate.telefonoCelular = this.candidate.telefonoCelular.split( ' ' ).join( '' );
         let obj = {
            destination: this.candidate.telefonoCelular,
            codigo: this.medicalExam.codigoVerificacion
         };

         this.candidateProcessService.generateVerificationCode( obj ).subscribe( res => {
            console.log( res );
         }, error => {
            this._nav.setMesage( 4, {
               severity: 'success', summary: 'Exito', detail: 'El codigo se ha enviado con éxito.'
            } );
         } );
      } );
   }

   curriculum() {
      this.router.navigate( [ 'employees/curriculum/' + this.candidate.idTercero ] );
   }
}