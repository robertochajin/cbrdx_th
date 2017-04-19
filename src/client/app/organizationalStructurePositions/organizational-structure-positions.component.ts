import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import {OrganizationalStructure} from "../_models/organizationalStructure";
import {OrganizationalStructurePositions} from "../_models/organizationalStructurePositions";
import {Positions} from "../_models/positions";
import {ConfirmationService} from "primeng/components/common/api";
import {PositionsService} from "../_services/positions.service";
import {OrganizationalStructurePositionsServices} from "../_services/organizationalStructurePositions.service";
import {PersonPositionsServices} from "../_services/personPositions.service";
import {ContractTypesServices} from "../_services/contractTypes.service";

@Component({
   moduleId: module.id,
   selector: 'organizational-structure-positions',
   templateUrl: 'organizational-structure-positions.component.html',
   providers: [ConfirmationService]
})

export class OrganizationalStructurePositionsComponent implements OnInit {

   private editingPosition: boolean = false;
   private badPostion: boolean = false;
   private area: OrganizationalStructure = new OrganizationalStructure();
   private osPosition: OrganizationalStructurePositions = new OrganizationalStructurePositions();
   private BackUpOSPosition: OrganizationalStructurePositions = new OrganizationalStructurePositions();
   private osPositions: OrganizationalStructurePositions[] = [];
   private positionList: Positions[] = [];
   private selectedPosition : Positions = new Positions();

   constructor(private positionsService: PositionsService,
               private ospService: OrganizationalStructurePositionsServices,
               private personPositionService: PersonPositionsServices,
               private contractTypesService: ContractTypesServices,
               private confirmationService: ConfirmationService) {
   }

   ngOnInit() {
      //temporal
      this.area.idEstructuraOrganizacional = 19;
      //temporal

      this.ospService.getAllByOrganizacionalStructure(this.area.idEstructuraOrganizacional).subscribe(list => this.osPositions = list);
   }

   editPosition(osPosition: OrganizationalStructurePositions) {
      if (osPosition != null) {
         this.BackUpOSPosition = osPosition;
      } else {
         this.osPosition = new OrganizationalStructurePositions();
      }
      this.editingPosition = true;
   }

   delete(osPosition: OrganizationalStructurePositions) {

   }

   isRepeated(idCargo: number, idEstructuraOrganizacionalCargo: number): boolean {
      let repeated: boolean = false;
      this.osPositions.map(osp => {
         if(idCargo !== null && idCargo === osp.idCargo && idEstructuraOrganizacionalCargo !== osp.idEstructuraOrganizacionalCargo) {
            repeated = true;
         }
      });

      return repeated;
   }

   savePosition() {
      if (this.osPosition.idEstructuraOrganizacionalCargo !== undefined && this.osPosition.idEstructuraOrganizacionalCargo !== null) {
         this.osPosition.idEstructuraOrganizacional = this.area.idEstructuraOrganizacional;
         this.osPosition.indicadorHabilitado = true;
         this.ospService.add(this.osPosition).subscribe(data => {
            this.osPositions.push(data);
            this.editingPosition = false;
         });
      } else {
         //Actualiza y actualiza...el datatable
         this.osPositions.push(this.osPosition);
         this.editingPosition = false;

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
         this.badPostion = false;
      }
   }

   cancelEditingPosition() {
      if (this.BackUpOSPosition != null) {
         //Verificar si es necesario reestablecer el objeto en la tabla
         // this.osPositions[this.osPositions.indexOf(this.BackUpOSPosition)] = this.BackUpOSPosition;
         this.BackUpOSPosition = null;
      }
      this.editingPosition = false;
   }
}