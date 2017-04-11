import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Absence} from '../_models/position-absence';
@Injectable()
export class AbsenceService {

   private serviceURL = '<%= SVC_TH_URL %>/api/';
   headers = new Headers({'Content-Type': 'application/json'});

   constructor(private http: Http) {
   }

   getReemplazaA(id: number) {
      return this.http.get(this.serviceURL + 'cargosRelacionados/buscarRelacion/REE/' + id).map((res: Response) => res.json() as Absence[]);
   }
   getReemplazado(id: number) {
      return this.http.get(this.serviceURL + 'cargosRelacionados/buscarRelacion/REP/' + id).map((res: Response) => res.json() as Absence[]);
   }

   getPositionAll() {
      return this.http.get(this.serviceURL + 'cargos/enabled').map((res: Response) => res.json());
   }
   getPositionById(id: number) {
      return this.http.get(this.serviceURL + 'cargos/'+id).map((res: Response) => res.json());
   }

   add(c: Absence) {
      return this.http.post(this.serviceURL + 'cargosRelacionados', c).map((res: Response) => res.json());
   };

   update(c: Absence) {
      return this.http.put(this.serviceURL + 'cargosRelacionados', c).map((res: Response) => res);
   }

}
