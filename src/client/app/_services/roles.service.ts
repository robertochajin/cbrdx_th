/**
 * Created by Felipe Aguirre - Jenniferth Escobar on 26/02/2017.
 */
import {Injectable} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";
import {Rol} from "../_models/rol";
import {VRolMenuElemento} from "../_models/vRolMenuElemento";
import {RolCantidad} from "../_models/RolCantidad";
import { AuthenticationService } from '../_services/authentication.service';

@Injectable()
export class RolesService {
    public headers:Headers;
    private masterService = '<%= SVC_URL %>:<%= SVC_PORT_SEG %>/roles/';
    private detailService = '<%= SVC_URL %>:<%= SVC_PORT_SEG %>/rolesMenuElementos/';

    constructor(private http: Http,
                private authenticationService: AuthenticationService
                ) {
        this.headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.authenticationService.token});
    }

    listRoles() {
        return this.http.get(this.masterService,{headers: this.headers}).map((res: Response) => res.json() as Rol[]);
    }

    getDashboardData() {
        return this.http.get(this.masterService + "dashboard/",{headers: this.headers}).map((res: Response) => res.json() as RolCantidad[]);
    }

    getAvaliableFunctions(c: number) {
        return this.http.get(this.masterService + "usuario/" + c,{headers: this.headers}).map((res: Response) => res.json() as Rol[]);
    }

    getAssignedFunctions(c: number) {
        return this.http.get(this.detailService + "vista/" + c,{headers: this.headers}).map((res: Response) => res.json() as VRolMenuElemento[]);
    }

    addRole(c: Rol): Promise<Rol> {
        return this.http.post(this.masterService, JSON.stringify(c), {headers: this.headers}).toPromise().then(res => res.json() as Rol).catch(this.handleError);
    };

    updateRole(c: Rol): Promise<Rol> {
        return this.http.put(this.masterService, JSON.stringify(c), {headers: this.headers}).toPromise().catch(this.handleError);
    }

    viewRole(id: number) {
        return this.http.get(this.masterService + id,{headers: this.headers}).map(res => res.json() as Rol);
    }

    handleError(error: any): Promise<any> {
        console.error('Error:', error);
        return Promise.reject(error.message || error);
    }
}