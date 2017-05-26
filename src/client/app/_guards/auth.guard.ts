import { Injectable } from '@angular/core';
import { Router, CanActivate, NavigationEnd, NavigationStart, Event as NavigationEvent } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { MenuManagerService } from '../_services/menuManager.service';
import { MenuManager } from '../_models/menuManager';

@Injectable()
export class AuthGuard implements CanActivate {

   listmenu: string[] = [];
   flat: boolean;
   public _url: string;
   public _routerSubscription: any;
   currentUrl: string = '/';

   constructor( private router: Router,
      private authenticationService: AuthenticationService,
      private menuManagerService: MenuManagerService ) {

      /*this._routerSubscription = this.router.events.subscribe( ( navigationEnd: NavigationEnd ) => {

         if ( navigationEnd instanceof NavigationEnd ) {
            // this._url = navigationEnd.urlAfterRedirects ? navigationEnd.urlAfterRedirects : navigationEnd.url;
            this._url = navigationEnd.url;
         }
      } );*/
      this.menuManagerService.getMenusSession().subscribe( men => {
         men.map(r =>{
            this.listmenu.push(r.ruta);
         });

      });
      router.events.forEach((event: NavigationEvent) => {
         if(event instanceof NavigationStart)
         {
            this.currentUrl = event.url;
            this.flat = false;
            if(this.currentUrl !== '/login' && this.currentUrl !== '/dashboard' ) {
               this.listmenu.forEach( ( value: any ) => {
                  if ( new RegExp( value ).exec( this.currentUrl ) ) {
                     this.flat = true;
                  }
               } );
            }else{
               this.flat = true;
            }
         }
      });


   }
   /*ngOnChanges( changes: any ): void {
      this._url = this.router.url;
   }*/

   canActivate():boolean{
      if ( this.authenticationService.loggedIn() ) {
         if(this.flat){
            return true;
         }else{
            this.router.navigate( [ '/dashboard' ] );
            return false
         }
      } else {
         this.router.navigate( [ '/login' ] );
         return false;
      }
   }
   revisarAcceso(){

   }
}
