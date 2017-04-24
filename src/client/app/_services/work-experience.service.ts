import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Workexperience} from '../_models/work-experience';
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class WorkExperienceService {
  
  private serviceURL = '<%= SVC_TH_URL %>/api/';
  //private serviceURLTerceros = '<%= SVC_TH_URL %>/tercerosCargos/';
  
  
  headers = new Headers({'Content-Type': 'application/json'});
   constructor(private http: Http, private authenticationService: AuthenticationService) {
      this.headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.authenticationService.token});
   }

  getAll() {
      return this.http.get(this.serviceURL+'tercerosExperienciasLaborales', { headers: this.headers }).map((res:Response) => res.json());
  }
  
  get(id:number) {
    return this.http.get(this.serviceURL+'tercerosExperienciasLaborales/buscarId/'+ id, { headers: this.headers }).map((res:Response) => res.json());
  }
  
  getByEmployee(idTercero:number) {
    return this.http.get(this.serviceURL+'tercerosExperienciasLaborales/buscarTercero/'+ idTercero, { headers: this.headers }).map((res:Response) => res.json());
  }

  add(c: Workexperience) {
    return this.http.post(this.serviceURL+'tercerosExperienciasLaborales',c, { headers: this.headers }).map((res:Response) => res.json());
  };
  
  update(c: Workexperience) {
    return this.http.put(this.serviceURL+'tercerosExperienciasLaborales',c, { headers: this.headers }).map((res:Response) => res);
  }

  delete(f: Workexperience) {
    const respuesta = this.http.delete('/api/workexperience/' + f.idTerceroExperienciaLaboral, { headers: this.headers });
    return respuesta.map((res: Response) => res.json());
  }

}
