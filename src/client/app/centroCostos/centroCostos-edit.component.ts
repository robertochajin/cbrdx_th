/**
 * Created by Felipe Aguirre - Jenniferth Escobar on 24/02/2017.
 */
import { Component } from '@angular/core';
import { CentroCostos } from '../_models/centroCostos';
import { CentroCostosService } from '../_services/centroCostos.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NavService } from '../_services/_nav.service';
import { Message } from 'primeng/primeng';
@Component( {
               moduleId: module.id,
               templateUrl: 'centroCostos-edit.component.html',
               selector: 'gruposgestion-edit'
            } )
export class CentroCostosEditComponent {

   centroCostos: CentroCostos = new CentroCostos();
   centrosExistentes: CentroCostos[];
   codeExists: boolean = false;
   displayDialog: boolean;
   msg: Message;

   constructor( private centroCostosService: CentroCostosService, private router: Router, private route: ActivatedRoute,
      private navService: NavService ) {
      route.params.switchMap( ( params: Params ) => centroCostosService.viewCentroCostos( +params[ 'id' ] ) )
      .subscribe( data => {
         this.centroCostos = data;
         centroCostosService.listCentroCostos().subscribe( res => {
            this.centrosExistentes = res.filter( t => t.idCentroCostos !== this.centroCostos.idCentroCostos );
         } );
      } );
   }

   createGruposGestion() {
      this.centroCostosService.updateCentroCostos( this.centroCostos ).then( data => {
         this.router.navigate( [ 'centroCostos' ] );
         let typeMessage = 2; // 1 = Add, 2 = Update, 3 Error, 4 Custom
         this.navService.setMesage( typeMessage, this.msg );
      } );
   }

   validateCode() {
      this.codeExists = this.centrosExistentes.filter( t => t.codigoCentroCostos === this.centroCostos.codigoCentroCostos ).length > 0;
   }

   inputCleanUp( value: string ) {
      if ( value ) {
         this.centroCostos.codigoCentroCostos = value.toUpperCase().replace( /[^A-Z0-9]/gi, '' ).trim();
      }
   }

   goBack(): void {
      this.router.navigate( [ 'centroCostos' ] );
   }

   capitalize() {
      let input = this.centroCostos.centroCostos;
      if ( input ) {
         this.centroCostos.centroCostos = input.substring( 0, 1 ).toUpperCase() + input.substring( 1 ).toLowerCase();
      }
   }
}
