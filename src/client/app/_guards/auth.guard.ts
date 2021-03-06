﻿import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthGuard implements CanActivate {

   listmenu: string[] = [];
   flat: boolean;
   private jwtHelper: JwtHelper = new JwtHelper();
   private usuarioLogueado: any;

   constructor( private router: Router,
      private authenticationService: AuthenticationService ) {
      let token = localStorage.getItem( 'token' );
      if ( token !== null ) {
         this.usuarioLogueado = this.jwtHelper.decodeToken( token );
         this.listmenu = this.usuarioLogueado.pantallasAprobadas;
      }
   }

   canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): boolean {
      if ( this.authenticationService.loggedIn() ) {
         let url: string = route.url[ 0 ].path;
         if ( url !== 'dashboard' && url !== 'login' ) {
            this.checkFuncionality( url );
         }
         return true;
      } else {
         localStorage.removeItem( 'token' );
         this.router.navigate( [ '/login' ] );
         return false;
      }
   }

   checkFuncionality( url: any ) {
      this.flat = false;
      this.listmenu.forEach( ( value: any ) => {
         if ( value === '/' + url ) {
            this.flat = true;
         }
      } );
      if ( !this.flat ) {
         this.router.navigate( [ '/dashboard' ] );
      }
      return this.flat;
   }
}
