import { Component } from '@angular/core';
import { ConfirmationService } from 'primeng/components/common/api';
import { SelectItem, Message } from 'primeng/primeng';
import { ListaService } from '../_services/lista.service';
import { NavService } from '../_services/_nav.service';
import { DocumentManagement } from '../_models/document-management';
import { DocumentManagementService } from '../_services/document-managgement.service';
import { Router } from '@angular/router';
import { Employee } from '../_models/employees';
import { EmployeesService } from '../_services/employees.service';
import { PositionsService } from '../_services/positions.service';
import { PhysicStructureService } from '../_services/physic-structure.service';
import { ListaItem } from '../_models/listaItem';
import { TipoDeAreaService } from '../_services/tipoDeArea.service';
import { OrganizationalStructureService } from '../_services/organizationalStructure.service';
import { OrganizationalStructure } from '../_models/organizationalStructure';
import { OrganizationalStructurePositionsServices } from '../_services/organizationalStructurePositions.service';
import { OrganizationalStructurePositions } from '../_models/organizationalStructurePositions';

@Component( {
               moduleId: module.id,
               templateUrl: 'occupational-exams.component.html',
               selector: 'occupational-exams',
               providers: [ ConfirmationService ]
            } )
export class OccupationalExamsComponent {
   msg: Message;
   listEmployee: Employee[] = [];
   listSelectEmployee: any[] = [];
   listTypeArea: SelectItem[] = [];
   listArea: SelectItem[] = [];
   listAreaTemp: OrganizationalStructure[] = [];
   listPosition: OrganizationalStructurePositions[] = [];
   selectedPositions: OrganizationalStructurePositions[] = [];
   idTipoArea: number;
   idArea: number;
   busqueda: string;
   allEmployee: boolean = false;

   constructor( private employeesService: EmployeesService,
      private listaService: ListaService,
      private positionsService: PositionsService,
      private organizationalStructurePositionsServices: OrganizationalStructurePositionsServices,
      private organizationalStructureService: OrganizationalStructureService,
      private tipoDeAreaService: TipoDeAreaService,
      private router: Router,
      private _nav: NavService,
      private confirmationService: ConfirmationService ) {

      this.busqueda = _nav.getSearch( 'document-management' );

   }

   ngOnInit(): void {
      this.employeesService.getAll().subscribe( rs => {
         for ( let t of rs ) {
            t.nombreCompleto = t.primerNombre + ' ' +
                               t.segundoNombre + ' ' +
                               t.primerApellido + ' ' +
                               t.segundoApellido;
            this.listEmployee.push( t );
         }
      } );
      // this.positionsService.getAll().subscribe( rs => {
      //    this.listPosition = rs;
      // } );
      this.organizationalStructureService.getAllEnabled().subscribe( rs => {
         this.listAreaTemp = rs;
         this.listArea.push( { label: 'Seleccione', value: null } );
      } );
      this.tipoDeAreaService.listAreas().subscribe( rs => {
         this.listTypeArea.push( { label: 'Seleccione', value: null } );
         rs.map( ( s: any ) => {
            this.listTypeArea.push( { label: s.estructuraArea, value: s.idEstructuraArea } );
         } );
      } );

   }

   changeTypeArea() {
      this.listArea = [];
      this.listArea.push( { label: 'Seleccione', value: null } );
      for ( let c of this.listAreaTemp ) {
         if ( c.idTipoArea === this.idTipoArea ) {
            this.listArea.push( { label: c.nombre + '/' + c.estructuraFisica, value: c.idEstructuraOrganizacional } );
         }
      }
   }

   changeArea() {
      this.listPosition = [];
      this.organizationalStructurePositionsServices.getAllByOrganizacionalStructure( this.idArea ).subscribe( rs => {
         this.listPosition = rs;
      } );
   }

   clearFilter() {
      this.listPosition = [];
      this.idTipoArea = null;
      this.idArea = null;
      this.listArea = [];
   }

   onSubmitFilter() {
      if ( this.selectedPositions.length > 0 ) {
         this.selectedPositions;
      }
      this.selectedPositions;
   }

   selectEmployee() {
      let temp: any[] = [];
      if ( this.allEmployee ) {
         for ( let e of this.listEmployee ) {
            temp.push( e.idTercero.toString() );
         }
         this.listSelectEmployee = temp;
      } else {
         this.listSelectEmployee = [];
      }
   }

   //
   // add() {
   //    this.router.navigate( [ 'document-management/add' ] );
   // }

   update( d: DocumentManagement ) {
      // this.router.navigate( [ 'document-management/update/', d.idDocumentoTercero ] );
   }

   detail( d: DocumentManagement ) {
      // this.router.navigate( [ 'document-management/detail/', d.idDocumentoTercero ] );
   }

   setSearch() {
      this._nav.setSearch( 'document-management', this.busqueda );
   }
}
