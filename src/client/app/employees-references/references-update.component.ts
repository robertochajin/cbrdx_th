import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { References } from '../_models/references';
import { ReferencesService } from '../_services/references.service';
import { SelectItem, Message, ConfirmationService } from 'primeng/primeng';
import { LocateService } from '../_services/locate.service';
import { NavService } from '../_services/_nav.service';
import { Localizaciones } from '../_models/localizaciones';
import { PoliticalDivisionService } from '../_services/political-division.service';
import { ListaService } from '../_services/lista.service';
import { ListaItem } from '../_models/listaItem';
import { JwtHelper } from 'angular2-jwt';
import { AdjuntosService } from '../_services/adjuntos.service';
import { ConstanteService } from '../_services/constante.service';

@Component( {
               moduleId: module.id,
               selector: 'update-references',
               templateUrl: 'references-form.component.html',
               providers: [ ConfirmationService ]
            } )

export class ReferencesUpdateComponent implements OnInit {
   @Input()
   reference: References = new References();
   localizacion: Localizaciones = new Localizaciones();
   header: string = 'Editanto Referencia';
   referencesTypes: SelectItem[] = [];
   submitted: boolean;
   msgs: Message[] = [];
   uploadedFiles: any[] = [];
   addinglocation: boolean = true;
   idTercero: number;

   svcThUrl = '<%= SVC_TH_URL %>/api/adjuntos';
   dataUploadArchivo : any = 'Archivo Adjunto';
   dataUploadUsuario : any = '';
   usuarioLogueado: any = { sub: '', usuario: '', nombre: '' };
   jwtHelper: JwtHelper = new JwtHelper();
   fsize: number = 50000000;
   ftype: string = '';

   constructor( private referencesService: ReferencesService,
      private route: ActivatedRoute,
      private location: Location,
      private locateService: LocateService,
      private politicalDivisionService: PoliticalDivisionService,
      private confirmationService: ConfirmationService,
      private listaService: ListaService,
      private adjuntosService: AdjuntosService,
      private constanteService: ConstanteService,
      private _nav: NavService ) {

      let token = localStorage.getItem( 'token' );
      this.usuarioLogueado = this.jwtHelper.decodeToken( token );
      this.constanteService.getByCode( 'FTYPE' ).subscribe( data => {
         if ( data.valor ) {
            this.ftype = data.valor;
         }
      } );
      this.constanteService.getByCode( 'FSIZE' ).subscribe( data => {
         if ( data.valor ) {
            this.fsize = Number( data.valor );
         }
      } );
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
         this.referencesService.get( +params[ 'id' ] ).subscribe( reference => {
            this.reference = reference;
            this.getFileName();
            this.locateService.getById( this.reference.idLocalizacion ).subscribe( localizacion => {
               this.localizacion = localizacion;
               this.reference.direccion = localizacion.direccion;
               this.localizacion.locacion = { camino: '', idDivisionPolitica: null };
               this.politicalDivisionService.getLocation( localizacion.idDivisionPolitica ).subscribe( ciudad => {
                  this.localizacion.locacion.camino = ciudad.camino;
                  this.localizacion.locacion.idDivisionPolitica = ciudad.idDivisionPolitica;
               } );
            } );
         } );
      } );
      this.focusUP();
   }

   onSubmit() {
      this.msgs = [];
      if ( this.reference.direccion !== '' ) {
         this.submitted = true;

         this.localizacion.indicadorHabilitado = true;
         this.locateService.update( this.localizacion ).subscribe(
            data => {
               this.reference.primerNombre = this.capitalizeSave( this.reference.primerNombre );
               this.reference.segundoNombre = this.capitalizeSave( this.reference.segundoNombre );
               this.reference.primerApellido = this.capitalizeSave( this.reference.primerApellido );
               this.reference.segundoApellido = this.capitalizeSave( this.reference.segundoApellido );
               this.reference.idTercero = this.idTercero;
               this.reference.indicadorHabilitado = true;
               this.referencesService.update( this.reference )
               .subscribe(
                  data => {
                     // 1:add 2:update 3:error
                     this._nav.setMesage( 1, this.msgs );
                     this._nav.setTab( 8 );
                     this.location.back();
                  } );
            }
         );

      } else {
         this.focusUP();
         // this.msgs.push( { severity: 'error', summary: 'Dirección invalida', detail: 'Es necesario agregar una dirección válida' } );
         this._nav.setMesage(0, { severity: 'error', summary: 'Dirección invalida', detail: 'Es necesario agregar una dirección válida' });
      }
   }

    goBack(fDirty : boolean): void {

        if ( fDirty ){
            this.confirmationService.confirm( {
                message: ` ¿Está seguro que desea salir sin guardar?`,
                header: 'Confirmación',
                icon: 'fa fa-question-circle',
                accept: () => {
                    this._nav.setTab( 8 );
                    this.location.back();
                }
            } );
        }else {
           this._nav.setTab( 8 );
            this.location.back();
        }
    }

   focusUP() {
      const element = document.querySelector( '#formulario' );
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
   // Archivo Adjunto
   uploadingOk( event: any ) {
      let respuesta = JSON.parse(event.xhr.response);
      if(respuesta.idAdjunto != null || respuesta.idAdjunto != undefined){
         this.reference.idAdjunto = respuesta.idAdjunto;
      }
   }

   onBeforeSend( event: any ) {
      event.xhr.setRequestHeader( 'Authorization', localStorage.getItem( 'token' ) );
      let obj = "{ 'auditoriaUsuario' : '" + this.dataUploadUsuario + "', 'nombreArchivo' :  '"+ this.dataUploadArchivo + "'}";
      event.formData.append( 'obj', obj.toString() );
   }

   onSelect(event:any, file:any){
      this.dataUploadArchivo = file[0].name;
      this.dataUploadUsuario = this.usuarioLogueado.usuario.idUsuario;
   }

   uploadAgain(rta:boolean){
      this.reference.idAdjunto = null;
   }

   downloadFile(id: number){

      this.adjuntosService.downloadFile( id ).subscribe(res => {
         window.location.assign(res);
      });
   }
   getFileName() {
      if(this.reference.idAdjunto){
         this.adjuntosService.getFileName( this.reference.idAdjunto ).subscribe( res => {
            this.dataUploadArchivo = res.nombreArchivo;
         } );
      }
   }
}


