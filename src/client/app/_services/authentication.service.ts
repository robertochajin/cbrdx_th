import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import {toPromise} from "rxjs/operator/toPromise";

@Injectable()
export class AuthenticationService {
  public token: string;
  public headers = new Headers({'Content-Type': 'application/json'});
  private masterService = '<%= SVC_SP_URL %>/auth';

  constructor(private http: Http) {
    // set token if saved in local storage
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  forgetUser(mail: string) {
    return this.http.post(this.masterService + "/rememberUser/", JSON.stringify({
      correoElectronico: mail
    }), {headers: this.headers}).toPromise().then(res => {
      return true;
    });
  }

  forgetPass(mail: string, user: string): Promise<boolean> {
    return this.http.post(this.masterService + "/reset/", JSON.stringify({
      correoElectronico: mail, usuarioSistema: user
    }), {headers: this.headers}).toPromise().then(res => {
      if (res) {
        return true;
      } else {
        return false;
      }
    });
  }

  login(username: string, password: string): Promise<boolean> {
    return this.http.post(this.masterService + "/login", JSON.stringify({
      username: username,
      password: password
    }), {headers: this.headers}).toPromise().then(res => {
      let token = res.json().token;
      if (token) {
        this.token = token;
        localStorage.setItem('currentUser', JSON.stringify({username: username, token: token}));
        return true;
      } else {
        return false;
      }
    }, error => {
      return false;
    });
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('currentUser');
  }
}
