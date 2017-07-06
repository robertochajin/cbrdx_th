import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
/** Componentes de la Template principal **/
import { ToolbarComponent } from './toolbar/toolbar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TranslateService, TranslateModule } from 'ng2-translate';
import { WindowRefService } from '../_services/window-ref.service';
import { AuthenticationService } from '../_services/authentication.service';
import { NavService } from '../_services/_nav.service';
import { LowerCaseText } from '../_helpers/LowerCaseText';
import { PermissionDirective } from '../_helpers/permission.directive';

import { UperCaseTextDirective } from '../_helpers/UperCaseText';
import { TitleCaseTextDirective } from '../_helpers/TitleCaseText';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule( {
              imports: [ CommonModule, RouterModule, TranslateModule ],
              declarations: [ ToolbarComponent, NavbarComponent, LowerCaseText, PermissionDirective, UperCaseTextDirective,
                 TitleCaseTextDirective
              ],
              exports: [ ToolbarComponent, NavbarComponent,
                 CommonModule, FormsModule, RouterModule, TranslateModule, LowerCaseText,
                 PermissionDirective
              ],
              providers: [ AuthenticationService ]
           } )
export class SharedModule {

   private topInvalid: number;
   private _window: Window;

   static forRoot(): ModuleWithProviders {
      return {
         ngModule: SharedModule,
         providers: [ TranslateService ]
      };
   }

   constructor( private router: Router, windowRef: WindowRefService, private navService: NavService ) {

      this._window = windowRef.nativeWindow;

      router.events.subscribe( ( val ) => {

         // console.log(val);
         if(val.url) {
            // console.log(val.url);
         }



         if ( val instanceof NavigationEnd ) {

           //  console.log(' -- NavigationEnd Rulez --');

            // Fix Footer -
            setTimeout( () => {
               jQuery( window ).resize();
            }, 500 );

            // ScrollTop
            //jQuery( '#wrapper' ).animate( { scrollTop: 0 }, 'fast' );

            // Focus Primer campo
            jQuery( 'input[type=text]:enabled:visible:first' ).select().focus();

            // Focus primer invalid campo
            setTimeout( () => {
               jQuery( 'button' ).click( function () {
                  setTimeout( () => {


                     if ( jQuery( 'input.ng-invalid' ).length > 0 ) {

                        if( jQuery( 'input.ng-invalid:first' ).parents('p-accordion').length == 0 ){
                           jQuery( 'body' ).scrollTop( jQuery( 'input.ng-invalid:first' ).position().top );
                           // console.log( 'Focus in input Error!' );
                           setTimeout( () => {
                              jQuery( 'input.ng-invalid:first' ).select().focus();
                           }, 500 );
                        }
                     } else {
                        // if ( jQuery( 'div.ui-messages' ).length ) {
                        //    jQuery( 'body' ).scrollTop( jQuery( 'div.ui-messages:first' ).position().top );
                        // }
                     }
                  }, 500 );
               } );
            }, 1000 );

         }
      } );
   }

}
