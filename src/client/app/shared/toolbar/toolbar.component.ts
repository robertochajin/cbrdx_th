import { Component, Renderer, ElementRef } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import { Router } from '@angular/router';
import * as moment from 'moment/moment';
/**
 * This class represents the toolbar component.
 */
@Component( {
               moduleId: module.id,
               selector: 'sd-toolbar',
               templateUrl: 'toolbar.component.html',
               styleUrls: [ 'toolbar.component.css' ]
            } )
export class ToolbarComponent {

   usuarioLogueado: any = { sub: '', usuario: '', nombre: '' };
   jwtHelper: JwtHelper = new JwtHelper();
   timeoutID: any;
   ultimaActualizacion: string;

   constructor( public router: Router,
      renderer: Renderer,
      elementRef: ElementRef ) {
      let token = localStorage.getItem( 'token' );

      if ( token !== null ){
         this.usuarioLogueado = this.jwtHelper.decodeToken( token );
      }

      this.startTimer();
      renderer.listenGlobal( 'document', 'mousemove', ( event: any ) => {
         this.resetTimer();
      } );
      renderer.listenGlobal( 'document', 'keypress', ( event: any ) => {
         this.resetTimer();
      } );
      renderer.listenGlobal( 'document', 'DOMMouseScroll', ( event: any ) => {
         this.resetTimer();
      } );
      renderer.listenGlobal( 'document', 'mousewheel', ( event: any ) => {
         this.resetTimer();
      } );
      renderer.listenGlobal( 'document', 'touchmove', ( event: any ) => {
         this.resetTimer();
      } );

      if ( this.usuarioLogueado.usuario !== null ) {
         let mom: moment.Moment = moment( this.usuarioLogueado.usuario.auditoriaFecha );
         this.ultimaActualizacion = mom.format( 'MM/DD/YYYY' );
      }
   }

   logout(): void {
      // clear token remove user from local storage to log user out
      localStorage.removeItem( 'currentUser' );
      localStorage.removeItem( 'token' );
      this.router.navigate( [ '/login' ] );
   }

   startTimer() {
      this.timeoutID = window.setTimeout( this.goInactive, 300000 );
   }

   resetTimer() {
      window.clearTimeout( this.timeoutID );
      this.goActive();
   }

   goInactive() {
      // localStorage.removeItem('currentUser');
      // localStorage.removeItem('token');
   }

   goActive() {
      this.startTimer();
   }

}

