import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Workexperience} from '../_models/work-experience';

@Injectable()
export class WorkExperienceService {
  
  private serviceURL = '<%= SVC_TH_URL %>/api/';
  //private serviceURLTerceros = '<%= SVC_TH_URL %>/tercerosCargos/';
  
  
  headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http) {
  }

  getAll() {
      return this.http.get(this.serviceURL+'tercerosExperienciasLaborales').map((res:Response) => res.json());
  }
  
  get(id:number) {
    return this.http.get(this.serviceURL+'tercerosExperienciasLaborales/buscarId/'+ id).map((res:Response) => res.json());
  }
  
  getByEmployee(idTercero:number) {
    return this.http.get(this.serviceURL+'tercerosExperienciasLaborales/buscarTercero/'+ idTercero).map((res:Response) => res.json());
  }

  add(c: Workexperience) {
    return this.http.post(this.serviceURL+'tercerosExperienciasLaborales',c).map((res:Response) => res.json());
  };
  
  update(c: Workexperience) {
    return this.http.put(this.serviceURL+'tercerosExperienciasLaborales',c).map((res:Response) => res);
  }

  delete(f: Workexperience) {
    const respuesta = this.http.delete('/api/workexperience/' + f.idTerceroExperienciaLaboral);
    return respuesta.map((res: Response) => res.json());
  }

}
