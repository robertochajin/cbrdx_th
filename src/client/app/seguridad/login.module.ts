/**
 * Created by Jenniferth Escobar - Felipe Aguirre on 9/03/2017.
 */
import {NgModule} from "@angular/core";
import {
    InputTextModule,
    ButtonModule,
    DialogModule,
    CaptchaModule,
    FieldsetModule,
    PasswordModule
} from "primeng/primeng";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/toPromise";
import {LoginService} from "../_services/login.service";
import {LoginComponent} from "./login.component";
import {CambioContrasenaComponent} from "./cambioContrasena.component";
import {AuthenticationService} from "../_services/authentication.service";
import {RecaptchaModule} from "ng-recaptcha/index";
import {RecaptchaFormsModule} from "ng-recaptcha/forms";

@NgModule({
    imports: [CommonModule, FormsModule, InputTextModule, ButtonModule, DialogModule, CaptchaModule, FieldsetModule, PasswordModule, RecaptchaModule.forRoot(), RecaptchaFormsModule],
    declarations: [LoginComponent, CambioContrasenaComponent],
    bootstrap: [LoginComponent],
    providers: [LoginService, AuthenticationService],
    exports: [LoginComponent]
})
export class LoginModule {

}
