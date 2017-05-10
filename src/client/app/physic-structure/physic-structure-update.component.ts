import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ConfirmationService, SelectItem, Message } from 'primeng/primeng';
import { PhysicStructure } from '../_models/physic-structure';
import { PhysicStructureService } from '../_services/physic-structure.service';
import { Localizaciones } from '../_models/localizaciones';
import { LocateService } from '../_services/locate.service';
import { ListaItem } from '../_models/listaItem';
import { ListaService } from '../_services/lista.service';
import { NavService } from '../_services/_nav.service';
@Component( {
               moduleId: module.id,
               templateUrl: 'physic-structure-form.component.html',
               selector: 'physic-structure',
               providers: [ ConfirmationService ]
            } )

export class PhysicStructureUpdateComponent  implements OnInit {
   physicStructure: PhysicStructure = new PhysicStructure();
   dialogObjet: PhysicStructure = new PhysicStructure();
   codExists = false;
   addinglocation = true;
   localizacion: Localizaciones = new Localizaciones();
   ListPhysicStructure: PhysicStructure[];
   ListCategory: SelectItem[] = [];
   submitted: boolean;
   msg: Message;
   msgs: Message[]=[];
   header = 'Editando Estructura Física';

   constructor( private physicStructureService: PhysicStructureService,
      private listaService: ListaService,
      private locateService: LocateService,
      private router: Router,
      private route: ActivatedRoute,
      private location: Location,
      private confirmationService: ConfirmationService,
      private navService: NavService ) {
   }

   ngOnInit() {
      this.physicStructureService.getAll().subscribe( res => {
         this.ListPhysicStructure = res;
      } );

      this.listaService.getMasterDetails( 'ListasClasificacionesSedes' ).subscribe( res => {
         this.ListCategory.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.ListCategory.push( { label: s.nombre, value: s.idLista } );
         } );
      } );

      this.route.params.switchMap( ( params: Params ) => this.physicStructureService.getById( +params[ 'id' ] ) )
      .subscribe( data => {
         this.physicStructure = data;
         this.locateService.getById( this.physicStructure.idLocalizacion ).subscribe(
            rest => {
               this.localizacion = rest;
            }
         );
      } );
      this.focusUP();
   }

   inputCleanUp( value: string ) {
      this.physicStructure.codigo = value.toUpperCase().replace( /[^A-Z0-9]/, '' ).trim();
   }

   validateCode() {
      this.codExists = this.ListPhysicStructure.filter( t => t.codigo === this.physicStructure.codigo ).length > 0;
   }

   toggleform() {
      this.addinglocation = !this.addinglocation;
   }

   bindLocation( event: any ) {
      this.localizacion = event;
      this.physicStructure.direccion = event.direccion;
      this.toggleform();
   }

   onSubmit() {
      if ( this.physicStructure.direccion !== '' ) {
         this.submitted = true;
         this.localizacion.indicadorHabilitado = true;
         this.locateService.add( this.localizacion ).subscribe(
            data => {
               this.physicStructure.idLocalizacion = data.idLocalizacion;
               this.physicStructureService.update( this.physicStructure ).subscribe(
                  data => {
                     let typeMessage = 2; // 1 = Add, 2 = Update, 3 Error, 4 Custom
                     this.navService.setMesage( typeMessage, this.msg );
                     this.location.back();
                  }, error => {
                     let typeMessage = 3; // 1 = Add, 2 = Update, 3 Error, 4 Custom
                     this.navService.setMesage( typeMessage, this.msg );
                  }
               );
            } );
      } else {
         this.focusUP();
         this.msgs.push( {
                            severity: 'error',
                            summary: 'Dirección invalida',
                            detail: 'Es necesario agregar una dirección válida'
                         } );
      }
   }

   focusUP() {
      const element = document.querySelector( '#formulario' );
      if ( element ) {
         element.scrollIntoView( element );
      }
   }

   goBack() {
      this.confirmationService.confirm( {
                                           message: ` ¿Esta seguro que desea salir sin guardar?`,
                                           header: 'Corfirmación',
                                           icon: 'fa fa-question-circle',
                                           accept: () => {
                                              this.location.back();
                                           }
                                        } );
   }

   capitalize( event: any ) {
      let input = event.target.value;
      event.target.value = input.substring( 0, 1 ).toUpperCase() + input.substring( 1 ).toLowerCase();
   }
}
