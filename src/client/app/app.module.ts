import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {APP_BASE_HREF} from "@angular/common";
import {HttpModule, Http} from "@angular/http";
import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./app-routing.module";
import {WindowRefService} from './_services/window-ref.service';

import {EmployeesModule} from "./employees/employees.module";
import {SharedModule} from "./shared/shared.module";
import {FamilyInformationModule} from "./employees-family-information/family-information.module";
import {ReferencesModule} from "./employees-references/references.module";
import {AcademicEducationModule} from "./employees-academic-education/academic-education.module";
import {LocationModule} from "./employees-location/employee-location.module";
import {EmployeesEstateModule} from "./employees-estate/employee-estate.module";
import {EmployeesVehicleModule} from "./employees-vehicle/employee-vehicles.module";
import {WorkExperienceModule} from "./employees-work-experience/work-experience.module";
import {FaultsAndSanctionsModule} from "./faultsAndSanctions/faults-and-sanctions.module";
import {PositionsModule} from "./positions/positions.module";
import {PersonalityModule} from "./position-personality/personality.module";
import {CompanyAssetsModule} from "./position-company-assets/company-assets.module"


import {LoginModule} from "./seguridad/login.module";
import {LoginService} from "./_services/login.service";
import {AuthGuard} from "./_guards/auth.guard";
import {AuthenticationService} from "./_services/authentication.service";
import {GrowlModule} from "primeng/primeng";
import {DashboardModule} from "./dashboard/dashboard.module";
import {TranslateModule, TranslateLoader, TranslateStaticLoader} from "ng2-translate";

import {ProductivityModule} from "./position-productivity/productivity.module";
// import {AptitudeLevelModule} from "./aptitude-level/aptitude-level.module";
// import {IQLevelModule} from "./IQlevel/iqlevel.module";

import {RiskModule} from "./position-risks/position-risks.module";
import {AbsenceModule} from "./position-absence/position-absence.module";
// import {ResponsibilityModule} from "./position-responsibility/responsibility.module";
// Copy sp

import {ConstanteModule} from "./constantes/constante.module";
import {ListaModule} from "./listas/lista.module";
import {CentroCostosModule} from "./centroCostos/centroCostos.module";
import {GruposGestionModule} from "./gruposGestion/gruposGestion.module";
import {RolesModule} from "./roles/roles.module";
import {UsuariosModule} from "./usuarios/usuarios.module";
import {TipoDeAreaModule} from "./areas/tipoDeArea.module";
import {DivisionPoliticaModule} from "./divisionPolitica/divisionPolitica.module";
import {OcupacionesModule} from "./ocupaciones/ocupaciones.module";
import {ActividadEconomicaModule} from "./actividadEconomica/actividadEconomica.module";
import {ClinicalInformationModule} from "./employees-clinical-information/clinical-information.module";
import {EvaluationCriteriasModule} from "./position-evaluation-criterias/evaluation-criterias.module";
import {PositionResponsabilitiesModule} from "./position-responsabilities/position-responsabilities.module";
import {PositionRolesModule} from "./position-roles/position-roles.module";
import {PositionCompetenciesModule} from "./position-competencies/position-competencies.module";


//CarsModule,
@NgModule({
   imports: [BrowserModule, HttpModule, AppRoutingModule,
      EmployeesModule,
      FamilyInformationModule,
      LocationModule,
      EmployeesEstateModule,
      EmployeesVehicleModule,
      ReferencesModule,
      AcademicEducationModule,
      WorkExperienceModule,
      ClinicalInformationModule,
      LoginModule,
      GrowlModule,
      DashboardModule,
      EvaluationCriteriasModule,
      PositionResponsabilitiesModule,
      PositionRolesModule,
      PositionCompetenciesModule,
      SharedModule.forRoot(),
      TranslateModule.forRoot({
         provide: TranslateLoader,
         useFactory: (http: Http) => new TranslateStaticLoader(http, '/assets/i18n', '.json'),
         deps: [Http]
      }),
      ConstanteModule,
      ListaModule,
      CentroCostosModule,
      GruposGestionModule,
      RolesModule,
      UsuariosModule,
      TipoDeAreaModule,
      DivisionPoliticaModule,
      OcupacionesModule,
      ActividadEconomicaModule,
      FaultsAndSanctionsModule,
      PositionsModule,
      ProductivityModule,
      RiskModule,
      PersonalityModule,
      AbsenceModule,
      CompanyAssetsModule
   ],

   declarations: [AppComponent],
   providers: [
      WindowRefService,
      {
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
   ],

   bootstrap: [AppComponent]

})
export class AppModule {
}
