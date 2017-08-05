import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Positions } from '../_models/positions';
import { SelectItem, Message, ConfirmationService } from 'primeng/primeng';
import { PositionsService } from '../_services/positions.service';
import { ListPositionsService } from '../_services/lists-positions.service';
import { TipoDeAreaService } from '../_services/tipoDeArea.service';
import { ListaService } from '../_services/lista.service';
import { ListaItem } from '../_models/listaItem';
import { NavService } from '../_services/_nav.service';
import { VacanciesService } from '../_services/vacancies.service';
import { PersonnelRequirement } from '../_models/personnelRequirement';
import { PersonnelRequirementServices } from '../_services/personnelRequirement.service';

@Component( {
               moduleId: module.id,
                  selector: 'positions-form',
               templateUrl: 'positions-add.component.html',
               providers: [ ConfirmationService ]
            } )

export class PositionsAddComponent implements OnInit  {
   position: Positions = new Positions();
   categoryTypes: SelectItem[] = [];
   areaTypes: SelectItem[] = [];
   bossPositionTypes: SelectItem[] = [];
   listStudies: SelectItem[] = [];
   stateTypes: SelectItem[] = [];
   msg: Message;
   defaultState: any;
   step = 1;
   acordion = 0;
   idRequirement = 0;
   requirement: PersonnelRequirement = new PersonnelRequirement();
   rangoEdad:number[];
   listProcess: SelectItem[] = [];
   listSubProcess: SelectItem[] = [];

   constructor( private positionsService: PositionsService,
      private router: Router,
      private listaService: ListaService,
      private route: ActivatedRoute,
      private location: Location,
      private listPositionsService: ListPositionsService,
      private tipoDeAreaService: TipoDeAreaService,
      private confirmationService: ConfirmationService,
      private _nav: NavService,
      private vacanciesService: VacanciesService,
      private personnelRequirementServices: PersonnelRequirementServices
   ) {

      this.positionsService.getListPositions().subscribe( res => {
         this.bossPositionTypes.push( { label: 'Seleccione', value: null } );
         for ( let dp of res ) {
            this.bossPositionTypes.push( {
                                            label: dp.cargo,
                                            value: dp.idCargo
                                         } );
         }
      } );
      this.listaService.getMasterDetails( 'ListasNivelesEstudios' ).subscribe( res => {
         this.listStudies.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => this.listStudies.push( { label: s.nombre, value: s.idLista } ) );
      } );
      this.listaService.getMasterDetails( 'ListasProcesos' ).subscribe( res => {
         this.listProcess.push( { label: 'Seleccione', value: null } );
         this.listSubProcess.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => this.listProcess.push( { label: s.nombre, value: s.idLista } ) );
      } );
      this.tipoDeAreaService.getlistAreas().subscribe( res => {
         this.areaTypes.push( { label: 'Seleccione', value: null } );
         for ( let dp of res ) {
            this.areaTypes.push( {
                                    label: dp.estructuraArea,
                                    value: dp.idEstructuraArea
                                 } );
         }
      } );

      this.listaService.getMasterDetailsByCode( 'ListasEstadosCargos', 'CONST' ).subscribe( res => {
         this.defaultState = res;
      } );

   }

   ngOnInit() {
      this.route.params.subscribe( params => {
         this.idRequirement = params[ 'id' ];
         if(Number(this.idRequirement) > 0){
            this.vacanciesService.get( this.idRequirement ).subscribe(
               requirement => {
                  this.requirement = requirement;
                  this.position.cargo = requirement.nombreCargo;
                  this.position.mision = requirement.funcionCargo;
               } );
         }
      } );

   }

   onSubmit0() {
      this.position.idEstado = this.defaultState.idLista;
      this.position.paso = 2;
      this.positionsService.add( this.position )
      .subscribe( data => {
         if(Number(this.idRequirement) > 0) {
            this.requirement.idCargo = data.idCargo;
            this.personnelRequirementServices.update( this.requirement ).subscribe(req =>{
               this._nav.setTab(1);
               this._nav.setMesage( 1, this.msg );
               this.router.navigate( [ 'positions/update/' + data.idCargo ] );
            }, error => {
               this._nav.setMesage( 3, this.msg );
            } );
         }else{
            this._nav.setTab(1);
            this._nav.setMesage( 1, this.msg );
            this.router.navigate( [ 'positions/update/' + data.idCargo ] );
         }

      }, error => {
         this._nav.setMesage( 3, this.msg );
      } );
   }

   goBack(): void {
      this.confirmationService.confirm( {
                                           message: ` ¿Está seguro que desea salir sin guardar?`,
                                           header: 'Confirmación',
                                           icon: 'fa fa-question-circle',
                                           accept: () => {
                                              this.location.back();
                                           }
                                        } );
   }

   capitalizeNombre() {
      let input = this.position.cargo;
      if ( input !== '' && input !== null && input !== undefined ) {
         this.position.cargo = input.substring( 0, 1 ).toUpperCase() + input.substring( 1 ).toLowerCase();
      }
   }

   inputCleanUp( value: string ) {
      this.position.codigoCargo = value.toUpperCase().replace( /[^A-Z0-9]/, '' ).trim();
   }

   inputNumber() {
      let numero = this.position.personaACargoDir + '';
      if ( this.position.personaACargoDir !== null ) {
         this.position.personaACargoDir = Number( numero.replace( /[^0-9]/g, '' ) );
      }
      let numeroi = this.position.personaACargoInd + '';
      if ( this.position.personaACargoInd !== null ) {
         this.position.personaACargoInd = Number( numeroi.replace( /[^0-9]/g, '' ) );
      }
   }

   onChangeProcess( event: any ) {
      this.listSubProcess = [];
      this.listaService.getMasterDetailsByDependency( 'ListasProcesos', this.position.idProceso, 'SUBPROCESO' ).subscribe( res => {
         this.listSubProcess.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => this.listSubProcess.push( { label: s.nombre, value: s.idLista } ) );
      } );
   }

}
