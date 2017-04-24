import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { EmployeeEstate } from '../_models/employee-estate';
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class EmployeeEstateService {
  private serviceURL = '<%= SVC_TH_URL %>/api/';

  headers = new Headers({'Content-Type': 'application/json'});
   
   constructor(private http: Http,
               private authenticationService: AuthenticationService
   ) {
      this.headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.authenticationService.token});
   }

  getAll()  {
    return this.http.get(this.serviceURL+'tercerosInmuebles',{headers: this.headers}).map((res:Response) => res.json());
  }
  
  getByEmployee(id:number)  {
    return this.http.get(this.serviceURL+'tercerosInmuebles/buscarTercero/'+id,{headers: this.headers}).map((res:Response) => res.json() as EmployeeEstate[]);
  }

  getById(id: number) {
    return this.http.get(this.serviceURL+'tercerosInmuebles/'+ id,{headers: this.headers}).map((res:Response) => res.json() as EmployeeEstate);
  }
  getByIdTercero(id: number) {
    return this.http.get(this.serviceURL+'tercerosInmuebles/buscarTercero/'+ id,{headers: this.headers}).map((res:Response) => res.json() as EmployeeEstate);
  }

  add(c: EmployeeEstate) {
    return this.http.post(this.serviceURL+'tercerosInmuebles',c,{headers: this.headers}).map((res:Response) => res.json());
  };

  update(c: EmployeeEstate) {
    return this.http.put(this.serviceURL+'tercerosInmuebles',c,{headers: this.headers}).map((res:Response) => res);
  }

  delete(c: EmployeeEstate) {
    const respuesta =  this.http.delete(this.serviceURL+'/'+ c.idTerceroInmueble,{headers: this.headers});
    return respuesta.map((res:Response) => res.json());
  }
}
