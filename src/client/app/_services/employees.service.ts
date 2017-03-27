import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Employee } from '../_models/employees';

@Injectable()
export class EmployeesService {


  private serviceURL = '<%= SVC_TH_URL_D %>/employees/';
  private serviceURLTerceros = '<%= SVC_TH_URL %>/tercerosCargos/';


  //au = 'http://192.168.1.54:8445/employees'; //dominio se debe cambiar a negocio.
    headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {}

    getAll()  {
        return this.http.get(this.serviceURL+'/wRol').map((res:Response) => res.json());
    }

    add(c: Employee) {
        return this.http.post(this.serviceURL,c).map((res:Response) => res.json());
    };

    update(c: Employee) {
        return this.http.put(this.serviceURL+'/'+ c.idTercero,c).map((res:Response) => res.json());
    }

    get(id: number) {
        return this.http.get(this.serviceURL+'/'+ id).map((res:Response) => res.json() as Employee);
    }

    getNacionalidad(id: number) {
        return this.http.get(this.serviceURL+'/vista/'+ id).map((res:Response) => res.json());
    }

    getCargoActual(id: number) {
        return this.http.get(this.serviceURLTerceros+'/tercerosCargos/'+ id).map((res:Response) => res.json());
    }

    delete(c: Employee) {
        const respuesta =  this.http.delete(this.serviceURL+'/'+ c.idTercero);
        return respuesta.map((res:Response) => res.json());
    }

}
