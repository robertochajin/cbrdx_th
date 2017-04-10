import "rxjs/add/operator/switchMap";
import { Component, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { Positions } from "../_models/positions";
import { SelectItem, Message, ConfirmationService } from "primeng/primeng";
import { NavService } from "../_services/_nav.service";
import { PositionsService } from "../_services/positions.service";
import { ListPositionsService } from "../_services/lists-positions.service";

@Component( {
               moduleId: module.id,
               selector: 'positions-form',
               templateUrl: 'positions-form.component.html',
               providers: [ ConfirmationService ]
            } )
export class PositionsUpdateComponent {
   @Input()
   position: Positions = new Positions();
   acordion: number;
   categoryTypes: SelectItem[] = [];
   bossPositionTypes: SelectItem[] = [];
   stateTypes: SelectItem[] = [];
   levelTypes: SelectItem[] = [];
   disableTabs: boolean = false;
   msgs: Message[] = [];
   
   constructor( private positionsService: PositionsService,
                private router: Router,
                private route: ActivatedRoute,
                private location: Location,
                private listPositionsService: ListPositionsService,
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
      
      this.positionsService.getAll().subscribe( res => {
         this.bossPositionTypes.push( { label: "Seleccione", value: null } );
         for ( let dp of res ) {
            this.bossPositionTypes.push( {
                                            label: dp.nombre,
                                            value: dp.idCargo
                                         } );
         }
      } );
      
      this.listPositionsService.getstateTypes().subscribe( res => {
         this.stateTypes.push( { label: "Seleccione", value: null } );
         for ( let dp of res ) {
            this.stateTypes.push( {
                                     label: dp.observacion,
                                     value: dp.idEstadoCargo
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
      
   }
   
   ngOnInit() {
      
      /* this.route.params.subscribe((params: Params) => {
       this.positionsService.get(+params['id']).subscribe(position => {
       this.position = position;
       });
       });*/
      this.acordion = this._nav.getTab();
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
