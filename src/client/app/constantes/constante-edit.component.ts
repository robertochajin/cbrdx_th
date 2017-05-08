import { Component, OnInit } from '@angular/core';
import { Constante } from '../_models/constante';
import { VConstante } from '../_models/vConstante';
import { ConstanteService } from '../_services/constante.service';
import { ListaService } from '../_services/lista.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component( {
               moduleId: module.id,
               templateUrl: 'constante-edit.component.html',
               selector: 'constante-edit'
            } )
export class ConstanteEditComponent implements OnInit {

   constant: Constante = new Constante();
   constantList: VConstante[];
   constantType: any[] = [];
   codeExists: boolean = false;
   regex: string = "";
   displayDialog: boolean = false;

   constructor( private constanteService: ConstanteService, private listaService: ListaService, private router: Router,
      private route: ActivatedRoute ) {
      route.params.switchMap( ( params: Params ) => constanteService.viewConstant( +params[ 'id' ] ) )
      .subscribe( data => {
         this.constant = data;
         this.constanteService.listConstants().subscribe( res => {
            this.constantList = res;
         } );
         listaService.getMasterDetails( 'ListasTiposDatos' ).subscribe( res => {
            this.constantType = res;
            this.alterPattern();
         } );
      } );

   }

   ngOnInit(): void {

   }

   createConstant() {
      this.constanteService.updateConstant( this.constant ).then( data => {
         this.router.navigate( [ 'constantes' ] )
      } );
   }

   validateCode() {
      this.codeExists = this.constantList.filter(
            t => t.constante === this.constant.constante && t.idConstante !== this.constant.idTipoDato ).length > 0;
   }

   inputCleanUp( value: string ) {
      this.constant.constante = value.toUpperCase().replace( /[^A-Z0-9]/, '' ).trim();
   }

   alterPattern() {
      this.inputValue();
      let dataType = this.constantType.find( t => t.idLista == this.constant.idTipoDato );
      if ( dataType.codigo == "NUM" ) {
         this.regex = "[0-9]{0,20}";
      } else {
         this.regex = "";
      }

   }

   goBack(): void {
      this.router.navigate( [ 'constantes' ] );
   }

   inputValue() {
      let label = this.constant.valor;
      if ( label !== "" && label !== null && this.constant.idTipoDato !== null ) {
         let dataType = this.constantType.find( t => t.idLista == this.constant.idTipoDato );
         if ( dataType.codigo === "NUM" ) {
            this.constant.valor = this.constant.valor.replace( /[^0-9]/g, '' );
         } else {
            this.constant.valor = label.replace( " ", '' ).trim();
         }
      }
   }
}
