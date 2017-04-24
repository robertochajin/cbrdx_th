import {Injectable} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
import {Functionality} from "../_models/functionality";
import {FunctionalityControl} from "../_models/functionalityContorl";

@Injectable()
export class FormManagerService {

   private serviceURL = '<%= SVC_TH_URL %>/api/';
   headers = new Headers({'Content-Type': 'application/json'});

   constructor(private http: Http) {
   }

   add(r: Functionality) {
      return this.http.post(this.serviceURL + 'funcionalidades', r).map((res: Response) => res.json());
   };
   update(r: Functionality) {
      return this.http.put(this.serviceURL + 'funcionalidades', r).catch(this.handleError);
   };
   addSection(r: FunctionalityControl) {
      return this.http.post(this.serviceURL + 'funcionalidadesControles', r).map((res: Response) => res.json());
   };
   addField(r: FunctionalityControl) {
      return this.http.post(this.serviceURL + 'funcionalidadesControles', r).map((res: Response) => res.json());
   };
   updateField(r: FunctionalityControl) {
      return this.http.put(this.serviceURL + 'funcionalidadesControles', r).catch(this.handleError);
   };
   updateSection(r: FunctionalityControl) {
      return this.http.put(this.serviceURL + 'funcionalidadesControles', r).catch(this.handleError);
   };
   getAllFunctionalityControl(){
      return this.http.get(this.serviceURL + 'funcionalidadesControles').map((res: Response) => res.json() as FunctionalityControl[]);
   }
   getAllFunctionality() {
      return this.http.get(this.serviceURL + 'funcionalidades').map((res: Response) => res.json() as Functionality[]);
   }
   getFunctionalityById(id: number) {
      return this.http.get(this.serviceURL + 'funcionalidades/id/'+id).map((res: Response) => res.json() as Functionality);
   }

   getFunctionality() {
      return this.http.get(this.serviceURL + 'menus').map((res: Response) => res.json());
   }

   getClassificationSeccion() {
      return this.http.get(this.serviceURL + 'listasClasificaciones/sec').map((res: Response) => res.json());
   }

   getClassificationCampo() {
      return this.http.get(this.serviceURL + 'listasClasificaciones/cam').map((res: Response) => res.json());
   }
   getSectionByIdFuncionalidad(n: number) {
      return this.http.get(this.serviceURL + 'funcionalidadesControles/secycam/'+n+'/true').map((res: Response) => res.json());
   }
   getFieldByIdFuncionalidad(n: number) {
      return this.http.get(this.serviceURL + 'funcionalidadesControles/secycam/'+n+'/false').map((res: Response) => res.json());
   }
   getFieldByIdFather(n: number) {
      return this.http.get(this.serviceURL + 'funcionalidadesControles/buscarPadre/'+n).map((res: Response) => res.json());
   }
   handleError(error: any): Promise<any> {
      console.error('Error:', error);
      return Promise.reject(error.message || error);
   }

   //funcionalidadesControles/secycam/2/false
   // getSubTypeRisks() {
   //    return this.http.get(this.serviceURL + 'riesgosSubTipos').map((res: Response) => res.json());
   // }
   //
   // getById(id: number) {
   //    return this.http.get(this.serviceURL + 'riesgos/' + id).map((res: Response) => res.json() as Functionality);
   // }
   //
   // getTypeRiskById(id: number) {
   //    return this.http.get(this.serviceURL + 'riesgosTipos/' + id).map((res: Response) => res.json());
   // }
   //
   // getSubTypeRiskById(id: number) {
   //    return this.http.get(this.serviceURL + 'riesgosSubTipos/' + id).map((res: Response) => res.json());
   // }



}
