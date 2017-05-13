import 'rxjs/add/operator/switchMap';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Positions } from '../_models/positions';
import { SelectItem, Message, ConfirmationService } from 'primeng/primeng';
import { PositionsService } from '../_services/positions.service';
import { ListPositionsService } from '../_services/lists-positions.service';
import { TipoDeAreaService } from '../_services/tipoDeArea.service';
import { ListaService } from '../_services/lista.service';
import { ListaItem } from '../_models/listaItem';
import { NavService } from '../_services/_nav.service';

@Component( {
               moduleId: module.id,
               selector: 'positions-form',
               templateUrl: 'positions-add.component.html',
               providers: [ ConfirmationService ]
            } )

export class PositionsAddComponent {
   position: Positions = new Positions();
   categoryTypes: SelectItem[] = [];
   areaTypes: SelectItem[] = [];
   bossPositionTypes: SelectItem[] = [];
   listStudies: SelectItem[] = [];
   stateTypes: SelectItem[] = [];
   msg: Message;
   defaultState: any;
   step = 1;
   acordion = 0;

   constructor( private positionsService: PositionsService,
      private router: Router,
      private listaService: ListaService,
      private route: ActivatedRoute,
      private location: Location,
      private listPositionsService: ListPositionsService,
      private tipoDeAreaService: TipoDeAreaService,
      private confirmationService: ConfirmationService,
      private _nav: NavService
   ) {

      this.positionsService.getListPositions().subscribe( res => {
         this.bossPositionTypes.push( { label: 'Seleccione', value: null } );
         for ( let dp of res ) {
            this.bossPositionTypes.push( {
                                            label: dp.cargo,
                                            value: dp.idCargo
                                         } );
         }
      } );
      this.listaService.getMasterDetails( 'ListasNivelesEstudios' ).subscribe( res => {
         this.listStudies.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => this.listStudies.push( { label: s.nombre, value: s.idLista } ) );
      } );
      this.tipoDeAreaService.getlistAreas().subscribe( res => {
         this.areaTypes.push( { label: 'Seleccione', value: null } );
         for ( let dp of res ) {
            this.areaTypes.push( {
                                    label: dp.estructuraArea,
                                    value: dp.idEstructuraArea
                                 } );
         }
      } );

      this.listaService.getMasterDetailsByCode( 'ListasEstadosCargos', 'CONST' ).subscribe( res => {
         this.defaultState = res;
      } );

   }

   onSubmit0() {
      this.position.idEstado = this.defaultState.idLista;
      this.position.paso = 2;
      this.positionsService.add( this.position )
      .subscribe( data => {
         this._nav.setTab(1);
         this._nav.setMesage( 1, this.msg );
         this.router.navigate( [ 'positions/update/' + data.idCargo ] );
      }, error => {
         this._nav.setMesage( 3, this.msg );
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

   capitalizeNombre() {
      let input = this.position.cargo;
      if ( input !== '' && input !== null && input !== undefined ) {
         this.position.cargo = input.substring( 0, 1 ).toUpperCase() + input.substring( 1 ).toLowerCase();
      }
   }

   inputCleanUp( value: string ) {
      this.position.codigoCargo = value.toUpperCase().replace( /[^A-Z0-9]/, '' ).trim();
   }

   inputNumber() {
      let numero = this.position.personaACargoDir + '';
      if ( this.position.personaACargoDir !== null ) {
         this.position.personaACargoDir = Number( numero.replace( /[^0-9]/g, '' ) );
      }
      let numeroi = this.position.personaACargoInd + '';
      if ( this.position.personaACargoInd !== null ) {
         this.position.personaACargoInd = Number( numeroi.replace( /[^0-9]/g, '' ) );
      }
   }

}
