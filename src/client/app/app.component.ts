import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import './operators';
import { LoginService } from './_services/login.service';
import { TranslateService } from 'ng2-translate';
import 'moment/locale/es';
import { Message } from 'primeng/primeng';
import { AuthenticationService } from './_services/authentication.service';
import { NavService } from './_services/_nav.service';
import { BreadcrumbService } from './shared/breadcrumb/breadcrumb.service';
import { JwtHelper } from 'angular2-jwt';
import { Router } from '@angular/router';
// import { DialogModule } from 'primeng/primeng';

// Handle Idle
import { Idle, DEFAULT_INTERRUPTSOURCES } from 'idle-angular2';
import { Keepalive } from 'idle-keepalive-angular2';

/**
 * This class represents the main application component.
 */
@Component( {
               moduleId: module.id,
               selector: 'sd-app',
               templateUrl: 'app.component.html',
               providers: [ FormBuilder, NavService ],
            } )
export class AppComponent implements AfterViewInit {
   sessionStart: boolean;
   msgs: Message[] = [];
   jwtHelper: JwtHelper = new JwtHelper();

   idleState = 'Not started.';
   timedOut = false;
   lastPing?: Date = null;
   display: boolean = false;

   constructor( private loginService: LoginService,
      private translate: TranslateService,
      private router: Router,
      private _nav: NavService,
      private authenticationService: AuthenticationService,
      private formBuilder: FormBuilder,
      private navService: NavService,
      private breadcrumbService: BreadcrumbService,
      private idle: Idle,
      private keepalive: Keepalive ) {

      this.sessionStart = authenticationService.loggedIn();

      translate.setDefaultLang( 'es' );
      translate.use( 'es' );
      navService.getMessage$.subscribe(
         msgs => {
            this.msgs[ 0 ] = msgs;
         } );

      // sets an idle timeout of 5 seconds, for testing purposes.
      idle.setIdle( 900 );
      // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
      idle.setTimeout( 30 );
      // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
      idle.setInterrupts( DEFAULT_INTERRUPTSOURCES );

      idle.onIdleEnd.subscribe( () => this.display = false );
      idle.onTimeout.subscribe( () => {
         this.display = false;
         localStorage.removeItem( 'token' );
         this.router.navigate( [ '/login' ] );
         this.timedOut = true;
         this.reset();
      } );

      idle.onIdleStart.subscribe( () => {
         if ( this.router.routerState.snapshot.url !== '/login' ) {
            this.display = true;
         }
      } );

      idle.onTimeoutWarning.subscribe( ( countdown: number ) => {
         if ( countdown > 60 ) {
            let tiempo = countdown / 60;
            this.idleState = tiempo.toFixed( 1 ).toString() + ' minutos';
         } else {
            let tiempo = countdown;
            this.idleState = tiempo.toFixed( 0 ).toString() + ' segundos';
         }
      } );

      // sets the ping interval to 15 seconds
      keepalive.interval( 15 );

      // keepalive.onPing.subscribe( () => console.log( 'Last ping: ' + new Date() ) );

      this.reset();
   }

   ngAfterViewInit() {

      // Add script theme
      // jQuery.getScript( 'assets/js/app.js');

   }

   setSession( s: boolean ): void {
      this.sessionStart = s;
      this.loginService.setSession( s );
   }

   changeLang( lang: string ) {
      this.translate.use( lang );
   }

   reset() {
      this.idle.watch();
      this.idleState = 'Started.';
      this.timedOut = false;
   }

}
