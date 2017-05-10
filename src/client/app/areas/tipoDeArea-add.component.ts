import { Component } from '@angular/core';
import { TipoDeArea } from '../_models/tipoDeArea';
import { TipoDeAreaService } from '../_services/tipoDeArea.service';
import { Router } from '@angular/router';
import { NavService } from '../_services/_nav.service';
import { Message } from 'primeng/primeng';
@Component( {
               moduleId: module.id,
               templateUrl: 'tipoDeArea-add.component.html',
               selector: 'tipodeareas-add'
            } )
export class TipoDeAreaAddComponent {

   areas: TipoDeArea = new TipoDeArea();
   areasExistentes: TipoDeArea[];
   codeExists: boolean = false;
   displayDialog: boolean;
   msg: Message;

   constructor( private tipoDeAreasService: TipoDeAreaService, private router: Router, private navService: NavService ) {
      tipoDeAreasService.listAreas().subscribe( res => {
         this.areasExistentes = res;
      } );
   }

   createArea() {
      this.tipoDeAreasService.addArea( this.areas ).then( data => {
         this.router.navigate( [ 'tipoArea' ] );
         let typeMessage = 1; // 1 = Add, 2 = Update, 3 Error, 4 Custom
         this.navService.setMesage( typeMessage, this.msg );
      } );
   }

   validateCode() {
      this.codeExists = this.areasExistentes.filter( t => t.codigoArea === this.areas.codigoArea ).length > 0;
   }

   inputCleanUp( value: string ) {
      this.areas.codigoArea = value.toUpperCase().replace( /[^A-Z0-9]/, '' ).trim();
   }

   goBack(): void {
      this.router.navigate( [ 'tipoArea' ] );
   }

   capitalize() {
      let input = this.areas.estructuraArea;
      if ( input ) {
         this.areas.estructuraArea = input.substring( 0, 1 ).toUpperCase() + input.substring( 1 ).toLowerCase();
      }
   }
}
