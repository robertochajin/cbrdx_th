import {Injectable} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {AuthenticationService} from "./authentication.service";
import {OrganizationalStructure} from "../_models/organizationalStructure";
import {Search} from "../_models/search";

@Injectable()
export class OrganizationalStructureService {

    headers = new Headers({'Content-Type': 'application/json'});
    private serviceURL = '<%= SVC_TH_URL %>/api/estrcturaOrganizacional/';

    constructor(private http: Http,
                private authenticationService: AuthenticationService
    ) {
        this.headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.authenticationService.token});
    }

    listOrganizationalStructure() {
        return this.http.get(this.serviceURL,{headers: this.headers}).map((res: Response) => res.json() as OrganizationalStructure[]);
    }

    
    addOrganizationalStructure(c: OrganizationalStructure): Promise<OrganizationalStructure> {
        return this.http.post(this.serviceURL, JSON.stringify(c), {headers: this.headers}).toPromise().then(res => res.json() as OrganizationalStructure).catch(this.handleError);
    };

    updateOrganizationalStructure(c: OrganizationalStructure): Promise<any> {
        return this.http.put(this.serviceURL, JSON.stringify(c), {headers: this.headers}).toPromise().catch(this.handleError);
    }

    viewOrganizationalStructure(id: number) {
        return this.http.get(this.serviceURL+"buscarId/" + id,{headers: this.headers}).map(res => res.json() as OrganizationalStructure);
    }

   /* listOrganizationalStructureAreas() {
        return this.http.get(this.serviceAreasURL,{headers: this.headers}).map((res: Response) => res.json() as OrganizationalStructureAreas[]);
    }
*/
    getSearch(val: string) {
        return this.http.get(this.serviceURL +'search/'+ val+'/',{headers: this.headers}).map(res => res.json() as Search[]);
    }

    handleError(error: any): Promise<any> {
        console.error('Error:', error);
        return Promise.reject(error.message || error);
    }
   listOrganizationalStructureTypes() {
      return this.http.get(this.serviceURL+"buscarHijos/"+id,{headers: this.headers}).map((res: Response) => res.json() as OrganizationalStructure[]);
   }

}
