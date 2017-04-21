import "rxjs/add/operator/switchMap";
import { Component, Input } from "@angular/core";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { Location } from "@angular/common";
import { Positions } from "../_models/positions";
import { SelectItem, Message, ConfirmationService } from "primeng/primeng";
import { NavService } from "../_services/_nav.service";
import { PositionsService } from "../_services/positions.service";
import { ListPositionsService } from "../_services/lists-positions.service";
import { TipoDeAreaService } from "../_services/tipoDeArea.service";
import { ListEmployeesService } from "../_services/lists-employees.service";
import { TreeNode } from "primeng/components/common/api";

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
   listcategoryTypes: any[] = [];
   areaTypes: SelectItem[] = [];
   bossPositionTypes: SelectItem[] = [];
   stateTypes: SelectItem[] = [];
   liststateTypes: any[];
   levelTypes: SelectItem[] = [];
   listslevelTypes: any[] = [];
   genderTypes: SelectItem[] = [];
   listStudies: SelectItem[] = [];
   maritalStatusTypes: SelectItem[] = [];
   msgs: Message[] = [];
   msgOcupaciones: Message[] = [];
   aprobado: number;
   noAprobado: number;
   construccion: number;
   treeArrray: TreeNode[] = [];
   selectedNode: TreeNode;
   step = 1;
   nivel:number;
   alertOcu:boolean = false;
   
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
         this.listcategoryTypes = res;
         this.categoryTypes.push( { label: "Seleccione", value: null } );
         for ( let dp of res ) {
            this.categoryTypes.push( {
                                        label: dp.categoria,
                                        value: dp.idCategoria
                                     } );
         }
         
      } );
      
      this.listPositionsService.getLevelTypes().subscribe( resl => {
         this.listslevelTypes = resl;
         this.levelTypes.push( { label: "Seleccione", value: null } );
         for ( let dp of resl ) {
            this.levelTypes.push( {
                                     label: dp.nombre,
                                     value: dp.idListaNivelCargo
                                  } );
         }
      } );
      this.positionsService.getListStudies().subscribe( res => {
         this.listStudies.push( { label: "Seleccione", value: null } );
         for ( let dp of res ) {
            this.listStudies.push( {label: dp.nombreListaNivelEstudio,value: dp.idListaNivelEstudio} );
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
         this.liststateTypes = res;
         this.stateTypes.push( { label: "Seleccione", value: null } );
         for ( let dp of res ) {
            this.stateTypes.push( {
                                     label: dp.nombre,
                                     value: dp.idListaEstadoCargo
                                  } );
            switch ( dp.codigo ) {
               case "APROB":
                  this.aprobado = dp.idListaEstadoCargo;
                  break;
               case "NOAPR":
                  this.noAprobado = dp.idListaEstadoCargo;
                  break;
               case "CONST":
                  this.construccion = dp.idListaEstadoCargo;
                  break;
            }
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
      this.acordion = 0;
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
            this.getCategory();
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
               if(this.position.indicadorHabilitado == false){
                  this.allPosition.push(this.position);
               }
               this.buildParent();
            } );
         } );
      } );

   }

   firstStep() {
      this._nav.setTab( 0 );
      this.acordion = 0;
   }
   
   nextStep(step:number) {
      this.msgs = [];
      if(this.position.paso!= 0 && this.position.paso <= step){
         this.position.paso = step+1;
         this.step = this.position.paso;
      }
      this.positionsService.updateEstado( this.position )
      .subscribe( data => {
         this._nav.setTab( step );
         this.acordion = step;
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
   
      this.positionsService.update1( this.position )
      .subscribe( data => {
         this._nav.setTab( 1 );
         this.acordion = 1;
         this.msgs.push( { severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.' } );
         //this.router.navigate(['positions/update/'+data.idCargo]);
         this.positionsService.getListPositions().subscribe( res => {
            this.allPosition = res;
            if(this.position.indicadorHabilitado == false){
               this.allPosition.push(this.position);
            }
            this.buildParent();
         });
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
      this.positionsService.update2( this.position )
      .subscribe( data => {
         this._nav.setTab( 3 );
         this.acordion = 3;
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
      this.positionsService.update3( this.position )
      .subscribe( data => {
         this._nav.setTab( 6 );
         this.acordion = 6;
         this.msgs.push( { severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.' } );
         //this.router.navigate(['positions/update/'+data.idCargo]);
      }, error => {
         this.msgs.push( { severity: 'error', summary: 'Error', detail: 'Error al guardar.' } );
      } );
   }
   
   onSubmit7() {
      this.msgs = [];
      if ( this.position.paso <= 8 ) {
         this.position.paso = 9;
         this.step = 9;
      }
      this._nav.setTab(8);
      this.acordion = 8;
      this.positionsService.update4( this.position )
      .subscribe( data => {
         this.msgs.push( { severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.' } );
         //this.router.navigate(['positions/update/'+data.idCargo]);
      }, error => {
         this.msgs.push( { severity: 'error', summary: 'Error', detail: 'Error al guardar.' } );
      } );
   }
   
   onSubmit8() {
      this.msgs = [];
      if ( this.position.paso <= 9 ) {
         this.position.paso = 10;
         this.step = 10;
      }
      this.positionsService.update5( this.position )
      .subscribe( data => {
         this._nav.setTab( 9 );
         this.acordion = 9;
         this.msgs.push( { severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.' } );
         //this.router.navigate(['positions/update/'+data.idCargo]);
      }, error => {
         this.msgs.push( { severity: 'error', summary: 'Error', detail: 'Error al guardar.' } );
      } );
   }
   
   onSubmit14() {
      this.msgs = [];
      if ( this.position.paso <= 15 ) {
         this.step = 16;
         this.position.paso = 16;
      }
      this.positionsService.update6( this.position )
      .subscribe( data => {
         this._nav.setTab( 15 );
         this.acordion = 15;
         this.msgs.push( { severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.' } );
         //this.router.navigate(['positions/update/'+data.idCargo]);
      }, error => {
         this.msgs.push( { severity: 'error', summary: 'Error', detail: 'Error al guardar.' } );
      } );
   }
   
   updateEstado( value: number ) {
      this.msgs = [];
      this.position.idEstado = value;
      if ( this.position.idEstado == this.aprobado ) {
         this.position.indicadorHabilitado = true;
      }
      if ( this.position.idEstado == this.noAprobado ) {
         this.position.indicadorHabilitado = false;
      }
      this.positionsService.updateEstado( this.position )
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
   
   buildParent() {
      this.treeArrray = [];
      for ( let c of this.allPosition.filter( t => t.idCargoJefe == 0 || t.idCargoJefe == null ) ) {
         let node: TreeNode;
         let treeNode: TreeNode[] = [];
         
         if ( this.allPosition.filter( x => x.idCargoJefe == c.idCargo ).length > 0 ) {
            treeNode = this.buildChild( c );
         }
         node = {
            "label": c.cargo,
            "children": treeNode,
            "expanded": true
         };
         this.treeArrray.push( node );
         if ( this.position.idCargo == c.idCargo ) {
            this.selectedNode = node;
         }
         
      }
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
            "expanded": treeNode.length > 0 ? true : false
         }
         treeChild.push(node);
         if(this.position.idCargo == p.idCargo){
            this.selectedNode = node;
         }
      }
      return treeChild;
   }
   
   getCategory(){
      let selectCategory = this.listcategoryTypes.filter( t => t.puntosMinimos <= this.position.puntos
      && t.puntosMaximos >= this.position.puntos );
      if(selectCategory.length > 0){
         this.position.idCategoria = selectCategory[0].idCategoria;
         this.nivel = selectCategory[0].nivel;
      }else{
         this.position.idCategoria = null;
         this.nivel = null;
      }
      
   }
   validarOcupaciones(){
      this.positionsService.getPositionActivitiesById(this.position.idCargo).subscribe(
         rest => {
           let contador = 0;
            for (let r of rest) {
               if (r.indicadorHabilitado == true) {
                  contador++;
               }
            }
            if(contador > 0){
               this.alertOcu = false;
               this.msgOcupaciones = [];
               this.onSubmit8();
               return true;
            }else{
               this.alertOcu = true;
               this.msgOcupaciones[0] = {severity: 'alert', summary: 'Error', detail: 'Debe agregar al menos una' +
               ' ocuapación'};
               return false;
            }
         });
   }

}
