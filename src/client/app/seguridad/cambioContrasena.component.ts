/**
 * Created by Jenniferth Escobar - Felipe Aguirre on 10/03/2017.
 */
import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AuthenticationService} from "../_services/authentication.service";
@Component({
    moduleId: module.id,
    templateUrl: 'cambioContrasena.component.html',
    selector: 'sd-app',
    styleUrls: ['login.component.css'],
})
export class CambioContrasenaComponent implements OnInit {

    usuario: string;
    correoElectronico: string;
    recordarUsuario: boolean = false;
    displayDialog1: boolean = false;
    displayDialog: boolean = false;
    error: string;
    notice: string;

    constructor(private loginService: AuthenticationService, private router: Router) {
    }

    ngOnInit(): void {

    }

    goBack() {
        this.router.navigate(['login']);
    }

    olvideUsuario() {
        this.usuario = "";
        this.recordarUsuario = true;
    }

    regresarUsuario() {
        this.recordarUsuario = false;
    }

    envioUsuario() {
        this.loginService.forgetUser(this.correoElectronico);
        this.displayDialog1 = false;
        this.recordarUsuario = false;
    }
  
  envioContrasena() {
    this.loginService.forgetPass(this.correoElectronico, this.usuario).then(res => {
      if (res) {
        this.notice = "Se notifico al administrador del Sistema de su solicitud de cambio de contraseña";
      } else {
        this.notice = "Se envió un correo electronico con su nueva contraseña de acceso al sistema";
      }
    }, error => {
      this.error = "El correo y/o el usuario no coinciden con lo registrado"
    });
    this.displayDialog = false;
  }

    emailCleanUp(value: string) {
        this.correoElectronico = value.toLowerCase().replace(' ', '').trim();
    }

    userCleanUp(value: string) {
        this.usuario = value.toLowerCase().replace(' ', '').replace('ñ', 'n').trim();
    }

    doPost() {
        if (!this.recordarUsuario) {
            this.displayDialog = true;
        } else {
            this.displayDialog1 = true;
        }
    }

}
