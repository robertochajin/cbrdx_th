import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { ConfigurationList } from '../_models/configurationList';
import { ListaItem } from '../_models/listaItem';
import { ConfigurationListRelation } from '../_models/configurationListReation';
import { Functionality } from '../_models/functionality';
import { FunctionalityControl } from '../_models/functionalityContorl';
import { FieldListRelationship } from '../_models/fieldListRelationship';

@Injectable()
export class ConfigurationListServices {

   private masterService = '<%= SVC_TH_URL %>/api/relacionesListas/';
   private masterServiceList = '<%= SVC_TH_URL %>/api/listas/tablas/';
   private masterServiceRelation = '<%= SVC_TH_URL %>/api/relacionesListasHijos/';
   private masterServiceFuncionalidades = '<%= SVC_TH_URL %>/api/funcionalidades/';
   private masterServiceFuncionalidadesControles = '<%= SVC_TH_URL %>/api/funcionalidadesControles/';
   private masterServiceRelacionFC = '<%= SVC_TH_URL %>/api/relacionesListasCampos/';
   private masterServiceRelacionFCById = '<%= SVC_TH_URL %>/api/relacionesListasCampos/funcionalidadControl/';
   private jwtHelper: JwtHelper = new JwtHelper();
   private usuarioLogueado: any;
   private idUsuario: number;

   constructor( private authHttp: AuthHttp ) {
      let token = localStorage.getItem( 'token' );
      if ( token !== null ) {
         this.usuarioLogueado = this.jwtHelper.decodeToken( token );
         this.idUsuario = this.usuarioLogueado.usuario.idUsuario;
      }
   }

   getAll() {
      return this.authHttp.get( this.masterService ).map( ( res: Response ) => res.json() as ConfigurationList[] );
   }

   add( f: ConfigurationList ) {
      f.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.masterService, f ).map( ( res: Response ) => res.json() );
   };

   addRelation( f: ConfigurationListRelation[] ) {
      return this.authHttp.post( this.masterServiceRelation + 'lista', f ).map( ( res: Response ) => res.json() );
   };

   getById( id: number ) {
      return this.authHttp.get( this.masterService + id ).map( ( res: Response ) => res.json() );
   }

   getRelationById( id: number ) {
      return this.authHttp.get( this.masterServiceRelation + 'relacionesListas/' + id ).map( ( res: Response ) => res.json() );
   }

   getItemsByIdList( id: number ) {
      return this.authHttp.get( this.masterServiceList + id ).map( ( res: Response ) => res.json() as ListaItem[] );
   }

   getFuncionalidades() {
      return this.authHttp.get( this.masterServiceFuncionalidades ).map( ( res: Response ) => res.json() as Functionality[] );
   }

   getFuncionalidadesById( id: number ) {
      return this.authHttp.get( this.masterServiceFuncionalidades + 'id/' + id ).map( ( res: Response ) => res.json() as Functionality );
   }

   getFuncionalidadControles( id: number ) {
      return this.authHttp.get( this.masterServiceFuncionalidadesControles + 'funcionalidad/' + id )
      .map( ( res: Response ) => res.json() as FunctionalityControl[] );
   }

   getFuncionalidadControlesById( id: number ) {
      return this.authHttp.get( this.masterServiceFuncionalidadesControles + 'id/' + id )
      .map( ( res: Response ) => res.json() as FunctionalityControl );
   }

   getRelacionFuncionalidadControl( id: number ) {
      return this.authHttp.get( this.masterServiceRelacionFC + 'relacionLista/' + id )
      .map( ( res: Response ) => res.json() as FieldListRelationship[] );
   }

   getRelacionFuncionalidadControlByIdFC( id: number ) {
      return this.authHttp.get( this.masterServiceRelacionFCById + id )
      .map( ( res: Response ) => res.json() as FieldListRelationship[] );
   }

   update( c: ConfigurationList ) {
      c.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.masterService, c ).map( ( res: Response ) => res );
   }

   updateListasCampos( c: FieldListRelationship ) {
      c.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.masterServiceRelacionFC, c ).map( ( res: Response ) => res );
   }

   addListasCampos( c: FieldListRelationship ) {
      c.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.masterServiceRelacionFC, c ).map( ( res: Response ) => res.json() );
   }

   // getAllEnabledByGroup( idGrupo: number ) {
   //    return this.authHttp.get( this.masterService + 'enabled/' + idGrupo ).map( ( res: Response ) => res.json() as ConfigurationList[]
   // ); }  getAllByGroup( idGrupo: number ) { return this.authHttp.get( this.masterService + 'buscarGrupo/' + idGrupo ) .map( ( res:
   // Response ) => res.json() as ConfigurationList[] ); }  get( id: number ) { return this.authHttp.get( this.masterService + 'buscarId/'
   // + id ).map( ( res: Response ) => res.json() as ConfigurationList ); }

   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }

}

