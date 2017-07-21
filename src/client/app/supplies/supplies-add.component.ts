import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/primeng';
import { NavService } from '../_services/_nav.service';
import { SuppliesGroups } from '../_models/suppliesGroups';
import { SuppliesService } from '../_services/supplies.service';

@Component( {
               moduleId: module.id,
               templateUrl: 'supplies-add.component.html',
               selector: 'supplies-add.component',
               providers: [ ConfirmationService ]
            } )
export class SuppliesAddComponent implements OnInit {

   suppliesGroup: SuppliesGroups = new SuppliesGroups();
   allGroups: SuppliesGroups[] = [];
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
          this.allGroups = res;
       }
      );

   }

   ngOnInit() {
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
         this.suppliesGroup.codigo = this.suppliesGroup.codigo.toUpperCase().replace( /[^A-Z0-9]/g, '' ).trim();
         this.suppliesService.add( this.suppliesGroup ).subscribe( res => {
            this.navService.setMesage( 1, this.msgs );
            this.router.navigate( [ 'supplies/update/' + res.idGrupoDotacion ] );
         }, error => {
            this.navService.setMesage( 3, this.msgs );
         } );
      }
   }

   validateCode() {
      if ( this.suppliesGroup.codigo !== '' && this.suppliesGroup.codigo !== null ) {
         this.codeExists = this.allGroups.filter(
               t => (t.codigo === this.suppliesGroup.codigo && t.idGrupoDotacion !== this.suppliesGroup.idGrupoDotacion ) ).length > 0;
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
