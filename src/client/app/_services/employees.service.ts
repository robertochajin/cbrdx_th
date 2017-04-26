import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Employee } from '../_models/employees';
import {AuthenticationService} from "./authentication.service";
@Injectable()
export class EmployeesService {


  private serviceURL = '<%= SVC_TH_URL %>/api/';
  private serviceURLTerceros = '<%= SVC_TH_URL %>/tercerosCargos/';

    headers = new Headers({'Content-Type': 'application/json'});
   
   constructor(private http: Http,
               private authenticationService: AuthenticationService
   ) {
      this.headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.authenticationService.token});
   }

    getAll()  {
        return this.http.get(this.serviceURL+'vterceros' ,{headers: this.headers}).map((res:Response) => res.json());
    }
    getByTipo(type:string)  {
        return this.http.get(this.serviceURL+'vterceros/buscarTerceros/'+type+"/" ,{headers: this.headers}).map((res:Response) => res.json());
    }

    getTerColWithoutPosition(query:string)  {
        return this.http.get(this.serviceURL+'vterceros/asignarColaborador/'+query.trim()+'/' ,{headers: this.headers}).map((res:Response) => res.json());
    }

    add(c: Employee) {
        return this.http.post(this.serviceURL+'terceros',c ,{headers: this.headers}).map((res:Response) => res.json());
    };

    update(c: Employee) {
        return this.http.put(this.serviceURL+'terceros',c ,{headers: this.headers}).map((res:Response) => res);
    }

    get(id: number) {
        return this.http.get(this.serviceURL+'vterceros/'+ id ,{headers: this.headers}).map((res:Response) => res.json() as Employee);
    }

    getNacionalidad(id: number) {
        return this.http.get(this.serviceURL+'/vista/'+ id ,{headers: this.headers}).map((res:Response) => res.json());
    }

    getCargoActual(id: number) {
        return this.http.get(this.serviceURLTerceros+'/tercerosCargos/'+ id ,{headers: this.headers}).map((res:Response) => res.json());
    }

    delete(c: Employee) {
        const respuesta =  this.http.delete(this.serviceURL+'/'+ c.idTercero ,{headers: this.headers});
        return respuesta.map((res:Response) => res.json());
    }
  
    validateDocument(numeroDocumento: string, idTipoDocumento: number) {
      return this.http.get(this.serviceURL+'terceros/'+ numeroDocumento+'/'+ idTipoDocumento+'/' ,{headers: this.headers}).map((res:Response) => res.json() as Employee);
      
      
      /*.map((res:Response) => {
         //if (res.text() != '') {
            res.json() as Employee
         //} else {
            return undefined;
         //}
      });*/
    }

}
