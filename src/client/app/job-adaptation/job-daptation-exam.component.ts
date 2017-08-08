import { Component, OnInit } from '@angular/core';
import { PublicationsService } from '../_services/publications.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NavService } from '../_services/_nav.service';
import { EmployeesService } from '../_services/employees.service';
import { Employee } from '../_models/employees';
import * as moment from 'moment/moment';
import { SelectItem, ConfirmationService } from 'primeng/components/common/api';
import { ListaService } from '../_services/lista.service';
import { ListaItem } from '../_models/listaItem';
import { MedicalExam } from '../_models/medicalExam';
import { MedicalExamService } from '../_services/medical-exam.service';
import { ConstanteService } from '../_services/constante.service';
import { OrganizationalStructureService } from '../_services/organizationalStructure.service';
import { MedicalInstitution } from '../_models/medical-institutions';
import { MedicalInstitutionService } from '../_services/medical-institutions.service';

@Component( {
               moduleId: module.id,
               selector: 'job-daptation-exam',
               templateUrl: 'job-daptation-exam.component.html',
               providers: [ ConfirmationService ]
            } )
export class JobAdaptationExamComponent implements OnInit {

   private candidate: Employee = new Employee();
   medicalInstitutions: MedicalInstitution[] = [];
   private es: any;
   private minDate: Date = new Date();
   svcThUrlAvatar = '<%= SVC_TH_URL %>/api/upload';

   idTercero: number;
   medicalExam: MedicalExam = new MedicalExam();
   listEstExaMed: ListaItem[];
   cargo: string;
   estructuraFisica: string;
   area: string;

   constructor( public publicationsService: PublicationsService,
      private medicalInstitutionService: MedicalInstitutionService,
      private route: ActivatedRoute,
      private _nav: NavService,
      private router: Router,
      private listaService: ListaService,
      private confirmationService: ConfirmationService,
      private constanteService: ConstanteService,
      private employeesService: EmployeesService,
      private medicalExamService: MedicalExamService,
      private organizationalStructureService: OrganizationalStructureService ) {

      this.listaService.getMasterDetails( 'ListasEstadosExamenesMedicos' ).subscribe( res => {
         this.listEstExaMed = res;
      } );
      this.medicalInstitutionService.getAll().subscribe( res => {
         this.medicalInstitutions = res;
      } );

      this.route.params.subscribe( ( params: Params ) => {
         if ( params[ 'id' ] !== undefined ) {
            this.medicalExam.idTercero = params[ 'id' ];
            this.employeesService.get( this.medicalExam.idTercero ).subscribe( employee => {
               this.candidate = employee;
               this.candidate.nombreCompleto = this.candidate.primerNombre + ' ' +
                                               this.candidate.segundoNombre + ' ' +
                                               this.candidate.primerApellido + ' ' +
                                               this.candidate.segundoApellido;
               this.candidate.edad = moment().diff( this.candidate.fechaNacimiento, 'years', false ).toString();
            } );
            this.employeesService.getEmployeePositionByIdEmployee( this.candidate.idTercero ).subscribe( rs => {
               this.cargo = rs.cargo;
               this.organizationalStructureService.viewOrganizationalStructure( rs.idEstructuraOrganizacional ).subscribe( res => {
                  this.estructuraFisica = res.estructuraFisica;
                  this.area = res.nombre;
               } );
            } );
         } else {
            this._nav.setMesage( 3 );
            this.router.navigate( [ 'job-adaptation' ] );
         }
      } );
   }

   ngOnInit() {
      let today = new Date();
      let month = today.getMonth();
      let year = today.getFullYear();
      this.minDate = new Date();
      this.minDate.setMonth( month );
      this.minDate.setFullYear( year );
   }

   onSubmit() {
      this.medicalExam.idEstadoExamenMedico = this.getIdStateExamByCode( 'ENESPR' );
      this.medicalExamService.add( this.medicalExam ).subscribe( data => {
         this.medicalExam = data;
         this._nav.setMesage( 1 );
      }, error => {
         this._nav.setMesage( 3 );
      } );

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
                                                 this.router.navigate( [ 'job-adaptation' ] );
                                              }
                                           } );
      } else {
         this.router.navigate( [ 'job-adaptation' ] );
      }
   }

   curriculum() {
      this.router.navigate( [ 'employees/curriculum/' + this.candidate.idTercero ] );
   }
}
