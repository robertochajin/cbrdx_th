import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {ConstructorFamilyInformation} from './family-information.construct';
import {AuthenticationService} from "../_services/authentication.service";

@Injectable()
export class FamilyInformationService {

  headers = new Headers({'Content-Type': 'application/json'});
  private serviceURL = '<%= SVC_TH_URL %>/api/tercerosFamiliares/';

  constructor(private http: Http,
              private authenticationService: AuthenticationService) {
    this.headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.authenticationService.token});
  }

  getAll() {
    return this.http.get(this.serviceURL).map((res: Response) => res.json() as ConstructorFamilyInformation[]);
  }

  getAllByEmployee(id: number) {
    return this.http.get(this.serviceURL + 'buscarTercero/' + id).map((res: Response) => res.json());
  }

  add(f: ConstructorFamilyInformation) {
    console.info(f);
    return this.http.post(this.serviceURL, f, {headers: this.headers})
      .map((res: Response) => res.json());
  };

  update(f: ConstructorFamilyInformation) {
    return this.http.put(this.serviceURL, JSON.stringify(f), {headers: this.headers}).catch(this.handleError);
  }

  get(id: number) {
    return this.http.get(this.serviceURL + 'buscarId/' + id)
      .map((res: Response) => res.json() as ConstructorFamilyInformation);
  }

  handleError(error: any): Promise<any> {
    console.error('Error:', error);
    return Promise.reject(error.message || error);
  }

}
