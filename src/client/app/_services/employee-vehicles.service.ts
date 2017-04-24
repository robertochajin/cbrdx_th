import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { EmployeeVehicle } from '../_models/employee-vehicle';
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class EmployeeVehicleService {
  private serviceURL = '<%= SVC_TH_URL %>/api/';

  headers = new Headers({'Content-Type': 'application/json'});
   
   constructor(private http: Http,
               private authenticationService: AuthenticationService
   ) {
      this.headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.authenticationService.token});
   }

  getAll()  {
    return this.http.get(this.serviceURL+'tercerosVehiculos' ,{headers: this.headers}).map((res:Response) => res.json());
  }

  getById(id: number) {
    return this.http.get(this.serviceURL+'tercerosVehiculos/'+ id ,{headers: this.headers}).map((res:Response) => res.json() as EmployeeVehicle);
  }
  getByIdTercero(id: number) {
    return this.http.get(this.serviceURL+'tercerosVehiculos/buscarTerceros/'+ id ,{headers: this.headers}).map((res:Response) => res.json() as EmployeeVehicle[]);
  }

  add(c: EmployeeVehicle) {
    return this.http.post(this.serviceURL+'tercerosVehiculos',c ,{headers: this.headers}).map((res:Response) => res.json());
  };

  update(c: EmployeeVehicle) {
    return this.http.put(this.serviceURL+'tercerosVehiculos',c ,{headers: this.headers}).map((res:Response) => res);
  }
  
}
