import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class StudyStateServices {

  constructor(private http: Http) {}

  getAll()  {
    return this.http.get('/api/study-state').map((res:Response) => res.json().data);
  }

}

