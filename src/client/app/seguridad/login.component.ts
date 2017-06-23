import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../_services/login.service';
import { AppComponent } from '../app.component';
import { AuthenticationService } from '../_services/authentication.service';
import { Http, Headers } from '@angular/http';
import { NavService } from '../_services/_nav.service';
import { JwtHelper } from 'angular2-jwt';

@Component( {
               moduleId: module.id,
               templateUrl: 'login.component.html',
               selector: 'sd-app',
               styleUrls: [ 'login.component.css' ],
            } )
export class LoginComponent implements OnInit {
   model: any = {
      password: '',
      username: ''
   };
   intentos: number = 0;
   error: string = '';
   token: string = '';
   captcha: boolean = false;
   jwtHelper: JwtHelper = new JwtHelper();
   redirect: any;
   Url = '/dashboard';

   constructor( private loginService: LoginService,
      private http: Http,
      private router: Router,
      private appmain: AppComponent,
      private authenticationService: AuthenticationService,
      private navService: NavService,
      private route: ActivatedRoute
   ) {
      if(location.search.length > 0){
         this.token =  location.search.split('token=')[1];
         this.redirect = this.jwtHelper.decodeToken( this.token );
         this.Url = '/'+this.redirect.URL;
      }
   }

   ngOnInit(): void {

      if(!this.authenticationService.loggedIn()){
         this.authenticationService.token = null;
         localStorage.removeItem( 'currentUser' );
         localStorage.removeItem( 'token' );
         this.authenticationService.logout();
         this.loginService.setSession( false );
         this.appmain.setSession( false );
      }else{
         this.router.navigate( [ this.Url ] );
      }



      /* Generar random de la imagen de fondo */
      let min = 1;
      let max = 6;
      let random = Math.floor( Math.random() * (max - min + 1) ) + min;
      jQuery( '#loginBg' ).css( 'background-image', 'url("/assets/images/bg-login' + random + '.jpg")' );

   }

   goBack() {
      this.router.navigate( [ 'login' ] );
   }

   login() {
      this.error = '';
      if ( this.intentos >= 3 && !this.captcha ) {
         this.error = 'Error en la Validacion Captcha';
      } else {
         this.authenticationService.login( this.model.username, this.model.password ).then( res => {
            switch (res){
               case 1:
                  this.user();
                  break;
               case 2:
                  this.intentos = 0;
                  this.error = 'Error al ingresar!, Comuniquese con el administrador del sistema';
                    break;
               default:
                  this.intentos++;
                  this.error = 'Usuario o Contraseña incorrecta';
                    break;
            }
         } );
      }

   }

   user() {
      this.loginService.setSession( true );
      this.appmain.setSession( true );
      this.navService.resetSearch();
      this.router.navigate( [ this.Url ] );
   }

   cambioContrasena() {
      this.router.navigate( [ 'cambioContrasena' ] );
   }

   resolved( captchaResponse: string ) {
      let headers = new Headers( { 'Content-Type': 'application/x-www-form-urlencoded' } );
      this.http.post( 'https://www.google.com/recaptcha/api/siteverify',
                      'secret=6LckLxkUAAAAAGf_9vx0BYTT7Q1fpk5X70BVDM6S&response=' + captchaResponse, { headers: headers } )
      .subscribe( res => {
         let response = res.json().success;
         this.captcha = response;
      } );
   }
}
