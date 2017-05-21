import { Component, OnInit } from '@angular/core';
import { Constante } from '../_models/constante';
import { VConstante } from '../_models/vconstante';
import { ConstanteService } from '../_services/constante.service';
import { Router } from '@angular/router';
import { ListaItem } from '../_models/listaItem';
import { ListaService } from '../_services/lista.service';
import { NavService } from '../_services/_nav.service';
import { Message } from 'primeng/primeng';

@Component( {
               moduleId: module.id,
               templateUrl: 'constante-add.component.html',
               selector: 'constante-add'
            } )
export class ConstanteAddComponent implements OnInit {

   constant: Constante = new Constante();
   constantList: VConstante[];
   constantType: ListaItem[];
   codeExists: boolean = false;
   regex: string = '';
   displayDialog: boolean = false;
   msg: Message;

   constructor( private constanteService: ConstanteService, private router: Router, private listaService: ListaService,
      private navService: NavService ) {
      this.listaService.getMasterDetails( 'ListasTiposDatos' ).subscribe( res => {
         this.constantType = res;
      } );
   }

   ngOnInit(): void {
      this.constanteService.listConstants().subscribe( res => {
         this.constantList = res;
      } );
   }

   createConstant() {
      this.constanteService.addConstant( this.constant ).then( data => {
         this.router.navigate( [ 'constantes' ] );
         this.navService.setMesage( 1, this.msg );
      } );
   }

   validateCode() {
      this.codeExists = this.constantList.filter( t => t.constante === this.constant.constante ).length > 0;
   }

   inputCleanUp( value: string ) {
      if ( value ) {
         this.constant.constante = value.toUpperCase().replace( /[^A-Z0-9]/gi, '' ).trim();
      }
   }

   alterPattern() {
      this.inputValue();
      let dataType = this.constantType.find( t => t.idLista === this.constant.idTipoDato );
      if ( dataType.codigo === 'NUM' ) {
         this.regex = '[0-9]{0,20}';
      } else {
         this.regex = '';
      }

   }

   goBack(): void {
      this.router.navigate( [ 'constantes' ] );
   }

   inputValue() {
      let label = this.constant.valor;
      if ( label !== '' && label !== null && label !== undefined && this.constant.idTipoDato !== null ) {
         let dataType = this.constantType.find( t => t.idLista === this.constant.idTipoDato );
         if ( dataType.codigo === 'NUM' ) {
            this.constant.valor = this.constant.valor.replace( /[^0-9]/g, '' );
         } else {

            this.constant.valor = label.replace( ' ', '' ).trim();
         }
      }
   }

}
