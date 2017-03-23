import {Injectable} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {MenuElemento} from "../_models/menuElemento";
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class MenuElementoService {

    headers = new Headers({'Content-Type': 'application/json'});
    private serviceURL = '<%= SVC_SP_URL %>/menusElementos/';

    constructor(private http: Http,
                private authenticationService: AuthenticationService
    ) {
        this.headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.authenticationService.token});
    }

    listMenuElemento() {
        return this.http.get(this.serviceURL,{headers: this.headers}).map((res: Response) => res.json() as MenuElemento[]);
    }

    addMenuElemento(c: MenuElemento): Promise<MenuElemento> {
        return this.http.post(this.serviceURL, JSON.stringify(c), {headers: this.headers}).toPromise().then(res => res.json() as MenuElemento).catch(this.handleError);
    };

    updateMenuElemento(c: MenuElemento): Promise<MenuElemento> {
        return this.http.put(this.serviceURL, JSON.stringify(c), {headers: this.headers}).toPromise().catch(this.handleError);
    }

    viewMenuElemento(id: number) {
        return this.http.get(this.serviceURL + id,{headers: this.headers}).map(res => res.json() as MenuElemento);
    }

    handleError(error: any): Promise<any> {
        console.error('Error:', error);
        return Promise.reject(error.message || error);
    }
}
