import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {AuthenticationService} from "./authentication.service";
import {EmployeesClinicalData} from "../_models/employeesClinicalData";

@Injectable()
export class ClinicalInformationService {

  public headers = new Headers({'Content-Type': 'application/json'});

  private masterService = '<%= SVC_TH_URL %>/api/tercerosDatosClinicos/';

  constructor(private http: Http,
              private authenticationService: AuthenticationService
  ) {
    this.headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.authenticationService.token});
  }

  getAllByEmployee(id: number)  {
    return this.http.get(this.masterService + 'buscarTercero/'+ id,{headers: this.headers}).map((res:Response) => res.json() as EmployeesClinicalData[]);
  }

  getById(id: number)  {
    return this.http.get(this.masterService+'buscarId/'+id,{headers: this.headers}).map((res:Response) => res.json());
  }

  add(c: EmployeesClinicalData) {
    return this.http.post(this.masterService,c).map((res:Response) => res.json() as EmployeesClinicalData);
  }

  update(f: EmployeesClinicalData) {
    return this.http.put(this.masterService, JSON.stringify(f), {headers: this.headers}).catch(this.handleError);
  }

  handleError(error: any): Promise<any> {
    console.error('Error:', error);
    return Promise.reject(error.message || error);
  }

}

