import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {AuthenticationService} from "../_services/authentication.service";
import {PositionCriterias} from "../_models/positionCriterias";

@Injectable()
export class PositionCriteriasService {

  headers = new Headers({'Content-Type': 'application/json'});
  private serviceURL = '<%= SVC_TH_URL %>/api/cargosCriterios/';

  constructor(private http: Http,
              private authenticationService: AuthenticationService) {
    this.headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.authenticationService.token});
  }

  getAll() {
    return this.http.get(this.serviceURL).map((res: Response) => res.json() as PositionCriterias[]);
  }

  getAllByPosition(id: number) {
    return this.http.get(this.serviceURL + 'enabled/' + id).map((res: Response) => res.json());
  }

  add(f: PositionCriterias) {
    return this.http.post(this.serviceURL, f, {headers: this.headers})
      .map((res: Response) => res.json());
  };

  addInBulk(pcs: PositionCriterias[]) {
     return this.http.post(this.serviceURL, JSON.stringify(pcs), {headers: this.headers}).map((res: Response) => res.json());
  };

  update(f: PositionCriterias) {
    return this.http.put(this.serviceURL, JSON.stringify(f), {headers: this.headers}).catch(this.handleError);
  }

  get(id: number) {
    return this.http.get(this.serviceURL + 'buscarId/' + id)
      .map((res: Response) => res.json() as PositionCriterias);
  }

  handleError(error: any): Promise<any> {
    console.error('Error:', error);
    return Promise.reject(error.message || error);
  }

}
