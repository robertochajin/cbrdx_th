import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class StudyAreaServices {

  constructor(private http: Http) {}

  getAll()  {
    return this.http.get('/api/study-area').map((res:Response) => res.json().data);
  }

}

