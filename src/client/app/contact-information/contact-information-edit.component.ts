import 'rxjs/add/operator/switchMap';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { EmployeeEstate } from '../_models/employee-estate';
import { SelectItem, Message, ConfirmationService } from 'primeng/primeng';
import { EmployeeEstateService } from '../_services/employee-estate.service';
import { ListEmployeesService } from '../_services/lists-employees.service';
import { NavService } from '../_services/_nav.service';
import { ListaService } from '../_services/lista.service';
import { ContactInformation } from './contact-information';
import { ContactInformationService } from './contact-information.service';

@Component( {
               moduleId: module.id,
               selector: 'contact-information-edit',
               templateUrl: 'contact-information-edit.component.html',
               providers: [ ConfirmationService ]
            } )

export class ContactInformationEditComponent implements OnInit {
   @Input()
   contactInformation: ContactInformation = new ContactInformation();
   listContactinformation: ContactInformation[];

   msgs: Message[] = [];
   existCode: boolean = false;
   @Output()
   dismiss: EventEmitter<number> = new EventEmitter<number>();

   constructor( private contactInformationService: ContactInformationService,
      private listaService: ListaService,
      private router: Router,
      private route: ActivatedRoute,
      private location: Location,
      private confirmationService: ConfirmationService,
      private _nav: NavService ) {

   }

   ngOnInit() {
      this.contactInformationService.getAll().subscribe( res => {
         this.listContactinformation = res;
      } );
   }

   onSubmit() {
      if ( this.contactInformation.idInformacionContcto ) {
         this.contactInformationService.update( this.contactInformation ).subscribe( data => {
            this._nav.setMesage( 2, this.msgs );
            this.dismiss.emit( 1 );
         }, error => {
            this._nav.setMesage( 3, this.msgs );
         } );
      } else {
         this.contactInformationService.add( this.contactInformation ).subscribe( data => {
            this._nav.setMesage( 1, this.msgs );
            this.dismiss.emit( 1 );
         }, error => {
            this._nav.setMesage( 3, this.msgs );
         } );
      }
   }

   capitalize( event: any ) {
      let input = event.target.value;
      event.target.value = input.substring( 0, 1 ).toUpperCase() + input.substring( 1 ).toLowerCase();
   }

   inputCode( event: any ) {
      let input = event.target.value;
      event.target.value = input.toUpperCase().replace( /[^A-Z0-9]/gi, '' );
      let codigo = event.target.value;
      let temp = this.listContactinformation.find( c => c.codigo === codigo );
      if ( temp ) {
         this.existCode = true;
      } else {
         this.existCode = false;
      }
   }

   goBack( fDirty: boolean ): void {

      if ( fDirty ) {
         this.confirmationService.confirm( {
                                              message: ` ¿Está seguro que desea salir sin guardar?`,
                                              header: 'Confirmación',
                                              icon: 'fa fa-question-circle',
                                              accept: () => {
                                                 this.dismiss.emit( 1 );
                                              }
                                           } );
      } else {
         this.dismiss.emit( 1 );
      }
   }

}
