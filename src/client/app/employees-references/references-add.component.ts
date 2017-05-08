import "rxjs/add/operator/switchMap";
import { Component, Input, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";
import { References } from "./references";
import { ReferencesService } from "./references.service";
import { SelectItem, Message, ConfirmationService } from "primeng/primeng";
import { LocateService } from "../_services/locate.service";
import { NavService } from "../_services/_nav.service";
import { Localizaciones } from "../_models/localizaciones";
import { ListaService } from "../_services/lista.service";
import { ListaItem } from "../_models/listaItem";

@Component( {
               moduleId: module.id,
               selector: 'add-references',
               templateUrl: 'references-form.component.html',
               providers: [ ConfirmationService ]
            } )

export class ReferencesAddComponent implements OnInit {
   @Input()
   reference: References = new References();
   
   localizacion: Localizaciones = new Localizaciones();
   header: string = 'Agregando Referencia';
   referencesTypes: SelectItem[] = [];
   submitted: boolean;
   msgs: Message[] = [];
   uploadedFiles: any[] = [];
   addinglocation: boolean = true;
   idTercero: number;
   
   constructor( private referencesService: ReferencesService,
                private route: ActivatedRoute,
                private router: Router,
                private location: Location,
                private locateService: LocateService,
                private confirmationService: ConfirmationService,
                private listaService: ListaService,
                private _nav: NavService ) {
   }
   
   ngOnInit() {
      this.listaService.getMasterDetails( 'ListasTiposReferencias' ).subscribe( res => {
         this.referencesTypes.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.referencesTypes.push( { label: s.nombre, value: s.idLista } );
         } );
      } );
      this.route.params.subscribe( ( params: Params ) => {
         this.idTercero = params[ 'tercero' ];
      } );
      this.focusUP();
   }
   
   onSubmit() {
      this.msgs = [];
      if ( this.reference.direccion !== '' ) {
         this.submitted = true;
         
         this.localizacion.indicadorHabilitado = true;
         this.locateService.add( this.localizacion ).subscribe(
            data => {
               if ( data.idLocalizacion ) {
                  this.reference.idLocalizacion = data.idLocalizacion;
                  this.reference.primerNombre = this.capitalizeSave( this.reference.primerNombre );
                  this.reference.segundoNombre = this.capitalizeSave( this.reference.segundoNombre );
                  this.reference.primerApellido = this.capitalizeSave( this.reference.primerApellido );
                  this.reference.segundoApellido = this.capitalizeSave( this.reference.segundoApellido );
                  this.reference.idTercero = this.idTercero;
                  this.reference.indicadorHabilitado = true;
                  this.referencesService.add( this.reference )
                  .subscribe(
                     data => {
                        
                        this.msgs.push( { severity: 'info', summary: 'Success', detail: 'Guardando' } );
                        this._nav.setTab( 8 );
                        this.location.back();
                     } );
               }
            }
         );
         
      } else {
         this.focusUP();
         this.msgs.push( {
                            severity: 'error', summary: 'Dirección invalida',
                            detail: 'Es necesario agregar una dirección válida'
                         } );
      }
   }
   
   goBack(): void {
      this.confirmationService.confirm( {
                                           message: ` ¿Esta seguro que desea Cancelar?`,
                                           header: 'Corfirmación',
                                           icon: 'fa fa-question-circle',
                                           accept: () => {
                                              this._nav.setTab( 8 );
                                              this.location.back();
                                           },
                                           reject: () => {
                                           }
                                        } );
   }
   
   focusUP() {
      const element = document.querySelector( "#formulario" );
      if ( element ) {
         element.scrollIntoView( element );
      }
   }
   
   capitalize( event: any ) {
      let input = event.target.value;
      event.target.value = input.substring( 0, 1 ).toUpperCase() + input.substring( 1 ).toLowerCase();
   }
   
   capitalizeSave( input: any ) {
      return input.substring( 0, 1 ).toUpperCase() + input.substring( 1 ).toLowerCase();
   }
   
   onUpload( event: any ) {
      for ( let file of event.files ) {
         this.uploadedFiles.push( file );
      }
      
      this.msgs = [];
      this.msgs.push( { severity: 'info', summary: 'File Uploaded', detail: '' } );
   }
   
   bindLocation( event: any ) {
      this.localizacion = event;
      this.reference.direccion = event.direccion;
      this.toggleform();
   }
   
   toggleform() {
      this.addinglocation = !this.addinglocation;
   }
}


