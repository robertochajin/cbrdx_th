import "rxjs/add/operator/switchMap";
import { Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router'
import { Location } from '@angular/common';
import { Positions } from '../_models/positions';
import { SelectItem, Message, ConfirmationService } from 'primeng/primeng';
import { NavService } from '../_services/_nav.service';
import { PositionsService } from '../_services/positions.service';
import { ListPositionsService } from '../_services/lists-positions.service';
import { TipoDeAreaService } from '../_services/tipoDeArea.service';
import { ListEmployeesService } from "../_services/lists-employees.service";
import {TreeNode} from "primeng/components/common/api";

@Component( {
               moduleId: module.id,
               selector: 'positions-form',
               templateUrl: 'positions-form.component.html',
               providers: [ ConfirmationService ]
            } )
export class PositionsUpdateComponent {
   @Input()
   position: Positions = new Positions();
   allPosition: Positions[] = [];
   acordion: number;
   categoryTypes: SelectItem[] = [];
   areaTypes: SelectItem[] = [];
   bossPositionTypes: SelectItem[] = [];
   stateTypes: SelectItem[] = [];
   levelTypes: SelectItem[] = [];
   genderTypes: SelectItem[] = [];
   maritalStatusTypes: SelectItem[] = [];
   disableTabs: boolean = false;
   msgs: Message[] = [];
   defaultState: any;
   aprobado:boolean = false;
   treeArrray: TreeNode[] = [];
   selectedNode: TreeNode;
   step = 1;
   constructor( private positionsService: PositionsService,
                private router: Router,
                private route: ActivatedRoute,
                private location: Location,
                private listPositionsService: ListPositionsService,
                private tipoDeAreaService: TipoDeAreaService,
                private confirmationService: ConfirmationService,
                private listEmployeesService: ListEmployeesService,
                private _nav: NavService, ) {
      
      this.listPositionsService.getCategoryTypes().subscribe( res => {
         this.categoryTypes.push( { label: "Seleccione", value: null } );
         for ( let dp of res ) {
            this.categoryTypes.push( {
                                        label: dp.categoria,
                                        value: dp.idCategoria
                                     } );
         }
      } );
      this.tipoDeAreaService.getlistAreas().subscribe( res => {
         this.areaTypes.push( { label: "Seleccione", value: null } );
         for ( let dp of res ) {
            this.areaTypes.push( {
                                    label: dp.estructuraArea,
                                    value: dp.idEstructuraArea
                                 } );
         }
      } );
      
      this.listPositionsService.getstateTypes().subscribe( res => {
         this.stateTypes.push( { label: "Seleccione", value: null } );
         for ( let dp of res ) {
            this.stateTypes.push( {
                                     label: dp.nombre,
                                     value: dp.idListaEstadoCargo
                                  } );
         }
      } );
   
      this.listPositionsService.getLevelTypes().subscribe( res => {
         this.levelTypes.push( { label: "Seleccione", value: null } );
         for ( let dp of res ) {
            this.levelTypes.push( {
                                     label: dp.nombre,
                                     value: dp.idListaNivelCargo
                                  } );
         }
      } );
   
     
   
      this.listEmployeesService.getGenderTypes().subscribe(res => {
         this.genderTypes.push({label: "Seleccione", value: null});
         for (let dp of res) {
            this.genderTypes.push({
                                     label: dp.nombreListaGenero,
                                     value: dp.idListaGenero
                                  });
         }
      });
      this.listEmployeesService.getMaritalStatusTypes().subscribe(res => {
         this.maritalStatusTypes.push({label: "Seleccione", value: null});
         for (let dp of res) {
            this.maritalStatusTypes.push({
                                            label: dp.nombreListaEstadoCivil,
                                            value: dp.idListaEstadoCivil
                                         });
         }
      });
   }
   
   ngOnInit() {
   
      this.route.params.subscribe( ( params: Params ) => {
         this.positionsService.get( +params[ 'id' ] ).subscribe( position => {
            this.position = position;
            this.step = this.position.paso;
            //this.step = 3;
            if(this.step >0 && this.step <16){
               if(this._nav.getTab() > 0 && this._nav.getTab()!= null){
                  this.acordion = this._nav.getTab();
               }else{
                  this.acordion = this.step-1;
               }
            }
            this.listPositionsService.getstateByCode("APROB").subscribe( res => {
               this.defaultState = res;
               this.aprobado = this.position.idEstado == this.defaultState.idListaEstadoCargo ? true : false;
            });
            
            this.positionsService.getListPositions().subscribe( res => {
               this.allPosition = res;
               this.bossPositionTypes.push( { label: "Seleccione", value: null } );
               for ( let dp of res ) {
                  if ( res.idCargo != this.position.idCargo ) {
                     this.bossPositionTypes.push( {
                                                     label: dp.cargo,
                                                     value: dp.idCargo
                                                  } );
                  }
               }
               //this.treeArrray = res;
               for (let c of this.allPosition.filter(t => t.idCargoJefe == 0 || t.idCargoJefe == null)) {
                  let node: TreeNode;
                  let treeNode: TreeNode[] = [];
                  
                  if(this.allPosition.filter(x => x.idCargoJefe == c.idCargo).length > 0){
                     treeNode = this.buildChild(c);
                  }
                  node = {
                     "label": c.cargo,
                     "children": treeNode,
                     "expanded": true
                  };
                  this.treeArrray.push(node);
                  if(this.position.idCargo == c.idCargo){
                     this.selectedNode = node;
                  }
                  
               }
               //this.expandAll()
            } );
         } );
      } );
      
      this.acordion = this._nav.getTab();
   }
   
   nextStep(step:number) {
      this.msgs = [];
      if(this.position.paso!= 0 && this.position.paso <= step){
         this.position.paso = step+1;
         this.step = this.position.paso;
      }
      this._nav.setTab(step);
      this.acordion = step;
      this.positionsService.update( this.position )
      .subscribe( data => {
         this.msgs.push( { severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.' } );
      }, error => {
         this.msgs.push( { severity: 'error', summary: 'Error', detail: 'Error al guardar.' } );
      } );
   }
   
   onSubmit0() {
      this.msgs = [];
      if(this.position.paso == 1){
         this.position.paso = 2;
         this.step = 2;
      }
      this._nav.setTab(1);
      this.acordion = 1;
      this.positionsService.update( this.position )
      .subscribe( data => {
         this.msgs.push( { severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.' } );
         //this.router.navigate(['positions/update/'+data.idCargo]);
      }, error => {
         this.msgs.push( { severity: 'error', summary: 'Error', detail: 'Error al guardar.' } );
      } );
   }
   
   onSubmit2() {
      this.msgs = [];
      if(this.position.paso <= 3){
         this.position.paso = 4;
         this.step = 4;
      }
      this._nav.setTab(3);
      this.acordion = 3;
      console.info(this.step);
      this.positionsService.update( this.position )
      .subscribe( data => {
         this.msgs.push( { severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.' } );
         //this.router.navigate(['positions/update/'+data.idCargo]);
      }, error => {
         this.msgs.push( { severity: 'error', summary: 'Error', detail: 'Error al guardar.' } );
      } );
   }
   
   onSubmit5() {
      this.msgs = [];
      if(this.position.paso <= 6){
         this.position.paso = 7;
         this.step = 7;
      }
      this._nav.setTab(6);
      this.acordion = 6;
      this.positionsService.update( this.position )
      .subscribe( data => {
         this.msgs.push( { severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.' } );
         //this.router.navigate(['positions/update/'+data.idCargo]);
      }, error => {
         this.msgs.push( { severity: 'error', summary: 'Error', detail: 'Error al guardar.' } );
      } );
   }
   
   onSubmit7() {
      this.msgs = [];
      if(this.position.paso == 8){
         this.position.paso = 9;
         this.step = 9;
      }
      this._nav.setTab(8);
      this.acordion = 8;
      this.positionsService.update( this.position )
      .subscribe( data => {
         this.msgs.push( { severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.' } );
         //this.router.navigate(['positions/update/'+data.idCargo]);
      }, error => {
         this.msgs.push( { severity: 'error', summary: 'Error', detail: 'Error al guardar.' } );
      } );
   }
   
   onSubmit8() {
      this.msgs = [];
      if(this.position.paso == 9){
         this.position.paso = 10;
         this.step = 10;
      }
      this._nav.setTab(9);
      this.acordion = 9;
      this.positionsService.update( this.position )
      .subscribe( data => {
         this.msgs.push( { severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.' } );
         //this.router.navigate(['positions/update/'+data.idCargo]);
      }, error => {
         this.msgs.push( { severity: 'error', summary: 'Error', detail: 'Error al guardar.' } );
      } );
   }
   
   onSubmit14() {
      this.msgs = [];
      if(this.position.paso == 15){
         this.position.paso = 16;
         this.position.idEstado = this.defaultState.idListaEstadoCargo;
         this.step = 16;
      }
      this._nav.setTab(15);
      this.acordion = 15;
      this.positionsService.update( this.position )
      .subscribe( data => {
         this.msgs.push( { severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.' } );
         //this.router.navigate(['positions/update/'+data.idCargo]);
      }, error => {
         this.msgs.push( { severity: 'error', summary: 'Error', detail: 'Error al guardar.' } );
      } );
   }
   
   goBack(): void {
      this.confirmationService.confirm( {
                                           message: ` ¿Esta seguro que desea salir sin guardar?`,
                                           header: 'Corfirmación',
                                           icon: 'fa fa-question-circle',
                                           accept: () => {
                                              this.location.back();
                                           }
                                        } );
   }
   
   
   onTabShow( e: any ) {
      this._nav.setTab( e.index );
      this.acordion = this._nav.getTab();
   }
   buildChild( dadInfo:Positions) {
      let treeChild: TreeNode[] = [];
      
      for (let p of this.allPosition.filter(x => x.idCargoJefe == dadInfo.idCargo)) {
         let node: TreeNode = [];
         let treeNode: TreeNode[] = [];
         if(this.allPosition.filter(y => y.idCargoJefe == p.idCargo).length > 0){
            treeNode = this.buildChild(p);
         }
         node = {
            "label": p.cargo,
            "children": treeNode,
            "expanded": true
         }
         treeChild.push(node);
         if(this.position.idCargo == p.idCargo){
            this.selectedNode = node;
         }
      }
      return treeChild;
   }
}
