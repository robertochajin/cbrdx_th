/**
 * Created by Jenniferth Escobar - Felipe Aguirre on 28/02/2017.
 */
import { Component } from "@angular/core";
import { TipoDeArea } from "../_models/tipoDeArea";
import { TipoDeAreaService } from "../_services/tipoDeArea.service";
import { Router, ActivatedRoute, Params } from "@angular/router";

@Component( {
               moduleId: module.id,
               templateUrl: 'tipoDeArea-detail.component.html',
               selector: 'tipoDeArea-detail'
            } )
export class TipoDeAreaDetailComponent {
   
   areas: TipoDeArea = new TipoDeArea();
   habilitado: string;
   
   constructor( private tipoDeAreaService: TipoDeAreaService, private router: Router, private route: ActivatedRoute ) {
      route.params.switchMap( ( params: Params ) => tipoDeAreaService.viewArea( +params[ 'id' ] ) )
      .subscribe( data => {
         this.areas = data;
         this.habilitado = data.indicadorHabilitado ? "Si" : "No";
      } );
   }
   
   goBack(): void {
      this.router.navigate( [ 'tipoArea' ] );
   }
}
