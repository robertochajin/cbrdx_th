import { Component, OnInit, Input } from '@angular/core';
import { EmployessSuppliesServices } from '../../_services/employeesSupplies.service';
import { Router } from '@angular/router';
import { ConfirmationService , Message, SelectItem } from 'primeng/primeng';
import { NavService } from '../../_services/_nav.service';
import { Employee } from '../../_models/employees';
import { EmployessSuppliesAdditional } from '../../_models/employessSuppliesAdditional';
import { SuppliesService } from '../../_services/supplies.service';
import { Supplies } from '../../_models/supplies';

@Component( {
               moduleId: module.id,
               templateUrl: 'supplies-employees.component.html',
               selector: 'supplies-employees-component',
               providers: [ ConfirmationService, EmployessSuppliesServices ]
            } )

export class SuppliesEmployeesComponent implements OnInit {
   @Input()
   employee: Employee;
   suppliesAdditional: EmployessSuppliesAdditional = new EmployessSuppliesAdditional();
   dialogObjet: EmployessSuppliesAdditional = new EmployessSuppliesAdditional();
   listSuppliesAdditional: EmployessSuppliesAdditional[] = [];
   busqueda: string;
   showForm: boolean = false;
   msgs: Message[] = [];
   listSupplies: SelectItem[] = [];
   allSupplies: Supplies[] = [];

   constructor( private employessSuppliesServices: EmployessSuppliesServices,
      private suppliesService: SuppliesService,
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
      this.getSupplies();
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

   del( c: EmployessSuppliesAdditional ) {
      this.dialogObjet = c;
      this.confirmationService.confirm( {
                                           message: ` ¿Está seguro que desea inactivar el registro?`,
                                           header: 'Confirmación',
                                           icon: 'fa fa-question-circle',
                                           accept: () => {
                                              this.dialogObjet.indicadorHabilitado = false;
                                              this.employessSuppliesServices.updateAdditional( this.dialogObjet ).subscribe( ( r: any ) => {
                                                 this.listSuppliesAdditional.splice(
                                                    this.listSuppliesAdditional.indexOf( this.dialogObjet ), 1 );
                                                 this.dialogObjet = null;
                                              } );
                                           }
                                        } );
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
      if ( this.suppliesAdditional.idProyeccionDotacion > 0 ) {
         this.employessSuppliesServices.updateAdditional( this.suppliesAdditional ).subscribe( res => {
            this.navService.setMesage( 1, this.msgs );
            this.showForm = false;
            this.suppliesAdditional = new EmployessSuppliesAdditional();
            this.getList();
         }, error => {
            this.navService.setMesage( 3, this.msgs );
         } );
      } else {
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
   }

   getList(){
      this.employessSuppliesServices.getAllAdditionalByIdEmployee( this.employee.idTercero ).subscribe( data => {
         this.listSuppliesAdditional = data;
      } );
   }

   setSearch() {
      this.navService.setSearch( 'supplies-employees-component', this.busqueda );
   }

   getSupplies() {
      this.suppliesService.getSuppliesEnable().subscribe(
         res => {
            this.allSupplies = res;
            this.listSupplies.push( { label: 'Seleccione', value: null } );
            res.map( s => {
               this.listSupplies.push( { label: s.dotacion, value: s.idDotacion } );
            } );
         }
      );
   }

   changeSupply() {
      if ( this.suppliesAdditional.idDotacion > 0 ) {
         this.suppliesAdditional.costo = this.allSupplies.find( s => s.idDotacion === this.suppliesAdditional.idDotacion ).costo;
      } else {
         this.suppliesAdditional.costo = 0;
      }
   }

}
