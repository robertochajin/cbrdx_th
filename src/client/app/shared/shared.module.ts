import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Router, NavigationEnd} from '@angular/router';

/** Componentes de la Template principal **/
import {ToolbarComponent} from './toolbar/toolbar.component';
import {NavbarComponent} from './navbar/navbar.component';
import {BreadcrumbComponent} from './breadcrumb/breadcrumb.component';
import {TranslateService, TranslateModule} from 'ng2-translate';

import {WindowRefService} from '../_services/window-ref.service';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [ToolbarComponent, NavbarComponent, BreadcrumbComponent],
  exports: [ToolbarComponent, NavbarComponent, BreadcrumbComponent,
    CommonModule, FormsModule, RouterModule, TranslateModule]
})
export class SharedModule {

  private _window: Window;


  constructor(private router: Router, windowRef: WindowRefService) {

    this._window = windowRef.nativeWindow;

    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        //console.log('router yeah');
        this._window.scrollTo(0, 0);
        <any>changePage();
        //$('#wrapper').animate({scrollTop:0},'slow');
      }
    });
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [TranslateService]
    };
  }


}
