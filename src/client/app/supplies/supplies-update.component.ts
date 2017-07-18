import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/primeng';
import { NavService } from '../_services/_nav.service';
import { Supplies } from '../_models/supplies';
import { SuppliesService } from '../_services/supplies.service';
import { ListaService } from '../_services/lista.service';
import { SuppliesGroups } from '../_models/suppliesGroups';
import { SelectItem } from 'primeng/primeng';
import { JwtHelper } from 'angular2-jwt';
import { AdjuntosService } from '../_services/adjuntos.service';
import { ConstanteService } from '../_services/constante.service';
import { ListaItem } from '../_models/listaItem';

@Component( {
               moduleId: module.id,
               templateUrl: 'supplies-form.component.html',
               selector: 'roles-form.component',
               providers: [ ConfirmationService ]
            } )
export class SuppliesUpdateComponent implements OnInit {

   suppliesGroup: SuppliesGroups = new SuppliesGroups();
   allGroups: SuppliesGroups[] = [];
   allSupplies: Supplies[] = [];
   supplies: Supplies[] = [];
   supply: Supplies = new Supplies();
   msgs: Message[] = [];
   codeExists: boolean = false;
   codeExistsS: boolean = false;
   formGroup: boolean = false;
   formSupply: boolean = false;
   idGrupoDotacion: number;
   cycleTypes: SelectItem[] = [];
   sizeTypes: SelectItem[] = [];

   svcThUrl = '<%= SVC_TH_URL %>/api/adjuntos';
   dataUploadArchivo: any = 'Archivo Adjunto';
   dataUploadUsuario: any = '';
   usuarioLogueado: any = { sub: '', usuario: '', nombre: '' };
   jwtHelper: JwtHelper = new JwtHelper();
   fsize: number = 50000000;
   ftype: string = '';
   constructor( private suppliesService: SuppliesService,
      private router: Router,
      private location: Location,
      private listaService: ListaService,
      private route: ActivatedRoute,
      private confirmationService: ConfirmationService,
      private adjuntosService: AdjuntosService,
      private constanteService: ConstanteService,

      private navService: NavService ) {

      this.route.params.subscribe( params => {
         this.idGrupoDotacion = +params[ 'id' ];
         if ( Number( this.idGrupoDotacion ) > 0 ) {
            this.suppliesService.get( this.idGrupoDotacion ).subscribe(
               res => {
                  this.suppliesGroup = res;
                  this.getSupplies();
               } );
         }
      } );

      this.suppliesService.getAll().subscribe(
         res => {
            this.allGroups = res;
         }
      );

      this.suppliesService.getAllSupply().subscribe(
         res => {
            this.allSupplies = res;
         }
      );
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

      listaService.getMasterDetails( 'ListasTiposTallas' ).subscribe( res => {
         this.sizeTypes.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.sizeTypes.push( { label: s.nombre, value: s.idLista } );
         } );
      } );

      listaService.getMasterDetails( 'ListasCiclosEntregas' ).subscribe( res => {
         this.sizeTypes.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.sizeTypes.push( { label: s.nombre, value: s.idLista } );
         } );
      } );
   }
   ngOnInit() {
   }

   goBack( fDirty: boolean ): void {
      if ( fDirty ) {
         this.confirmationService.confirm( {
                                              message: ` ¿Está seguro que desea salir sin guardar?`,
                                              header: 'Confirmación',
                                              icon: 'fa fa-question-circle',
                                              accept: () => {
                                                 this.location.back();
                                              }
                                           } );
      } else {
         this.location.back();
      }
   }

   onSubmit() {
      if ( !this.codeExists ) {
         this.suppliesGroup.codigo = this.suppliesGroup.codigo.toUpperCase().replace( /[^A-Z0-9]/g, '' ).trim();
         this.suppliesService.update( this.suppliesGroup ).subscribe( res => {
            this.navService.setMesage( 1, this.msgs );
            this.formGroup = true;
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

   inputCleanValue( event: any ) {
      let input = event.target.value;
      if ( input.length > 0 ) {
         event.target.value = input.replace( /[^0-9]/g, '' ).trim();
      }
   }

   getSupplies() {
      if ( Number( this.idGrupoDotacion ) > 0 ) {
         this.suppliesService.getSupplies( this.idGrupoDotacion ).subscribe(
            res => {
               this.supplies = res;
            } );
      }
   }

   addSupplies() {
      this.formSupply = true;
      this.supply = new Supplies();
   }

   updateSupplies( supply: Supplies ) {
      this.formSupply = true;
      this.supply = supply;
   }

   goBackSupplies( fDirty: boolean ): void {
      if ( fDirty ) {
         this.confirmationService.confirm( {
                                              message: ` ¿Está seguro que desea salir sin guardar?`,
                                              header: 'Confirmación',
                                              icon: 'fa fa-question-circle',
                                              accept: () => {
                                                 this.formSupply = false;
                                                 this.supply = new Supplies();
                                              }
                                           } );
      } else {
         this.formSupply = false;
         this.supply = new Supplies();
      }
   }

   onSubmitSupplies() {
    if ( !this.codeExistsS ) {
    if ( this.supply.idDotacion === null || this.supply.idDotacion === undefined || this.supply.idDotacion === 0 ) {
    this.supply.idGrupoDotacion = this.idGrupoDotacion;
       this.supply.codigo = this.supply.codigo.toUpperCase().replace( /[^A-Z0-9]/g, '' ).trim();
       this.suppliesService.addSupply( this.supply ).subscribe( res => {
          this.formSupply = false;
          this.supply = new Supplies();
          this.getSupplies();
               this.navService.setMesage( 1, this.msgs );
            }, error => {
               this.navService.setMesage( 3, this.msgs );
            } );
         } else {
       this.suppliesService.updateSupply( this.supply ).subscribe( res => {
               this.navService.setMesage( 1, this.msgs );
          this.formSupply = false;
    this.supply = new Supplies();
          this.getSupplies();
            }, error => {
               this.navService.setMesage( 3, this.msgs );
            } );
         }
      }
   }

   validateCodeS() {
      if ( this.supply.codigo !== '' && this.supply.codigo !== null ) {
         this.codeExistsS = this.allSupplies.filter(
               t => (t.codigo === this.supply.codigo && t.idDotacion !== this.supply.idDotacion ) ).length > 0;
      } else {
         this.codeExistsS = false;
      }
   }

   // Archivo Adjunto
   uploadingOk( event: any ) {
      let respuesta = JSON.parse( event.xhr.response );
      if ( respuesta.idAdjunto != null || respuesta.idAdjunto != undefined ) {
         this.supply.idAdjunto = respuesta.idAdjunto;
      }
   }

   onBeforeSend( event: any ) {
      event.xhr.setRequestHeader( 'Authorization', localStorage.getItem( 'token' ) );
      let obj = "{ 'auditoriaUsuario' : '" + this.dataUploadUsuario + "', 'nombreArchivo' :  '" + this.dataUploadArchivo + "'}";
      event.formData.append( 'obj', obj.toString() );
   }

   onSelect( event: any, file: any ) {
      this.dataUploadArchivo = file[ 0 ].name;
      this.dataUploadUsuario = this.usuarioLogueado.usuario.idUsuario;
   }

   uploadAgain( rta: boolean ) {
      this.supply.idAdjunto = null;
   }

   downloadFile( id: number ) {

      this.adjuntosService.downloadFile( id ).subscribe( res => {
         window.location.assign( res );
      } );
   }

   getFileName() {
      if ( this.supply.idAdjunto ) {
         this.adjuntosService.getFileName( this.supply.idAdjunto ).subscribe( res => {
            this.dataUploadArchivo = res.nombreArchivo;
         } );
      }
   }

}
