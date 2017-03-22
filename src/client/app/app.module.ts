import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {APP_BASE_HREF} from "@angular/common";
import {HttpModule,Http} from "@angular/http";
import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./app-routing.module";
import {AboutModule} from "./about/about.module";
import {HomeModule} from "./home/home.module";
import {EmployeesModule} from "./employees/employees.module";
import {SharedModule} from "./shared/shared.module";
import {FamilyInformationModule} from "./employees-family-information/family-information.module";
import {ReferencesModule} from "./employees-references/references.module";
import {AcademicEducationModule} from "./employees-academic-education/academic-education.module";
import {LocationModule} from "./employees-location/location.module";
import {WorkExperienceModule} from "./employees-work-experience/work-experience.module";
import {LoginModule} from "./seguridad/login.module";
import {LoginService} from "./_services/login.service";
import {AuthGuard} from "./_guards/auth.guard";
import {AuthenticationService} from "./_services/authentication.service";
import {GrowlModule} from "primeng/primeng";
import {DashboardModule} from "./dashboard/dashboard.module";
import {TranslateModule, TranslateLoader, TranslateStaticLoader} from "ng2-translate";


// used to create fake backend

//CarsModule,
@NgModule( {
  imports: [BrowserModule, HttpModule, AppRoutingModule, AboutModule, HomeModule,
    EmployeesModule,
    FamilyInformationModule,
    LocationModule,
    ReferencesModule,
    AcademicEducationModule,
    WorkExperienceModule,
    LoginModule,
    GrowlModule,
    DashboardModule,
    SharedModule.forRoot(),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (http: Http) => new TranslateStaticLoader(http, '/assets/i18n', '.json'),
      deps: [Http]
    })
  ],

  declarations: [AppComponent],
  providers: [{
    provide: APP_BASE_HREF,
    useValue: '<%= APP_BASE %>'
  },
    AuthGuard,
    AuthenticationService,
    LoginService,
    {
      provide: APP_BASE_HREF,
      useValue: '<%= APP_BASE %>',
    }
    // providers used to create fake backend
    // fakeBackendProvider,
    // MockBackend,
    // BaseRequestOptions
  ],

  bootstrap: [AppComponent]

} )
export class AppModule {
}
