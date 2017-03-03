import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class StudyIntensityServices {

  constructor(private http: Http) {}

  getAll()  {
    return this.http.get('/api/study-intensity').map((res:Response) => res.json().data);
  }

}

