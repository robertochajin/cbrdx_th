import { Component, OnInit, Input } from '@angular/core';
import { EmployessSuppliesServices } from '../../_services/employeesSupplies.service';
import { Router } from '@angular/router';
import { ConfirmationService , Message, SelectItem } from 'primeng/primeng';
import { NavService } from '../../_services/_nav.service';
import { Employee } from '../../_models/employees';
import { EmployessSuppliesAdditional } from '../../_models/employessSuppliesAdditional';

@Component( {
               moduleId: module.id,
               templateUrl: 'supplies-employees.component.html',
               selector: 'supplies-employees-component',
               providers: [ ConfirmationService ]
            } )

export class SuppliesEmployeesComponent implements OnInit {
   @Input()
   employee: Employee;
   suppliesAdditional: EmployessSuppliesAdditional = new EmployessSuppliesAdditional();
   listSuppliesAdditional: EmployessSuppliesAdditional[] = [];
   busqueda: string;
   showForm: boolean = false;
   msgs: Message[] = [];
   listSupplies: SelectItem[] = [];

   constructor( private employessSuppliesServices: EmployessSuppliesServices,
      private router: Router,
      private confirmationService: ConfirmationService,
      private navService: NavService ) {
      this.busqueda = navService.getSearch( 'supplies-employees-component' );

      /*listaService.getMasterDetails( 'ListasTiposPersonas' ).subscribe( res => {
         this.personTypes.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.personTypes.push( { label: s.nombre, value: s.idLista } );
         } );
         this.employee.idTipoPersona = null;
      } );*/
   }

   ngOnInit() {
      this.suppliesAdditional.idTercero = this.employee.idTercero;
      this.getList();
   }

   add() {
      this.showForm = true;
      this.suppliesAdditional = new EmployessSuppliesAdditional();
      this.suppliesAdditional.idTercero = this.employee.idTercero;
   }

   update( c: EmployessSuppliesAdditional ) {
      this.showForm = true;
      this.suppliesAdditional = c;
   }

   goBack( fDirty: boolean ): void {
      if ( fDirty ) {
         this.confirmationService.confirm( {
                                              message: ` ¿Está seguro que desea salir sin guardar?`,
                                              header: 'Confirmación',
                                              icon: 'fa fa-question-circle',
                                              accept: () => {
                                                 this.showForm = false;
                                                 this.suppliesAdditional = new EmployessSuppliesAdditional();
                                              }
                                           } );
      } else {
         this.showForm = false;
         this.suppliesAdditional = new EmployessSuppliesAdditional();
      }
   }

   onSubmit() {
      this.suppliesAdditional.idTercero = this.employee.idTercero;
         this.employessSuppliesServices.addAdditional( this.suppliesAdditional ).subscribe( res => {
            this.navService.setMesage( 1, this.msgs );
            this.showForm = false;
            this.suppliesAdditional = new EmployessSuppliesAdditional();
            this.getList();
         }, error => {
            this.navService.setMesage( 3, this.msgs );
         } );
   }

   getList(){
      this.employessSuppliesServices.getAllAdditionalByIdEmployee( this.employee.idTercero ).subscribe( data => {
         this.listSuppliesAdditional = data;
      } );
   }

   setSearch() {
      this.navService.setSearch( 'supplies-employees-component', this.busqueda );
   }

}
