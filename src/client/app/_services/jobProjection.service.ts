import {Injectable} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
import {JobProjection} from "../_models/jobProjection";
import {OrganizationalStructure} from "../_models/organizationalStructure";
import {OrganizationalStructurePositions} from "../_models/organizationalStructurePositions";
import {Constante} from '../_models/constante';
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class JobProjectionService {

   private serviceURL = '<%= SVC_TH_URL %>/api/';
   headers = new Headers({'Content-Type': 'application/json'});
   
   constructor(private http: Http,
               private authenticationService: AuthenticationService
   ) {
      this.headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.authenticationService.token});
   }

   getAll() {
      return this.http.get(this.serviceURL + 'riesgos',{headers: this.headers}).map((res: Response) => res.json() as JobProjection[]);
   }

   getLisTypeStructure() {
      return this.http.get(this.serviceURL + 'estructuraAreas',{headers: this.headers}).map((res: Response) => res.json());
   }

   getLisStructure(id: number) {
      return this.http.get(this.serviceURL + 'estructuraOrganizacional/buscarTipo/' + id,{headers: this.headers}).map((res: Response) => res.json() as OrganizationalStructure[]);
   }

   getLisStructurePositions(id: number) {
      return this.http.get(this.serviceURL + 'estructuraOrganizacionalCargos/buscarCargo/' + id,{headers: this.headers}).map((res: Response) => res.json() as OrganizationalStructurePositions[]);
   }

   getListJobProjctionByArea(id: number) {
      return this.http.get(this.serviceURL + 'proyeccionesLaborales/buscarArea/' + id,{headers: this.headers}).map((res: Response) => res.json() as JobProjection[]);
   }
   getPositionsById(id: number) {
      return this.http.get(this.serviceURL + 'cargos/' + id,{headers: this.headers}).map((res: Response) => res.json());
   }
   getPositions() {
      return this.http.get(this.serviceURL + 'cargos/enabled',{headers: this.headers}).map((res: Response) => res.json());
   }
   getPending() {
      return this.http.get(this.serviceURL + 'proyeccionesLaborales/consultarPendientes',{headers: this.headers}).map((res: Response) => res.json());
   }
   getConfirmProjection() {
      return this.http.get(this.serviceURL + 'proyeccionesLaborales/confirmarProyeccion',{headers: this.headers}).map((res: Response) => res);
   }
   getConstantes() {
      return this.http.get(this.serviceURL + 'constantes',{headers: this.headers}).map((res: Response) => res.json() as Constante[]);
   }

   getById(id: number) {
      return this.http.get(this.serviceURL + 'proyeccionesLaborales/' + id,{headers: this.headers}).map((res: Response) => res.json() as JobProjection);
   }

   genPro() {
      return this.http.get(this.serviceURL + 'proyeccionesLaborales/generarProyeccion/1',{headers: this.headers}).map((res: Response) => res.json());
   };
   update(jp: JobProjection) {
      return this.http.put(this.serviceURL + 'proyeccionesLaborales', jp,{headers: this.headers}).map((res: Response) =>  res);
   }
   add(jp: JobProjection) {
      return this.http.post(this.serviceURL + 'proyeccionesLaborales', jp,{headers: this.headers}).map((res: Response) => res.json() as JobProjection);
   }

}
