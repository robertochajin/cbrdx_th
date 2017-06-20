import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { LocationService } from '../_services/employee-location.service';
import { LocateService } from '../_services/locate.service';
import { EmployeesLocation } from '../_models/employee-location';
import { Localizaciones } from '../_models/localizaciones';
import { SelectItem, ConfirmationService, Message } from 'primeng/primeng';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { NavService } from '../_services/_nav.service';
import { PoliticalDivisionService } from '../_services/political-division.service';
import { ListEmployeesService } from '../_services/lists-employees.service';
import { TerceroResidencias } from '../_models/terceroResidencias';
import { TercerosResidenciasServices } from '../_services/terceros-residencias.service';
import { ListaItem } from '../_models/listaItem';
import { ListaService } from '../_services/lista.service';
declare let google: any;

@Component( {
               moduleId: module.id,
               selector: 'add-location',
               templateUrl: 'employee-location-form.component.html',
               providers: [ ConfirmationService ]
            } )

export class LocationUpdateComponent implements OnInit {

   // @Input()
   // employLocation: Localizaciones = new Localizaciones();
   header: string = 'Editando Ubicación';

   localizacion: Localizaciones = new Localizaciones();
   terceroLocalizacion: EmployeesLocation = new EmployeesLocation();

   idTercero: Number;
   tipoDireccion: { value: null, label: string };
   principalNomenclatureList: SelectItem[] = [];
   complementaryNomenclatureList: SelectItem[] = [];
   addressTypeList: SelectItem[] = [];
   selectedPrincipalNomenclature: number;
   selectedAddressType: number;
   labelPrincipalNomenclature: string;
   principalNomenclature: string;
   numberOne: string;
   numberTwo: string;

   listTypeEstate: SelectItem[] = [];
   listTypeConstruction: SelectItem[] = [];
   listStratum: SelectItem[] = [];
   listClassEstate: SelectItem[] = [];
   residencia: TerceroResidencias = new TerceroResidencias();
   complementaries: any;
   finalAddress: string;
   cityList: any;
   hoodList: any;
   map: any;

   submitted: boolean;
   msgs: Message[] = [];
   wrongCity: boolean = true;

   constructor( private location: Location,
      private politicalDivisionServices: PoliticalDivisionService,
      private locationService: LocationService,
      private locateService: LocateService,
      private confirmationService: ConfirmationService,
      private listEmployeesService: ListEmployeesService,
      private listaService: ListaService,
      private tercerosResidenciasServices: TercerosResidenciasServices,
      private route: ActivatedRoute,
      private _nav: NavService,
      private politicalDivisionService: PoliticalDivisionService, ) {
      this.complementaries = [ { tipo: null, detalle: '' } ];
   }

   ngOnInit() {
      this.route.params.subscribe( ( params: Params ) => {
         this.idTercero = +params[ 'tercero' ];
         this.locateService.getById( +params[ 'id' ] ).subscribe( localizacion => {
            this.localizacion = localizacion;
            this.selectedAddressType = this.localizacion.idTipoDireccion;
            this.selectedPrincipalNomenclature = this.localizacion.nomenclaturaPrincipal;
            this.finalAddress = localizacion.direccion;
            this.localizacion.locacion = { camino: '', idDivisionPolitica: null };
            this.politicalDivisionService.getLocation( localizacion.idDivisionPolitica ).subscribe( ciudad => {
               this.localizacion.locacion.camino = ciudad.camino;
               this.localizacion.locacion.idDivisionPolitica = ciudad.idDivisionPolitica;
            } );

            this.locationService.get( this.localizacion.idLocalizacion ).subscribe( l => {
               this.terceroLocalizacion = l;
               this.tercerosResidenciasServices.getByTerceroLocalizacion( l.idTerceroLocalizacion ).subscribe( residencia => {
                  if ( residencia !== undefined ) {
                     this.residencia = residencia;
                  }
               } );
            } );
         } );

      } );

      this.listaService.getMasterDetails( 'ListasTiposViviendas' ).subscribe( res => {
         this.listTypeEstate.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.listTypeEstate.push( { label: s.nombre, value: s.idLista } );
         } );
      } );

      this.listaService.getMasterDetails( 'ListasClasesViviendas' ).subscribe( res => {
         this.listClassEstate.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.listClassEstate.push( { label: s.nombre, value: s.idLista } );
         } );
      } );

      this.listaService.getMasterDetails( 'ListasTiposConstruccionViviendas' ).subscribe( res => {
         this.listTypeConstruction.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.listTypeConstruction.push( { label: s.nombre, value: s.idLista } );
         } );
      } );

      this.listaService.getMasterDetails( 'ListasEstratos' ).subscribe( res => {
         this.listStratum.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.listStratum.push( { label: s.nombre, value: s.idLista } );
         } );
      } );

      this.listaService.getMasterDetails( 'ListasTiposDirecciones' ).subscribe( res => {
         this.addressTypeList.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => this.addressTypeList.push( { label: s.nombre, value: s.idLista } ) );
      } );
      this.listaService.getMasterDetails( 'ListasTiposNomenclaturas' ).subscribe( res => {
         this.principalNomenclatureList.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => this.principalNomenclatureList.push( { label: s.nombre, value: s.idLista } ) );
      } );
      this.listaService.getMasterDetails( 'ListasTiposNomenclaturasComplementarias' ).subscribe( res => {
         this.complementaryNomenclatureList.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => this.complementaryNomenclatureList.push( { label: s.nombre, value: s.nombre } ) );
      } );

      this.focusUP();
   }

   createLocation() {
      this.submitted = true;
      if ( this.localizacion.locacion.idDivisionPolitica !== undefined ) {
         this.localizacion.direccion = this.finalAddress;
         this.localizacion.idTipoDireccion = this.selectedAddressType;
         this.localizacion.nomenclaturaPrincipal = this.selectedPrincipalNomenclature;
         this.localizacion.idDivisionPolitica = this.localizacion.locacion.idDivisionPolitica;

         this.locateService.update( this.localizacion ).subscribe( res => {
            if ( this.residencia.indicadorHabilitado ) {
               if ( this.residencia.idTerceroResidencia !== null && this.residencia.idTerceroResidencia !== undefined ) {
                  this.tercerosResidenciasServices.update( this.residencia ).subscribe( res3 => {
                     this._nav.setTab( 4 );
                     this.location.back();
                  } );
               } else {

                  this.residencia.idTerceroLocalizacion = this.terceroLocalizacion.idTerceroLocalizacion;
                  this.tercerosResidenciasServices.add( this.residencia ).subscribe( res3 => {
                     this._nav.setTab( 4 );
                     this.location.back();
                  } );
               }
            } else {
               this._nav.setTab( 4 );
               this.location.back();
            }
            // 1: add 2: update 3: error
            this._nav.setMesage(2,this.msgs);
         } );
      } else {
         this.wrongCity = false;
      }
   }

   hoodSearch( event: any ) {
      this.politicalDivisionServices.getHoodsByWildCard( event.query ).subscribe(
         hoods => this.hoodList = hoods
      );
   }

   captureHoodId( event: any ) {
      this.localizacion.locacion.idDivisionPolitica = event.idDivisionPolitica;
      this.localizacion.locacion.camino = event.camino;
      this.composeAddress();
      this.wrongCity = true;
   }

   capturePrincipalNomenclature() {
      for ( let n of this.principalNomenclatureList ) {
         if ( n.value === this.selectedPrincipalNomenclature ) {
            this.labelPrincipalNomenclature = n.label;
            break;
         }
      }
      this.composeAddress();
   }

   captureTipoDireccion( event: any ) {
      this.tipoDireccion = event;
   }

   composeAddress(): void {

      this.finalAddress = '';
      this.finalAddress += this.labelPrincipalNomenclature === undefined ? '' : this.labelPrincipalNomenclature + ' ';
      this.finalAddress += this.principalNomenclature === undefined ? '' : this.principalNomenclature + ' # ';
      this.finalAddress += this.numberOne === undefined ? '' : this.numberOne + ' - ';
      this.finalAddress += this.numberTwo === undefined ? '' : this.numberTwo + ' ';

      if ( this.finalAddress !== '' && this.localizacion.locacion !== undefined &&
           this.localizacion.locacion.camino !== '' &&
           this.localizacion.locacion.camino !== undefined ) {
         let geocoder = new google.maps.Geocoder();

         const assingLocation = ( l: any, t: any ) => {
            this.localizacion.latitud = l;
            this.localizacion.longitud = t;
         };

         // Asumiendo que el camino obtenido de la busqueda tiene un máximo de 4 níveles
         // Se hace el conteo de 3 comas par identificar si la selección fue de una división politica de nivel 4 (barrio/vereda)
         // para hacerle el tratamiento al string con el cual se hace la busqueda en el API de maps.google
         let strToSearch = '';
         if ( ((this.localizacion.locacion.camino.match( /,/g ) || []).length) === 3 ) {
            strToSearch = this.localizacion.locacion.camino.substr( this.localizacion.locacion.camino.indexOf( ',' ) );
         } else {
            strToSearch = this.localizacion.locacion.camino;
         }
         geocoder.geocode( { 'address': this.finalAddress + ' ' + strToSearch },
                           function ( results: any, status: any ) {
                              if ( status === google.maps.GeocoderStatus.OK ) {
                                 let latitude = results[ 0 ].geometry.location.lat();
                                 let longitude = results[ 0 ].geometry.location.lng();

                                 let latLng = new google.maps.LatLng( latitude, longitude );
                                 let mapOptions = {
                                    center: latLng,
                                    zoom: 16,
                                    mapTypeId: google.maps.MapTypeId.ROADMAP
                                 };
                                 let map = new google.maps.Map( document.getElementById( 'graphMap' ), mapOptions );
                                 let marker = new google.maps.Marker( { position: latLng, map: map } );

                                 assingLocation( latitude, longitude );
                              } else {
                                 document.getElementById( 'graphMap' ).innerHTML = 'La busqueda no arroja ningun resultado';
                                 assingLocation( '', '' );
                              }
                           } );
      }

      for ( let c of this.complementaries ) {
         if ( c.tipo !== null ) {
            this.finalAddress += c.tipo + ' ' + c.detalle + ' ';
         }
      }

      if ( this.localizacion.locacion !== undefined &&
           this.localizacion.locacion.camino !== '' &&
           this.localizacion.locacion.camino !== undefined ) {
         this.finalAddress += this.localizacion.locacion.camino;
      }
   }

   addComplementary(): void {
      let complementary = { 'tipo': 0, 'detalle': '' };
      this.complementaries.push( complementary );
   }

   removeComplementary( id: any ): void {
      this.complementaries.splice( id, 1 );
      this.composeAddress();
   }

   goBack(lDirty : boolean): void {

      if ( lDirty ){
         this.confirmationService.confirm( {
            message: ` ¿Está seguro que desea salir sin guardar?`,
            header: 'Confirmación',
            icon: 'fa fa-question-circle',
            accept: () => {
               this._nav.setTab( 4 );
               this.location.back();
            }
         } );
      }else {
         this._nav.setTab( 4 );
         this.location.back();
      }
   }

   focusUP() {
      const element = document.querySelector( '#formulario' );
      if ( element ) {
         element.scrollIntoView( element );
      }
   }
}
