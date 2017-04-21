import {Injectable} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
import {JobProjection} from "../_models/jobProjection";
import {OrganizationalStructure} from "../_models/organizationalStructure";
import {OrganizationalStructurePositions} from "../_models/organizationalStructurePositions";
import {Constante} from '../_models/constante';
@Injectable()
export class JobProjectionService {

   private serviceURL = '<%= SVC_TH_URL %>/api/';
   headers = new Headers({'Content-Type': 'application/json'});

   constructor(private http: Http) {
   }

   getAll() {
      return this.http.get(this.serviceURL + 'riesgos').map((res: Response) => res.json() as JobProjection[]);
   }

   getLisTypeStructure() {
      return this.http.get(this.serviceURL + 'estructuraAreas').map((res: Response) => res.json());
   }

   getLisStructure(id: number) {
      return this.http.get(this.serviceURL + 'estructuraOrganizacional/buscarTipo/' + id).map((res: Response) => res.json() as OrganizationalStructure[]);
   }

   getLisStructurePositions(id: number) {
      return this.http.get(this.serviceURL + 'estructuraOrganizacionalCargos/buscarCargo/' + id).map((res: Response) => res.json() as OrganizationalStructurePositions[]);
   }

   getListJobProjctionByArea(id: number) {
      return this.http.get(this.serviceURL + 'proyeccionesLaborales/buscarArea/' + id).map((res: Response) => res.json() as JobProjection[]);
   }
   getPositionsById(id: number) {
      return this.http.get(this.serviceURL + 'cargos/' + id).map((res: Response) => res.json());
   }
   getEstadoById(id: number) {
      return this.http.get(this.serviceURL + 'listasEstadosProyecciones/' + id).map((res: Response) => res.json());
   }
   getPositions() {
      return this.http.get(this.serviceURL + 'cargos/enabled').map((res: Response) => res.json());
   }
   getPending() {
      return this.http.get(this.serviceURL + 'proyeccionesLaborales/consultarPendientes').map((res: Response) => res.json());
   }
   getConfirmProjection() {
      return this.http.get(this.serviceURL + 'proyeccionesLaborales/confirmarProyeccion').map((res: Response) => res);
   }
   getConstantes() {
      return this.http.get(this.serviceURL + 'constantes').map((res: Response) => res.json() as Constante[]);
   }

   getById(id: number) {
      return this.http.get(this.serviceURL + 'proyeccionesLaborales/' + id).map((res: Response) => res.json() as JobProjection);
   }

   genPro() {
      return this.http.get(this.serviceURL + 'proyeccionesLaborales/generarProyeccion/1').map((res: Response) => res.json());
   };
   update(jp: JobProjection) {
      return this.http.put(this.serviceURL + 'proyeccionesLaborales', jp).map((res: Response) =>  res);
   }
   add(jp: JobProjection) {
      return this.http.post(this.serviceURL + 'proyeccionesLaborales', jp).map((res: Response) => res.json() as JobProjection);
   }

}
