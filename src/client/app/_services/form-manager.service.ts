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
      return this.http.get(this.serviceURL + 'menus/idPadreDifCero').map((res: Response) => res.json());
   }

   getSectionByIdFuncionalidad(id: number) {
      return this.http.get(this.serviceURL + 'funcionalidadesControles/secycam/'+id+'/true').map((res: Response) => res.json());
   }
   getFieldByIdFuncionalidad(id: number) {
      return this.http.get(this.serviceURL + 'funcionalidadesControles/secycam/'+id+'/false').map((res: Response) => res.json());
   }
   getFieldByIdFather(id: number) {
      return this.http.get(this.serviceURL + 'funcionalidadesControles/buscarPadre/'+id).map((res: Response) => res.json());
   }
   handleError(error: any): Promise<any> {
      console.error('Error:', error);
      return Promise.reject(error.message || error);
   }

}
