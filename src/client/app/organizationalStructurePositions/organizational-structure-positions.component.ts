import { Component, OnInit } from '@angular/core';
import { OrganizationalStructure } from '../_models/organizationalStructure';
import { OrganizationalStructurePositions } from '../_models/organizationalStructurePositions';
import { Positions } from '../_models/positions';
import { ConfirmationService, SelectItem, TreeNode } from 'primeng/components/common/api';
import { PositionsService } from '../_services/positions.service';
import { OrganizationalStructurePositionsServices } from '../_services/organizationalStructurePositions.service';
import { OrganizationalStructureService } from '../_services/organizationalStructure.service';
import { PersonPositionsServices } from '../_services/personPositions.service';
import { PersonPositions } from '../_models/personPositions';
import { EmployeesService } from '../_services/employees.service';
import { Employee } from '../_models/employees';
import * as moment from 'moment/moment';
import { ListaItem } from '../_models/listaItem';
import { ListaService } from '../_services/lista.service';

@Component( {
               moduleId: module.id,
               selector: 'organizational-structure-positions',
               templateUrl: 'organizational-structure-positions.component.html',
               providers: [ ConfirmationService ]
            } )

export class OrganizationalStructurePositionsComponent implements OnInit {

   countSlots = 0;
   positionRepeated = false;
   editingPosition = false;
   editingPerson = false;
   badPostion = false;
   countCost = 0;
   area: OrganizationalStructure = new OrganizationalStructure();
   listOrganizationalStructure: OrganizationalStructure[];
   osPosition: OrganizationalStructurePositions = new OrganizationalStructurePositions();
   backUpOSPosition: OrganizationalStructurePositions = new OrganizationalStructurePositions();
   osPositions: OrganizationalStructurePositions[] = [];
   personsPosition: PersonPositions = new PersonPositions();
   backUpPersonsPosition: PersonPositions = new PersonPositions();
   personsPositions: PersonPositions[] = [];
   postionSlots: PersonPositions[] = [];
   positionList: Positions[] = [];
   selectedPosition: Positions = new Positions();
   employeeList: Employee [] = [];
   selectedEmployee: Employee = null;
   badEmployee = true;
   range: string;
   contracTypeList: SelectItem [] = [];
   treedCompany: TreeNode[] = [];
   selectedNode: TreeNode;
   es: any;
   maxDate: Date = null;

   constructor( private positionsService: PositionsService,
      private ospService: OrganizationalStructurePositionsServices,
      private employeesService: EmployeesService,
      private organizationalStructureService: OrganizationalStructureService,
      private personPositionService: PersonPositionsServices,
      private listaService: ListaService,
      private confirmationService: ConfirmationService ) {

      organizationalStructureService.getAllEnabled().subscribe( res => {
         this.listOrganizationalStructure = res;
         for ( let c of this.listOrganizationalStructure.filter( t => t.idPadre === 0 || t.idPadre === null ) ) {
            let companyNode = {
               'label': c.nombre,
               'data': c,
               'leaf': false,
               'expanded': true
            };
            this.treedCompany.push( companyNode );
            this.nodeExpand( companyNode );
         }
      } );
   }

   ngOnInit() {
      this.es = {
         firstDayOfWeek: 1,
         dayNames: [ 'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado' ],
         dayNamesShort: [ 'dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb' ],
         dayNamesMin: [ 'D', 'L', 'M', 'X', 'J', 'V', 'S' ],
         monthNames: [ 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre',
            'octubre', 'noviembre', 'diciembre'
         ],
         monthNamesShort: [ 'ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic' ]
      };

      let today = new Date();
      let month = today.getMonth();
      let year = today.getFullYear();
      let lastYear = year - 100;
      this.maxDate = new Date();
      this.maxDate.setFullYear( year, month, today.getDate() );
      this.range = `${lastYear}:${year}`;

      this.listaService.getMasterDetails( 'ListasTiposContratos' ).subscribe( res => {
         this.contracTypeList.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.contracTypeList.push( { label: s.nombre, value: s.idLista } );
         } );
      } );
   }

   nodeExpand( node: any ) {
      let chilNodes: TreeNode[] = [];
      for ( let c of this.listOrganizationalStructure.filter( t => t.idPadre === node.data.idEstructuraOrganizacional ) ) {
         chilNodes.push( {
                            'label': c.nombre,
                            'data': c,
                            'parent': node,
                            'leaf': false,
                            'children': []
                         } );
      }
      node.children = chilNodes;

   }

   nodeSelect( node: any ) {
      if ( node.data.idPadre !== null && node.data.idPadre !== 0 ) {
         this.area = node.data;
         this.ospService.getAllByOrganizacionalStructure( this.area.idEstructuraOrganizacional ).subscribe( list => {
            this.osPositions = list;
            this.sumPositions();
            this.handleChangeTab( 1 );
            this.editingPerson = false;
            this.editingPosition = false;
         } );

      }
   }

   editPosition( osPosition: OrganizationalStructurePositions ) {
      if ( osPosition !== null ) {
         this.backUpOSPosition = osPosition;
         this.osPosition = osPosition;
         this.selectedPosition = new Positions();
         this.selectedPosition.idCargo = osPosition.idCargo;
         this.selectedPosition.cargo = osPosition.cargo;
      } else {
         this.osPosition = new OrganizationalStructurePositions();
         this.selectedPosition = null;
      }
      this.editingPosition = true;
   }

   delete( osPosition: OrganizationalStructurePositions ) {
      this.confirmationService.confirm( {
                                           message: ` ¿Esta seguro que desea eliminar?`,
                                           header: 'Corfirmación',
                                           icon: 'fa fa-question-circle',
                                           accept: () => {
                                              osPosition.indicadorHabilitado = false;
                                              this.ospService.update( osPosition ).subscribe( ( r: any ) => {
                                                 this.osPositions.splice( this.osPositions.indexOf( osPosition ), 1 );
                                                 this.sumPositions();
                                              } );
                                           }
                                        } );
   }

   removePerson( personPosition: PersonPositions ) {
      this.confirmationService.confirm( {
                                           message: ` ¿Esta seguro que desea retirar este trabajador del cargo?`,
                                           header: 'Corfirmación',
                                           icon: 'fa fa-question-circle',
                                           accept: () => {
                                              personPosition.indicadorHabilitado = false;
                                              this.personPositionService.update( personPosition ).subscribe( ( r: any ) => {
                                                 personPosition.idTercero = 0;
                                                 personPosition.nombreCompleto = '';
                                                 personPosition.asignadoDesde = null;
                                                 personPosition.idTipoContrato = null;
                                                 this.postionSlots[ this.postionSlots.indexOf( personPosition ) ] = personPosition;
                                              } );
                                           }
                                        } );
   }

   isRepeated( idCargo: number, idEstructuraOrganizacionalCargo: number ): boolean {
      this.positionRepeated = false;
      this.osPositions.map( osp => {
         if ( idCargo !== null && idCargo === osp.idCargo && idEstructuraOrganizacionalCargo !== osp.idEstructuraOrganizacionalCargo ) {
            this.positionRepeated = true;
         }
      } );

      return this.positionRepeated;
   }

   savePosition() {
      if ( this.osPosition.cargo != undefined && this.osPosition.idCargo != undefined ) {
         if ( this.osPosition.idEstructuraOrganizacionalCargo !== undefined && this.osPosition.idEstructuraOrganizacionalCargo !== null ) {
            this.ospService.update( this.osPosition ).subscribe( data => {
               this.osPositions[ this.osPositions.indexOf( this.backUpOSPosition ) ] = this.osPosition;
               this.editingPosition = false;
               this.osPosition = new OrganizationalStructurePositions();
               this.sumPositions();
            } );
         } else {
            this.osPosition.idEstructuraOrganizacional = this.area.idEstructuraOrganizacional;
            this.ospService.add( this.osPosition ).subscribe( data => {
               this.osPosition.idEstructuraOrganizacionalCargo = data.idEstructuraOrganizacionalCargo;
               this.osPositions.push( this.osPosition );
               this.editingPosition = false;
               this.sumPositions();
            } );
         }
      } else {
         this.badPostion = true;
      }
   }

   positionSearch( event: any ) {
      this.positionsService.getByWildCard( event.query ).subscribe( list => this.positionList = list );
   }

   capturePosition( event: any ) {
      if ( !this.isRepeated( event.idCargo, this.osPosition.idEstructuraOrganizacionalCargo ) ) {
         this.osPosition.idCargo = event.idCargo;
         this.osPosition.cargo = event.cargo;
         this.osPosition.salario = event.salario;
         this.badPostion = false;
         this.positionRepeated = false;
      } else {
         this.selectedPosition = null;
         this.badPostion = false;
      }
   }

   employeeSearch( event: any ) {
      this.employeesService.getTerColWithoutPosition( event.query ).subscribe( list => {
         this.employeeList = list;
         this.employeeList.map(
            e => e.nombreCompleto = e.primerNombre + ' ' + e.segundoNombre + ' ' + e.primerApellido + ' ' + e.segundoApellido );
      } );
   }

   captureEmployee( event: any ) {
      this.personsPosition.idTercero = this.selectedEmployee.idTercero;
      this.badEmployee = false;
   }

   savePersonPosition() {
      if ( this.personsPosition.idTercero !== this.selectedEmployee.idTercero ) {
         this.badEmployee = true;
      } else {

         let fi: moment.Moment = moment( this.personsPosition.asignadoDesde, 'MM/DD/YYYY' );
         this.personsPosition.asignadoDesde = fi.add( 2, 'days' ).format( 'YYYY-MM-DD' );
         if ( this.personsPosition.idTerceroCargo === null ) {
            this.personPositionService.add( this.personsPosition ).subscribe( res => {
               res.nombreCompleto = this.selectedEmployee.nombreCompleto;
               res.cargo = this.personsPosition.cargo;

               res.asignadoDesde = fi.subtract( 2, 'days' ).format( 'YYYY-MM-DD' );
               this.postionSlots[ this.postionSlots.indexOf( this.backUpPersonsPosition ) ] = res;
               this.editingPerson = false;
            } );
         } else {
            this.personPositionService.update( this.personsPosition ).subscribe( res => {
               if ( res.ok ) {
                  this.personsPosition.nombreCompleto = this.selectedEmployee.nombreCompleto;
                  this.personsPosition.cargo = this.personsPosition.cargo;
                  this.personsPosition.asignadoDesde = fi.subtract( 2, 'days' ).format( 'YYYY-MM-DD' );
                  this.postionSlots[ this.postionSlots.indexOf( this.backUpPersonsPosition ) ] = this.personsPosition;
                  this.editingPerson = false;
               }
            } );
         }
      }
   }

   cancelEditingPosition() {
      this.confirmationService.confirm( {
                                           message: ` ¿Esta seguro que cancelar la edición?`,
                                           header: 'Corfirmación',
                                           icon: 'fa fa-question-circle',
                                           accept: () => {
                                              if ( this.backUpOSPosition !== null ) {
                                                 this.backUpOSPosition = null;
                                              }
                                              this.editingPosition = false;
                                           }
                                        } );
   }

   cancelEditingPerson() {

      this.confirmationService.confirm( {
                                           message: ` ¿Esta seguro que cancelar la edición?`,
                                           header: 'Corfirmación',
                                           icon: 'fa fa-question-circle',
                                           accept: () => {
                                              if ( this.backUpPersonsPosition !== null ) {
                                                 this.personsPositions[ this.personsPositions.indexOf(
                                                    this.backUpPersonsPosition ) ] = this.backUpPersonsPosition;
                                                 this.backUpPersonsPosition = null;
                                              }
                                              this.editingPerson = false;
                                           }
                                        } );
   }

   sumPositions() {
      this.countCost = 0;
      this.countSlots = 0;
      for ( let position of this.osPositions ) {
         this.countCost = this.countCost + (Number( position.salario ) * Number( position.plazas ));
         this.countSlots = this.countSlots + Number( position.plazas );
      }
   }

   handleChangeTab( index: number ) {
      if ( index === 1 ) {
         this.postionSlots = [];
         for ( let osp of this.osPositions ) {
            this.addSlots( osp.idCargo, osp.cargo, osp.idEstructuraOrganizacionalCargo, osp.plazas );
         }
         this.personPositionService.getAllByOrganizationalStructure( this.area.idEstructuraOrganizacional ).subscribe( listPerson => {
            this.personsPositions = listPerson;
            this.personsPositions.map( pp => {
               pp.nombreCompleto = pp.primerNombre + ' ' + pp.segundoNombre + ' ' + pp.primerApellido + ' ' + pp.segundoApellido;
               let fi: moment.Moment = moment( pp.asignadoDesde, 'YYYY-MM-DD' );
               pp.asignadoDesde = fi.add( 1, 'days' ).format( 'YYYY-MM-DD' );
               this.assingPerson( pp, null );
            } );
         } );
      }
   }

   editPersonSlot( pp: PersonPositions ) {

      this.backUpPersonsPosition = new PersonPositions();
      this.backUpPersonsPosition = pp;
      this.personsPosition = JSON.parse( JSON.stringify( pp ) );
      if ( this.personsPosition.asignadoDesde !== undefined ) {
         let fi: moment.Moment = moment( this.personsPosition.asignadoDesde, 'YYYY-MM-DD' );
         this.personsPosition.asignadoDesde = fi.format( 'MM/DD/YYYY' );
      }

      if ( this.personsPosition.nombreCompleto !== '' ) {
         this.selectedEmployee = new Employee();
         this.selectedEmployee.nombreCompleto = this.personsPosition.nombreCompleto;
         this.selectedEmployee.idTercero = this.personsPosition.idTercero;
         this.badEmployee = false;
      } else {
         this.selectedEmployee = null;
      }
      this.editingPerson = true;
   }

   onSelectBegin( event: any ) {
      let d = new Date( Date.parse( event ) );
      this.personsPosition.asignadoDesde = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
   }

   addSlots( idCargo: number, nombreCargo: string, idEstructuraOrganizacionalCargo: number, slots: number ) {
      let index = this.postionSlots.findIndex( ps => ps.idCargo === idCargo );
      for ( let i = 1; i <= slots; i++ ) {
         let personPosition: PersonPositions = new PersonPositions();
         personPosition.cargo = nombreCargo;
         personPosition.idCargo = idCargo;
         personPosition.idEstructuraOrganizacionalCargo = idEstructuraOrganizacionalCargo;
         personPosition.nombreCompleto = '';
         personPosition.idTerceroCargo = null;
         personPosition.idSede = 0;
         personPosition.idTipoContrato = 0;
         personPosition.indicadorHabilitado = true;
         personPosition.auditoriaUsuario = 1;
         personPosition.auditoriaFecha = '';
         personPosition.idTercero = 0;
         if ( index !== -1 ) {
            this.postionSlots.splice( index, 0, personPosition );
         } else {
            this.postionSlots.push( personPosition );
         }
      }
   }

   assingPerson( person: PersonPositions, index: number = null ) {
      if ( index === null ) {
         index = this.postionSlots.findIndex( ps => (ps.idCargo === person.idCargo && ps.idTercero === 0) );
      }
      if ( index !== -1 ) {
         this.postionSlots[ index ] = person;
      }
   }

   confirmStructure() {
      // actualizar la estructura
      this.confirmationService.confirm( {
                                           message: ` ¿Esta seguro que confirmar esta planta? Después de confirmar no 
                                           podrá hacer modificaciones sobre los cargos`,
                                           header: 'Corfirmación',
                                           icon: 'fa fa-question-circle',
                                           accept: () => {
                                              this.area.indicadorPlantaConfirmada = true;
                                              this.organizationalStructureService
                                              .updateOrganizationalStructure( this.area )
                                              .then( ( r: any ) => {
                                                 if ( !r.ok ) {
                                                    this.area.indicadorPlantaConfirmada = true;
                                                 }
                                              } );
                                           }
                                        } );
   }
}
