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

@Component( {
               moduleId: module.id,
               selector: 'positions-form',
               templateUrl: 'positions-form.component.html',
               providers: [ ConfirmationService ]
            } )
export class PositionsUpdateComponent implements OnInit{
   @Input()
   position: Positions = new Positions();
   acordion: number;
   categoryTypes: SelectItem[] = [];
   areaTypes: SelectItem[] = [];
   bossPositionTypes: SelectItem[] = [];
   stateTypes: SelectItem[] = [];
   levelTypes: SelectItem[] = [];
   disableTabs: boolean = false;
   msgs: Message[] = [];
   defaultState: any;
   aprobado:boolean = false;
   step = 8;
   constructor( private positionsService: PositionsService,
                private router: Router,
                private route: ActivatedRoute,
                private location: Location,
                private listPositionsService: ListPositionsService,
                private tipoDeAreaService: TipoDeAreaService,
                private confirmationService: ConfirmationService,
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
   
      this.listPositionsService.getstateByCode("APROB").subscribe( res => {
          this.defaultState = res;
      });
   }
   
   ngOnInit() {
   
      this.route.params.subscribe( ( params: Params ) => {
         this.positionsService.get( +params[ 'id' ] ).subscribe( position => {
            this.position = position;
            this.position.paso = 0;
            this.position.idEstado = 1;
            this.aprobado = this.position.idEstado == this.defaultState.idListaEstadoCargo ? true : false;
            this.positionsService.getListPositions().subscribe( res => {
               this.bossPositionTypes.push( { label: "Seleccione", value: null } );
               for ( let dp of res ) {
                  if ( res.idCargo != this.position.idCargo ) {
                     this.bossPositionTypes.push( {
                                                     label: dp.cargo,
                                                     value: dp.idCargo
                                                  } );
                  }
               }
            } );
         } );
      } );
      
      this.acordion = this._nav.getTab();
   }
   
   onSubmit0() {
      this.msgs = [];
      if(this.position.paso == 1){
         this.position.paso = 2;
         this.step = 2;
      }
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
      if(this.position.paso == 3){
         this.position.paso = 4;
         this.step = 4;
      }
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
      if(this.position.paso == 5){
         this.position.paso = 6;
         this.step = 7;
      }
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
      if(this.position.paso == 7){
         this.position.paso = 8;
         this.step = 8;
      }
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
}
