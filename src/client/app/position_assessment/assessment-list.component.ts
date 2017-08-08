import { Component, OnInit } from '@angular/core';
import { Positions } from '../_models/positions';
import { PositionsService } from '../_services/positions.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectItem, ConfirmationService } from 'primeng/primeng';
import { NavService } from '../_services/_nav.service';
import { ListaService } from '../_services/lista.service';
import { ListaItem } from '../_models/listaItem';
import { TipoDeAreaService } from '../_services/tipoDeArea.service';

@Component( {
               moduleId: module.id,
               selector: 'assessment-list',
               templateUrl: 'assessment-list.component.html',
               providers: [ ConfirmationService ]
            } )
export class AssessmentListComponent implements OnInit {

   areaTypes: SelectItem[] = [];
   process: SelectItem[] = [];
   subProcess: SelectItem[] = [];
   percent: SelectItem[] = [];
   positions: Positions[] = [];
   allPositions: Positions[] = [];
   busqueda: string;

   constructor( private positionsService: PositionsService,
      private router: Router,
      private listaService: ListaService,
      private tipoDeAreaService: TipoDeAreaService,
      private confirmationService: ConfirmationService,
      private _nav: NavService ) {

      this.busqueda = this._nav.getSearch( 'assessment-list.component' );
   }

   ngOnInit() {

      this.tipoDeAreaService.getlistAreas().subscribe( res => {
         this.areaTypes.push( { label: 'Seleccione', value: null } );
         for ( let dp of res ) {
            this.areaTypes.push( { label: dp.estructuraArea, value: dp.estructuraArea} );
         }
      } );

      this.listaService.getMasterDetails( 'ListasProcesos' ).subscribe( res => {
         this.process.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => this.process.push( { label: s.nombre, value: s.nombre } ) );
      } );

      this.listaService.getMasterDetails( 'ListasSubProcesos' ).subscribe( res => {
         this.subProcess.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => this.subProcess.push( { label: s.nombre, value: s.nombre } ) );
      } );

      this.percent.push( { label: 'Todos', value: null } );
      this.percent.push( { label: 'Completos', value: '100' } );
      this.percent.push( { label: 'Incompleto', value: 'incompletos' } );
      // Esta opción no la soporta la versión de primeNg que usamos actualmente 3/08/2017

      //Consultamos TODOS los cargos habilitados
      this.positionsService.getListPositionsWithRiskProgress().subscribe(list => {
         this.positions  = list;
         this.allPositions  = list;
      });

   }

   filterPercentage(selected: any) {
      this.positions = this.allPositions.filter(function ( value ) {
         if(value.avanceValoracion.toString() !== '100' && selected.value === 'incompletos' ) {
            return true;
         } else if (value.avanceValoracion.toString() === '100' && selected.value === '100' ) {
            return true;
         } else if (selected.value === null) {
            return true;
         } else {
            return false;
         }
      });
   }

   makeAssessment(position: Positions) {
      return this.router.navigate( [ 'position/assessment/position/' + position.idCargo ] );
   }

   setSearch() {
      this._nav.setSearch( 'assessment-list.component', this.busqueda );
   }

   showRiskMap() {
      this.positionsService.getMapa().subscribe( res => {
            saveAs( res, 'Matriz_de_priorizacion_de_riesgos.xlsx' );
      } );
   }

}