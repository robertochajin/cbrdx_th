import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/primeng';
import { NavService } from '../_services/_nav.service';
import { Supplies } from '../_models/supplies';
import { SuppliesService } from '../_services/supplies.service';

@Component( {
               moduleId: module.id,
               templateUrl: 'supplies-add.component.html',
               selector: 'roles-form.component',
               providers: [ ConfirmationService ]
            } )
export class SuppliesAddComponent implements OnInit {

   cuestionario: Supplies = new Supplies();
   allQuest: Supplies[] = [];
   idCuestionario: number;
   msgs: Message[] = [];
   codeExists: boolean = false;

   constructor( private suppliesService: SuppliesService,
      private router: Router,
      private location: Location,
      private route: ActivatedRoute,
      private confirmationService: ConfirmationService,
      private navService: NavService ) {
      this.suppliesService.getAll().subscribe(
       res => {
          this.allQuest = res;
       }
      );

   }

   ngOnInit() {
      console.info( this.cuestionario.idCuestionario );
   }

   goBack(fDirty : boolean): void {
      if (fDirty){
      this.confirmationService.confirm( {
                                           message: ` ¿Está seguro que desea salir sin guardar?`,
                                           header: 'Confirmación',
                                           icon: 'fa fa-question-circle',
                                           accept: () => {
                                              this.location.back();
                                           }
                                        } );
      }else{
         this.location.back();
      }
   }

   onSubmit() {
      if ( !this.codeExists ) {
         this.cuestionario.codigoCuestionario = this.cuestionario.codigoCuestionario.toUpperCase().replace( /[^A-Z0-9]/g, '' ).trim();
         this.suppliesService.add( this.cuestionario ).subscribe( res => {
            this.navService.setMesage( 1, this.msgs );
            this.router.navigate( [ 'questionnaries/update/' + res.idCuestionario ] );
         }, error => {
            this.navService.setMesage( 3, this.msgs );
         } );
      }
   }

   validateCode() {
      if ( this.cuestionario.codigoCuestionario !== '' && this.cuestionario.codigoCuestionario !== null ) {
         this.codeExists = this.allQuest.filter(
               t => (t.codigoCuestionario === this.cuestionario.codigoCuestionario && t.idCuestionario !== this.cuestionario.idCuestionario ) ).length > 0;
      } else {
         this.codeExists = false;
      }
   }

   inputCleanCode( event: any ) {
      let input = event.target.value;
      if ( input.length > 0 ) {
         event.target.value = input.toUpperCase().replace( /[^A-Z0-9]/g, '' ).trim();
      }
   }
}
