import { Component } from '@angular/core';
import { Constante } from '../_models/constante';
import { Lista } from '../_models/lista';
import { ListaItem } from '../_models/listaItem';
import { ConstanteService } from '../_services/constante.service';
import { ListaService } from '../_services/lista.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component( {
               moduleId: module.id,
               templateUrl: 'constante-detail.component.html',
               selector: 'constante-detail'
            } )
export class ConstanteDetailComponent {

   constant: Constante = new Constante();
   datatypeMaster: Lista;
   datatypeDetails: ListaItem[];
   dataType: string;
   habilitado: string;

   constructor( private constanteService: ConstanteService, private listaService: ListaService, private router: Router,
      private route: ActivatedRoute ) {

      route.params.switchMap( ( params: Params ) => constanteService.viewConstant( +params[ 'id' ] ) )
      .subscribe( data => {
         this.constant = data;
         this.habilitado = data.indicadorHabilitado ? 'Si' : 'No';
         listaService.getMasterDetailsByIdItem( 'ListasTiposDatos', this.constant.idTipoDato ).subscribe( res => {
            if ( res.nombre !== null ) {
               this.dataType = res.nombre;
            }
         } );
      } );
   }

   goBack(): void {
      this.router.navigate( [ 'constantes' ] );
   }
}
