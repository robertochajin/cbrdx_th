import {Injectable} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {Observable} from 'rxjs/Observable';

@Injectable()
export class LoginService {
    sessionStart:boolean = false;
    constructor(private http: Http) {
    }
    getSession(){
        return this.sessionStart;
    }
    setSession(s:boolean){
        this.sessionStart = s;
    }
}
