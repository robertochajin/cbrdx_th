import {Component} from '@angular/core';
import {JwtHelper} from 'angular2-jwt';

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

   usuarioLogueado: any;

   jwtHelper: JwtHelper = new JwtHelper();

   constructor() {
      let token = localStorage.getItem('token');

      if (token != null)
         this.usuarioLogueado = this.jwtHelper.decodeToken(token);
   }
}

