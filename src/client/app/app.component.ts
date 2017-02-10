import { Component } from '@angular/core';
import { Config } from './shared/config/env.config';
import './operators';
import {TranslateService} from 'ng2-translate';

/**
 * This class represents the main application component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-app',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    //translate.addLangs(['en', 'hy']);
    translate.setDefaultLang('es');
    translate.use('es');
  }
  changeLang(lang: string) {
    this.translate.use(lang);
  }
}
