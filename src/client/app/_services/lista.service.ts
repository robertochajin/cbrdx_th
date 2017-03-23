import {Http, Response, Headers} from "@angular/http";
import {Lista} from "../_models/lista";
import {ListaItem} from "../_models/listaItem";
import {Injectable} from "@angular/core";
import any = jasmine.any;
import "rxjs/add/operator/toPromise";
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class ListaService {

    public headers = new Headers({'Content-Type': 'application/json'});
    private masterService = '<%= SVC_SP_URL %>/listas/';
    private detailService = '<%= SVC_SP_URL %>/listasItems/';

    constructor(private http: Http,
                private authenticationService: AuthenticationService
    ) {
        this.headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.authenticationService.token});
    }

    getDetail(id: number) {
        return this.http.get(this.detailService + id,{headers: this.headers}).map(res => res.json() as ListaItem);
    }

    getMaster(id: number) {
        return this.http.get(this.masterService + id,{headers: this.headers}).map(res => res.json() as Lista);
    }

    getMasterList() {
        return this.http.get(this.masterService,{headers: this.headers}).map((res: Response) => res.json() as Lista[]);
    }

    getMasterByCodigo(codigo: string) {
        return this.http.get(this.masterService + "codigo/" + codigo,{headers: this.headers}).map(res => res.json() as Lista);
    }

    getOtherMasters(id: number) {
        return this.http.get(this.masterService + "others/" + id,{headers: this.headers}).map(res => res.json() as Lista[]);
    }

    createMaster(l: Lista): Promise<Lista> {
        return this.http.post(this.masterService, JSON.stringify(l), {headers: this.headers}).toPromise().then(res => res.json() as Lista).catch(this.handleError);
    }

    getMasterDetails(l: number) {
        return this.http.get(this.detailService + "lista/" + l,{headers: this.headers}).map((res: Response) => res.json() as ListaItem[]);
    }

    createDetail(li: ListaItem) {
        return this.http.post(this.detailService, JSON.stringify(li), {headers: this.headers}).toPromise().then(res => res.json() as ListaItem).catch(this.handleError);
    }

    clearDetail(li: number) {
        return this.http.get(this.detailService + "clear/" + li,{headers: this.headers});
    }

    updateMaster(l: Lista) {
        return this.http.put(this.masterService, JSON.stringify(l), {headers: this.headers}).toPromise().catch(this.handleError);
    }

    handleError(error: any): Promise<any> {
        console.error('Error:', error);
        return Promise.reject(error.message || error);
    }

    updateDetail(d: ListaItem) {
        return this.http.put(this.detailService, JSON.stringify(d), {headers: this.headers}).toPromise().catch(this.handleError);
    }
}
