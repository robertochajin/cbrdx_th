import { Component } from "@angular/core";
import { Location } from "@angular/common";
import { ConfirmationService, SelectItem, Message } from "primeng/primeng";
import { PhysicStructure } from "../_models/physic-structure";
import { PhysicStructureService } from "../_services/physic-structure.service";
import { Localizaciones } from "../_models/localizaciones";
import { LocateService } from "../_services/locate.service";
import { ListaItem } from "../_models/listaItem";
import { ListaService } from "../_services/lista.service";

@Component( {
               moduleId: module.id,
               templateUrl: 'physic-structure-form.component.html',
               selector: 'physic-structure',
               providers: [ ConfirmationService ]
            } )
export class PhysicStructureAddComponent {
   physicStructure: PhysicStructure = new PhysicStructure();
   dialogObjet: PhysicStructure = new PhysicStructure();
   ListCategory: SelectItem[] = [];
   ListPhysicStructure: PhysicStructure[];
   msgs: Message[] = [];
   header: string = "Agregando Estructura Física";
   submitted: boolean;
   codExists: boolean = false;
   direcValid: boolean;
   addinglocation: boolean = true;
   localizacion: Localizaciones = new Localizaciones();
   
   constructor( private physicStructureService: PhysicStructureService,
                private listaService: ListaService,
                private locateService: LocateService,
                private location: Location,
                private confirmationService: ConfirmationService ) {
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
      this.msgs = [];
      if ( this.physicStructure.direccion !== '' ) {
         this.submitted = true;
         this.localizacion.indicadorHabilitado = true;
         this.locateService.add( this.localizacion ).subscribe(
            data => {
               this.physicStructure.idLocalizacion = data.idLocalizacion;
               this.physicStructureService.add( this.physicStructure ).subscribe(
                  data => {
                     this.msgs.push( {
                                        severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.'
                                     } );
                     this.location.back();
                  }, error => {
                     this.msgs.push( { severity: 'error', summary: 'Error', detail: 'Error al guardar.' } );
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
      const element = document.querySelector( "#formulario" );
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
