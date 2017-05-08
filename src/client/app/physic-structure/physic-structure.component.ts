import { Component, OnInit } from '@angular/core';
import { PhysicStructure } from '../_models/physic-structure';
import { PhysicStructureService } from '../_services/physic-structure.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/primeng';

@Component( {
               moduleId: module.id,
               templateUrl: 'physic-structure.component.html',
               selector: 'physic-structure',
               providers: [ ConfirmationService ]
            } )
export class PhysicStructureComponent implements OnInit {
   physicStructure: PhysicStructure = new PhysicStructure();
   dialogObjet: PhysicStructure = new PhysicStructure();

   ListPhysicStructure: PhysicStructure[];

   constructor( private physicStructureService: PhysicStructureService,
      private router: Router,
      private confirmationService: ConfirmationService ) {
   }

   ngOnInit() {

      this.physicStructureService.getAll().subscribe(
         physicStructure => {
            this.ListPhysicStructure = physicStructure;
            this.ListPhysicStructure.sort( function ( a, b ) {
               return b.idEstructuraFisica - a.idEstructuraFisica;
            } );
         }
      );
   }

   add() {
      this.router.navigate( [ 'physic-structure/add' ] );
   }

   detail( e: PhysicStructure ) {
      this.router.navigate( [ 'physic-structure/detail/' + e.idEstructuraFisica ] );
   }

   update( e: PhysicStructure ) {
      this.router.navigate( [ 'physic-structure/update/' + e.idEstructuraFisica ] );
   }
}
