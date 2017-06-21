import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/primeng';
import { CompanyAssets } from '../_models/companyAssets';
import { CompanyAssetsServices } from '../_services/company-assets.service';
import { CompanyAssetsTypesServices } from '../_services/list-company-assets.service';
import { Positions } from '../_models/positions';
import { ListaItem } from '../_models/listaItem';
import { ListaService } from '../_services/lista.service';
import { NavService } from '../_services/_nav.service';

@Component( {
               moduleId: module.id,
               templateUrl: 'company-assets.component.html',
               selector: 'company-assets',
               providers: [ ConfirmationService ]
            } )

export class CompanyAssetsComponent implements OnInit {

   @Input()
   position: Positions;
   listCompanyAssets: ListaItem[] = [];
   companyAssets: CompanyAssets[] = [];
   elementos: CompanyAssets[] = [];

   @Output()
   nextStep: EventEmitter<number> = new EventEmitter<number>();

   description: string;
   permitirSiguiente = false;
   alert = false;
   msgsAlert: Message[] = [];

   constructor( private router: Router,
      private companyAssetsService: CompanyAssetsServices,
      private listaService: ListaService,
      private listCompanyAssetsService: CompanyAssetsTypesServices,
      private confirmationService: ConfirmationService,
      private _nav: NavService
   ) {
   }

   ngOnInit() {
      //this.msgsAlert.push( { severity: 'error', summary: 'Error', detail: 'Debe llenar al menos un registro' } );
      this._nav.setMesage(0, { severity: 'error', summary: 'Error', detail: 'Debe llenar al menos un registro' });
      this.listaService.getMasterDetails( 'ListasTiposElementos' ).subscribe( listCompanyAssets => {
         this.listCompanyAssets = listCompanyAssets;
         this.companyAssetsService.getAllByPosition( this.position.idCargo ).subscribe( res => {
            this.companyAssets = res;
            this.listCompanyAssets.map( ( lca: ListaItem ) => {
               let item: CompanyAssets = new CompanyAssets();
               item = this.companyAssets.find( cas => cas.idTipoElemento === lca.idLista );
               if ( item === undefined ) {
                  item = new CompanyAssets();
               }
               item.idCargo = this.position.idCargo;
               item.nombreLista = lca.nombre;
               item.codigoLista = lca.codigo;
               item.idTipoElemento = lca.idLista;
               this.elementos.push( item );
            } );
         } );
      } );
   }

   next() {
      let num = 0;
      for ( let elemento of this.elementos ) {
         if ( elemento.descripcion === undefined || elemento.descripcion === '' || elemento.descripcion === null ) {
            num++;
         }
      }
      if ( this.elementos.length === num ) {
         this.alert = true;
      } else {
         this.alert = false;
         let it = 1;
         for ( let elemento of this.elementos ) {
            if ( elemento.idCargoElemento === undefined ||
                 elemento.idCargoElemento === 0 || elemento.idCargoElemento === null ) {
               if ( elemento.descripcion !== '' && elemento.descripcion !== null && elemento.descripcion !== undefined ) {
                  this.companyAssetsService.add( elemento ).subscribe( res => {
                     if ( res.idCargoElemento > 0 ) {
                        it = it + 1;
                        elemento.idCargoElemento = res.idCargoElemento;
                        elemento.auditoriaUsuario = res.auditoriaUsuario;
                        elemento.auditoriaFecha = res.auditoriaFecha;
                        if ( it >= this.elementos.length ) {
                           this.nextStep.emit( 11 );
                        }
                     }
                  } );
               } else {
                  it = it + 1;
               }
            } else {
               this.companyAssetsService.update( elemento ).subscribe( res => {
                  if ( res.ok ) {
                     it = it + 1;
                     if ( it >= this.elementos.length ) {
                        this.nextStep.emit( 11 );
                     }
                  }
               } );
            }

         }

      }
   }
}
