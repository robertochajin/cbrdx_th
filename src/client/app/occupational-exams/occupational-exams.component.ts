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
import { VTercero } from '../_models/vTercero';
import { MedicalExamService } from '../_services/medical-exam.service';
import { AdjuntosService } from '../_services/adjuntos.service';

@Component( {
               moduleId: module.id,
               templateUrl: 'occupational-exams.component.html',
               selector: 'occupational-exams',
               providers: [ ConfirmationService ]
            } )
export class OccupationalExamsComponent {
   msg: Message;
   listEmployee: VTercero[] = [];
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
   showTable: boolean = false;
   public url = '';
   public title = '';
   displayDialog: boolean = false;

   constructor( private employeesService: EmployeesService,
      private listaService: ListaService,
      private medicalExamService: MedicalExamService,
      private organizationalStructurePositionsServices: OrganizationalStructurePositionsServices,
      private organizationalStructureService: OrganizationalStructureService,
      private tipoDeAreaService: TipoDeAreaService,
      private router: Router,
      private adjuntosService: AdjuntosService,
      private _nav: NavService,
      private confirmationService: ConfirmationService ) {

      this.busqueda = _nav.getSearch( 'document-management' );

   }

   ngOnInit(): void {
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
      this.selectedPositions = [];
      this.organizationalStructurePositionsServices.getAllByOrganizacionalStructure( this.idArea ).subscribe( rs => {
         this.listPosition = rs;
      } );
   }

   clearFilter() {
      this.listPosition = [];
      this.idTipoArea = null;
      this.idArea = null;
      this.listArea = [];
      this.listEmployee = [];
      this.showTable = false;
      this.selectedPositions = [];
   }

   onSubmitFilter() {
      if ( this.selectedPositions.length > 0 ) {
         this.listEmployee = [];
         this.employeesService.getAllByOrganiztionalStructurePosition( this.selectedPositions ).subscribe( rs => {
            if ( rs.length > 0 ) {
               for ( let c of rs ) {
                  c.nombreCompleto = c.primerNombre + ' ' +
                                     c.segundoNombre + ' ' +
                                     c.primerApellido + ' ' +
                                     c.segundoApellido;
                  this.listEmployee.push( c );
               }
               this.showTable = true;
            } else {
               this.showTable = false;
               this._nav.setMesage( 0, { severity: 'info', summary: 'Info', detail: 'No se encotraron resultados en la busqueda.' } );
            }
         } );
      }
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

   sendExam() {
      this.listSelectEmployee;
      this.medicalExamService.sendExam( this.listSelectEmployee ).subscribe( rs => {
         this._nav.setMesage( 0, { severity: 'info', summary: 'Info', detail: 'Examenes enviados con exito!' } )
      });
   }

   previewFile( id: number ) {
      this.adjuntosService.downloadFile( id ).subscribe( res => {
         let blob_url = URL.createObjectURL( res );
         this.url = blob_url;
         this.displayDialog = true;
      } );
   }
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
