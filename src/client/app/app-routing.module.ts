import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';

//historia de employees
import { EmployeesDetailComponent } from './employees/employees-detail.component';
import { EmployeesAddComponent } from './employees/employees-add.component';
import { EmployeesUpdateComponent } from './employees/employees-update.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeesAdditionalDataComponent } from './employees/employees-additional-data.component';

//historia employees estates
import { EmployeesEstateComponent } from './employees-estate/employee-estate.component';
import { EmployeesEstateAddComponent } from './employees-estate/employee-estate-add.component';
import { EmployeeEstateDetailComponent } from './employees-estate/employee-estate-detail.component';
import { EmployeesEstateUpdateComponent } from './employees-estate/employee-estate-update.component';

//historia employees estates
import { EmployeesVehicleComponent } from './employees-vehicle/employee-vehicles.component';
import { EmployeesVehicleAddComponent } from './employees-vehicle/employee-vehicles-add.component';
// import { EmployeeEstateDetailComponent } from './employees-estate/employee-estate-detail.component';
import { EmployeesVehicleUpdateComponent } from './employees-vehicle/employee-vehicle-update.component';
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

// Constantes
import {ConstanteComponent} from "./constantes/constante.component";
import {ConstanteAddComponent} from "./constantes/constante-add.component";
import {ConstanteEditComponent} from "./constantes/constante-edit.component";
import {ConstanteDetailComponent} from "./constantes/constante-detail.component";


// Listas
import {ListaComponent} from "./listas/lista.component";
import {ListaAddComponent} from "./listas/lista-add.component";
import {ListaDetailComponent} from "./listas/lista-detail.component";
import {ListaEditComponent} from "./listas/lista-edit.component";

// Centros de Costos
import {CentroCostosComponent} from "./centroCostos/centroCostos.component";
import {CentroCostosAddComponent} from "./centroCostos/centroCostos-add.component";
import {CentroCostosDetailComponent} from "./centroCostos/centroCostos-detail.component";
import {CentroCostosEditComponent} from "./centroCostos/centroCostos-edit.component";

// Grupos de Gestion
import {GruposGestionComponent} from "./gruposGestion/gruposGestion.component";
import {GruposGestionAddComponent} from "./gruposGestion/gruposGestion-add.component";
import {GruposGestionDetailComponent} from "./gruposGestion/gruposGestion-detail.component";
import {GruposGestionEditComponent} from "./gruposGestion/gruposGestion-edit.component";

// Roles
import {RolesComponent} from "./roles/roles.component";
import {RolesAddComponent} from "./roles/roles-add.component";

// Usuarios
import {UsuariosComponent} from "./usuarios/usuarios.component";
import {UsuariosAddComponent} from "./usuarios/usuarios-add.component";
import {UsuarioDetailComponent} from "./usuarios/usuarios-detail.component";
import {UsuariosEditComponent} from "./usuarios/usuarios-edit.component";

// Tipos De Area
import {TipoDeAreaComponent} from "./areas/tipoDeArea.component";
import {TipoDeAreaEditComponent} from "./areas/tipoDeArea-edit.component";
import {TipoDeAreaDetailComponent} from "./areas/tipoDeArea-detail.component";
import {TipoDeAreaAddComponent} from "./areas/tipoDeArea-add.component";

// Arboles
import {DivisionPoliticaComponent} from "./divisionPolitica/divisionPolitica.component";
import {OcupacionesComponent} from "./ocupaciones/ocupaciones.component";
import {ActividadEconomicaComponent} from "./actividadEconomica/actividadEconomica.component";

// Cargos Productividad
import {ProductivityComponent} from "./position-productivity/productivity.component";

//Cargos factores de riesgo
import {RiskComponent} from "./position-risks/position-risks.component";
// Faltas
import {FaultsAndSanctionsComponent} from "./faultsAndSanctions/faults-and-sanctions.component";
import {FaultsAndSanctionsAddComponent} from "./faultsAndSanctions/faults-and-sanctions-add.component";
import {FaultsAndSanctionsUpdateComponent} from "./faultsAndSanctions/faults-and-sanctions-update.component";

// Estrctura Organizacional
import {OrganizationalStructureComponent} from "./organizationalStructure/organizationalStructure.component";

// Cargos
import {PositionsComponent} from "./positions/positions.component";
import {PositionsAddComponent} from "./positions/positions-add.component";
import {PositionsUpdateComponent} from "./positions/positions-update.component";
import {EvaluationCriteriasComponent} from "./position-evaluation-criterias/evaluation-criterias.component";
import {PositionResponsabilitiesComponent} from "./position-responsabilities/position-responsabilities.component";
import {PositionRolesComponent} from "./position-roles/position-roles.component";
import {PositionCompetenciesComponent} from "./position-competencies/position-competencies.component";
import {CompanyAssetsComponent} from "./position-company-assets/company-assets.component";
// proyecciòn laboral
import {JobProjectionComponent} from "./job-projection/job-projection.component";
import {JobProjectionUpdateComponent} from "./job-projection/job-projection-positions-update.component";
import {JobProjectionApprobeComponent} from "./job-projection/job-projection-positions-approve.component";
import {JobProjectionAddComponent} from "./job-projection/job-projection-positions-add.component";
import {JobProjectionDetailComponent} from "./job-projection/job-projection-positions-detail.component";

// estructura física
import {PhysicStructureComponent} from "./physic-structure/physic-structure.component";
import {PhysicStructureAddComponent} from "./physic-structure/physic-structure-add.component";
import {PhysicStructureDetailComponent} from "./physic-structure/physic-structure-detail.component";
import {PhysicStructureUpdateComponent} from "./physic-structure/physic-structure-update.component";

// cargos posición en caso de ausencia
import {AbsenceComponent} from "./position-absence/position-absence.component";
import {PersonalityComponent} from "./position-personality/personality.component";
//riesgo
import {RisksComponent} from "./risks/risks-component";
import {RisksAddComponent} from "./risks/risks-add.component";
import {RisksUpdateComponent} from "./risks/risks-update.component";
import {CompetenciesGroupsComponent} from "./competencies-groups/competencies-groups.component";
import {OrganizationalStructurePositionsComponent} from "./organizationalStructurePositions/organizational-structure-positions.component";


import {PositionAuthoritiesComponent} from "./positions/position-authorities.component";
import {WidgetsComponent} from "./widgets/widgets.component";

const routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},

  //historia de employees
  {path: 'employees', component: EmployeesComponent, canActivate: [AuthGuard]},
  {path: 'employees/add', component: EmployeesAddComponent, canActivate: [AuthGuard]},
  {path: 'employees/detail/:id', component: EmployeesDetailComponent, canActivate: [AuthGuard]},
  {path: 'employees/update/:id', component: EmployeesUpdateComponent, canActivate: [AuthGuard]},

  //Información familiar de employees
  {path: 'employees-family-information', component: FamilyInformationComponent, canActivate: [AuthGuard]},
  {path: 'employees-family-information/add/:tercero', component: FamilyInformationAddComponent, canActivate: [AuthGuard]},
  {path: 'employees-family-information/update/:id/:tercero', component: FamilyInformationUpdateComponent, canActivate: [AuthGuard]},
  {path: 'employees-family-information/detail/:id', component: FamilyInformationDetailComponent, canActivate: [AuthGuard]},

  //Información de referencia de employees
  {path: 'employees-references', component: ReferencesComponent, canActivate: [AuthGuard]},
  {path: 'employees-references/add/:tercero', component: ReferencesAddComponent, canActivate: [AuthGuard]},
  {path: 'employees-references/update/:id/:tercero', component: ReferencesUpdateComponent, canActivate: [AuthGuard]},
  {path: 'employees-references/detail/:id', component: ReferencesDetailComponent, canActivate: [AuthGuard]},

  //Información de formacion academica
  {path: 'employees-formal-studies', component: FormalStudiesComponent, canActivate: [AuthGuard]},
  {path: 'employees-formal-studies/add/:tercero', component: FormalStudiesAddComponent, canActivate: [AuthGuard]},
  {path: 'employees-formal-studies/detail/:id', component: FormalStudiesDetailComponent, canActivate: [AuthGuard]},
  {path: 'employees-formal-studies/update/:id/:tercero', component: FormalStudiesUpdateComponent, canActivate: [AuthGuard]},
  {path: 'employees-no-formal-studies', component: NoFormalStudiesComponent, canActivate: [AuthGuard]},
  {path: 'employees-no-formal-studies/add/:tercero', component: NoFormalStudiesAddComponent, canActivate: [AuthGuard]},
  {path: 'employees-no-formal-studies/detail/:id', component: NoFormalStudiesDetailComponent, canActivate: [AuthGuard]},
  {path: 'employees-no-formal-studies/update/:id/:tercero', component: NoFormalStudiesUpdateComponent, canActivate: [AuthGuard]},

  //employees-location
  { path: 'employees-location', component: LocationComponent, canActivate: [AuthGuard]},
  { path: 'employees-location/add/:id', component: LocationAddComponent, canActivate: [AuthGuard]},
  { path: 'employees-location/update/:id/:tercero', component: LocationUpdateComponent, canActivate: [AuthGuard] },
  { path: 'employees-location/detail/:id', component: LocationDetailComponent, canActivate: [AuthGuard] },

    //Experiencia laboral
  {path: 'employees-work-experience', component: WorkExperienceComponent, canActivate: [AuthGuard]},
  {path: 'employees-work-experience/add/:tercero', component: WorkExperienceAddComponent, canActivate: [AuthGuard]},
  {path: 'employees-work-experience/detail/:id', component: WorkExperienceDetailComponent, canActivate: [AuthGuard]},
  {path: 'employees-work-experience/update/:id', component: WorkExperienceUpdateComponent, canActivate: [AuthGuard]},

  // employees additional data
  {path: 'employees-additional-data/:id', component: EmployeesAdditionalDataComponent, canActivate: [AuthGuard]},

  // employees estate
  {path: 'employees-estate', component: EmployeesEstateComponent, canActivate: [AuthGuard]},
  {path: 'employees-estate/add/:idTercero', component: EmployeesEstateAddComponent, canActivate: [AuthGuard]},
  {path: 'employees-estate/detail/:id', component: EmployeeEstateDetailComponent, canActivate: [AuthGuard]},
  {path: 'employees-estate/update/:id', component: EmployeesEstateUpdateComponent, canActivate: [AuthGuard]},

 // employees vehicle
  {path: 'employees-vehicle', component: EmployeesVehicleComponent, canActivate: [AuthGuard]},
  {path: 'employees-vehicle/add/:idTercero', component: EmployeesVehicleAddComponent, canActivate: [AuthGuard]},
  // {path: 'employees-estate/detail/:id', component: EmployeeEstateDetailComponent, canActivate: [AuthGuard]},
  {path: 'employees-vehicle/update/:id', component: EmployeesVehicleUpdateComponent, canActivate: [AuthGuard]},

  //Login
  {path: 'login', component: LoginComponent},
  {path: 'cambioContrasena', component: CambioContrasenaComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'widgets', component: WidgetsComponent, canActivate: [AuthGuard]},

  // Constantes
  {path: 'constantes', component: ConstanteComponent, canActivate: [AuthGuard]},
  {path: 'constantes/add', component: ConstanteAddComponent, canActivate: [AuthGuard]},
  {path: 'constantes/edit/:id', component: ConstanteEditComponent, canActivate: [AuthGuard]},
  {path: 'constantes/detail/:id', component: ConstanteDetailComponent, canActivate: [AuthGuard]},

  // Listas
  {path: 'listas', component: ListaComponent, canActivate: [AuthGuard]},
  {path: 'listas/add', component: ListaAddComponent, canActivate: [AuthGuard]},
  {path: 'listas/detail/:id', component: ListaDetailComponent, canActivate: [AuthGuard]},
  {path: 'listas/edit/:id', component: ListaEditComponent, canActivate: [AuthGuard]},

  // Centros de Costos
  {path: 'centroCostos', component: CentroCostosComponent, canActivate: [AuthGuard]},
  {path: 'centroCostos/add', component: CentroCostosAddComponent, canActivate: [AuthGuard]},
  {path: 'centroCostos/detail/:id', component: CentroCostosDetailComponent, canActivate: [AuthGuard]},
  {path: 'centroCostos/edit/:id', component: CentroCostosEditComponent, canActivate: [AuthGuard]},

  // Grupos de Gestion
  {path: 'gruposGestion', component: GruposGestionComponent, canActivate: [AuthGuard]},
  {path: 'gruposGestion/add', component: GruposGestionAddComponent, canActivate: [AuthGuard]},
  {path: 'gruposGestion/detail/:id', component: GruposGestionDetailComponent, canActivate: [AuthGuard]},
  {path: 'gruposGestion/edit/:id', component: GruposGestionEditComponent, canActivate: [AuthGuard]},

  // Roles
  {path: 'roles', component: RolesComponent, canActivate: [AuthGuard]},
  {path: 'roles/add', component: RolesAddComponent, canActivate: [AuthGuard]},

  // Usuarios
  {path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard]},
  {path: 'usuarios/add', component: UsuariosAddComponent, canActivate: [AuthGuard]},
  {path: 'usuarios/detail/:id', component: UsuarioDetailComponent, canActivate: [AuthGuard]},
  {path: 'usuarios/edit/:id', component: UsuariosEditComponent, canActivate: [AuthGuard]},

  // Tipos De Area
  {path: 'tipoArea', component: TipoDeAreaComponent, canActivate: [AuthGuard]},
  {path: 'tipoArea/add', component: TipoDeAreaAddComponent, canActivate: [AuthGuard]},
  {path: 'tipoArea/detail/:id', component: TipoDeAreaDetailComponent, canActivate: [AuthGuard]},
  {path: 'tipoArea/edit/:id', component: TipoDeAreaEditComponent, canActivate: [AuthGuard]},

  // Temporales
  {path: 'criterios', component: EvaluationCriteriasComponent, canActivate: [AuthGuard]},
  {path: 'activos', component: CompanyAssetsComponent, canActivate: [AuthGuard]},
  {path: 'responsabilidades', component: PositionResponsabilitiesComponent, canActivate: [AuthGuard]},
  {path: 'cargosroles', component: PositionRolesComponent, canActivate: [AuthGuard]},
  {path: 'competencias', component: PositionCompetenciesComponent, canActivate: [AuthGuard]},

  // Arboles
  {path: 'divisionPolitica', component: DivisionPoliticaComponent, canActivate: [AuthGuard]},
  {path: 'ocupaciones', component: OcupacionesComponent, canActivate: [AuthGuard]},
  {path: 'actividadeconomica', component: ActividadEconomicaComponent, canActivate: [AuthGuard]},

  // Faltas
  {path: 'faults', component: FaultsAndSanctionsComponent, canActivate: [AuthGuard]},
  {path: 'faults/add', component: FaultsAndSanctionsAddComponent, canActivate: [AuthGuard]},
  {path: 'faults/update/:id', component: FaultsAndSanctionsUpdateComponent, canActivate: [AuthGuard]},

   // Temporales
   {path: 'competencies-groups', component: CompetenciesGroupsComponent, canActivate: [AuthGuard]},

   // Temporales
   {path: 'organizational-structure-positions', component: OrganizationalStructurePositionsComponent, canActivate: [AuthGuard]},

  // Cargos
  {path: 'positions', component: PositionsComponent, canActivate: [AuthGuard]},
  {path: 'positions/add', component: PositionsAddComponent, canActivate: [AuthGuard]},
  {path: 'positions/update/:id', component: PositionsUpdateComponent, canActivate: [AuthGuard]},
   
   // Estrctura Organizacional
   {path: 'organizational-structure', component: OrganizationalStructureComponent, canActivate: [AuthGuard]},

  //  Cargos Productividad
  {path: 'productivity/:idCargo', component: ProductivityComponent, canActivate: [AuthGuard]},
   //riesgos

   {path: 'risks', component: RisksComponent, canActivate: [AuthGuard]},
   {path: 'risks/add', component: RisksAddComponent, canActivate: [AuthGuard]},
   {path: 'risks/update/:idRiesgo', component: RisksUpdateComponent, canActivate: [AuthGuard]},

   //proyecciòn laboral
   {path: 'job-projection', component: JobProjectionComponent, canActivate: [AuthGuard]},
   {path: 'job-projection/update/:id', component: JobProjectionUpdateComponent, canActivate: [AuthGuard]},
   {path: 'job-projection/approbe/:id', component: JobProjectionApprobeComponent, canActivate: [AuthGuard]},
   {path: 'job-projection/add/:id', component: JobProjectionAddComponent, canActivate: [AuthGuard]},
   {path: 'job-projection/detail/:id', component: JobProjectionDetailComponent, canActivate: [AuthGuard]},

   // estructura física
   {path: 'physic-structure', component: PhysicStructureComponent, canActivate: [AuthGuard]},
   {path: 'physic-structure/add', component: PhysicStructureAddComponent, canActivate: [AuthGuard]},
   {path: 'physic-structure/detail/:id', component: PhysicStructureDetailComponent, canActivate: [AuthGuard]},
   {path: 'physic-structure/update/:id', component: PhysicStructureUpdateComponent, canActivate: [AuthGuard]},


  // cargos factores de riesgo
  {path: 'position-risk/:idCargo', component: RiskComponent, canActivate: [AuthGuard]},
  //cargos posición en caso de ausencia
  {path: 'position-absence/:idCargo', component: AbsenceComponent, canActivate: [AuthGuard]},


  {path: 'position-activities/:idCargo', component: PositionAuthoritiesComponent, canActivate: [AuthGuard]},


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

