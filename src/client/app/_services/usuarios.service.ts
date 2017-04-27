/**
 * Created by jenni on 13/02/2017.
 */
import {Injectable} from "@angular/core";
import {Response, Http} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {TercerosService} from "./terceros.service";
import {Usuario} from "../_models/usuario";
import {VUsuario} from "../_models/vUsuario";
import any = jasmine.any;
import {UsuarioGrupoGestion} from "../_models/usuarioGrupoGestion";
import {UsuarioRol} from "../_models/usuarioRol";
import {VUsuarioRol} from "../_models/vUsuarioRol";
import {VUsuarioGrupoGestion} from "../_models/vUsuarioGrupoGestion";
import {VHistoricoUsuario} from "../_models/vHistoricoUsuario";
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class UsuariosService extends TercerosService {

    private usuariosServiceURL = '<%= SVC_TH_URL %>/api/usuarios/';
    private usuariosGruposServiceURL = '<%= SVC_TH_URL %>/api/usuariosGruposGestion/';
    private usuariosRolesServiceURL = '<%= SVC_TH_URL %>/api/usuariosRoles/';

    listUsers() {
        return this.http.get(this.usuariosServiceURL, {headers: this.headers}).map((res: Response) => res.json() as Usuario[]);
    }

    listHistory(id: number) {
        return this.http.get(this.usuariosServiceURL + "auditoria/Usuarios/" + id, {headers: this.headers}).map((res: Response) => res.json() as VHistoricoUsuario[]);
    }

    listVUsers() {
        return this.http.get(this.usuariosServiceURL + "vista/", {headers: this.headers}).map((res: Response) => res.json() as VUsuario[]);
    }

    createUser(p: Usuario): Promise<Usuario> {
        return this.http.post(this.usuariosServiceURL, JSON.stringify(p), {headers: this.headers}).toPromise().then(res => res.json() as Usuario).catch(this.handleError);
    }

    viewUser(id: number) {
        return this.http.get(this.usuariosServiceURL + "query/" + id, {headers: this.headers}).map(res => res.json() as Usuario);
    }

    updateUser(c: Usuario) {
        return this.http.put(this.usuariosServiceURL, JSON.stringify(c), {headers: this.headers}).toPromise().catch(this.handleError);
    }
   
    updatePass(c: Usuario) {
         return this.http.put(this.usuariosServiceURL+ "cambiarPass/" + c.contrasenaAntigua+'/', JSON.stringify(c), {headers: this.headers}).toPromise().then(res => {
            if (res.json() == true) {
               return true;
            } else {
               return false;
            }
         }).catch(this.handleError);
    }

    createUserGroup(p: UsuarioGrupoGestion): Promise<UsuarioGrupoGestion> {
        if (p.fechaInicio != null) {
            p.fechaInicio.setHours(23);
            p.fechaFin.setHours(23);
        }
        return this.http.post(this.usuariosGruposServiceURL, JSON.stringify(p), {headers: this.headers}).toPromise().then(res => res.json() as UsuarioGrupoGestion).catch(this.handleError);
    }

    createUserRole(p: UsuarioRol): Promise<UsuarioRol> {
        if (p.fechaInicio != null) {
            p.fechaInicio.setHours(23);
            p.fechaFin.setHours(23);
        }
        return this.http.post(this.usuariosRolesServiceURL, JSON.stringify(p), {headers: this.headers}).toPromise().then(res => res.json() as UsuarioRol).catch(this.handleError);
    }

    readUserGroups(p: number) {
        return this.http.get(this.usuariosGruposServiceURL + "vista/" + p, {headers: this.headers}).map((res: Response) => res.json() as VUsuarioGrupoGestion[]);
    }

    readUserRoles(p: number) {
        return this.http.get(this.usuariosRolesServiceURL + "vista/" + p, {headers: this.headers}).map((res: Response) => res.json() as VUsuarioRol[]);
    }

    readAllUserRoles() {
        return this.http.get(this.usuariosRolesServiceURL, {headers: this.headers}).map((res: Response) => res.json() as UsuarioRol[]);
    }

    readAllUserGroups() {
        return this.http.get(this.usuariosGruposServiceURL, {headers: this.headers}).map((res: Response) => res.json() as UsuarioGrupoGestion[]);
    }

    readUserGroup(p: number) {
        return this.http.get(this.usuariosGruposServiceURL + p, {headers: this.headers}).map((res: Response) => res.json() as UsuarioGrupoGestion);
    }

    readUserRol(p: number) {
        return this.http.get(this.usuariosRolesServiceURL + p, {headers: this.headers}).map((res: Response) => res.json() as UsuarioRol);
    }

    updateUserGroup(c: UsuarioGrupoGestion) {
        if (c.fechaInicio != null && c.indicadorHabilitado) {
            c.fechaInicio.setHours(23);
            c.fechaFin.setHours(23);
        }
        return this.http.put(this.usuariosGruposServiceURL, JSON.stringify(c), {headers: this.headers}).toPromise().catch(this.handleError);
    }

    updateUserRole(c: UsuarioRol) {
        if (c.fechaInicio != null && c.indicadorHabilitado) {
            c.fechaInicio.setHours(23);
            c.fechaFin.setHours(23);
        }
        return this.http.put(this.usuariosRolesServiceURL, JSON.stringify(c), {headers: this.headers}).toPromise().catch(this.handleError);
    }
}
