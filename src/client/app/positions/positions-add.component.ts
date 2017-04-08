import "rxjs/add/operator/switchMap";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { Positions } from "../_models/positions";
import { SelectItem, Message, ConfirmationService } from "primeng/primeng";
import { PositionsService } from "../_services/positions.service";
import { ListPositionsService } from "../_services/lists-positions.service";

@Component( {
               moduleId: module.id,
               selector: 'positions-form',
               templateUrl: 'positions-form.component.html',
               providers: [ ConfirmationService ]
            } )

export class PositionsAddComponent {
   position: Positions = new Positions();
   categoryTypes: SelectItem[] = [];
   bossPositionTypes: SelectItem[] = [];
   stateTypes: SelectItem[] = [];
   disableTabs: boolean = true;
   msgs: Message[] = [];
   
   constructor( private positionsService: PositionsService,
                private router: Router,
                private location: Location,
                private listPositionsService: ListPositionsService,
                private confirmationService: ConfirmationService ) {
      
      this.listPositionsService.getCategoryTypes().subscribe( res => {
         this.categoryTypes.push( { label: "Seleccione", value: null } );
         for ( let dp of res ) {
            this.categoryTypes.push( {
                                        label: dp.nombre,
                                        value: dp.idListaCategoria
                                     } );
         }
      } );
      
      this.listPositionsService.getBossPositionTypes().subscribe( res => {
         this.bossPositionTypes.push( { label: "Seleccione", value: null } );
         for ( let dp of res ) {
            this.bossPositionTypes.push( {
                                            label: dp.nombre,
                                            value: dp.idListaCargoJefe
                                         } );
         }
      } );
      
      this.listPositionsService.getstateTypes().subscribe( res => {
         this.stateTypes.push( { label: "Seleccione", value: null } );
         for ( let dp of res ) {
            this.stateTypes.push( {
                                     label: dp.nombre,
                                     value: dp.idListaEstado
                                  } );
         }
      } );
      
   }
   
   ngOnInit() {
   }
   
   onSubmit() {
      this.msgs = [];
      this.positionsService.add( this.position )
      .subscribe( data => {
         this.msgs.push( { severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.' } );
         this.router.navigate(['positions/update/'+data.idCargo]);
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
   
   capitalize( event: any ) {
      let input = event.target.value;
      event.target.value = input.substring( 0, 1 ).toUpperCase() + input.substring( 1 ).toLowerCase();
   }
   
   capitalizeSave( input: any ) {
      return input.substring( 0, 1 ).toUpperCase() + input.substring( 1 ).toLowerCase();
   }
}
