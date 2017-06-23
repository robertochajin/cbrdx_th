import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { MenuManagerService } from '../_services/menuManager.service';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthGuard implements CanActivate {

   listmenu: string[] = [];
   flat: boolean;
   public _url: string;
   public _routerSubscription: any;
   currentUrl: string = '/dashboard';
   private jwtHelper: JwtHelper = new JwtHelper();
   private usuarioLogueado: any;

   constructor( private router: Router,
      private authenticationService: AuthenticationService,
      private menuManagerService: MenuManagerService ) {

      let token = localStorage.getItem( 'token' );
      if ( token !== null ) {
         this.usuarioLogueado = this.jwtHelper.decodeToken( token );
         this.listmenu = this.usuarioLogueado.pantallasAprobadas;
      }
   }

   canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): boolean {
      if ( this.authenticationService.loggedIn() ) {
         let url: string = route.url[ 0 ].path;
         if ( url !== 'login' && url !== 'dashboard' ) {
            this.checkFuncionality( url );
         }
         return true;
      } else {
         this.router.navigate( [ '/login' ] );
         return false;
      }
   }

   checkFuncionality( url: any ) {
      // console.info( this.listmenu );
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

   checkUrl( url: any ) {
      /*this.menuManagerService.getMenusSession().subscribe( men => {
       men.map( r => {
       this.listmenu.push( r.ruta );
       } );
       this.flat = false;
       this.listmenu.forEach( ( value: any ) => {
       if ( new RegExp( value ).exec( this.currentUrl ) ) {
       this.flat = true;
       }
       } );
       if(this.flat === false){
       this.router.navigate( [ '/dashboard' ] );

       }
       } );*/
   }
}
