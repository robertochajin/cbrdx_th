import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class StudyLevelServices {

  constructor(private http: Http) {}

  getAll()  {
    return this.http.get('/api/study-level').map((res:Response) => res.json().data);
  }

}

