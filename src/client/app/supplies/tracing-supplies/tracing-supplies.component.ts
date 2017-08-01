import { Component, OnInit } from '@angular/core';
import { EmployessSuppliesProjection } from '../../_models/employessSuppliesProjection';
import { EmployessSuppliesServices } from '../../_services/employeesSupplies.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NavService } from '../../_services/_nav.service';
import { PositionsService } from '../../_services/positions.service';
import { SelectItem } from 'primeng/primeng';
import { TipoDeAreaService } from '../../_services/tipoDeArea.service';
import { OrganizationalStructureService } from '../../_services/organizationalStructure.service';
import { ListaService } from '../../_services/lista.service';
import { ListaItem } from '../../_models/listaItem';

@Component( {
               moduleId: module.id,
               selector: 'tracing-supplies',
               templateUrl: 'tracing-supplies.component.html'
            } )
export class TracingSuppliesComponent implements OnInit {

   public projectedEmployess: EmployessSuppliesProjection[] = [];
   private busqueda: string;
   public typeFilter: string;
   public areaFilter: string;
   public statesFilter: string;
   public positionFilter: string;
   positions: SelectItem[] = [];
   typeArea: SelectItem[] = [];
   area: SelectItem[] = [];
   states: SelectItem[] = [];
   private notDefinedState: ListaItem;
   private assignState: ListaItem;
   private deliverState: ListaItem;
   private empProyectionStates: ListaItem[] = [];

   constructor( private employessSuppliesServices: EmployessSuppliesServices,
      private router: Router,
      private route: ActivatedRoute,
      private positionsService: PositionsService,
      private tipoDeAreaService: TipoDeAreaService,
      private listaService: ListaService,
      private organizationalStructureService: OrganizationalStructureService,
      private _nav: NavService ) {
      this.busqueda = _nav.getSearch( 'assignation-list.component' );
   }

   ngOnInit() {
      this.positionsService.getAll().subscribe( rs => {
         this.positions.push( { label: 'Todos', value: null } );
         rs.map( ( s: any ) => {
            this.positions.push( { label: s.cargo, value: s.cargo } );
         } );
      } );
      this.tipoDeAreaService.getlistAreas().subscribe( rs => {
         this.typeArea.push( { label: 'Todos', value: null } );
         rs.map( ( s: any ) => {
            this.typeArea.push( { label: s.estructuraArea, value: s.estructuraArea } );
         } );
      } );
      this.organizationalStructureService.listOrganizationalStructure().subscribe( rs => {
         this.area.push( { label: 'Todas', value: null } );
         rs.map( ( s: any ) => {
            this.area.push( { label: s.nombre, value: s.nombre } );
         } );
      } );
      this.listaService.getMasterDetails( 'ListasEstadosProyeccionesTerceros' ).subscribe( rs => {
         this.states.push( { label: 'Todos', value: null } );
         rs.map( ( s: any ) => {
            this.states.push( { label: s.nombre, value: s.nombre } );
         } );
      } );

      this.route.params.subscribe( ( params: Params ) => {
         this.listaService.getMasterDetails( 'ListasEstadosProyeccionesTerceros' ).subscribe( res => {
            this.empProyectionStates = res;
            this.notDefinedState = this.empProyectionStates.find( s => s.codigo === 'PORASIG' );
            this.assignState = this.empProyectionStates.find( s => s.codigo === 'ASIG' );
            this.deliverState = this.empProyectionStates.find( s => s.codigo === 'ENTRE' );

            this.employessSuppliesServices.getAllEmployeesSupplies().subscribe( list => {
               this.projectedEmployess = list;
            } );
         } );
      } );
   }

   add() {
   }

   update( f: EmployessSuppliesProjection ) {
      return this.router.navigate( [ 'supplies-projection/assignations/assign/' + f.idProyeccionDotacionTerceros ] );
   }

   detail( f: EmployessSuppliesProjection ) {
      return this.router.navigate( [ 'supplies-projection/assignations/detail/' + f.idProyeccionDotacionTerceros ] );
   }

   setSearch() {
      this._nav.setSearch( 'assignation-list.component', this.busqueda );
   }

}