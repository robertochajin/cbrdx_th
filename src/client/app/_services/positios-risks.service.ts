import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Risk} from '../_models/position-risks';
import {Exam} from '../_models/position-exam';
@Injectable()
export class RiskService {

  private serviceURL = '<%= SVC_TH_URL %>/api/';
  headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
  }

  getTypeRisk() {
    return this.http.get(this.serviceURL + 'riesgosTipos').map((res: Response) => res.json());
  }

  getListExam() {
    return this.http.get(this.serviceURL + 'listasExamenes/enabled').map((res: Response) => res.json());
  }

  getExamByIdCargo(id:number ) {
    return this.http.get(this.serviceURL + 'cargosExamenes/buscarCargo/'+id).map((res: Response) => res.json() as Exam[]);
  }
  // getByIdTercero(id: number) {
  //   return this.http.get(this.serviceURL+'tercerosVehiculos/buscarTerceros/'+ id).map((res:Response) => res.json() as EmployeeVehicle[]);
  // }

  getSubypeRisk() {
    return this.http.get(this.serviceURL + 'riesgosSubTipos').map((res: Response) => res.json());
  }

  getTypeRiskById(id: number) {
    return this.http.get(this.serviceURL + 'riesgosTipos/' + id).map((res: Response) => res.json());
  }

  getSubypeRiskById(id: number) {
    return this.http.get(this.serviceURL + 'riesgosSubTipos/' + id).map((res: Response) => res.json());
  }

  getRisk() {
    return this.http.get(this.serviceURL + 'riesgos').map((res: Response) => res.json());
  }

  getRiskById(id: number) {
    return this.http.get(this.serviceURL + 'riesgos/' + id).map((res: Response) => res.json());
  }

  getRiskByIdCargo(id: number) {
    return this.http.get(this.serviceURL + 'cargosRiesgos/buscarCargo/' + id).map((res: Response) => res.json() as Risk[]);
  }

  add(c: Risk) {
    return this.http.post(this.serviceURL + 'cargosRiesgos', c).map((res: Response) => res.json());
  };

  addPositionExam(c: Exam) {
    return this.http.post(this.serviceURL + 'cargosExamenes', c).map((res: Response) => res.json());
  };
  updatePositionExam(c: Exam) {
    return this.http.put(this.serviceURL + 'cargosExamenes', c).map((res: Response) => res);
  };

  update(c: Risk) {
    return this.http.put(this.serviceURL + 'tercerosContactos', c).map((res: Response) => res);
  }

  get(id: number) {
    return this.http.get(this.serviceURL + 'tercerosContactos/' + id).map((res: Response) => res.json() as Risk);
  }

}
