import { Component } from "@angular/core";
import { Functionality } from "../_models/functionality";
import { NavService } from "../_services/_nav.service";
import { FormManagerService } from "../_services/form-manager.service";
import { Router } from "@angular/router";
import { ConfirmationService, Message } from "primeng/primeng";

@Component( {
               moduleId: module.id,
               templateUrl: 'form-manager.component.html',
               selector: 'form-manager',
               providers: [ ConfirmationService ]
            } )

export class FormManagerComponent {
   functionality: Functionality = new Functionality();
   listFunctionalities: Functionality[];
   msgs: Message[] = [];
   
   constructor( private formManagerService: FormManagerService,
                private router: Router,
                private _nav: NavService,
                private confirmationService: ConfirmationService ) {
   }
   
   ngOnInit() {
      this.formManagerService.getAllFunctionality().subscribe( rest => {
         this.listFunctionalities = rest;
         this.listFunctionalities.sort( function ( a, b ) {
            return b.idFuncionalidad - a.idFuncionalidad;
         } );
      } );
   }
   
   // update(c: Functionality) {
   //    this.router.navigate(['form-manager/update/'+c.idFuncionalidad]);
   // }
   add() {
      this.router.navigate( [ 'form-manager/add' ] );
   }
   
   update( c: Functionality ) {
      this.router.navigate( [ 'form-manager/update/' + c.idFuncionalidad ] );
   }
   
}
