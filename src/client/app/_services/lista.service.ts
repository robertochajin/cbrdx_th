import { Response } from "@angular/http";
import { Lista } from "../_models/lista";
import { ListaItem } from "../_models/listaItem";
import { ListaTipoDato } from "../_models/listaTipoDato";
import { Injectable } from "@angular/core";
import "rxjs/add/operator/toPromise";
import { Observable } from "rxjs";
import { AuthHttp } from "angular2-jwt";
import any = jasmine.any;

@Injectable()
export class ListaService {
   
   private masterService = '<%= SVC_TH_URL %>/api/listas/';
   
   constructor( private authHttp: AuthHttp ) {
   }
   
   getDetail( tableName: string, code: string ) {
      return this.authHttp.get( this.masterService + 'tabla/' + tableName + '/code/' + code + '/' ).map( res => res.json() as ListaItem );
   }
   
   getMaster( id: number ) {
      return this.authHttp.get( this.masterService + '/buscarId/' + id ).map( res => res.json() as Lista );
   }
   
   getMasterList() {
      return this.authHttp.get( this.masterService ).map( ( res: Response ) => res.json() as Lista[] );
   }
   
   getMasterByCodigo( codigo: string ) {
      return this.authHttp.get( this.masterService + "codigo/" + codigo ).map( res => res.json() as Lista );
   }
   
   createMaster( l: Lista ): Promise<Lista> {
      return this.authHttp.post( this.masterService, JSON.stringify( l ) ).toPromise().then( res => res.json() as Lista ).catch( this.handleError );
   }
   
   getMasterAllDetails( tableName: string ) {
      return this.authHttp.get( this.masterService + 'tabla/' + tableName + '/' ).map( ( res: Response ) => res.json() as ListaItem[] );
   }
   
   getMasterDetails( tableName: string ) {
      return this.authHttp.get( this.masterService + 'tabla/' + tableName + '/enabled/' ).map( ( res: Response ) => res.json() as ListaItem[] );
   }
   
   getMasterDetailsByCode( tableName: string, code: string ) {
      return this.authHttp.get( this.masterService + 'tabla/' + tableName + '/code/' + code + '/' ).map( ( res: Response ) => res.json() as ListaItem );
   }
   
   getMasterDetailsStartsByCode( tableName: string, code: string ) {
      return this.authHttp.get( this.masterService + 'tabla/' + tableName + '/codeStarts/' + code + '/' ).map( ( res: Response ) => res.json() as ListaItem[] );
   }
   
   getMasterDetailsByWildCard( tableName: string, query: string ) {
      return this.authHttp.get( this.masterService + 'tabla/' + tableName + '/name/' + query + '/' ).map( ( res: Response ) => res.json() as ListaItem[] );
   }
   
   getMasterDetailsByIdItem( tableName: string, idItem: number ): Observable<ListaItem> {
      return this.authHttp.get( this.masterService + 'tabla/' + tableName + '/idItem/' + idItem + '/' ).map( ( res: Response ) => res.json() as ListaItem );
   }
   
   createDetail( li: ListaItem, tableName: string ) {
      return this.authHttp.post( this.masterService + 'tabla/' + tableName + '/', JSON.stringify( li ) ).toPromise().then( res => res.json() as ListaItem ).catch( this.handleError );
   }
   
   clearDetail( li: number ) {
      return this.authHttp.get( this.masterService + "clear/" + li );
   }
   
   updateMaster( l: Lista ) {
      return this.authHttp.put( this.masterService, JSON.stringify( l ) ).toPromise().catch( this.handleError );
   }
   
   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }
   
   updateDetail( d: ListaItem, tableName: string ) {
      return this.authHttp.put( this.masterService + 'tabla/' + tableName + '/', JSON.stringify( d ) ).toPromise().catch( this.handleError );
   }
   
   getTipoDato( id: number ) {
      return this.authHttp.get( this.masterService + "listasTiposDatos/" + id ).map( res => res.json() as ListaTipoDato );
   }
}
