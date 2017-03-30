/**
 * Created by jenni on 13/02/2017.
 */
import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {UsuariosService} from "../_services/usuarios.service";
import {Usuario} from "../_models/usuario";
import "rxjs/add/operator/switchMap";
import {UsuarioRol} from "../_models/usuarioRol";
import {Tercero} from "../_models/tercero";
import {Rol} from "../_models/rol";
import {GruposGestion} from "../_models/gruposGestion";
import {UsuarioGrupoGestion} from "../_models/usuarioGrupoGestion";
import {VUsuarioRol} from "../_models/vUsuarioRol";
import {VUsuarioGrupoGestion} from "../_models/vUsuarioGrupoGestion";
import {Lista} from "../_models/lista";
import {ListaItem} from "../_models/listaItem";
import {RolesService} from "../_services/roles.service";
import {GruposGestionService} from "../_services/grupoGestion.service";
import {TercerosService} from "../_services/terceros.service";
import {ListaService} from "../_services/lista.service";
import {VHistoricoUsuario} from "../_models/vHistoricoUsuario";

@Component({
    moduleId: module.id,
    selector: 'usuario-detail',
    templateUrl: './usuario-detail.component.html',
})


export class UsuarioDetailComponent implements OnInit {
    ngOnInit(): void {

    }

    usuario: Usuario = new Usuario();
    tercero: Tercero = new Tercero();
    curRoles: VUsuarioRol[] = [];
    curGrupos: VUsuarioGrupoGestion[] = [];
    historico: VHistoricoUsuario[] = [];


    constructor(private usuariosService: UsuariosService,
                private tercerosService: TercerosService,
                private router: Router,
                private route: ActivatedRoute) {
        route.params.switchMap((params: Params) => usuariosService.viewUser(+params['id']))
            .subscribe(data => {
                this.usuario = data;
                this.updateRolesLists();
                this.updateHistoric();
                this.updateGroupLists();
                tercerosService.listarTerceros().subscribe(res => {
                    this.tercero = res.find(t => t.idTercero === this.usuario.idTercero);
                });
            });

    }

    goBack(): void {
        this.router.navigate(['usuarios']);
    }

    updateRolesLists() {
        this.usuariosService.readUserRoles(this.usuario.idUsuario).subscribe(res => {
            this.curRoles = res;
        });
    }

    updateGroupLists() {
        this.usuariosService.readUserGroups(this.usuario.idUsuario).subscribe(res => {
            this.curGrupos = res;
        });
    }

    updateHistoric() {
        this.usuariosService.listHistory(this.usuario.idUsuario).subscribe(res => {
            this.historico = res;
        });
    }
}