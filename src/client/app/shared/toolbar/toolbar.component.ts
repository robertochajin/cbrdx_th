import { Component, Renderer, ElementRef } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import { Router } from '@angular/router';
import * as moment from 'moment/moment';
import { NavService } from '../../_services/_nav.service';

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
   svcThUrl = '<%= SVC_TH_URL %>/api/upload';
   avatar: string;

   constructor( public router: Router,
      renderer: Renderer,
      elementRef: ElementRef,
      navService: NavService, ) {
      let token = localStorage.getItem( 'token' );

      if ( token !== null ) {
         this.usuarioLogueado = this.jwtHelper.decodeToken( token );
      }

      this.startTimer();
      renderer.listenGlobal( 'body', 'mousemove', ( event: any ) => {
         this.resetTimer();
      } );
      renderer.listenGlobal( 'body', 'keypress', ( event: any ) => {
         this.resetTimer();
      } );
      renderer.listenGlobal( 'body', 'DOMMouseScroll', ( event: any ) => {
         this.resetTimer();
      } );
      renderer.listenGlobal( 'body', 'mousewheel', ( event: any ) => {
         this.resetTimer();
      } );
      renderer.listenGlobal( 'body', 'touchmove', ( event: any ) => {
         this.resetTimer();
      } );
      renderer.listenGlobal( 'body', 'click', ( event: any ) => {
         this.resetTimer();
      } );

      if ( this.usuarioLogueado.usuario !== null ) {
         let mom: moment.Moment = moment( this.usuarioLogueado.usuario.auditoriaFecha );
         this.ultimaActualizacion = mom.format( 'MM/DD/YYYY' );
      }
      navService.getAvatar$.subscribe(
         res => {
            this.avatar = res;
         } );
      navService.setAvatar( this.usuarioLogueado.avatar );
   }

   logout(): void {
      // clear token remove user from local storage to log user out
      localStorage.removeItem( 'token' );
      this.router.navigate( [ '/login' ] );
   }

   startTimer() {
      // this.timeoutID = window.setTimeout( this.goInactive, 1500000 );
   }

   resetTimer() {
      window.clearTimeout( this.timeoutID );
      this.goActive();
   }

   goInactive() {
      localStorage.removeItem('token');
   }

   goActive() {
      this.startTimer();
   }

}

