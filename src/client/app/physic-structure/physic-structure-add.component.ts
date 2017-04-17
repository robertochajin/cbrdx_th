import {Component,Input} from '@angular/core';
import {PhysicStrucrute} from '../_models/physic-structure';
import {PhysicStructuteService} from '../_services/physic-structure.service';
import {Router} from '@angular/router';
import {ConfirmationService} from 'primeng/primeng';

@Component({
   moduleId: module.id,
   templateUrl: 'physic-structure-form.component.html',
   selector: 'physic-structure',
   providers:  [ConfirmationService]
})
export class PhysicStructureAddComponent {
   physicStrucrute: PhysicStrucrute = new PhysicStrucrute();
   dialogObjet: PhysicStrucrute = new PhysicStrucrute();
   header: "Agregando Estructura Física";

   constructor(
      private physicStrucruteService: PhysicStructuteService,
      private router: Router,
      private confirmationService: ConfirmationService
   ) {
   }

   ngOnInit() {

   }
   onSubmit(){

   }
   add() {
      this.router.navigate(['physic-structure/add']);
   }
}
