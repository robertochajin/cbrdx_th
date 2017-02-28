import {Component, AfterContentInit, ContentChild,
  AfterViewChecked, AfterViewInit, ViewChild,ViewChildren} from '@angular/core';
import { Config } from './shared/config/env.config';
import './operators';

/**
 * This class represents the main application component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-app',
  templateUrl: 'app.component.html',
})
export class AppComponent implements AfterViewInit, AfterViewChecked{
  constructor() {
    console.log('Environment config', Config);
  }
  ngAfterViewInit(){
    console.log('fin carga!');
  }
  ngAfterViewChecked(){
    console.log('fin carga view!');
  }
}
