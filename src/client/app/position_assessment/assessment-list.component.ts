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
            this.areaTypes.push( {
                                    label: dp.estructuraArea,
                                    value: dp.idEstructuraArea
                                 } );
         }
      } );

      this.listaService.getMasterDetails( 'ListasProcesos' ).subscribe( res => {
         this.process.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => this.process.push( { label: s.nombre, value: s.idLista } ) );
      } );

      this.listaService.getMasterDetails( 'ListasSubProcesos' ).subscribe( res => {
         this.subProcess.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => this.subProcess.push( { label: s.nombre, value: s.idLista } ) );
      } );

      this.percent.push( { label: 'Todos', value: null } );
      this.percent.push( { label: 'Completos', value: 'completos' } );
      this.percent.push( { label: 'Incompleto', value: 'incompletos' } );

      //Consultamos TODOS los cargos habilitados
      this.positionsService.getListPositions().subscribe(list => {
         this.positions  = list;
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
            saveAs( res, 'MapaRiesgosCargos' );
      } );
   }

}