import { Component, OnInit } from '@angular/core';
import { PublicationsService } from '../_services/publications.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SelectionStepService } from '../_services/selection-step.service';
import { NavService } from '../_services/_nav.service';
import { SelectionStep } from '../_models/selectionStep';
import { EmployeesService } from '../_services/employees.service';
import { Employee } from '../_models/employees';
import * as moment from 'moment/moment';
import { VacanciesService } from '../_services/vacancies.service';
import { PersonnelRequirement } from '../_models/personnelRequirement';
import { CandidateProcess } from '../_models/candidateProcess';
import { CandidateProcessService } from '../_services/candidate-process.service';
import { CentralRisk } from '../_models/centralRisk';
import { SelectItem, ConfirmationService } from 'primeng/primeng';

@Component( {
               moduleId: module.id,
               selector: 'step-process',
               templateUrl: 'central-risk.component.html',
               providers: [ ConfirmationService ]
            } )
export class CentralRiskComponent implements OnInit {
   private publication: PersonnelRequirement = new PersonnelRequirement();
   private step: SelectionStep = new SelectionStep();
   private candidate: Employee = new Employee();
   public centrales: CentralRisk[] = [];
   public employeesCentrales: CentralRisk[] = [];
   public candidateProcess: CandidateProcess = new CandidateProcess();
   public url = '';
   public title = '';
   displayDialog: boolean = false;
   disabled: boolean = false;
   respuesta:any;
   cargando = 0;
   public  indApproval: number;
   public approvalOptions: SelectItem[] = [];
   svcThUrl = '<%= SVC_TH_URL %>/api/tercerosCentralesRiesgos/file';
   fileThUrl = '<%= SVC_TH_URL %>/api/adjuntos/file';
   previewUrl = '<%= SVC_TH_URL %>/api/adjuntos/preview';
   public idCandidate : number;

   constructor( public publicationsService: PublicationsService,
      private route: ActivatedRoute,
      private _nav: NavService,
      private router: Router,
      private employeesService: EmployeesService,
      private vacanciesService: VacanciesService,
      private candidateProcessService: CandidateProcessService,
      private confirmationService: ConfirmationService,
      private selectionStepService: SelectionStepService ) {

      this.approvalOptions.push({label: 'Seleccione', value:null});
      this.approvalOptions.push({label: 'No aplica este paso', value:2});
      this.approvalOptions.push({label: 'Aprueba este paso', value:1});
      this.approvalOptions.push({label: 'No aprueba este paso', value:0});


      this.route.params.subscribe( ( params: Params ) => {
         let idTercerosPublicaciones = +params[ 'idTerceroPublication' ];
         let idStep = +params[ 'idStep' ];
         this.selectionStepService.getTerceroPublicacio( idTercerosPublicaciones).subscribe(tp =>{

            this.idCandidate = tp.idTercero;
            let idPublicacion = tp.idPublicacion;
            employeesService.get( this.idCandidate ).subscribe( cndt => {
               this.candidate = cndt;
               this.candidate.nombreCompleto = this.candidate.primerNombre + ' ' +
                                               this.candidate.segundoNombre + ' ' +
                                               this.candidate.primerApellido + ' ' +
                                               this.candidate.segundoApellido;
               this.candidate.edad = moment( this.candidate.fechaNacimiento, 'YYYY-MM-DD' ).toNow( true ).toString();
            } );

            selectionStepService.getcentralRisk().subscribe( res => {
               this.centrales = res;
               selectionStepService.getEmployeesCentralRisk( this.idCandidate ).subscribe( res => {
                  res.map( emp => {
                     let _i = this.centrales.indexOf( this.centrales.find( m => m.idCentralRiesgo === emp.idCentralRiesgo ) );
                     this.centrales[ _i ].idTerceroCentralRiesgo = emp.idTerceroCentralRiesgo;
                     this.centrales[ _i ].idTercero = this.idCandidate;
                     this.centrales[ _i ].idAdjunto = emp.idAdjunto;
                     this.centrales[ _i ].indicadorReportado = emp.indicadorReportado;
                     this.centrales[ _i ].indicadorAprobado = emp.indicadorAprobado;
                  } );
               } );
            } );

            vacanciesService.getPublication( idPublicacion ).subscribe( pb => {
               this.publication = pb;
            });
         });
      } );
   }

   ngOnInit() {
   }

   goBack() {

   }

   showDialogo( obj: any ) {
      this.displayDialog = true;
      this.url = obj.url;
      this.title = obj.nombre;
   }

   onBeforeSend( event: any , data: CentralRisk  ) {
      this.cargando = data.idCentralRiesgo;
      event.xhr.setRequestHeader( 'Authorization', localStorage.getItem( 'token' ) );
      if(data.idTercero === null || data.idTercero === undefined){
         data.idTercero = this.idCandidate;
         data.indicadorReportado = false;
         data.indicadorAprobado = false;
      }
      event.formData.append('obj', JSON.stringify(data));


   }

   onUpload( event: any, data: CentralRisk ) {
      this.cargando = 0;
      this.disabled = true;
      let respuesta = JSON.parse(event.xhr.response);
      data.idTerceroCentralRiesgo = respuesta.idTerceroCentralRiesgo;
      data.idAdjunto = respuesta.idAdjunto;

   }


   onSubmit() {
      if(this.indApproval === 2){
         this.candidateProcess.indicadorNoAplica = true;
      } else if(this.indApproval === 1) {
         this.candidateProcess.indicadorContProceso = true;
      } else if(this.indApproval === 0) {
         this.candidateProcess.indicadorContProceso = false;
      }

      if(this.candidateProcess.idProcesoSeleccion !== undefined) {
         this.candidateProcessService.update(this.candidateProcess).subscribe(res => {
            if(res.ok) {
               this._nav.setMesage( 2 );
               this.router.navigate( [ 'selection-process' ] );
            } else {
               this._nav.setMesage( 3 );
               this.router.navigate( [ 'selection-process' ] );
            }
         }, () => {
            this._nav.setMesage( 3 );
            this.router.navigate( [ 'selection-process' ] );
         });
      } else {
         this.candidateProcessService.add(this.candidateProcess).subscribe(res => {
            if(res.idProcesoSeleccion) {
               this._nav.setMesage( 1 );
               this.router.navigate( [ 'selection-process' ] );
            } else {
               this._nav.setMesage( 3 );
               this.router.navigate( [ 'selection-process' ] );
            }
         }, () => {
            this._nav.setMesage( 3 );
            this.router.navigate( [ 'selection-process' ] );
         });
      }
   }

   aprobar(f: CentralRisk){

      if(f.idTerceroCentralRiesgo === null || f.idTerceroCentralRiesgo === undefined || f.idTerceroCentralRiesgo === 0){
         this.selectionStepService.addEmployeesCentralRisk( f ).subscribe( res => {
            f.idTerceroCentralRiesgo = res.idTerceroCentralRiesgo;
            this._nav.setMesage( 1, null );
         });
      }else{
         this.selectionStepService.updateEmployeesCentralRisk( f ).subscribe( res => {
            this._nav.setMesage( 2, null );
         });
      }

   }
   previewFile(f: CentralRisk){
      // let link = 'https://www.subes.sep.gob.mx/archivos/tutor/manual_general.pdf';
      this.url = this.previewUrl+'/'+ f.idAdjunto;
      this.title = f.nombre;
      this.displayDialog = true;


   }
   downloadFile(f: CentralRisk){

      this.selectionStepService.downloadFile( f.idAdjunto ).subscribe(res => {
         window.location.assign(res);
      });
   }
   deleteFile(f: CentralRisk){
      this.confirmationService.confirm( {
                                           message: `¿Está seguro que desea Eliminar el adjunto?`,
                                           header: 'Confirmación',
                                           icon: 'fa fa-question-circle',

                                           accept: () => {
                                              f.idAdjunto = null;
                                              f.indicadorAprobado = false;
                                              f.indicadorReportado = false;
                                              this.disabled = true;
                                              this.selectionStepService.updateEmployeesCentralRisk( f ).subscribe( res => {
                                                 this._nav.setMesage( 2, null );
                                              });
                                           }
                                        } );

   }
   curriculum() {
      this.router.navigate( [ 'employees/curriculum/' + this.candidate.idTercero ] );
   }

}
