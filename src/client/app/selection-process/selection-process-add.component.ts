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

   constructor( private employeeVehicleService: EmployeeVehicleService,
      private listaService: ListaService,
      private router: Router,
      private route: ActivatedRoute,
      private location: Location,
      private vacanciesService: VacanciesService,
      private positionsService: PositionsService,
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
