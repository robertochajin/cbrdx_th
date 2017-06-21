import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ConfirmationService, SelectItem, Message } from 'primeng/primeng';
import { PhysicStructure } from '../_models/physic-structure';
import { PhysicStructureService } from '../_services/physic-structure.service';
import { Localizaciones } from '../_models/localizaciones';
import { LocateService } from '../_services/locate.service';
import { ListaItem } from '../_models/listaItem';
import { ListaService } from '../_services/lista.service';
import { NavService } from '../_services/_nav.service';
import { FormSharedModule } from '../shared/form-shared.module';


@Component( {
               moduleId: module.id,
               templateUrl: 'physic-structure-form.component.html',
               selector: 'physic-structure',
               providers: [ ConfirmationService ]
            } )

export class PhysicStructureAddComponent implements OnInit {
   physicStructure: PhysicStructure = new PhysicStructure();
   dialogObjet: PhysicStructure = new PhysicStructure();
   ListCategory: SelectItem[] = [];
   ListPhysicStructure: PhysicStructure[];
   msgs: Message[] = [];
   header = 'Agregando Estructura Física';
   submitted: boolean;
   codExists = false;
   direcValid: boolean;
   addinglocation = true;
   localizacion: Localizaciones = new Localizaciones();
   msg: Message;

   constructor( private physicStructureService: PhysicStructureService,
      private listaService: ListaService,
      private locateService: LocateService,
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

      this.focusUP();
   }

   inputCleanUp( value: string ) {
      this.physicStructure.codigo = value.toUpperCase().replace( /[^A-Z0-9]/gi, '' ).trim();
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
      this.msgs = [];
      if ( this.physicStructure.direccion !== '' ) {
         this.submitted = true;
         this.localizacion.indicadorHabilitado = true;
         this.locateService.add( this.localizacion ).subscribe(
            data => {
               this.physicStructure.idLocalizacion = data.idLocalizacion;
               this.physicStructureService.add( this.physicStructure ).subscribe(
                  data => {
                     let typeMessage = 1; // 1 = Add, 2 = Update, 3 Error, 4 Custom
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
         let typeMessage = 4; // 1 = Add, 2 = Update, 3 Error, 4 Custom
         this.navService.setMesage( typeMessage, {
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

    goBack(fDirty : boolean): void {

        if ( fDirty ){
            this.confirmationService.confirm( {
                message: ` ¿Está seguro que desea salir sin guardar?`,
                header: 'Confirmación',
                icon: 'fa fa-question-circle',
                accept: () => {
                    this.location.back();
                }
            } );
        }else {
            this.location.back();
        }
    }

   capitalize( event: any ) {
      let input = event.target.value;
      event.target.value = input.substring( 0, 1 ).toUpperCase() + input.substring( 1 ).toLowerCase();
   }

}
