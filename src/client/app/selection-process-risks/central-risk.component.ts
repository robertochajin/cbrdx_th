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

@Component( {
               moduleId: module.id,
               selector: 'step-process',
               templateUrl: 'central-risk.component.html'
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

   constructor( public publicationsService: PublicationsService,
      private route: ActivatedRoute,
      private _nav: NavService,
      private router: Router,
      private employeesService: EmployeesService,
      private vacanciesService: VacanciesService,
      private candidateProcessService: CandidateProcessService,
      private selectionStepService: SelectionStepService ) {

      this.route.params.subscribe( ( params: Params ) => {
         let idCandidate = 11;
         employeesService.get( idCandidate ).subscribe( cndt => {
            this.candidate = cndt;
            this.candidate.nombreCompleto = this.candidate.primerNombre + ' ' +
                                            this.candidate.segundoNombre + ' ' +
                                            this.candidate.primerApellido + ' ' +
                                            this.candidate.segundoApellido;
            this.candidate.edad = moment( this.candidate.fechaNacimiento, 'YYYY-MM-DD' ).toNow( true ).toString();
         } );


         selectionStepService.getcentralRisk().subscribe( res => {
            this.centrales = res;
            selectionStepService.getEmployeesCentralRisk( idCandidate ).subscribe( res => {
               res.map( emp => {
                  let _i = this.centrales.indexOf( this.centrales.find( m => m.idCentralRiesgo === emp.idCentralRiesgo ) );
                  this.centrales[ _i ].idTerceroCentralRiesgo = emp.idTerceroCentralRiesgo;
                  this.centrales[ _i ].idTercero = emp.idTercero;
                  this.centrales[ _i ].adjunto = emp.adjunto;
                  this.centrales[ _i ].adjunto = 'https://www.subes.sep.gob.mx/archivos/tutor/manual_general.pdf';
                  this.centrales[ _i ].indicadorReportado = emp.indicadorReportado;
                  this.centrales[ _i ].indicadorAprobado = emp.indicadorAprobado;
               } );
            } );
         } );

         let idPublicacion = 2;
         let idStep = 40;
          vacanciesService.getPublication( idPublicacion ).subscribe( pb => {
             this.publication = pb;
            /* selectionStepService.get( idStep ).subscribe( step => {
                this.step = step;
             } );*/
          });

      } );
   }

   ngOnInit() {
   }

   onSubmit() {

   }

   goBack() {

   }

   showDialogo( obj: any ) {
      this.displayDialog = true;
      this.url = obj.url;
      this.title = obj.nombre;
   }

   onBeforeSend( event: any ) {
      event.xhr.setRequestHeader( 'Authorization', localStorage.getItem( 'token' ) );
   }

   onUpload( event: any, data: any ) {
      /*this.image = event.xhr.responseText;
       this.usuariosService.refreshToken();
       this.navService.setAvatar( this.image );*/
   }

   aprobar(f: CentralRisk){

      if(f.idTerceroCentralRiesgo === null || f.idTerceroCentralRiesgo === undefined || f.idTerceroCentralRiesgo === 0){
         this.selectionStepService.addEmployeesCentralRisk( f ).subscribe( res => {
            f.idTerceroCentralRiesgo = res.idTerceroCentralRiesgo;
            this._nav.setMesage( 1, null );
         });
      }else{
         console.log(f);
         this.selectionStepService.updateEmployeesCentralRisk( f ).subscribe( res => {
            this._nav.setMesage( 2, null );
         });
      }

   }
   previewFile(f: CentralRisk){
      let link = 'https://www.subes.sep.gob.mx/archivos/tutor/manual_general.pdf';
      this.url = link;
      this.title = f.adjunto;
      //
      this.displayDialog = true;


   }
   downloadFile(f: CentralRisk){
      let link = 'https://www.subes.sep.gob.mx/archivos/tutor/manual_general.pdf';
      window.open(link);
   }
   deleteFile(f: CentralRisk){
      f.adjunto = null;
      this.selectionStepService.updateEmployeesCentralRisk( f ).subscribe( res => {
         this._nav.setMesage( 2, null );
      });
   }
}
