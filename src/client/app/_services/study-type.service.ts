import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class StudyTypeServices {

  constructor(private http: Http) {}

  getAll()  {
    return this.http.get('/api/study-type').map((res:Response) => res.json().data);
  }

}

