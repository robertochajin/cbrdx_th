import {
  Component,
  AfterContentInit,
  ContentChild,
  AfterViewChecked,
  AfterViewInit,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {Config} from './shared/config/env.config';
import {FormsModule, FormBuilder} from '@angular/forms'
import './operators';
import {LoginService} from "./_services/login.service";
import {TranslateService} from 'ng2-translate';
import 'moment/locale/es';
import { Message } from "primeng/primeng";

/**
 * This class represents the main application component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-app',
  templateUrl: 'app.component.html',
  providers: [FormBuilder]
})
export class AppComponent implements AfterViewInit, AfterViewChecked {
   
  sessionStart: boolean;
   msgs: Message[] = [];
   msgAdd: Message;
   msgUpdate: Message;
   msgError: Message;

  constructor(private loginService: LoginService,
              private translate: TranslateService,
              private formBuilder: FormBuilder) {
    this.sessionStart = loginService.getSession();
    //console.log('Environment config', Config);
    translate.setDefaultLang('es');
    translate.use('es');
     this.msgAdd = ({ severity: 'info', summary: 'Exito', detail: 'Registro agregado correctamente.' });
     this.msgUpdate = ({ severity: 'info', summary: 'Exito', detail: 'Registro actualizado correctamente.' });
     this.msgError = ({ severity: 'error', summary: 'Error', detail: 'Error al guardar / Intente nuevamente.' });
     
  }

  ngAfterViewInit() {
     /*this.showMessage(this.msg1);
     this.showMessage(this.msg2);*/
     // Add script theme
     jQuery.getScript('assets/js/app.js', function () {});

  }

  ngAfterViewChecked() {
    //console.log('AfterViewChecked');
  }
   
   showMessage(type: number, msgCustom:Message) {
      
      this.resetMessage();
      switch (type){
         case 1:
            this.msgs.push(this.msgAdd);
            break;
         case 2:
            this.msgs.push(this.msgUpdate);
            break;
         case 3:
            this.msgs.push(this.msgError);
            break;
         default:
            this.msgs.push(msgCustom);
            break;
      }
      window.setTimeout(this.resetMessage, 60000);
      
   }
   
   resetMessage(){
      this.msgs = [];
   }

  onSubmit() {
    console.log('SUBMIT FORM!! JUAJAJA');
  }

  setSession(s: boolean): void {
    this.sessionStart = s;
    this.loginService.setSession(s);
  }

  changeLang(lang: string) {
    this.translate.use(lang);
  }

}
