/**
 * Created by jenni on 13/02/2017.
 */
import {Component, OnInit} from '@angular/core';
import {Usuario} from '../_models/usuario';
import {UsuariosService} from '../_services/usuarios.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {VUsuario} from "../_models/vUsuario";

@Component({
    moduleId: module.id,
    templateUrl: './usuarios.component.html',
    selector: 'usuarios'
})
export class UsuariosComponent {

    usuario: Usuario = new Usuario();
    usuarios: VUsuario[];
    usuariosFull: boolean=false;

    constructor(private UsuariosService: UsuariosService, private router: Router) {
    }

    addUser() {
        this.router.navigate(['usuarios/add']);
    }

    editUser(c: number) {
        this.router.navigate(['usuarios/edit', c]);
    }

    viewUser(c: number) {
        this.router.navigate(['usuarios/detail', c]);
    }

    showData(s: any) {
        if (s.length > 0) {
            this.UsuariosService.listVUsers().subscribe(
                usuarios => {
                   this.usuariosFull=true;
                   this.usuarios = usuarios.filter(t => t.nombre != null && t.nombre.toLowerCase().includes(s.toLowerCase()) || t.usuario != null && t.usuario.toLowerCase().includes(s.toLowerCase()) || t.documento != null && t.documento.includes(s))
                });
        } else {
            this.usuarios = [];
           this.usuariosFull=false;
        }
    }
}
