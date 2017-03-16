import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {LoginService} from "../_services/login.service";
import {AppComponent} from "../app.component";
import {AuthenticationService} from "../_services/authentication.service";
import {Http, Headers} from "@angular/http";

@Component({
  moduleId: module.id,
  templateUrl: 'login.component.html',
  selector: 'sd-app',
  styleUrls: ['login.component.css'],
})
export class LoginComponent implements OnInit {
  model: any = {
    password: '10c42472-e',
    username: "carlos_torres"
  };
  intentos: number = 0;
  error: string = "";
  captcha: boolean = false;

  constructor(private loginService: LoginService,
              private http: Http,
              private router: Router,
              private appmain: AppComponent,
              private authenticationService: AuthenticationService) {
    this.loginService.getSession();
  }

  ngOnInit(): void {
    this.authenticationService.logout();
    this.loginService.setSession(false);
    this.appmain.setSession(false);

  }

  goBack() {
    this.router.navigate(['login']);
  }

  login() {
    this.error = '';
    if (this.intentos >= 3 && !this.captcha) {
      this.intentos=2;
      this.error = "Error en la Validacion Captcha";
    } else {
      this.authenticationService.login(this.model.username, this.model.password).then(res => {
        if (res) {
          this.user();
        } else {
          this.intentos++;
          this.error = 'Usuario o Contraseña incorrecta';
        }
      });
    }
  }

  user() {
    this.loginService.setSession(true);
    this.appmain.setSession(true);
    this.router.navigate(['/dashboard']);
  }

  cambioContrasena() {
    this.router.navigate(['cambioContrasena']);
  }

  resolved(captchaResponse: string) {
    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    this.http.post("https://www.google.com/recaptcha/api/siteverify", "secret=6LckLxkUAAAAAGf_9vx0BYTT7Q1fpk5X70BVDM6S&response=" + captchaResponse,{headers: headers}).subscribe(res => {
      let response = res.json().success;
      this.captcha = response;
      this.captcha.re
    });
  }
}
