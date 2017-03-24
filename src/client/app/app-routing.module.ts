import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';

//historia de employees
import { EmployeesDetailComponent } from './employees/employees-detail.component';
import { EmployeesAddComponent } from './employees/employees-add.component';
import { EmployeesUpdateComponent } from './employees/employees-update.component';
import { EmployeesComponent } from './employees/employees.component';

//Información familiar de employees
import { FamilyInformationComponent } from './employees-family-information/family-information.component';
import { FamilyInformationAddComponent } from './employees-family-information/family-information-add.component';
import { FamilyInformationUpdateComponent } from './employees-family-information/family-information-update.component';
import { FamilyInformationDetailComponent } from './employees-family-information/family-information-detail.component';

//employees location
import { LocationComponent } from './employees-location/employee-location.component';
import { LocationUpdateComponent } from './employees-location/employee-location-update.component';
import { LocationAddComponent } from './employees-location/employee-location-add.component';
import { LocationDetailComponent } from './employees-location/employee-location-detail.component';

//Información de referencia de employees
import { ReferencesComponent } from './employees-references/references.component';
import { ReferencesDetailComponent } from './employees-references/references-detail.component';
import { ReferencesAddComponent } from './employees-references/references-add.component';
import { ReferencesUpdateComponent } from './employees-references/references-update.component';

//Información de formacion academica
import { FormalStudiesComponent } from './employees-academic-education/formal-studies.component';
import { FormalStudiesDetailComponent } from './employees-academic-education/formal-studies-detail.component';
import { FormalStudiesAddComponent } from './employees-academic-education/formal-studies-add.component';
import { FormalStudiesUpdateComponent } from './employees-academic-education/formal-studies-update.component';

import { NoFormalStudiesComponent } from './employees-academic-education/no-formal-studies.component';
import { NoFormalStudiesDetailComponent } from './employees-academic-education/no-formal-studies-detail.component';
import { NoFormalStudiesAddComponent } from './employees-academic-education/no-formal-studies-add.component';
import { NoFormalStudiesUpdateComponent } from './employees-academic-education/no-formal-studies-update.component';

// Experiencia laboral
import { WorkExperienceComponent } from './employees-work-experience/work-experience.component';
import { WorkExperienceDetailComponent } from './employees-work-experience/work-experience-detail.component';
import { WorkExperienceAddComponent } from './employees-work-experience/work-experience-add.component';
import { WorkExperienceUpdateComponent } from './employees-work-experience/work-experience-update.component';

//Login
import {LoginComponent} from './seguridad/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CambioContrasenaComponent} from "./seguridad/cambioContrasena.component";
import {AuthGuard} from "./_guards/auth.guard";


const routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},

  //historia de employees
  {path: 'employees', component: EmployeesComponent},
  {path: 'employees/add', component: EmployeesAddComponent},
  {path: 'employees/detail/:id', component: EmployeesDetailComponent},
  {path: 'employees/update/:id', component: EmployeesUpdateComponent},

  //Información familiar de employees
  {path: 'employees-family-information', component: FamilyInformationComponent},
  {path: 'employees-family-information/add/:tercero', component: FamilyInformationAddComponent},
  {path: 'employees-family-information/update/:id/:tercero', component: FamilyInformationUpdateComponent},
  {path: 'employees-family-information/detail/:id', component: FamilyInformationDetailComponent},

  //Información de referencia de employees
  {path: 'employees-references', component: ReferencesComponent},
  {path: 'employees-references/add/:tercero', component: ReferencesAddComponent},
  {path: 'employees-references/detail/:id', component: ReferencesDetailComponent},
  {path: 'employees-references/update/:id/:tercero', component: ReferencesUpdateComponent},

  //Información de formacion academica
  {path: 'employees-formal-studies', component: FormalStudiesComponent},
  {path: 'employees-formal-studies/add/:tercero', component: FormalStudiesAddComponent},
  {path: 'employees-formal-studies/detail/:id', component: FormalStudiesDetailComponent},
  {path: 'employees-formal-studies/update/:id/:tercero', component: FormalStudiesUpdateComponent},
  {path: 'employees-no-formal-studies', component: NoFormalStudiesComponent},
  {path: 'employees-no-formal-studies/add/:tercero', component: NoFormalStudiesAddComponent},
  {path: 'employees-no-formal-studies/detail/:id', component: NoFormalStudiesDetailComponent},
  {path: 'employees-no-formal-studies/update/:id/:tercero', component: NoFormalStudiesUpdateComponent},

  //employees-location
  { path: 'employees-location', component: LocationComponent},
  { path: 'employees-location/add/:id', component: LocationAddComponent},
  { path: 'employees-location/update/:id/:tercero/:tl', component: LocationUpdateComponent },
  { path: 'employees-location/detail/:id', component: LocationDetailComponent },

    //Experiencia laboral
  {path: 'employees-work-experience', component: WorkExperienceComponent},
  {path: 'employees-work-experience/add/:tercero', component: WorkExperienceAddComponent},
  {path: 'employees-work-experience/detail/:id', component: WorkExperienceDetailComponent},
  {path: 'employees-work-experience/update/:id/:tercero', component: WorkExperienceUpdateComponent},

  //Login
  {path: 'login', component: LoginComponent},
  {path: 'cambioContrasena', component: CambioContrasenaComponent},
  {path: 'dashboard', component: DashboardComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

