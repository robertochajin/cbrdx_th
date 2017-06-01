/**
 * Created by Andres on 30/05/2017.
 */
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
import { RequirementReferralsServices } from '../_services/requirement-referrals.service';
import { RequirementReferral } from '../_models/requirementReferral';
@Component( {
               moduleId: module.id,
               selector: 'selecction-process-add',
               templateUrl: 'selection-process-form.component.html',
               providers: [ ConfirmationService ]
            } )

export class SelectionProcessAddComponent implements OnInit {

   publication: Publications=new Publications();
   vacancy: PersonnelRequirement= new PersonnelRequirement();
   requirementReferrals: RequirementReferral[] = [];
   listTypeVehicle: SelectItem[] = [];
   msgs: Message[] = [];
   year: number;
   acordion:number;
   es:any;
   minDate: Date = null;
   maxDate: Date = null;
   range: string;

   constructor( private employeeVehicleService: EmployeeVehicleService,
      private listaService: ListaService,
      private router: Router,
      private route: ActivatedRoute,
      private location: Location,
      private vacanciesService: VacanciesService,
      private positionsService: PositionsService,
      private referralsServices: RequirementReferralsServices,
      private listEmployeesService: ListEmployeesService,
      private politicalDivisionService: PoliticalDivisionService,
      private confirmationService: ConfirmationService,
      private _nav: NavService ) {

   }

   ngOnInit() {
      this.acordion=0;
      let today = new Date();
      let year = today.getFullYear();
      this.year = year;
      let lastYear = year + 50;
      this.range = `${year}:${lastYear}`;

      this.minDate= new Date();
      this.es = {
         firstDayOfWeek: 1,
         dayNames: [ 'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado' ],
         dayNamesShort: [ 'dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb' ],
         dayNamesMin: [ 'D', 'L', 'M', 'X', 'J', 'V', 'S' ],
         monthNames: [ 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre',
            'diciembre'
         ],
         monthNamesShort: [ 'ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic' ]
      };

      this.route.params.subscribe( ( params: Params ) => {
         this.vacanciesService.get( +params[ 'idReq' ]).subscribe(data=>{
            this.vacancy =data;
         });
         this.referralsServices.getAllRequirement( +params[ 'idReq' ] ).subscribe( ref => {
            this.requirementReferrals = ref;
         } );
      } );

      this.listaService.getMasterDetails( 'ListasTiposServiciosVehiculos' ).subscribe( res => {
         this.listTypeVehicle.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.listTypeVehicle.push( { label: s.nombre, value: s.idLista } );
         } );
      } );

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

}
