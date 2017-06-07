/**
 * Created by Jenniferth Escobar - Felipe Aguirre on 28/02/2017.
 */
import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { PhysicStructure } from '../_models/physic-structure';
import { PhysicStructureService } from '../_services/physic-structure.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormSharedModule } from '../shared/form-shared.module';


@Component( {
               moduleId: module.id,
               templateUrl: 'physic-structure-detail.component.html',
               selector: 'physic-structure'
            } )
export class PhysicStructureDetailComponent {

   physicStructure: PhysicStructure = new PhysicStructure();
   habilitado: string;
   virtual: string;

   constructor( private physicStructureService: PhysicStructureService,
      private router: Router,
      private route: ActivatedRoute,
      private location: Location, ) {
      route.params.switchMap( ( params: Params ) => physicStructureService.getById( +params[ 'id' ] ) )
      .subscribe( data => {
         this.physicStructure = data;
         this.habilitado = data.indicadorHabilitado ? 'Si' : 'No';
         this.virtual = data.indicadorVirtual ? 'Si' : 'No';
      } );
   }

   goBack(): void {
      this.location.back();
   }
}
