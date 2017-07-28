import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { EmployessSuppliesProjection } from '../../_models/employessSuppliesProjection';
import { ActivatedRoute, Params } from '@angular/router';
import { EmployessSuppliesServices } from '../../_services/employeesSupplies.service';
import { EmployessSuppliesProjectionSupply } from '../../_models/employessSuppliesProjectionSupply';
import { EmployessSuppliesAdditional } from '../../_models/employessSuppliesAdditional';
import { ListaItem } from '../../_models/listaItem';
import { ListaService } from '../../_services/lista.service';

@Component( {
               moduleId: module.id,
               selector: 'employee-assignation-detail',
               templateUrl: 'employee-assignation-detail.component.html'
            } )
export class EmployeeAssignationDetailComponent implements OnInit {

   public employessAssign: EmployessSuppliesProjection = new EmployessSuppliesProjection();
   public employeeSupplies: EmployessSuppliesProjectionSupply[] = [];
   public employeeAditionalSupplies: EmployessSuppliesAdditional[] = [];
   private assignState: ListaItem;
   private deliverState: ListaItem;
   private empProyectionStates: ListaItem[] = [];

   constructor( private _emplSupplies: EmployessSuppliesServices,
      private location: Location,
      private listaService: ListaService,
      private route: ActivatedRoute ) {
   }

   ngOnInit() {

      this.listaService.getMasterDetails( 'ListasEstadosProyeccionesTerceros' ).subscribe( res => {
         this.empProyectionStates = res;

         this.assignState = this.empProyectionStates.find( s => s.codigo === 'ASIG' );
         this.deliverState = this.empProyectionStates.find( s => s.codigo === 'ENTRE' );

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
                     supplies.map( s => {
                        s.indicadorEntregado = s.indicadorHabilitado;
                     } );
                     this.employeeSupplies = supplies;
                  }
               );

            } );
         } );
      } );
   }

   goBack(): void {
      this.location.back();
   }

}
