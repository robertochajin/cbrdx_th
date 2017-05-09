import { Component, AfterViewChecked, AfterViewInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import './operators';
import { LoginService } from './_services/login.service';
import { TranslateService } from 'ng2-translate';
import 'moment/locale/es';
import { Message } from 'primeng/primeng';
import { AuthenticationService } from './_services/authentication.service';
import { NavService } from './_services/_nav.service';
import { BreadcrumbService } from './shared/breadcrumb/breadcrumb.service';

/**
 * This class represents the main application component.
 */
@Component( {
               moduleId: module.id,
               selector: 'sd-app',
               templateUrl: 'app.component.html',
               providers: [ FormBuilder, NavService ],
            } )
export class AppComponent implements AfterViewInit, AfterViewChecked {
   sessionStart: boolean;
   msgs: Message[] = [];

   constructor( private loginService: LoginService,
      private translate: TranslateService,
      private authenticationService: AuthenticationService,
      private formBuilder: FormBuilder,
      private navService: NavService,
      private breadcrumbService: BreadcrumbService ) {

      this.sessionStart = authenticationService.loggedIn();

      translate.setDefaultLang( 'es' );
      translate.use( 'es' );
      navService.getMessage$.subscribe(
         msgs => {
            this.msgs[ 0 ] = msgs;
         } );
   }

   ngAfterViewInit() {

      // Add script theme
      jQuery.getScript( 'assets/js/app.js', function () {
      } );

   }

   ngAfterViewChecked() {
   }

   onSubmit() {
      console.log( 'SUBMIT FORM!! JUAJAJA' );
   }

   setSession( s: boolean ): void {
      this.sessionStart = s;
      this.loginService.setSession( s );
   }

   changeLang( lang: string ) {
      this.translate.use( lang );
   }

}
