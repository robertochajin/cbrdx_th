import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { SelectItem, Message, ConfirmationService } from 'primeng/primeng';
import { NavService } from '../_services/_nav.service';
import { ListaItem } from '../_models/listaItem';
import { ListaService } from '../_services/lista.service';
import { ConfigurationListServices } from '../_services/configurationList.service';
import { ConfigurationList } from '../_models/configurationList';
import { LocateService } from '../_services/locate.service';
import { ConfigurationListRelation } from '../_models/configurationListReation';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { Functionality } from '../_models/functionality';
import { FunctionalityControl } from '../_models/functionalityContorl';
import { FieldListRelationship } from '../_models/fieldListRelationship';

@Component( {
               moduleId: module.id,
               selector: 'configuration-list-update',
               templateUrl: 'configuration-list-update.component.html',
               providers: [ ConfirmationService ]
            } )

export class ConfigurationListUpdateComponent implements OnInit {

   jwtHelper: JwtHelper = new JwtHelper();
   usuarioLogueado: any;
   idUsuario: number;

   configurationList: ConfigurationList = new ConfigurationList();
   listRelation: ConfigurationListRelation[] = [];
   configurationListRelation: ConfigurationListRelation = new ConfigurationListRelation();
   list1: SelectItem[] = [];
   itemList1: SelectItem[] = [];
   list2: SelectItem[] = [];
   msgs: Message[] = [];
   acordion: number = 0;
   codeExists: boolean = false;
   lista1: string = '';
   lista2: string = '';
   itemLista1: string = '';
   indicadorNull: boolean = false;
   listFuncionalidades: SelectItem[] = [];
   funcionalidad: Functionality = new Functionality();
   listFuncionalidadesControles: SelectItem[] = [];
   funcionalidadControl: FunctionalityControl = new FunctionalityControl();
   listRelacionFuncionalidadControl: FieldListRelationship[] = [];
   idRelacion: number;

   constructor( private configurationListServices: ConfigurationListServices,
      private router: Router,
      private route: ActivatedRoute,
      private listaService: ListaService,
      private location: Location,
      private _nav: NavService,
      private locateService: LocateService,
      private confirmationService: ConfirmationService, ) {
      let token = localStorage.getItem( 'token' );
      if ( token !== null ) {
         this.usuarioLogueado = this.jwtHelper.decodeToken( token );
         this.idUsuario = this.usuarioLogueado.usuario.idUsuario;
      }
      this.listaService.getMasterList().subscribe( data => {
         this.list1.push( { label: 'Seleccione', value: null } );
         for ( let l of data ) {
            this.list1.push( { label: l.lista, value: l.idLista } );
         }
      } );

      this.route.params.subscribe( ( params: Params ) => {
         this.idRelacion = params[ 'id' ];
      } );
   }

   ngOnInit() {

      this.route.params.switchMap( ( params: Params ) => this.configurationListServices.getById( +params[ 'id' ] ) )
      .subscribe( data => {
                     this.configurationList = data;
                     if ( data.idListaHijo !== null || data.idListaPadre !== null ) {
                        this.indicadorNull = true;
                     }
                     if ( data.idListaHijo !== null ) {
                        this.listaService.getMaster( data.idListaHijo ).subscribe( rs => {
                           this.lista2 = rs.nombreTabla;
                        } );

                     }
                     if ( data.idListaPadre !== null ) {
                        this.listaService.getMaster( data.idListaPadre ).subscribe( rs => {
                           this.lista1 = rs.nombreTabla;
                           this.listaService.getMasterAllDetails( rs.nombreTabla ).subscribe( rst => {
                              this.itemLista1 = rst.find( r => r.idLista === data.idItemPadre ).nombre;
                           } );
                        } );
                     }
                     this.configurationListServices.getRelationById( data.idRelacionLista ).subscribe( rt => {
                        if ( data.idListaHijo !== null ) {
                           this.configurationListServices.getItemsByIdList( data.idListaHijo ).subscribe( rest => {
                              for ( let r of rt ) {
                                 let temp = rest.find( x => x.idLista === r.idItemHijo );
                                 if ( temp ) {
                                    let tempRl = new ConfigurationListRelation();
                                    tempRl.idRelacionLista = r.idRelacionLista;
                                    tempRl.idRelacionListaHijo = r.idRelacionListaHijo;
                                    tempRl.codigo = temp.codigo;
                                    tempRl.nombre = temp.nombre;
                                    tempRl.auditoriaUsuario = r.auditoriaUsuario;
                                    tempRl.auditoriaFecha = r.auditoriaFecha;
                                    tempRl.idItemHijo = r.idItemHijo;
                                    tempRl.indicadorHabilitado = r.indicadorHabilitado;
                                    this.listRelation.push( tempRl );
                                 }
                              }
                           } );
                        }
                     } );
                  }
      );
      this
         .acordion = this._nav.getTab();

      this.configurationListServices.getFuncionalidades().subscribe( res => {
         this.listFuncionalidades.push( { label: 'Seleccione', value: null } );
         for ( let l of res ) {
            this.listFuncionalidades.push( { label: l.menu, value: l.idFuncionalidad } );
         }
      } );

      this.configurationListServices.getRelacionFuncionalidadControl( this.idRelacion ).subscribe( res => {
         this.listRelacionFuncionalidadControl = res;
      } );
   }

   onSubmit() {
      this.configurationListServices.update( this.configurationList ).subscribe( data => {
         this._nav.setMesage( 2, this.msgs );
         this.acordion = 1;
      }, error => {
         this._nav.setMesage( 3, this.msgs );
      } );
   }

   onSubmitRelac() {
      this.configurationListServices.update( this.configurationList ).subscribe( rest => {
         this.configurationListServices.addRelation( this.listRelation ).subscribe( data => {
            this._nav.setMesage( 1, this.msgs );
            this.location.back();
         } );
      } );

   }

   onSubmitFuncionalidadControles() {
      this.configurationListServices.getRelacionFuncionalidadControl( this.configurationList.idRelacionLista ).subscribe( res => {
         res.map( lr => {
            this.listRelacionFuncionalidadControl.map( x => {
               if ( lr.idRelacionListaCampo === x.idRelacionListaCampo ) {
                  lr.indicadorHabilitado = x.indicadorHabilitado;

                  this.configurationListServices.updateListasCampos( lr ).subscribe( res => {
                     this._nav.setMesage( 1, this.msgs );
                  } );
               }
            } );
         } );
      } );
   }

   onTabShow( e: any ) {
      this._nav.setTab( e.index );
      this.acordion = this._nav.getTab();
   }

   capitalize( event: any ) {
      let input = event.target.value.replace( /[^a-zA-ZÑñÁáÉéóÓúÚíÍ0-9 \/ /]/g, '' );
      event.target.value = input.substring( 0, 1 ).toUpperCase() + input.substring( 1 ).toLowerCase();
   }

   changeList() {
      this.itemList1 = [];
      this.list2 = [];
      if ( this.configurationList.idListaPadre !== null && this.configurationList.idListaPadre !== undefined ) {
         this.itemList1.push( { label: 'Seleccione', value: null } );
         this.configurationListServices.getItemsByIdList( this.configurationList.idListaPadre ).subscribe( data => {
            data.map( ( s: ListaItem ) => {
               this.itemList1.push( { label: s.nombre, value: s.idLista } );
            } );
         } );
         this.listaService.getMasterList().subscribe( data => {
            this.list2.push( { label: 'Seleccione', value: null } );
            for ( let l of data ) {
               if ( this.configurationList.idListaPadre !== l.idLista ) {
                  this.list2.push( { label: l.lista, value: l.idLista } );
               }
            }
         } );
      }
   }

   changeList2() {
      this.configurationListServices.getItemsByIdList( this.configurationList.idListaHijo ).subscribe( data => {
         for ( let r of data ) {
            let temp = new ConfigurationListRelation();
            temp.indicadorHabilitado = true;
            temp.idRelacionLista = this.configurationList.idRelacionLista;
            temp.idItemHijo = r.idLista;
            temp.auditoriaUsuario = this.idUsuario;
            temp.codigo = r.codigo;
            temp.nombre = r.nombre;
            this.listRelation.push( temp );
         }
      } );

   }

   changeListFuncionalidades() {
      this.listFuncionalidadesControles = [];
      this.configurationListServices.getFuncionalidadControles( this.funcionalidad.idFuncionalidad ).subscribe( res => {
         if ( res.length > 0 ) {
            this.listFuncionalidadesControles.push( { label: 'Seleccione', value: null } );
            for ( let l of res ) {
               this.listFuncionalidadesControles.push( { label: l.control, value: l.idFuncionalidadControl } );
            }
         } else {
            this._nav.setMesage( 4, { severity: 'error', summary: 'Error', detail: 'La funcionalidad no tiene controles asociados.' } );
         }
      } );
   }

   cancelRelation() {
      this.confirmationService.confirm( {
                                           message: ` ¿Está seguro que desea salir sin guardar?`,
                                           header: 'Confirmación',
                                           icon: 'fa fa-question-circle',
                                           accept: () => {
                                              this.location.back();
                                           }
                                        } );
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

   agregarFuncionalidad() {
      if ( !this.listRelacionFuncionalidadControl.find(
            x => x.idFuncionalidadesControles === this.funcionalidadControl.idFuncionalidadControl ) ) {
         let data: FieldListRelationship = new FieldListRelationship();

         data.idRelacionLista = this.configurationList.idRelacionLista;
         data.idFuncionalidadesControles = this.funcionalidadControl.idFuncionalidadControl;
         data.indicadorHabilitado = true;

         this.listFuncionalidades.map( y => {
            if ( y.value === this.funcionalidad.idFuncionalidad )
               data.menu = y.label;
         } );

         this.listFuncionalidadesControles.map( y => {
            if ( y.value === this.funcionalidadControl.idFuncionalidadControl )
               data.funcionalidadControl = y.label;
         } );

         this.configurationListServices.updateListasCampos( data ).subscribe( res => {
         } );

         this.listRelacionFuncionalidadControl.push( data );
      } else {
         this._nav.setMesage( 4,
                              { severity: 'error', summary: 'Error', detail: 'El control ya está asociado a esta funcionalidad.' } );
      }
   }

}
