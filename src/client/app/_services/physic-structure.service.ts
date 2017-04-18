import {Injectable} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
import {PhysicStructure} from "../_models/physic-structure";

@Injectable()
export class PhysicStructureService {

   private serviceURL = '<%= SVC_TH_URL %>/api/';
   headers = new Headers({'Content-Type': 'application/json'});

   constructor(private http: Http) {
   }

   getAll() {
      return this.http.get(this.serviceURL + 'estructuraFisica').map((res: Response) => res.json() as PhysicStructure[]);
   }

   getListSedes() {
      return this.http.get(this.serviceURL + 'listasClasificacionesSedes').map((res: Response) => res.json());
   }

   getById(id: number) {
      return this.http.get(this.serviceURL + 'estructuraFisica/' + id).map((res: Response) => res.json() as PhysicStructure);
   }

   add(r: PhysicStructure) {
      return this.http.post(this.serviceURL + 'estructuraFisica', r).map((res: Response) => res.json());
   };

   update(r: PhysicStructure) {
      return this.http.put(this.serviceURL + 'estructuraFisica', r).map((res: Response) => res);
   }

}
