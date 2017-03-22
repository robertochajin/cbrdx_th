import {Component, AfterContentInit, ContentChild,
  AfterViewChecked, AfterViewInit, ViewChild,ViewChildren} from '@angular/core';
import { Config } from './shared/config/env.config';
import './operators';
import {LoginService} from "./_services/login.service";
import {TranslateService} from 'ng2-translate';

/**
 * This class represents the main application component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-app',
  templateUrl: 'app.component.html',
})
export class AppComponent implements AfterViewInit, AfterViewChecked{
  sessionStart:boolean;

  constructor(private loginService:LoginService,private translate: TranslateService) {
    this.sessionStart = loginService.getSession();
    //console.log('Environment config', Config);
    translate.setDefaultLang('es');
    translate.use('es');
  }
  ngAfterViewInit(){
    console.log('fin carga!');
  }
  ngAfterViewChecked(){
    console.log('fin carga view!');
  }

  setSession(s:boolean):void{
    this.sessionStart = s;
    this.loginService.setSession(s);
  }
  changeLang(lang: string) {
    this.translate.use(lang);
  }

}
