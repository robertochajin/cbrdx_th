import { Component } from '@angular/core';
import { TipoDeArea } from '../_models/tipoDeArea';
import { TipoDeAreaService } from '../_services/tipoDeArea.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NavService } from '../_services/_nav.service';
import { Message } from 'primeng/primeng';
import { FormSharedModule } from '../shared/form-shared.module';

@Component( {
               moduleId: module.id,
               templateUrl: 'tipoDeArea-edit.component.html',
               selector: 'tipodearea-edit'
            } )
export class TipoDeAreaEditComponent {

   areas: TipoDeArea = new TipoDeArea();
   areasExistentes: TipoDeArea[];
   codeExists: boolean = false;
   displayDialog: boolean;
   msg: Message;

   constructor( private tipoDeAreasService: TipoDeAreaService, private router: Router, private route: ActivatedRoute,
      private navService: NavService ) {
      route.params.switchMap( ( params: Params ) => tipoDeAreasService.viewArea( +params[ 'id' ] ) )
      .subscribe( data => {
         this.areas = data;
         tipoDeAreasService.listAreas().subscribe( res => {
            this.areasExistentes = res.filter( t => t.idEstructuraArea !== this.areas.idEstructuraArea );
         } );
      } );
   }

   updateArea() {
      this.tipoDeAreasService.updateArea( this.areas ).then( data => {
         this.router.navigate( [ 'tipoArea' ] );
         let typeMessage = 2; // 1 = Add, 2 = Update, 3 Error, 4 Custom
         this.navService.setMesage( typeMessage, this.msg );
      } );
   }

   validateCode() {
      this.codeExists = this.areasExistentes.filter( t => t.codigoArea === this.areas.codigoArea ).length > 0;
   }

   inputCleanUp( value: string ) {
      this.areas.codigoArea = value.toUpperCase().replace( /[^A-Z0-9]/gi, '' ).trim();
   }

   goBack(): void {
      this.router.navigate( [ 'tipoArea' ] );
   }

   capitalize() {
      let input = this.areas.estructuraArea;
      this.areas.estructuraArea = input.substring( 0, 1 ).toUpperCase() + input.substring( 1 ).toLowerCase();
   }
}
