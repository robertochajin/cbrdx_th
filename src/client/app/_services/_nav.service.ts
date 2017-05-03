import "rxjs/add/operator/share";
import { Message } from "primeng/primeng";
import { Subject } from "rxjs/Subject";

export class NavService {
   
   private _navTab: number;
   msgs: Message;
   msgAdd: Message ;
   msgUpdate: Message;
   msgError: Message;
   subject = new Subject<Message>();
   
   // Observable string streams
   getMessage$ = this.subject.asObservable();
   
   constructor() {
      
      this.msgAdd = ({ severity: 'info', summary: 'Exito', detail: 'Registro agregado correctamente.' });
      this.msgUpdate = ({ severity: 'info', summary: 'Exito', detail: 'Registro actualizado correctamente.' });
      this.msgError = ({ severity: 'error', summary: 'Error', detail: 'Error al guardar / Intente nuevamente.' });
      
   }
   
   setTab( number: number ) {
      this._navTab = number;
   }
   
   getTab() {
      return this._navTab;
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
      this.subject.next(this.msgs);
   }
   
}
