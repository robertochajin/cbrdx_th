import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { EmployeeVehicle } from '../_models/employee-vehicle';
import { SelectItem, Message, ConfirmationService } from 'primeng/primeng';
import { EmployeeVehicleService } from '../_services/employee-vehicles.service';
import { ListEmployeesService } from '../_services/lists-employees.service';
import { PoliticalDivisionService } from '../_services/political-division.service';
import { DivisionPolitica } from '../_models/divisionPolitica';
import { NavService } from '../_services/_nav.service';
import { ListaService } from '../_services/lista.service';
import { ListaItem } from '../_models/listaItem';
import { Publications } from '../_models/publications';
import { VacanciesService } from '../_services/vacancies.service';
import { PersonnelRequirement } from '../_models/personnelRequirement';
import { PositionsService } from '../_services/positions.service';
import { PublicationsQuestionnaries } from '../_models/publicationsQuestionnnaries';
import { PublicationQuestionnairesService } from '../_services/publication-questionnaires.service';
import { QuestionnairesService } from '../_services/questionnaires.service';
import { Questionnaries } from '../_models/questionnaries';
@Component( {
               moduleId: module.id,
               selector: 'selecction-process-add',
               templateUrl: 'selection-process-form.component.html',
               providers: [ ConfirmationService ]
            } )

export class SelectionProcessAddComponent implements OnInit {

   publication: Publications=new Publications();
   vacancy: PersonnelRequirement= new PersonnelRequirement();
   listTypeVehicle: SelectItem[] = [];
   listTypeService: SelectItem[] = [];
   listBrandVehicle: SelectItem[] = [];
   msgs: Message[] = [];
   year: number;
   anioValid: boolean = false;
   acordion:number;

   // var cuestionarios
   publicationsQuestionnaires:PublicationsQuestionnaries[] =[];
   allPublicationsQuestionnaires:PublicationsQuestionnaries[] =[];
   private questionnaries: Questionnaries[] = [];
   private questionnariesList: SelectItem[] = [];
   private questionnarie: Questionnaries;
   // fin var cuestionarios

   constructor( private employeeVehicleService: EmployeeVehicleService,
      private listaService: ListaService,
      private router: Router,
      private route: ActivatedRoute,
      private location: Location,
      private vacanciesService: VacanciesService,
      private questionnairesService: QuestionnairesService,
      private publicationQuestionnairesService: PublicationQuestionnairesService,
      private listEmployeesService: ListEmployeesService,
      private politicalDivisionService: PoliticalDivisionService,
      private confirmationService: ConfirmationService,
      private _nav: NavService ) {

   }

   ngOnInit() {
      this.acordion=0;
      let today = new Date();
      let year = today.getFullYear();
      this.year = year + 1;

      this.route.params.subscribe( ( params: Params ) => {
         this.vacanciesService.get( +params[ 'idReq' ]).subscribe(data=>{
            this.vacancy =data;

         });
      } );

      this.listaService.getMasterDetails( 'ListasTiposServiciosVehiculos' ).subscribe( res => {
         this.listTypeService.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.listTypeService.push( { label: s.nombre, value: s.idLista } );
         } );
      } );

      this.listaService.getMasterDetails( 'ListasMarcasVehiculos' ).subscribe( res => {
         this.listBrandVehicle.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.listBrandVehicle.push( { label: s.nombre, value: s.idLista } );
         } );
      } );

      this.publicationQuestionnairesService.getAllByPublication(9).subscribe( res => {
         this.allPublicationsQuestionnaires = res;
         this.questionnairesService.getAllEnabled().subscribe(qst => {
            this.questionnariesList.push({label:'Seleccione...', value :null});
            this.questionnaries = qst;
            this.allPublicationsQuestionnaires.map(pq => {
               if(pq.indicadorHabilitado === false){
                  this.pushQuestionnaireOption( pq.idCuestionario);
               } else {
                  this.publicationsQuestionnaires.push(pq);
               }
            })
         });
      });


   }

   onSubmit() {

   }

   onTabShow( e: any ) {
      this._nav.setTab( e.index );
      this.acordion = this._nav.getTab();

   }

   goBack(): void {
      this.confirmationService.confirm( {
                                           message: ` ¿Esta seguro que desea salir sin guardar?`,
                                           header: 'Corfirmación',
                                           icon: 'fa fa-question-circle',
                                           accept: () => {
                                              this._nav.setTab( 5 );
                                              this.location.back();
                                           }
                                        } );
   }

   searchCity( event: any ) {

   }

   captureCity( event: any ) {

   }

   // funciones cuestionarios

   sendBefore(questionnaire:PublicationsQuestionnaries){
      let myIndex = this.publicationsQuestionnaires.indexOf(questionnaire);
      if(myIndex < this.publicationsQuestionnaires.length){
         let newOrder = this.publicationsQuestionnaires[myIndex].orden;
         this.publicationsQuestionnaires[myIndex].orden = this.publicationsQuestionnaires[myIndex+1].orden;
         this.publicationQuestionnairesService.update(this.publicationsQuestionnaires[myIndex]).subscribe(res => {
            if(res.ok) {
               this.publicationsQuestionnaires[myIndex+1].orden = newOrder;
               this.publicationQuestionnairesService.update(this.publicationsQuestionnaires[myIndex+1]).subscribe(res => {
                  if ( res.ok ) {
                     this.sortPublicationQuestionaries();
                  }
               });
            }
         });
      }
   }

   sendAfter(questionnaire:PublicationsQuestionnaries){
      let myIndex = this.publicationsQuestionnaires.indexOf(questionnaire);
      if(myIndex > 0){
         let newOrder = this.publicationsQuestionnaires[myIndex].orden;
         this.publicationsQuestionnaires[myIndex].orden = this.publicationsQuestionnaires[myIndex-1].orden;
         this.publicationQuestionnairesService.update(this.publicationsQuestionnaires[myIndex]).subscribe(res => {
            if(res.ok) {
               this.publicationsQuestionnaires[myIndex-1].orden = newOrder;
               this.publicationQuestionnairesService.update(this.publicationsQuestionnaires[myIndex-1]).subscribe(res => {
                  if ( res.ok ) {
                     this.sortPublicationQuestionaries();
                  }
               });
            }
         });
      }
   }

   disableQuestionnaire(questionnaire:PublicationsQuestionnaries){
      this.confirmationService.confirm( {
                                           message: ` ¿Esta seguro que lo desea eliminar?`,
                                           header: 'Corfirmación',
                                           icon: 'fa fa-question-circle',
                                           accept: () => {
                                              let myIndex = this.publicationsQuestionnaires.indexOf(questionnaire);
                                              questionnaire.indicadorHabilitado = false;
                                              this.publicationQuestionnairesService.update(questionnaire).subscribe(res => {
                                                 if ( res.ok ) {
                                                    for (let i = myIndex+1; i++; i < this.publicationsQuestionnaires.length) {
                                                       this.publicationsQuestionnaires[i].orden -= 1;
                                                    }
                                                    this.publicationsQuestionnaires.slice(myIndex,1);
                                                    this.sortPublicationQuestionaries();
                                                 }
                                              });
                                           },
                                           reject: () => {
                                           }
                                        } );
   }

   private sortPublicationQuestionaries() {
      this.publicationsQuestionnaires.sort(function ( a, b ) {
         if(a.orden < b.orden)
            return -1;
         else
            return 1;
      })
   }

   addPublicationsQuestionnaire(){
      let pq: PublicationsQuestionnaries = new PublicationsQuestionnaries();
      pq = this.allPublicationsQuestionnaires.find(pqs => pqs.idCuestionario === this.questionnarie.idCuestionario);
      if (pq !== undefined && pq.idPublicacionCustionario !== undefined && pq.idPublicacionCustionario !== null){
         pq.indicadorHabilitado = true;
         pq.orden = this.publicationsQuestionnaires.length;
         this.publicationQuestionnairesService.update(pq).subscribe(res =>{
            if(res.ok) {
               this.publicationsQuestionnaires.push(pq);
            }
         });
      }
   }

   private pushQuestionnaireOption( idCuestionario: number ) {
      let qst = this.questionnaries.find(q=>q.idCuestionario === idCuestionario);
      qst ? this.questionnariesList.push({label: qst.codigo+':'+qst.cuestionario,value:qst.idCuestionario}):null;
   }

   // fin funciones cuestionarios

}
