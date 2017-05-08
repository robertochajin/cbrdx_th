import "rxjs/add/operator/share";
import { Message } from "primeng/primeng";
import { Subject } from "rxjs/Subject";
import { Injectable } from "@angular/core";

@Injectable()
export class NavService {
   
   private _navTab: number;
   msgs: Message = { severity: 'error', summary: 'Error', detail: 'Error al guardar / Intente nuevamente.' };
   msgAdd: Message = { severity: 'info', summary: 'Exito', detail: 'Registro agregado correctamente.' };
   msgUpdate: Message = { severity: 'info', summary: 'Exito', detail: 'Registro actualizado correctamente.' };
   msgError: Message = { severity: 'error', summary: 'Error', detail: 'Error al guardar / Intente nuevamente.' };
   subject = new Subject<Message>();
   arraySearch: any[] = [ { id: '', strSearch: '' } ];
   
   // Observable string streams
   getMessage$ = this.subject.asObservable();
   
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
   
   setTab( number: number ) {
      this._navTab = number;
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
   
}
