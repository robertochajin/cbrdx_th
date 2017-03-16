/**
 * Created by Jenniferth Escobar - Felipe Aguirre on 9/03/2017.
 */
import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {LoginService} from "../_services/login.service";
import {AppComponent} from "../app.component";
import {AuthenticationService} from "../_services/authentication.service";

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
    captcha: string = "";

    constructor(private loginService: LoginService,
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
        this.authenticationService.login(this.model.username, this.model.password).then(res => {
            if (res) {
                this.user();
            } else {
                this.intentos++;
                this.error = 'Usuario o Contraseña incorrecta';
            }
        });
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
        console.log(`Resolved captcha with response ${captchaResponse}:`);
    }
}
