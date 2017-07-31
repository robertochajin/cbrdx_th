import { Component, OnInit } from '@angular/core';
import { EmployessSuppliesProjection } from '../../_models/employessSuppliesProjection';
import { EmployessSuppliesServices } from '../../_services/employeesSupplies.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NavService } from '../../_services/_nav.service';
import { SelectItem } from 'primeng/primeng';
import { PositionsService } from '../../_services/positions.service';
import { TipoDeAreaService } from '../../_services/tipoDeArea.service';
import { OrganizationalStructureService } from '../../_services/organizationalStructure.service';
import { ListaItem } from '../../_models/listaItem';
import { ConfirmationService } from 'primeng/primeng';
import { ListaService } from '../../_services/lista.service';
import { SuppliesProjectionServices } from '../../_services/suppliesProjection.service';
import { SuppliesProjection } from '../../_models/suppliesProjection';
import { EmployeesService } from '../../_services/employees.service';
import { Employee } from '../../_models/employees';

@Component( {
               moduleId: module.id,
               selector: 'assignation-list',
               templateUrl: 'assignation-list.component.html'
            } )
export class AssignationListComponent implements OnInit {

   public projectedEmployess: EmployessSuppliesProjection[] = [];
   private busqueda: string;
   public typeFilter: string;
   public areaFilter: string;
   public statesFilter: string;
   public positionFilter: string;
   positions: SelectItem[] = [];
   typeArea: SelectItem[] = [];
   area: SelectItem[] = [];
   private notDefinedState: ListaItem;
   private assignState: ListaItem;
   private deliverState: ListaItem;
   private empProyectionStates: ListaItem[] = [];
   private projection: SuppliesProjection = new SuppliesProjection();
   public addingThird = false;
   private wrongThird = true;
   public third: EmployessSuppliesProjection;
   public employeeList: Employee [] = [];
   public selectedEmployee: Employee = null;

   constructor( private employessSuppliesServices: EmployessSuppliesServices,
      private projectionServices: SuppliesProjectionServices,
      private router: Router,
      private route: ActivatedRoute,
      private listaService: ListaService,
      private employeesService: EmployeesService,
      private positionsService: PositionsService,
      private tipoDeAreaService: TipoDeAreaService,
      private confirmationService: ConfirmationService,
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
      this.route.params.subscribe( ( params: Params ) => {
         this.listaService.getMasterDetails( 'ListasEstadosProyeccionesTerceros' ).subscribe( res => {
            this.empProyectionStates = res;
            this.notDefinedState = this.empProyectionStates.find( s => s.codigo === 'PORASIG' );
            this.assignState = this.empProyectionStates.find( s => s.codigo === 'ASIG' );
            this.deliverState = this.empProyectionStates.find( s => s.codigo === 'ENTRE' );

            this.projectionServices.get( params[ 'idProjection' ] ).subscribe( projection => {
               this.projection = projection;

               this.employessSuppliesServices.getAllEmployeesSuppliesByProjection( params[ 'idProjection' ] ).subscribe( list => {

                  if ( this.projection.indicadorNoAreas && list !== undefined && list.length === 0 ) {
                     this.add();
                  } else {
                     this.projectedEmployess = list;
                  }

               } );
            } );
         } );
      } );

   }

   add() {
      // permite visualizar el buscador de terceros para crear un registro y relacionarlo a la proyección
      this.addingThird = true;
      this.third = new EmployessSuppliesProjection();
      this.third.idProyeccionDotacion = this.projection.idProyeccionDotacion;
      this.third.indicadorSatisfecho = false;
      this.selectedEmployee = null;
   }

   onSubmitThird() {
      if ( !this.wrongThird ) {

         this.employessSuppliesServices.addProjection( this.third ).subscribe( res => {
            if ( res ) {
               //on success refresh list
               this.employessSuppliesServices.getAllEmployeesSuppliesByProjection( this.projection.idProyeccionDotacion )
               .subscribe( list => {
                  this.projectedEmployess = list;
                  this.addingThird = false;
                  this.selectedEmployee = null;
                  this.third = null;
                  this._nav.setMesage( 1 );
               } );
            } else {
               this._nav.setMesage( 3 );
            }
         }, error => {
            this._nav.setMesage( 3 );
         } );

      }
   }

   employeeSearch( event: any ) {
      this.employeesService.getByTypeAndWildCard( 'TERCOL', event.query ).subscribe( list => {
         list.map(
            ( e: Employee ) => e.nombreCompleto = e.primerNombre + ' ' + e.segundoNombre + ' ' + e.primerApellido + ' ' + e.segundoApellido );
         this.employeeList = list;
      } );
   }

   captureEmployee( event: any ) {
      this.third.idTercero = this.selectedEmployee.idTercero;
      this.wrongThird = false;
   }

   goBack( fDirty: boolean ): void {
      if ( fDirty ) {
         this.confirmationService.confirm( {
                                              message: ` ¿Está seguro que desea salir sin guardar?`,
                                              header: 'Confirmación',
                                              icon: 'fa fa-question-circle',
                                              accept: () => {
                                                 this.addingThird = false;
                                                 this.third = null;
                                              }
                                           } );
      } else {
         this.addingThird = false;
         this.third = null;
      }
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