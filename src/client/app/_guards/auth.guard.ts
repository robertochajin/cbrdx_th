import { Injectable } from '@angular/core';
import {
   Router, CanActivate, NavigationEnd, NavigationStart, Event as NavigationEvent, RouterStateSnapshot, ActivatedRouteSnapshot, UrlSegment,
   ActivatedRoute
} from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { MenuManagerService } from '../_services/menuManager.service';

@Injectable()
export class AuthGuard implements CanActivate {

   listmenu: string[] = [];
   flat: boolean;
   public _url: string;
   public _routerSubscription: any;
   currentUrl: string = '/dashboard';

   constructor( private router: Router,
      private authenticationService: AuthenticationService,
      private menuManagerService: MenuManagerService ) {

   }

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      if ( this.authenticationService.loggedIn() ) {
         let url: string = route.url[0].path;
         // this.checkUrl( url );
         return true;
      } else {
         this.router.navigate( [ '/login' ] );
         return false;
      }
   }

   checkUrl(url: any) {
      this.currentUrl = url;
      if ( this.currentUrl !== 'login' && this.currentUrl !== 'dashboard' ) {
         this.listmenu = [];
         this.menuManagerService.getMenusSession().flatMap(result => {
            // debugger;
            result.map( r => {
               this.listmenu.push( r.ruta );
            } );
            return result;//this.menuManagerService.getMenusSession();
         }).subscribe(men => {
            // debugger;
            // men.map( r => {
            //    this.listmenu.push( r.ruta );
            // } );
            this.flat = false;
            this.listmenu.forEach( ( value: any ) => {
               //debugger;
               /*if ( new RegExp( value ).exec( this.currentUrl ) ) {
                  this.flat = true;
               }*/
               if (value === '/'+this.currentUrl){
                  this.flat = true;
               }
            });

            if(!this.flat){
               this.router.navigate( [ '/dashboard' ] );
            }

            return this.flat;
         });
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
}
