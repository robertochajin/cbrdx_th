import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import {OrganizationalStructure} from "../_models/organizationalStructure";
import {OrganizationalStructurePositions} from "../_models/organizationalStructurePositions";
import {Positions} from "../_models/positions";
import {ConfirmationService, SelectItem} from "primeng/components/common/api";
import {PositionsService} from "../_services/positions.service";
import {OrganizationalStructurePositionsServices} from "../_services/organizationalStructurePositions.service";
import {OrganizationalStructureService} from "../_services/organizationalStructure.service";
import {PersonPositionsServices} from "../_services/personPositions.service";
import {ContractTypesServices} from "../_services/contractTypes.service";
import {TreeNode} from "primeng/components/common/api";
import {PersonPositions} from "../_models/personPositions";
import {EmployeesService} from "../_services/employees.service";
import {Employee} from "../_models/employees";
import * as moment from 'moment/moment';
import {ContractTypes} from "../_models/contractTypes";

@Component({
   moduleId: module.id,
   selector: 'organizational-structure-positions',
   templateUrl: 'organizational-structure-positions.component.html',
   providers: [ConfirmationService]
})

export class OrganizationalStructurePositionsComponent implements OnInit {

   private editingPosition: boolean = false;
   private editingPerson: boolean = false;
   private badPostion: boolean = false;
   private countSlots: number = 0;
   private countCost: number = 0;
   private area: OrganizationalStructure = new OrganizationalStructure();
   private listOrganizationalStructure: OrganizationalStructure[];
   private osPosition: OrganizationalStructurePositions = new OrganizationalStructurePositions();
   private backUpOSPosition: OrganizationalStructurePositions = new OrganizationalStructurePositions();
   private osPositions: OrganizationalStructurePositions[] = [];
   private personsPosition: PersonPositions = new PersonPositions();
   private backUpPersonsPosition: PersonPositions = new PersonPositions();
   private personsPositions: PersonPositions[] = [];
   private postionSlots: PersonPositions[] = [];
   private positionList: Positions[] = [];
   private selectedPosition: Positions = new Positions();
   private employeeList: Employee [] = [];
   private selectedEmployee: Employee = null;
   private badEmployee: boolean = true;
   private contracTypeList: SelectItem [] = [];
   treedCompany: TreeNode[] = [];
   selectedNode: TreeNode;
   private es: any;

   constructor(private positionsService: PositionsService,
               private ospService: OrganizationalStructurePositionsServices,
               private employeesService: EmployeesService,
               private organizationalStructureService: OrganizationalStructureService,
               private personPositionService: PersonPositionsServices,
               private contractTypesService: ContractTypesServices,
               private confirmationService: ConfirmationService) {

      organizationalStructureService.getAllEnabled().subscribe(res => {
         this.listOrganizationalStructure = res;
         for (let c of this.listOrganizationalStructure.filter(t => t.idPadre == 0 || t.idPadre == null)) {
            let companyNode = {
               "label": c.nombre,
               "data": c,
               "leaf": false,
               "expanded": true
            };
            this.treedCompany.push(companyNode);
            this.nodeExpand(companyNode);
         }
      });
   }

   ngOnInit() {
      this.es = {
         firstDayOfWeek: 1,
         dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
         dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
         dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
         monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
         monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
      };

      this.contractTypesService.getAllEnabled().subscribe((ts: ContractTypes[]) => {
         this.contracTypeList.push({label: 'Seleccione', value: null});
         ts.map(c => this.contracTypeList.push({label: c.nombre, value: c.idListaTipoContrato}));
      });
   }

   nodeExpand(node: any) {
      let chilNodes: TreeNode[] = [];
      for (let c of this.listOrganizationalStructure.filter(t => t.idPadre == node.data.idEstructuraOrganizacional)) {
         chilNodes.push({
            "label": c.nombre,
            "data": c,
            "parent": node,
            "leaf": false,
            "children": []
         });
      }
      node.children = chilNodes;

   }

   nodeSelect(node: any) {
      if (node.data.idPadre != null && node.data.idPadre != 0) {
         this.area = node.data;
         this.ospService.getAllByOrganizacionalStructure(this.area.idEstructuraOrganizacional).subscribe(list => {
            this.osPositions = list;
            this.sumPositions();
            this.handleChangeTab(1);
         });

      }
   }

   editPosition(osPosition: OrganizationalStructurePositions) {
      if (osPosition != null) {
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

   delete(osPosition: OrganizationalStructurePositions) {
      this.confirmationService.confirm({
         message: ` ¿Esta seguro que desea eliminar?`,
         header: 'Corfirmación',
         icon: 'fa fa-question-circle',
         accept: () => {
            this.osPosition.indicadorHabilitado = false;
            this.ospService.update(osPosition).subscribe((r: any) => {
               this.osPositions.splice(this.osPositions.indexOf(osPosition), 1);
            });
         }
      });
   }

   isRepeated(idCargo: number, idEstructuraOrganizacionalCargo: number): boolean {
      let repeated: boolean = false;
      this.osPositions.map(osp => {
         if (idCargo !== null && idCargo === osp.idCargo && idEstructuraOrganizacionalCargo !== osp.idEstructuraOrganizacionalCargo) {
            repeated = true;
         }
      });

      return repeated;
   }

   savePosition() {
      if (this.osPosition.idEstructuraOrganizacionalCargo !== undefined && this.osPosition.idEstructuraOrganizacionalCargo !== null) {
         this.ospService.update(this.osPosition).subscribe(data => {
            this.osPositions[this.osPositions.indexOf(this.backUpOSPosition)] = this.osPosition;
            this.editingPosition = false;
            this.osPosition = new OrganizationalStructurePositions();
         });
      } else {
         this.osPosition.idEstructuraOrganizacional = this.area.idEstructuraOrganizacional;
         this.osPosition.indicadorHabilitado = true;
         this.ospService.add(this.osPosition).subscribe(data => {
            this.osPositions.push(this.osPosition);
            this.editingPosition = false;
         });
      }
   }

   positionSearch(event: any) {
      this.positionsService.getByWildCard(event.query).subscribe(list => this.positionList = list);
   }

   capturePosition(event: any) {
      if (!this.isRepeated(event.idCargo, this.osPosition.idEstructuraOrganizacionalCargo)) {
         this.osPosition.idCargo = event.idCargo;
         this.osPosition.cargo = event.cargo;
         this.osPosition.salario = event.salario;
         this.badPostion = false;
      } else {
         this.selectedPosition = null;
         this.badPostion = false;
      }
   }

   employeeSearch(event: any) {
      if (this.employeeList.length == 0)
         this.employeesService.getTerColWithoutPosition(event.query).subscribe(list => {
            this.employeeList = list;
            this.employeeList.map(e => e.nombreCompleto = e.primerNombre + ' ' + e.segundoNombre + ' ' + e.primerApellido + ' ' + e.segundoApellido);
         });
   }

   captureEmployee(event: any) {
      this.personsPosition.idTercero = this.selectedEmployee.idTercero;
      this.badEmployee = false;
   }

   savePersonPosition() {
      if (this.personsPosition.idTercero != this.selectedEmployee.idTercero) {
         this.badEmployee = true;
      } else {

         let fi: moment.Moment = moment(this.personsPosition.asignadoDesde, 'MM/DD/YYYY');
         this.personsPosition.asignadoDesde = fi.format('YYYY-MM-DD');
         if (this.personsPosition.idTerceroCargo == null) {
            this.personPositionService.add(this.personsPosition).subscribe(res => {
               res.nombreCompleto = this.selectedEmployee.nombreCompleto;
               res.cargo = this.personsPosition.cargo;
               this.postionSlots[this.postionSlots.indexOf(this.backUpPersonsPosition)] = res;
               this.editingPerson = false;
            });
         } else {
            this.personPositionService.update(this.personsPosition).subscribe(res => {
               if (res.ok) {
                  this.postionSlots[this.postionSlots.indexOf(this.backUpPersonsPosition)] = this.personsPosition;
                  this.editingPerson = false;
               }
            });
         }
      }
   }

   cancelEditingPosition() {
      if (this.backUpOSPosition != null) {
         //Verificar si es necesario reestablecer el objeto en la tabla
         // this.osPositions[this.osPositions.indexOf(this.backUpOSPosition)] = this.backUpOSPosition;
         this.backUpOSPosition = null;
      }
      this.editingPosition = false;
   }

   cancelEditingPerson() {
      this.editingPerson = false;
   }

   sumPositions() {
      this.countCost = 0;
      this.countSlots = 0;
      for (let position of this.osPositions) {
         this.countCost = this.countCost + (Number(position.salario) * Number(position.plazas));
         this.countSlots = this.countSlots + Number(position.plazas);
      }
   }

   handleChangeTab(index: number) {
      if (index == 1) {
         this.postionSlots = [];
         for (let osp of this.osPositions) {
            this.addSlots(osp.idCargo, osp.cargo, osp.idEstructuraOrganizacionalCargo, osp.plazas);
         }
         this.personPositionService.getAllByOrganizationalStructure(this.area.idEstructuraOrganizacional).subscribe(listPerson => {
            this.personsPositions = listPerson;
            this.personsPositions.map(pp => {
               pp.nombreCompleto = pp.primerNombre + ' ' + pp.segundoNombre + ' ' + pp.primerApellido + ' ' + pp.segundoApellido;
               this.assingPerson(pp, null);
            });
         });
      }
   }

   editPersonSlot(pp: PersonPositions) {

      this.backUpPersonsPosition = pp;
      if(pp.asignadoDesde != undefined){
         let fi: moment.Moment = moment(pp.asignadoDesde, 'YYYY-MM-DD');
         pp.asignadoDesde = fi.format('MM/DD/YYYY');
      }
      this.personsPosition = pp;

      if (pp.nombreCompleto != '') {
         this.selectedEmployee = new Employee();
         this.selectedEmployee.nombreCompleto = pp.nombreCompleto;
         this.selectedEmployee.idTercero = pp.idTercero;
         this.badEmployee = false;
      } else {
         this.selectedEmployee = null;
      }
      this.editingPerson = true;
   }

   onSelectBegin(event: any) {
      let d = new Date(Date.parse(event));
      this.personsPosition.asignadoDesde = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
   }

   addSlots(idCargo: number, nombreCargo: string, idEstructuraOrganizacionalCargo: number, slots: number) {
      let index = this.postionSlots.findIndex(ps => ps.idCargo == idCargo);
      for (let i = 1; i <= slots; i++) {
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
         if (index != -1) {
            this.postionSlots.splice(index, 0, personPosition);
         } else {
            this.postionSlots.push(personPosition);
         }
      }
   }

   assingPerson(person: PersonPositions, index: number = null) {
      if (index == null)
         index = this.postionSlots.findIndex(ps => (ps.idCargo == person.idCargo && ps.idTercero == 0));
      if (index != -1)
         this.postionSlots[index] = person;
   }
}