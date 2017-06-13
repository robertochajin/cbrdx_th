import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Employee } from '../_models/employees';
import { EmployeesContact } from '../_models/employeesContactList';
import { EmployeesContactService } from '../_services/employees-contact.service';
import { EmployeesService } from '../_services/employees.service';
import { SelectItem, Message, ConfirmationService } from 'primeng/primeng';
import { ListaItem } from '../_models/listaItem';
import { ListaService } from '../_services/lista.service';
import { NavService } from '../_services/_nav.service';

@Component( {
               moduleId: module.id,
               templateUrl: 'employees-contact-list.html',
               selector: 'employees-contact-list',
               providers: [ ConfirmationService ]
            } )
export class EmployeesContactListComponent implements OnInit {

   @Input() employee: Employee;

   contact: EmployeesContact = new EmployeesContact();
   lcontact: EmployeesContact = new EmployeesContact();
   dialogObjet: EmployeesContact = new EmployeesContact();
   contacts: EmployeesContact[] = [];
   showForm: boolean = false;
   msgs: Message[] = [];
   relationship: SelectItem[] = [];
   idTer: number;
   tel: boolean = false;
   cel: boolean = true;

   constructor( private employeesContactService: EmployeesContactService,
      private router: Router,
      private route: ActivatedRoute,
      private confirmationService: ConfirmationService,
      private employeesService: EmployeesService,
      private listaService: ListaService,
      private _nav: NavService ) {
      this.listaService.getMasterDetails( 'ListasParentescos' ).subscribe( res => {
         this.relationship.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.relationship.push( { label: s.nombre, value: s.idLista } );
         } );
      } );
   }

   ngOnInit() {

      this.idTer = this.employee.idTercero;
      this.employeesContactService.getByEmployee( this.idTer ).subscribe(
         contacts => {
            for ( let c of contacts ) {
               let bandera = false;
               let label = '';
               for ( let ct of this.relationship ) {
                  if ( c.idListaParentesco === ct.value ) {
                     label = ct.label;
                     bandera = true;
                     break;
                  }
               }
               if ( bandera ) {
                  c.nombreListaParentesco = label;
                  this.contacts.push( c );
               }
            }
         }
      );

   }

   onSubmit() {
      this.msgs = [];
      this.showForm = false;
      this.contact.idTercero = this.idTer;
      if ( this.contact.idTerceroContacto === null ||
           this.contact.idTerceroContacto === 0  ||
           this.contact.idTerceroContacto === undefined ) {
         this.employeesContactService.add( this.contact )
         .subscribe( data => {
            // 1:add 2:update 3:error
            this._nav.setMesage( 1, this.msgs );
            this.employeesContactService.getByEmployee( this.employee.idTercero ).subscribe(
               contacts => {
                  this.contacts = [];
                  for ( let c of contacts ) {
                     c.nombreListaParentesco = this.relationship.find( s => s.value === c.idListaParentesco ).label;
                     this.contacts.push( c );
                  }
               }
            );
         }, error => {
            this.showForm = true;
            // 1:add 2:update 3:error
            this._nav.setMesage( 3, this.msgs );
         } );
      } else {
         this.employeesContactService.update( this.contact )
         .subscribe( data => {
            // 1:add 2:update 3:error
            this._nav.setMesage( 2, this.msgs );

            this.employeesContactService.getByEmployee( this.employee.idTercero ).subscribe(
               contacts => {
                  this.contacts = [];
                  for ( let c of contacts ) {
                     c.nombreListaParentesco = this.relationship.find( s => s.value === c.idListaParentesco ).label;
                     this.contacts.push( c );
                  }
               }
            );

         }, error => {
            this.showForm = true;
            // 1:add 2:update 3:error
            this._nav.setMesage( 3, this.msgs );
         } );
      }

   }

   delete( f: EmployeesContact ) {
      this.dialogObjet = f;
      this.confirmationService.confirm( {
                                           message: ` ¿Está seguro que desea inactivar el contacto?`,
                                           header: 'Confirmación',
                                           icon: 'fa fa-question-circle',
                                           accept: () => {
                                              this.dialogObjet.indicadorHabilitado = false;
                                              this.employeesContactService.update( this.dialogObjet ).subscribe( r => {
                                                 this.contacts.splice( this.contacts.indexOf( this.dialogObjet ), 1 );
                                                 this.dialogObjet = null;
                                              } );
                                           },
                                           reject: () => {
                                              this.dialogObjet = null;
                                           }
                                        } );
   }

   add() {
      this.msgs = [];
      this.contact = new EmployeesContact();
      this.showForm = true;
      setTimeout( () => {
         jQuery( 'body' ).animate( {
                                      scrollTop: jQuery( 'p-accordiontab > .ui-state-active' ).position().top + 90
                                   }, 'fast' );
      }, 1000 );
   }

   update( f: EmployeesContact ) {
      this.msgs = [];
      this.showForm = true;
      this.contact = Object.assign( {}, f );

   }

   goBackUpdate(fDirty:boolean) {

      if ( fDirty ){
         this.confirmationService.confirm( {
            message: ` ¿Esta seguro que desea salir sin guardar?`,
            header: 'Corfirmación',
            icon: 'fa fa-question-circle',
            accept: () => {
               this.msgs = [];
               this.showForm = false;
            }
         } );
      }else {
         this.msgs = [];
         this.showForm = false;
      }
   }

   capitalize() {
      let input = this.contact.contacto;
      input = input.toLowerCase().replace( /^.|\s\S/g, function ( a ) {
         return a.toUpperCase();
      } );
      this.contact.contacto = input;
   }

   validarTelefono() {
      if ( this.contact.telefono === '(___) ___-____ Ext ____' ) {
         this.tel = true;
         this.cel = true;
      } else {
         this.tel = false;
         this.cel = false;
      }
   }

   validarCelular() {
      if ( this.contact.celular === '(___) ___-____' ) {
         this.tel = true;
         this.cel = true;
      } else {
         this.tel = false;
         this.cel = false;
      }
   }

}
