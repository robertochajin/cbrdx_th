import { Component, OnInit } from '@angular/core';
import { VConstante } from '../_models/vconstante';
import { Router } from '@angular/router';
import { NavService } from '../_services/_nav.service';
import { ContactInformationService } from './contact-information.service';
import { ContactInformation } from './contact-information';
/**
 * Created by Felipe Aguirre - Jenniferth Escobar on 24/02/2017.
 */
@Component( {
               moduleId: module.id,
               templateUrl: 'contact-information.component.html',
               selector: 'contact-information'
            } )
export class ContactInformationComponent implements OnInit {

   listContactinformation: ContactInformation[];
   contactInformation: ContactInformation = new ContactInformation();
   busqueda: string;
   saveContactInfo: boolean = false;
   editContactInfo: boolean = false;

   constructor( private contactInformationService: ContactInformationService,
      private router: Router,
      private _nav: NavService ) {
      this.busqueda = this._nav.getSearch( 'constante.component' );
   }

   ngOnInit(): void {
      this.contactInformationService.getAll().subscribe( res => {
         this.listContactinformation = res;
      } );
   }

   add() {
      this.contactInformation.idInformacionContcto = null;
      this.saveContactInfo = !this.saveContactInfo;
   }

   cancelSave() {
      this.saveContactInfo = !this.saveContactInfo;
   }

   update( c: ContactInformation ) {
      this.contactInformation = c;
      this.editContactInfo = !this.editContactInfo;
   }

   cancelEdit() {
      this.contactInformation = new ContactInformation();
      this.editContactInfo = !this.editContactInfo;
   }

   setSearch() {
      this._nav.setSearch( 'constante.component', this.busqueda );
   }
}
