/**
 * Created by Jenniferth Escobar - Felipe Aguirre on 10/03/2017.
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { LoginService } from '../_services/login.service';
import { AppComponent } from '../app.component';

@Component( {
               moduleId: module.id,
               templateUrl: 'cambioContrasena.component.html',
               selector: 'sd-app',
               styleUrls: [ 'login.component.css' ],
            } )
export class CambioContrasenaComponent implements OnInit {

   usuario: string;
   correoElectronico: string;
   recordarUsuario = false;
   displayDialog1 = false;
   displayDialog = false;
   error: string;
   notice: string;
   enviando = false;

   constructor( private authenticationService: AuthenticationService,
      private loginService: LoginService,
      private router: Router,
      private appmain: AppComponent, ) {
   }

   ngOnInit(): void {
      this.loginService.setSession( false );
      this.appmain.setSession( false );

      /* Generar random de la imagen de fondo */
      let min = 1;
      let max = 6;
      let random = Math.floor( Math.random() * (max - min + 1) ) + min;
      jQuery( '#loginBg' ).css( 'background-image', 'url("/assets/images/bg-login' + random + '.jpg")' );

   }

   goBack() {
      this.router.navigate( [ 'login' ] );
   }

   olvideUsuario() {
      this.usuario = '';
      this.recordarUsuario = true;
      this.error = '';
   }

   regresarUsuario() {
      this.recordarUsuario = false;
   }

   envioUsuario() {
      this.enviando = true;
      this.displayDialog1 = false;
      this.recordarUsuario = false;
      this.authenticationService.forgetUser( this.correoElectronico ).then( res => {
         this.enviando = false;
      } );
   }

   envioContrasena() {
      this.enviando = true;
      this.authenticationService.forgetPass( this.correoElectronico, this.usuario ).then( res => {
         if ( res ) {
            this.enviando = false;
            this.notice = 'Se notificó al administrador del Sistema de su solicitud de cambio de contraseña';
         } else {
            this.notice = 'Se envió un correo electrónico con su nueva contraseña de acceso al Sistema';
         }
      }, error => {
         this.enviando = false;
         this.error = 'El correo y/o el usuario no son válidos, intente nuevamente';
      } );
      this.displayDialog = false;
   }

   emailCleanUp( value: string ) {
      this.correoElectronico = value.toLowerCase().replace( ' ', '' ).trim();
   }

   userCleanUp( value: string ) {
      this.usuario = value.toLowerCase().replace( ' ', '' ).replace( 'ñ', 'n' ).trim();
   }

   doPost() {
      if ( !this.recordarUsuario ) {
         this.displayDialog = true;
      } else {
         this.displayDialog1 = true;
      }
   }

}
