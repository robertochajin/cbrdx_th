import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/primeng';
import { PositionPersonality } from '../_models/positionPersonality';
import { PositionPersonalityServices } from '../_services/position-personality.service';
import { Positions } from '../_models/positions';
import { ListaService } from '../_services/lista.service';
import { ListaItem } from '../_models/listaItem';
import { NavService } from '../_services/_nav.service';

@Component( {
               moduleId: module.id,
               templateUrl: 'personality.component.html',
               selector: 'personality-component',
               providers: [ ConfirmationService ]
            } )

export class PersonalityComponent implements OnInit {

   @Input()
   position: Positions;
   listPersonality: ListaItem[] = [];
   personality: PositionPersonality[] = [];
   atributos: PositionPersonality[] = [];

   @Output()
   nextStep: EventEmitter<number> = new EventEmitter<number>();

   description: string;
   permitirSiguiente: boolean = false;
   alert: boolean = false;
   msgsAlert: Message[] = [];

   constructor( private router: Router,
      private personalityService: PositionPersonalityServices,
      private listaService: ListaService,
      private confirmationService: ConfirmationService,
      private _nav: NavService
   ) {
   }

   ngOnInit() {
       // this.msgsAlert.push( { severity: 'error', summary: 'Error', detail: 'Debe llenar al menos un registro' } );
      // this._nav.setMesage(0, {severity: 'error', summary: 'Error', detail: 'Debe llenar al menos un registro'});
      this.listaService.getMasterDetails( 'ListasAtributosCargos' ).subscribe( res => {
         this.listPersonality = res;
         this.personalityService.getAllByPosition( this.position.idCargo ).subscribe( res => {
            this.personality = res;
            this.listPersonality.map( ( lca: ListaItem ) => {
               let item: PositionPersonality = new PositionPersonality();
               item = this.personality.find( cas => cas.idAtributo === lca.idLista );
               if ( item === undefined ) {
                  item = new PositionPersonality();
               }
               item.idCargo = this.position.idCargo;
               item.nombreLista = lca.nombre;
               item.codigoLista = lca.codigo;
               item.idAtributo = lca.idLista;
               this.atributos.push( item );
            } );
         } );
      } );
   }

   next() {
      let num = 0;
      for ( let elemento of this.atributos ) {
         if ( elemento.descripcion === undefined || elemento.descripcion === '' || elemento.descripcion === null ) {
            num++;
         }
      }
      if ( this.atributos.length === num ) {
         // this.alert = true;
         this._nav.setMesage(0, {severity: 'error', summary: 'Error', detail: 'Debe llenar al menos un registro'});
      } else {
         this.alert = false;
         let it = 1;
         for ( let elemento of this.atributos ) {
            if ( elemento.idCargoPersonalidadAtributo === undefined ||
                 elemento.idCargoPersonalidadAtributo === 0 || elemento.idCargoPersonalidadAtributo === null ) {
               if ( elemento.descripcion !== '' && elemento.descripcion !== null && elemento.descripcion !== undefined ) {
                  this.personalityService.add( elemento ).subscribe( res => {
                     if ( res.idCargoPersonalidadAtributo > 0 ) {
                        it = it + 1;
                        elemento.idCargoPersonalidadAtributo = res.idCargoPersonalidadAtributo;
                        elemento.auditoriaUsuario = res.auditoriaUsuario;
                        elemento.auditoriaFecha = res.auditoriaFecha;
                        if ( it >= this.atributos.length ) {
                           this.nextStep.emit( 13 );
                        }
                     }
                  } );
               } else {
                  it = it + 1;
               }
            } else {
               this.personalityService.update( elemento ).subscribe( res => {
                  if ( res.ok ) {
                     it = it + 1;
                     if ( it >= this.atributos.length ) {
                        this.nextStep.emit( 13 );
                     }
                  }
               } );
            }

         }

      }
   }
}
