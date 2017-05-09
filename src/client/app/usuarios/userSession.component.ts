import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Message, ConfirmationService } from 'primeng/primeng';
import { Location } from '@angular/common';
import { EmployeesService } from '../_services/employees.service';
import { Employee } from '../_models/employees';
import { Usuario } from '../_models/usuario';
import { UsuariosService } from '../_services/usuarios.service';
import { JwtHelper } from 'angular2-jwt';
import { NavService } from '../_services/_nav.service';

@Component( {
               moduleId: module.id,
               selector: 'user-session',
               templateUrl: 'userSession.component.html',
               providers: [ ConfirmationService ],
               styleUrls: [ 'userSession.component.css' ],
            } )

export class UserSessionComponent implements OnInit {

   jwtHelper: JwtHelper = new JwtHelper();

   employee: Employee = new Employee();
   user: Usuario = new Usuario();
   acordion: number;
   msgs: Message[] = [];
   oldPass = '';
   newPass = '';
   newPassConfirm = '';
   usuarioLogueado: any;
   showOldPass = 'password';
   showPass = 'password';
   showConfim = 'password';
   svcThUrl = '<%= SVC_TH_URL %>/api/upload';
   image: string;
   eye = 'fa-eye-slash';
   constructor( private employeeService: EmployeesService,
      private usuariosService: UsuariosService,
      private route: ActivatedRoute,
      private location: Location,
      private router: Router,
      private confirmationService: ConfirmationService,
      private navService: NavService
   ) {
   }

   ngOnInit(): void {

      let token = localStorage.getItem( 'token' );
      if ( token !== null ) {
         this.usuarioLogueado = this.jwtHelper.decodeToken( token );
      }

      this.image = this.usuarioLogueado.avatar;
      let idUsuario = this.usuarioLogueado.usuario.idUsuario;

      this.usuariosService.viewUser( idUsuario ).subscribe( data => {
         this.user = data;
         this.employeeService.get( this.user.idTercero ).subscribe( employee => {
            this.employee = employee;
            this.employee.nombreCompleto = this.employee.primerNombre + ' ' +
                                           this.employee.segundoNombre + ' ' +
                                           this.employee.primerApellido + ' ' +
                                           this.employee.segundoApellido;
         } );
      } );
   }

   onSubmit() {
      if ( this.oldPass !== this.newPass && this.newPass === this.newPassConfirm ) {
         this.user.contrasenaAntigua = this.oldPass;
         this.user.contrasena = this.newPass;
         this.usuariosService.updatePass( this.user ).then( res => {
            console.info( res );
            if ( res ) {
               this.msgs[ 0 ] = { severity: 'info', summary: 'Exito', detail: 'Contraseña actualizada correctamente.' };
            } else {
               this.msgs[ 0 ] = {
                  severity: 'error', summary: 'Error al actualizar',
                  detail: 'Contraseña actual no es correcta.'
               };
            }
         }, error => {
            this.msgs[ 0 ] = { severity: 'error', summary: 'Error', detail: 'Error al guardar.' };
         } );
      }
   }

   goBack(): void {
      this.location.back();
   }

   show() {
      if ( this.showOldPass === 'password' ) {
         this.showOldPass = 'text';
         this.eye = 'fa-eye';
      } else {
         this.showOldPass = 'password';
         this.eye = 'fa-eye-slash'
      }
      console.info( this.showOldPass );
   }

   onBeforeSend(event: any){
      debugger;
      event.xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
   }
   onUpload(event: any) {
      this.image = event.xhr.responseText;
      this.usuariosService.refreshToken();
      this.navService.setAvatar(this.image);
   }
}

