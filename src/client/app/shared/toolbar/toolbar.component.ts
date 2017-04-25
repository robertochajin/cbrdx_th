import {Component} from '@angular/core';
import {JwtHelper} from 'angular2-jwt';
import { Router, CanActivate } from '@angular/router';
/**
 * This class represents the toolbar component.
 */
@Component({
   moduleId: module.id,
   selector: 'sd-toolbar',
   templateUrl: 'toolbar.component.html',
   styleUrls: ['toolbar.component.css']
})
export class ToolbarComponent {

   usuarioLogueado: any = {sub : ''};

   jwtHelper: JwtHelper = new JwtHelper();

   constructor(private router: Router) {
      let token = localStorage.getItem('token');

      if (token != null)
         this.usuarioLogueado = this.jwtHelper.decodeToken(token);
   }
   
   logout(): void {
      // clear token remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
   }
}

