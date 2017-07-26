import { Component, OnInit } from '@angular/core';
import { EmployessSuppliesProjection } from '../../_models/employessSuppliesProjection';
import { EmployessSuppliesServices } from '../../_services/employeesSupplies.service';
import { Router } from '@angular/router';
import { NavService } from '../../_services/_nav.service';

@Component( {
               moduleId: module.id,
               selector: 'assignation-list',
               templateUrl: 'assignation-list.component.html'
            } )
export class AssignationListComponent implements OnInit {

   public projectedEmployess: EmployessSuppliesProjection[] = [];
   private busqueda: string;

   constructor( private employessSuppliesServices: EmployessSuppliesServices,
      private router: Router,
      private _nav: NavService ) {
      this.busqueda = _nav.getSearch( 'assignation-list.component' );
   }

   ngOnInit() {
      this.employessSuppliesServices.getAllEmployeesSuppliesByProjection( 2 ).subscribe( list => {
         this.projectedEmployess = list;
      } );
   }

   add() {
      // permite visualizar el buscador de terceros para crear un registro y relacionarlo a la proyección
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