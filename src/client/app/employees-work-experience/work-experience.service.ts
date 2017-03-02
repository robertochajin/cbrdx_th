import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Workexperience} from './work-experience';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class WorkExperienceService {

  constructor(private http: Http) {
  }

  getAll() {
    return this.http.get('/api/workexperience').map((res: Response) => res.json().data);
  }

  add(f: Workexperience) {
    return this.http.post('/api/workexperience', f).map((res: Response) => res.json());
  };

  update(f: Workexperience) {
    return this.http.put('/api/workexperience/' + f.idExperiencia, f).map((res: Response) => res.json());
  }

  get(id: number) {
    const respuesta = this.http.get('/api/workexperience/' + id);
    return respuesta.map((res: Response) => res.json().data as Workexperience)
  }

  delete(f: Workexperience) {
    const respuesta = this.http.delete('/api/workexperience/' + f.idExperiencia);
    return respuesta.map((res: Response) => res.json());
  }

}
