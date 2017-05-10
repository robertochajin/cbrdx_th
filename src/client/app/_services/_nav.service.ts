import 'rxjs/add/operator/share';
import { Message } from 'primeng/primeng';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class NavService {

   _navTab: number;
   msgs: Message = { severity: 'error', summary: 'Error', detail: 'Error al guardar / Intente nuevamente.' };
   msgAdd: Message = { severity: 'info', summary: 'Exito', detail: 'Registro agregado correctamente.' };
   msgUpdate: Message = { severity: 'info', summary: 'Exito', detail: 'Registro actualizado correctamente.' };
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
   }

   setMesage( type: number, msgCustom: Message ) {

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
      this.subject.next( this.msgs );
   }

   setTab( numero: number ) {
      this._navTab = numero;
   }

   getTab() {
      return this._navTab;
   }

   setSearch( id: string, strSearch: string ) {
      if ( this.arraySearch.find( c => c.id === id ) ) {
         this.arraySearch.find( c => c.id === id ).strSearch = strSearch;
      } else {
         this.arraySearch.push( { id: id, strSearch: strSearch } );
      }
   }

   getSearch( id: string ) {
      if ( this.arraySearch.find( c => c.id === id ) ) {
         return this.arraySearch.find( c => c.id === id ).strSearch;
      } else {
         return '';
      }
   }

   setAvatar( avatar: string ) {
      this.avatar.next( avatar );
   }

}
