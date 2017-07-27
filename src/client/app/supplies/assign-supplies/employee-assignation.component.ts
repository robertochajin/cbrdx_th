import { Component, OnInit } from '@angular/core';
import { EmployessSuppliesProjection } from '../../_models/employessSuppliesProjection';
import { ActivatedRoute, Params } from '@angular/router';
import { NavService } from '../../_services/_nav.service';
import { EmployessSuppliesServices } from '../../_services/employeesSupplies.service';
import { EmployessSuppliesProjectionSupply } from '../../_models/employessSuppliesProjectionSupply';
import { EmployessSuppliesAdditional } from '../../_models/employessSuppliesAdditional';
import { ListaService } from '../../_services/lista.service';
import { ListaItem } from '../../_models/listaItem';

@Component( {
               moduleId: module.id,
               selector: 'employee-assignation',
               templateUrl: 'employee-assignation.component.html'
            } )
export class EmployeeAssignationComponent implements OnInit {

   public employessAssign: EmployessSuppliesProjection = new EmployessSuppliesProjection();
   public employeeSupplies: EmployessSuppliesProjectionSupply[] = [];
   public employeeAditionalSupplies: EmployessSuppliesAdditional[] = [];
   public minDate: Date = null;
   public es: any;
   private assignState: ListaItem;
   private someSuppliesAreWrong = false;

   constructor( private _emplSupplies: EmployessSuppliesServices,
      private route: ActivatedRoute,
      private listaService: ListaService,
      private navService: NavService ) {
   }

   ngOnInit() {

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

      this.minDate = new Date();

      this.route.params.subscribe( ( params: Params ) => {
         this._emplSupplies.getEmployeeProjection( params[ 'idEmployeeAssign' ] ).subscribe( res => {
            this.employessAssign = res;

            // load all additional supplies of the employee
            this._emplSupplies.getAllAdditionalUnasignedByIdEmployeeAndProjection( this.employessAssign.idProyeccionDotacion,
                                                                                   this.employessAssign.idTercero )
            .subscribe( additionals => {
               this.employeeAditionalSupplies = additionals;
            } );

            // load all supplies of the employee
            this._emplSupplies.getAllSuppliesByEmployeeProjection( this.employessAssign.idProyeccionDotacionTerceros ).subscribe(
               supplies => {
                  this.employeeSupplies = supplies;
               }
            );

         } );
      } );

      this.listaService.getMasterDetailsByCode( 'ListasEstadosProyeccionesTerceros', 'ASIG' ).subscribe( res => {
         this.assignState = res;
      } );
   }

   toggleSupply( supply: EmployessSuppliesProjectionSupply ) {
      if ( !supply.indicadorHabilitado ) {
         supply.cantidadAsignada = 1;
      }
   }

   assignProjection() {
      if ( this.checkEmptySupplies() ) {
         this.someSuppliesAreWrong = false;
         this._emplSupplies.updateEmployeeSupplies( this.employeeSupplies ).subscribe( resSupplies => {
            if ( resSupplies ) {
               if ( this.assignState ) {
                  this.employessAssign.idEstado = this.assignState.idLista;
                  this._emplSupplies.updateProjection( this.employessAssign ).subscribe( resProj => {
                     if ( resProj ) {
                        this.navService.setMesage( 2 );
                     }
                  } );
               } else {
                  this.navService.setMesage( 3 );
               }
            } else {
               this.navService.setMesage( 3 );
            }
         }, error => {
            this.navService.setMesage( 3 );
         } );
      } else {
         this.someSuppliesAreWrong = true;
      }
   }

   private checkEmptySupplies() : boolean {
      let wrong = false;
      for(let supplie of this.employeeSupplies){
         if(supplie.cantidadAsignada === undefined || supplie.cantidadAsignada === null || supplie.cantidadAsignada === 0 ){
            wrong = true;
         }
      }
      return wrong;
   }
}
