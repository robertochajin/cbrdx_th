import {Injectable} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";
import {GruposGestion} from "../_models/gruposGestion";
import "rxjs/add/operator/toPromise";
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class GruposGestionService {

    headers = new Headers({'Content-Type': 'application/json'});
    private serviceURL = '<%= SVC_SP_URL %>/gruposGestion/';

    constructor(private http: Http,
                private authenticationService: AuthenticationService
    ) {
        this.headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.authenticationService.token});
    }

    listGruposGestion() {
        return this.http.get(this.serviceURL,{headers: this.headers}).map((res: Response) => res.json() as GruposGestion[]);
    }

    listAvaliableGruposGestion(c: number) {
        return this.http.get(this.serviceURL + "usuario/" + c,{headers: this.headers}).map((res: Response) => res.json() as GruposGestion[]);
    }

    addGruposGestion(g: GruposGestion): Promise<GruposGestion> {
        if (g.fechaInicio != null) {
            g.fechaInicio.setHours(23);
            g.fechaFin.setHours(23);
        }
        return this.http.post(this.serviceURL, JSON.stringify(g), {headers: this.headers}).toPromise().then(res => res.json() as GruposGestion).catch(this.handleError);
    };

    updateGruposGestion(g: GruposGestion): Promise<any> {
        if (g.fechaInicio != null) {
            g.fechaInicio.setHours(23);
            g.fechaFin.setHours(23);
        }
        return this.http.put(this.serviceURL, JSON.stringify(g), {headers: this.headers}).toPromise().catch(this.handleError);
    }

    viewGruposGestion(id: number) {
        return this.http.get(this.serviceURL + id,{headers: this.headers}).map(res => res.json() as GruposGestion);
    }

    handleError(error: any): Promise<any> {
        console.error('Error:', error);
        return Promise.reject(error.message || error);
    }
}
