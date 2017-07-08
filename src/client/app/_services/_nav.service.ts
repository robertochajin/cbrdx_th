import 'rxjs/add/operator/share';
import { Message } from 'primeng/primeng';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class NavService {

   _navTab: number;
   msgs: Message = { severity: 'info', summary: 'Error', detail: 'Error al guardar / Intente nuevamente.' };
   msgAdd: Message = { severity: 'success', summary: 'Exito', detail: 'Registro agregado correctamente.' };
   msgUpdate: Message = { severity: 'success', summary: 'Exito', detail: 'Registro actualizado correctamente.' };
   msgError: Message = { severity: 'error', summary: 'Error', detail: 'Error al guardar / Intente nuevamente.' };

   subject = new Subject<Message>();
   avatar = new Subject<string>();
   arraySearch: any[] = [ { id: '', strSearch: '' } ];
   jwtHelper: JwtHelper = new JwtHelper();
   usuarioLogueado: any = { sub: '', usuario: '', nombre: '' };

   // Observable string streams
   getMessage$ = this.subject.asObservable();

   // Observable avatar
   getAvatar$ = this.avatar.asObservable();

   constructor() {
      let token = localStorage.getItem( 'token' );

      if ( token !== null ) {
         this.usuarioLogueado = this.jwtHelper.decodeToken( token );
         this.setAvatar( this.usuarioLogueado.avatar );
      }
      this.arraySearch = [];
   }

   setMesage( type: number, msgCustom: Message = null ) {

      switch ( type ) {
         case 1:
            this.msgs = this.msgAdd;
            break;
         case 2:
            this.msgs = this.msgUpdate;
            break;
         case 3:
            this.msgs = this.msgError;
            break;
         default:
            this.msgs = msgCustom;
            break;
      }

      jQuery( '#msgNotificacion' ).hide();
      this.subject.next( this.msgs );
      jQuery( '#msgNotificacion' ).slideDown( 400 );
      setTimeout( () => {
         jQuery( '#msgNotificacion' ).slideUp( 200 );
      }, 3000 );
   }

   setTab( numero: number ) {
      this._navTab = numero;
   }
   setSearch( id: string, strSearch: string ) {
      if ( this.arraySearch.find( c => c.id === id ) ) {
         this.arraySearch.find( c => c.id === id ).strSearch = strSearch;
      } else {
         this.arraySearch.push( { id: id, strSearch: strSearch } );
      }
   }


   getTab() {
      return this._navTab;
   }

   getUsuarioLogeado() {
      return this.usuarioLogueado;
   }
   getSearch( id: string ) {
      if ( this.arraySearch.find( c => c.id === id ) ) {
         return this.arraySearch.find( c => c.id === id ).strSearch;
      } else {
         return '';
      }
   }

   resetSearch() {
      this.arraySearch = [];
   }

   setAvatar( avatar: string ) {
      this.avatar.next( avatar );
   }

}
