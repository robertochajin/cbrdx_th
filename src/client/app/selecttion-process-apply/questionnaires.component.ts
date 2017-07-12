import 'rxjs/add/operator/switchMap';
import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { EmployeesService } from '../_services/employees.service';
import { Employee } from '../_models/employees';
import { NavService } from '../_services/_nav.service';
import { EmployeesPublications } from '../_models/employeesPublications';
import { MasterAnswers } from '../_models/masterAnswers';
import { MasterAnswersService } from '../_services/masterAnswers.service';
import { PublicationQuestionnairesService } from '../_services/publication-questionnaires.service';
import { PublicationsQuestionnaries } from '../_models/publicationsQuestionnnaries';
import { EmployeesAnswersMaster } from '../_models/employeesAnswersMaster';

@Component( {
               moduleId: module.id,
               selector: 'apply-questionaires',
               templateUrl: 'questionnaires.component.html'
            } )

export class ApplyQuestionnairesComponent {
   employee: Employee = new Employee();
   acordion: number;
   idTercerosPublicaciones: number;
   employeesPublication: EmployeesPublications;
   employeesPublicationmMaestroRespuestas: EmployeesAnswersMaster[] = [];
   maestrosRespuestas: MasterAnswers[] = [];
   maestroRespuestas: MasterAnswers = new MasterAnswers();
   idMaestroRespuestas: number;
   idCuestionario: number;
   showNext: boolean = false;
   showFinish: boolean = false;
   publicationsQuestionnaries: PublicationsQuestionnaries[] = [];
   indice = 0;
   listQuestionnaries: any[] = [];

   constructor( private employeeService: EmployeesService,
      private route: ActivatedRoute,
      private location: Location,
      private _nav: NavService,
      private router: Router,
      private masterAnswersService: MasterAnswersService,
      private publicationQuestionnairesService: PublicationQuestionnairesService ) {

      this.route.params.subscribe( ( params: Params ) => {
         this.idTercerosPublicaciones = +params[ 'idTercerosPublicaciones' ];
         this.employeeService.getPublicationById( this.idTercerosPublicaciones ).subscribe( res => {
            this.employeesPublication = res;
            this.publicationQuestionnairesService.getAllByPublication( this.employeesPublication.idPublicacion ).subscribe( result => {
               this.publicationsQuestionnaries = result;
               this.masterAnswersService.getByTerceroPublicacion( this.idTercerosPublicaciones ).subscribe( res => {
                  this.maestrosRespuestas = res;
                  this.nextMaestroRespuestas();
               } );

            } );
         } );

      } );
   }

   nextMaestroRespuestas() {
      if ( this.publicationsQuestionnaries.length === this.indice ) {
         this.goNext();
      } else {
         this.idCuestionario = this.publicationsQuestionnaries[ this.indice ].idCuestionario;
         if ( this.maestrosRespuestas.filter( s => s.idCuestionario = this.idCuestionario ).length > 0 ) {
            this.maestroRespuestas = this.maestrosRespuestas.filter( s => s.idCuestionario = this.idCuestionario )[ 0 ];
         } else {
            this.maestroRespuestas = new MasterAnswers;
            this.maestroRespuestas.idCuestionario = this.idCuestionario;
            this.masterAnswersService.add( this.maestroRespuestas ).subscribe( res => {
               this.maestrosRespuestas = res;
            } );
         }
         this.indice += 1;
      }

   }

   goBack(): void {
      this.location.back();
   }

   goHome(): void {
      this.router.navigate( [ 'dashboard' ] );
   }

   goNext(): void {
      // envia correo que no joda que ya se inscribio
      this.showFinish = true;
   }

   finishQuestionnaire() {
      this.showNext = true;
   }

   nextQuestionnaire() {
      this.nextMaestroRespuestas();
   }

}

