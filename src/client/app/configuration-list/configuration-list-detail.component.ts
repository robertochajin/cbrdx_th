import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { SelectItem, Message, ConfirmationService } from 'primeng/primeng';
import { ListaService } from '../_services/lista.service';
import { ConfigurationListServices } from '../_services/configurationList.service';
import { ConfigurationList } from '../_models/configurationList';
import { LocateService } from '../_services/locate.service';
import { ConfigurationListRelation } from '../_models/configurationListReation';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { NavService } from '../_services/_nav.service';
import { FieldListRelationship } from '../_models/fieldListRelationship';

@Component( {
               moduleId: module.id,
               selector: 'configuration-list-detail',
               templateUrl: 'configuration-list-detail.component.html',
               providers: [ ConfirmationService ]
            } )

export class ConfigurationListDetailComponent implements OnInit {

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
   lista1: string = '';
   lista2: string = '';
   itemLista1: string = '';
   listRelacionFuncionalidadControl: FieldListRelationship[] = [];
   idRelacion: number;

   constructor( private configurationListServices: ConfigurationListServices,
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

      this.route.params.subscribe( ( params: Params ) => {
         this.idRelacion = params[ 'id' ];
      } );
   }

   ngOnInit() {

      this.route.params.switchMap( ( params: Params ) => this.configurationListServices.getById( +params[ 'id' ] ) )
      .subscribe( data => {
         this.configurationList = data;
         this.listaService.getMaster( data.idListaHijo ).subscribe( rs => {
            this.lista2 = rs.nombreTabla;
         } );
         this.listaService.getMaster( data.idListaPadre ).subscribe( rs => {
            this.lista1 = rs.nombreTabla;
            this.listaService.getMasterAllDetails( rs.nombreTabla ).subscribe( rst => {
               this.itemLista1 = rst.find( r => r.idLista === data.idItemPadre ).nombre;
            } );
         } );
         this.configurationListServices.getRelationById( data.idRelacionLista ).subscribe( rt => {
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

         } );
      } );

      this.configurationListServices.getRelacionFuncionalidadControl( this.idRelacion ).subscribe( res => {
         this.listRelacionFuncionalidadControl = res;
      } );
   }

   goBack(): void {
      this.location.back();
   }

}
