import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { EmployeeEstate } from '../_models/employee-estate';

@Injectable()
export class EmployeeEstateService {
  private serviceURL = '<%= SVC_TH_URL %>/api/';

  headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {}

  getAll()  {
    return this.http.get(this.serviceURL+'tercerosInmuebles').map((res:Response) => res.json());
  }
  
  getByEmployee(id:number)  {
    return this.http.get(this.serviceURL+'tercerosInmuebles/buscarTercero/'+id).map((res:Response) => res.json() as EmployeeEstate[]);
  }

  getById(id: number) {
    return this.http.get(this.serviceURL+'tercerosInmuebles/'+ id).map((res:Response) => res.json() as EmployeeEstate);
  }
  getByIdTercero(id: number) {
    return this.http.get(this.serviceURL+'tercerosInmuebles/buscarTercero/'+ id).map((res:Response) => res.json() as EmployeeEstate);
  }

  add(c: EmployeeEstate) {
    return this.http.post(this.serviceURL+'tercerosInmuebles',c).map((res:Response) => res.json());
  };

  update(c: EmployeeEstate) {
    return this.http.put(this.serviceURL+'tercerosInmuebles',c).map((res:Response) => res);
  }

  delete(c: EmployeeEstate) {
    const respuesta =  this.http.delete(this.serviceURL+'/'+ c.idTerceroInmueble);
    return respuesta.map((res:Response) => res.json());
  }
}
