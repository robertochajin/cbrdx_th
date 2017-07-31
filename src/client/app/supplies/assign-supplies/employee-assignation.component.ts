import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { EmployessSuppliesProjection } from '../../_models/employessSuppliesProjection';
import { ActivatedRoute, Params } from '@angular/router';
import { NavService } from '../../_services/_nav.service';
import { ConfirmationService, Message } from 'primeng/primeng';
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
   private deliverState: ListaItem;
   private empProyectionStates: ListaItem[] = [];

   constructor( private _emplSupplies: EmployessSuppliesServices,
      private route: ActivatedRoute,
      private location: Location,
      private confirmationService: ConfirmationService,
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

      this.listaService.getMasterDetails( 'ListasEstadosProyeccionesTerceros' ).subscribe( res => {
         this.empProyectionStates = res;

         this.assignState = this.empProyectionStates.find( s => s.codigo === 'ASIG' );
         this.deliverState = this.empProyectionStates.find( s => s.codigo === 'ENTRE' );
         // Se consulta la proyeccion del trabajador
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
                     supplies.map( ( s: EmployessSuppliesProjectionSupply ) => {
                        s.indicadorEntregado = s.indicadorHabilitado;
                        s.cantidadPorDefecto = s.cantidadAsignada;
                     } );
                     this.employeeSupplies = supplies;
                  }
               );

            } );
         } );
      } );
   }

   toggleSupply( supply: EmployessSuppliesProjectionSupply ) {

      if ( this.assignState.idLista === this.employessAssign.idEstado ) {
         if ( !supply.indicadorEntregado ) {
            supply.cantidadEntregada = supply.cantidadAsignada;
         }
      } else {
         if ( !supply.indicadorHabilitado ) {
            supply.cantidadAsignada = supply.cantidadPorDefecto;
         }
      }

   }

   assignProjection() {
      this.confirmationService.confirm( {
                                           message: ` ¿Está seguro de confirmar la asignación?`,
                                           header: 'Confirmación',
                                           icon: 'fa fa-question-circle',
                                           accept: () => {
                                              this.updatePrjection();
                                           }
                                        } );
   }

   updatePrjection() {
      if ( !this.checkEmptySupplies() ) {
         this.someSuppliesAreWrong = false;

         if ( this.employessAssign.idEstado !== this.assignState.idLista ) {
            //Si no tiene estado asignado se define asignado
            this.employessAssign.idEstado = this.assignState.idLista;

            for ( let s of this.employeeSupplies ) {
               if ( s.indicadorHabilitado ) {
                  s.cantidadEntregada = s.cantidadAsignada;
               } else {
                  s.cantidadEntregada = 0;
               }
            }
         } else if ( this.employessAssign.idEstado === this.assignState.idLista ) {
            //Si el estado es asignado lo pasa a entregado
            this.employessAssign.idEstado = this.deliverState.idLista;

            for ( let s of this.employeeSupplies ) {
               s.indicadorHabilitado = s.indicadorEntregado;
            }
         }

         this._emplSupplies.updateEmployeeSupplies( this.employeeSupplies )
         .subscribe( resSupplies => {
            if ( resSupplies ) {
               this._emplSupplies.updateProjection( this.employessAssign )
               .subscribe( resProj => {
                  if ( resProj ) {
                     this.navService.setMesage( 2 );
                     this.location.back();
                  }
               }, error => {
                  this.navService.setMesage( 3 );
               }  );
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

   private checkEmptySupplies(): boolean {
      let wrong = false;
      for ( let supply of this.employeeSupplies ) {
         if ( ( supply.cantidadAsignada === undefined ||
                supply.cantidadAsignada === null ||
                supply.cantidadAsignada === 0 ||
                supply.cantidadAsignada > supply.cantidadPorDefecto) &&
              (supply.indicadorHabilitado && supply.indicadorEntregado) ) {
            wrong = true;
         }
      }
      return wrong;
   }

   goBack( fDirty: boolean ): void {
      if ( fDirty ) {
         this.confirmationService.confirm( {
                                              message: ` ¿Está seguro que desea salir sin guardar?`,
                                              header: 'Confirmación',
                                              icon: 'fa fa-question-circle',
                                              accept: () => {
                                                 this.location.back();
                                              }
                                           } );
      } else {
         this.location.back();
      }
   }
}
