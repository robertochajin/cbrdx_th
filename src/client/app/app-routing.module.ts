import { ModuleWithProviders  } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// historia de employees
// import { EmployeesDetailComponent } from './employees/employees-detail.component';
// import { EmployeesAddComponent } from './employees/employees-add.component';
// import { EmployeesUpdateComponent } from './employees/employees-update.component';
// import { EmployeesComponent } from './employees/employees.component';
import { EmployeesAdditionalDataComponent } from './employees/employees-additional-data.component';
import { EmployeesDetailPerfilComponent } from './selecttion-process-apply/employees-detail-perfil.component';

// historia employees estates
import { EmployeesEstateComponent } from './employees-estate/employee-estate.component';
import { EmployeesEstateAddComponent } from './employees-estate/employee-estate-add.component';
import { EmployeeEstateDetailComponent } from './employees-estate/employee-estate-detail.component';
import { EmployeesEstateUpdateComponent } from './employees-estate/employee-estate-update.component';
// historia employees estates
import { EmployeesVehicleComponent } from './employees-vehicle/employee-vehicles.component';
import { EmployeesVehicleAddComponent } from './employees-vehicle/employee-vehicles-add.component';
//  import { EmployeeEstateDetailComponent } from './employees-estate/employee-estate-detail.component';
import { EmployeesVehicleUpdateComponent } from './employees-vehicle/employee-vehicle-update.component';
// Información familiar de employees
import { FamilyInformationComponent } from './employees-family-information/family-information.component';
import { FamilyInformationAddComponent } from './employees-family-information/family-information-add.component';
import { FamilyInformationUpdateComponent } from './employees-family-information/family-information-update.component';
import { FamilyInformationDetailComponent } from './employees-family-information/family-information-detail.component';
// employees location
import { LocationComponent } from './employees-location/employee-location.component';
import { LocationUpdateComponent } from './employees-location/employee-location-update.component';
import { LocationAddComponent } from './employees-location/employee-location-add.component';
import { LocationDetailComponent } from './employees-location/employee-location-detail.component';
// Información de referencia de employees
import { ReferencesComponent } from './employees-references/references.component';
import { ReferencesDetailComponent } from './employees-references/references-detail.component';
import { ReferencesAddComponent } from './employees-references/references-add.component';
import { ReferencesUpdateComponent } from './employees-references/references-update.component';
// Información de formacion academica
import { FormalStudiesComponent } from './employees-academic-education/formal-studies.component';
import { FormalStudiesDetailComponent } from './employees-academic-education/formal-studies-detail.component';
import { FormalStudiesAddComponent } from './employees-academic-education/formal-studies-add.component';
import { FormalStudiesUpdateComponent } from './employees-academic-education/formal-studies-update.component';
import { NoFormalStudiesComponent } from './employees-academic-education/no-formal-studies.component';
import { NoFormalStudiesDetailComponent } from './employees-academic-education/no-formal-studies-detail.component';
import { NoFormalStudiesAddComponent } from './employees-academic-education/no-formal-studies-add.component';
import { NoFormalStudiesUpdateComponent } from './employees-academic-education/no-formal-studies-update.component';
//  Experiencia laboral
import { WorkExperienceComponent } from './employees-work-experience/work-experience.component';
import { WorkExperienceDetailComponent } from './employees-work-experience/work-experience-detail.component';
import { WorkExperienceAddComponent } from './employees-work-experience/work-experience-add.component';
import { WorkExperienceUpdateComponent } from './employees-work-experience/work-experience-update.component';
// Login
import { LoginComponent } from './seguridad/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CambioContrasenaComponent } from './seguridad/cambioContrasena.component';
import { AuthGuard } from './_guards/auth.guard';
//  Constantes
import { ConstanteComponent } from './constantes/constante.component';
import { ConstanteAddComponent } from './constantes/constante-add.component';
import { ConstanteEditComponent } from './constantes/constante-edit.component';
import { ConstanteDetailComponent } from './constantes/constante-detail.component';
//  Listas
import { ListaComponent } from './listas/lista.component';
import { ListaDetailComponent } from './listas/lista-detail.component';
import { ListaEditComponent } from './listas/lista-edit.component';
import { ConfigurationListComponent } from './configuration-list/configuration-list.component';
import { ConfigurationListAddComponent } from './configuration-list/configuration-list-add.component';
import { ConfigurationListUpdateComponent } from './configuration-list/configuration-list-update.component';
import { ConfigurationListDetailComponent } from './configuration-list/configuration-list-detail.component';
//  Centros de Costos
import { CentroCostosComponent } from './centroCostos/centroCostos.component';
import { CentroCostosAddComponent } from './centroCostos/centroCostos-add.component';
import { CentroCostosDetailComponent } from './centroCostos/centroCostos-detail.component';
import { CentroCostosEditComponent } from './centroCostos/centroCostos-edit.component';
//  Grupos de Gestion
import { GruposGestionComponent } from './gruposGestion/gruposGestion.component';
import { GruposGestionAddComponent } from './gruposGestion/gruposGestion-add.component';
import { GruposGestionDetailComponent } from './gruposGestion/gruposGestion-detail.component';
import { GruposGestionEditComponent } from './gruposGestion/gruposGestion-edit.component';
//  Roles
import { RolesComponent } from './roles/roles.component';
import { RolesAddComponent } from './roles/roles-add.component';
import { RolesUpdateComponent } from './roles/roles-update.component';
import { RolFuncionalitiesConfigComponent } from './roles/rol-functionalities-config.component';
//  Usuarios
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuariosAddComponent } from './usuarios/usuarios-add.component';
import { UsuarioDetailComponent } from './usuarios/usuarios-detail.component';
import { UsuariosEditComponent } from './usuarios/usuarios-edit.component';
//  Tipos De Area
import { TipoDeAreaComponent } from './areas/tipoDeArea.component';
import { TipoDeAreaEditComponent } from './areas/tipoDeArea-edit.component';
import { TipoDeAreaDetailComponent } from './areas/tipoDeArea-detail.component';
import { TipoDeAreaAddComponent } from './areas/tipoDeArea-add.component';
//  Arboles
import { DivisionPoliticaComponent } from './divisionPolitica/divisionPolitica.component';
import { OcupacionesComponent } from './ocupaciones/ocupaciones.component';
import { ActividadEconomicaComponent } from './actividadEconomica/actividadEconomica.component';
//  Cargos Productividad
import { ProductivityComponent } from './position-productivity/productivity.component';
// Cargos factores de riesgo
import { RiskComponent } from './position-risks/position-risks.component';
//  Faltas
import { FaultsAndSanctionsComponent } from './faultsAndSanctions/faults-and-sanctions.component';
import { FaultsAndSanctionsAddComponent } from './faultsAndSanctions/faults-and-sanctions-add.component';
import { FaultsAndSanctionsUpdateComponent } from './faultsAndSanctions/faults-and-sanctions-update.component';
//  Estrctura Organizacional
import { OrganizationalStructureComponent } from './organizationalStructure/organizationalStructure.component';
//  Cargos
import { PositionsComponent } from './positions/positions.component';
import { PositionsAddComponent } from './positions/positions-add.component';
import { PositionsUpdateComponent } from './positions/positions-update.component';
import { EvaluationCriteriasComponent } from './position-evaluation-criterias/evaluation-criterias.component';
import { PositionResponsabilitiesComponent } from './position-responsabilities/position-responsabilities.component';
import { PositionRolesComponent } from './position-roles/position-roles.component';
import { PositionCompetenciesComponent } from './position-competencies/position-competencies.component';
import { CompanyAssetsComponent } from './position-company-assets/company-assets.component';
//  proyecciòn laboral
import { JobProjectionComponent } from './job-projection/job-projection.component';
import { JobProjectionUpdateComponent } from './job-projection/job-projection-positions-update.component';
import { JobProjectionApprobeComponent } from './job-projection/job-projection-positions-approve.component';
import { JobProjectionAddComponent } from './job-projection/job-projection-positions-add.component';
import { JobProjectionDetailComponent } from './job-projection/job-projection-positions-detail.component';
//  estructura física
import { PhysicStructureComponent } from './physic-structure/physic-structure.component';
import { PhysicStructureAddComponent } from './physic-structure/physic-structure-add.component';
import { PhysicStructureDetailComponent } from './physic-structure/physic-structure-detail.component';
import { PhysicStructureUpdateComponent } from './physic-structure/physic-structure-update.component';
//  widgets
import { WidgetsAddComponent } from './widgets/widgets-add.component';
import { WidgetsUpdateComponent } from './widgets/widgets-update.component';
//  administrador de formularios
import { FormManagerComponent } from './form-manager/form-manager.component';
import { FormManagerAddComponent } from './form-manager/form-manager-add.component';
import { FormManagerUpdateComponent } from './form-manager/form-manager-update.component';
//  cargos posición en caso de ausencia
import { AbsenceComponent } from './position-absence/position-absence.component';
// riesgo
import { RisksComponent } from './risks/risks-component';
import { RisksAddComponent } from './risks/risks-add.component';
import { RisksUpdateComponent } from './risks/risks-update.component';
import { CompetenciesGroupsComponent } from './competencies-groups/competencies-groups.component';
import { OrganizationalStructurePositionsComponent } from './organizationalStructurePositions/organizational-structure-positions.component';
import { PositionAuthoritiesComponent } from './positions/position-authorities.component';
import { WidgetsComponent } from './widgets/widgets.component';
// Administracion
import { MenuManagerComponent } from './menuManager/menuManager.component';
import { UserSessionComponent } from './usuarios/userSession.component';
import { PersonnelRequirementComponent } from './personnel-requirement/personnel-requirement.component';
import { PersonnelRequirementDetailComponent } from './personnel-requirement/personnel-requirement-detail.component';
import { PersonnelRequirementHistoricalComponent } from './personnel-requirement/personnel-requirement-historical.component';
import { PersonnelRequirementEditComponent } from './personnel-requirement/personnel-requirement-edit.component';
// Vacantes
import { VacanciesComponent } from './vacancies/vacancies.component';
import { VacantesActionComponent } from './vacancies/vacancies-action-component';
// Preceso de selección
import { SelectionProcessComponent } from './selection-process/selection-process.component';
import { SelectionProcessAddComponent } from './selection-process/selection-process-add.component';
import { SelectionProcessVacanciesComponent } from './selection-process/selection-process-vacancies.component';
import { VacancyDetailComponent } from './selection-process/vacancy-detail.component';
import { StepListComponent } from './selection-process/step-list.component';
import { StepEditComponent } from './selection-process/step-edit.component';
import { StepDetailComponent } from './selection-process/step-detail.component';
//import { EmployeesViewDetailComponent } from './employees/employees-view-detail.component';
import { StepProcessComponent } from './selection-process/step-process.component';
import { CandidatesComponent } from './selection-process/candidates.component';
import { CandidateRevisionComponent } from './selection-process/candidate-revision.component';
import { CentralRiskComponent } from './selection-process-risks/central-risk.component';
import { VacancyApplyComponent } from './selecttion-process-apply/apply-detail.component';
import { ApplyQuestionnairesComponent } from './selecttion-process-apply/questionnaires.component';

// hoja de vida
// import { EmployeesCurriculumVitaeComponent } from './employees/employees-curriculum-vitae.component';
import { MedicalInstitutionsComponent } from './medical-institutions/medical-institutions.component';
import { MedicalInstitutionAddComponent } from './medical-institutions/medical-institutions-add.component';
import { MedicalInstitutionUpdateComponent } from './medical-institutions/medical-institutions-update.component';
import { MedicalInstitutionDetailComponent } from './medical-institutions/medical-institutions-detail.component';
import { PositionsDetailComponent } from './positions/positions-detail.component';
import { CandidateTestComponent } from './selection-process/candidate-test.component';
import { DocumentManagementComponent } from './document-management/document-management.component';
import { DocumentManagementAddComponent } from './document-management/document-management-edit.component';
import { DocumentManagementDetailComponent } from './document-management/document-management-detail.component';
import { CallReferenceComponent } from './selection-process/call-reference.component';

// Cuestionarios
import { QuestionnairesComponent } from './questionnaires/questionnaires.component';
import { QuestionnairesAddComponent } from './questionnaires/questionnaires-add.component';
import { QuestionnairesUpdateComponent } from './questionnaires/questionnaires-update.component';
import { SolutionsQuestionnairesComponent } from './questionnaires/solutions-questionnaire/solutions-questionnaires.component';
import { SolutionsQuestionnairesDetailComponent } from './questionnaires/solutions-questionnaire/solutions-questionnaires-detail.component';

import { MedicalExamComponent } from './selection-process/medical-exam.component';
import { MedicalExamInformedConsentComponent } from './employees-clinical-information/informed-consent.component';
import { AnswerExamsComponent } from './medical-institutions/answer-exams.component';
import { EmployeesAttachmentsComponent } from './employees-attatchments/employees-attachments.component';
import {PositionsDetailPdfComponent} from "./positions/positions-detail-pdf.component";
import { CandidateContractingComponent } from './selection-process/candidate-contracting.component';
import { EmployeeEventualitiesComponent } from './employees-eventualities/employees-eventualities.component';
import { EmployeeEventualitiesAddComponent } from './employees-eventualities/employee-eventualities-edit.component';
import { EventualitiesComponent } from './eventualities/eventualities.component';
import { EventualitiesEditComponent } from './eventualities/eventualities-edit.component';
import { EventualitiesDetailComponent } from './eventualities/eventualities-detail.component';

// Dotaciones
import { SuppliesComponent } from './supplies/supplies.component';
import { SuppliesAddComponent } from './supplies/supplies-add.component';
import { SuppliesUpdateComponent } from './supplies/supplies-update.component';

// Bandeja de Novedades
import { TrayEventualitiesComponent } from './tray-eventualities/tray-eventualities.component';
import { EmployeeEventualityTransactComponent } from './tray-eventualities/transact-eventualities.component';
import { SuppliesProjectionComponent } from './supplies/supplies-projection/supplies-projection.component';
import { SuppliesProjectionAddComponent } from './supplies/supplies-projection/supplies-projection-add.component';
import { AssignationListComponent } from './supplies/assign-supplies/assignation-list.component';
import { EmployeeAssignationComponent } from './supplies/assign-supplies/employee-assignation.component';
import { EmployeeAssignationDetailComponent } from './supplies/assign-supplies/employee-assignation-detail.component';
import { TracingSuppliesComponent } from './supplies/tracing-supplies/tracing-supplies.component';
import { ConsolidatedProjectionComponent } from './supplies/supplies-projection/consolidated-projection.component';
import { SuppliesConfirmationComponent } from './employees/supplies-employees/supplies-confirmation.component';

const routes: Routes = [

   // Login
   { path: '', redirectTo: '/login', pathMatch: 'full' },
   { path: 'login', component: LoginComponent },
   { path: 'login/:token', component: LoginComponent },
   { path: 'cambioContrasena', component: CambioContrasenaComponent },

   // historia de employees
   {
      path: 'employees',
      loadChildren: '/app/employees/employees.module#EmployeesModule'
   },

   // { path: 'employees', component: EmployeesComponent, canActivate: [ AuthGuard ] },
   // { path: 'employees/add', component: EmployeesAddComponent, canActivate: [ AuthGuard ] },
   // { path: 'employees/view/detail/:id', component: EmployeesViewDetailComponent, canActivate: [ AuthGuard ] }, // solo ver
   // { path: 'employees/detail/:id', component: EmployeesDetailComponent, canActivate: [ AuthGuard ] }, // ver editar
   // { path: 'employees/update/:id', component: EmployeesUpdateComponent, canActivate: [ AuthGuard ] }, // ver editar
   // { path: 'employees/curriculum/:id', component: EmployeesCurriculumVitaeComponent, canActivate: [ AuthGuard ] }, // hoja de vida

   // Información de referencia de employees
   { path: 'employees/detail/:tercero/references', component: ReferencesComponent, canActivate: [ AuthGuard ] },
   { path: 'employees/detail/:tercero/references/add', component: ReferencesAddComponent, canActivate: [ AuthGuard ] },
   { path: 'employees/detail/:tercero/references/update/:id', component: ReferencesUpdateComponent, canActivate: [ AuthGuard ] },
   { path: 'employees/detail/:tercero/references/detail/:id', component: ReferencesDetailComponent, canActivate: [ AuthGuard ] },

   // Información familiar de employees
   { path: 'employees/detail/:tercero/family-information', component: FamilyInformationComponent, canActivate: [ AuthGuard ] },
   { path: 'employees/detail/:tercero/family-information/add', component: FamilyInformationAddComponent, canActivate: [ AuthGuard ] },
   {
      path: 'employees/detail/:tercero/family-information/update/:id', component: FamilyInformationUpdateComponent,
      canActivate: [ AuthGuard ]
   },
   {
      path: 'employees/detail/:tercero/family-information/detail/:id', component: FamilyInformationDetailComponent,
      canActivate: [ AuthGuard ]
   },

   // employees-location
   { path: 'employees/detail/:tercero/location', component: LocationComponent, canActivate: [ AuthGuard ] },
   { path: 'employees/detail/:tercero/location/add', component: LocationAddComponent, canActivate: [ AuthGuard ] },
   { path: 'employees/detail/:tercero/location/update/:id', component: LocationUpdateComponent, canActivate: [ AuthGuard ] },
   { path: 'employees/detail/:tercero/location/detail/:id', component: LocationDetailComponent, canActivate: [ AuthGuard ] },

   // employees-Inmuebles
   { path: 'employees/detail/:tercero/estate', component: EmployeesEstateComponent, canActivate: [ AuthGuard ] },
   { path: 'employees/detail/:tercero/estate/add', component: EmployeesEstateAddComponent, canActivate: [ AuthGuard ] },
   { path: 'employees/detail/:tercero/estate/update/:id', component: EmployeesEstateUpdateComponent, canActivate: [ AuthGuard ] },
   { path: 'employees/detail/:tercero/estate/detail/:id', component: EmployeeEstateDetailComponent, canActivate: [ AuthGuard ] },

   // employees-Vehiculos
   { path: 'employees/detail/:tercero/vehicle', component: EmployeesVehicleComponent, canActivate: [ AuthGuard ] },
   { path: 'employees/detail/:tercero/vehicle/add', component: EmployeesVehicleAddComponent, canActivate: [ AuthGuard ] },
   { path: 'employees/detail/:tercero/vehicle/update/:id', component: EmployeesVehicleUpdateComponent, canActivate: [ AuthGuard ] },

   // Información de formacion academica
   { path: 'employees/detail/:tercero/formal-studies', component: FormalStudiesComponent, canActivate: [ AuthGuard ] },
   { path: 'employees/detail/:tercero/formal-studies/add', component: FormalStudiesAddComponent, canActivate: [ AuthGuard ] },
   { path: 'employees/detail/:tercero/formal-studies/detail/:id', component: FormalStudiesDetailComponent, canActivate: [ AuthGuard ] },
   { path: 'employees/detail/:tercero/formal-studies/update/:id', component: FormalStudiesUpdateComponent, canActivate: [ AuthGuard ] },

   { path: 'employees/detail/:tercero/no-formal-studies', component: NoFormalStudiesComponent, canActivate: [ AuthGuard ] },
   { path: 'employees/detail/:tercero/no-formal-studies/add', component: NoFormalStudiesAddComponent, canActivate: [ AuthGuard ] },
   {
      path: 'employees/detail/:tercero/no-formal-studies/detail/:id', component: NoFormalStudiesDetailComponent, canActivate: [ AuthGuard ]
   },
   {
      path: 'employees/detail/:tercero/no-formal-studies/update/:id', component: NoFormalStudiesUpdateComponent, canActivate: [ AuthGuard ]
   },

   // Adjuntos de tercero
   { path: 'employees/detail/:tercero/employees-attachments', component: EmployeesAttachmentsComponent, canActivate: [ AuthGuard ] },

   // Experiencia laboral

   { path: 'employees/detail/:tercero/work-experience', component: WorkExperienceComponent, canActivate: [ AuthGuard ] },
   { path: 'employees/detail/:tercero/work-experience/add', component: WorkExperienceAddComponent, canActivate: [ AuthGuard ] },
   { path: 'employees/detail/:tercero/work-experience/detail/:id', component: WorkExperienceDetailComponent, canActivate: [ AuthGuard ] },
   { path: 'employees/detail/:tercero/work-experience/update/:id', component: WorkExperienceUpdateComponent, canActivate: [ AuthGuard ] },

   //  employees additional data
   { path: 'employees-additional-data/:id', component: EmployeesAdditionalDataComponent, canActivate: [ AuthGuard ] },

   // Dashboard
   { path: 'dashboard', component: DashboardComponent, canActivate: [ AuthGuard ] },
   { path: 'widgets', component: WidgetsComponent, canActivate: [ AuthGuard ] },

   //  Constantes
   { path: 'constantes', component: ConstanteComponent, canActivate: [ AuthGuard ] },
   { path: 'constantes/add', component: ConstanteAddComponent, canActivate: [ AuthGuard ] },
   { path: 'constantes/edit/:id', component: ConstanteEditComponent, canActivate: [ AuthGuard ] },
   { path: 'constantes/detail/:id', component: ConstanteDetailComponent, canActivate: [ AuthGuard ] },

   //  Listas
   { path: 'listas', component: ListaComponent, canActivate: [ AuthGuard ] },
   { path: 'listas/detail/:id', component: ListaDetailComponent, canActivate: [ AuthGuard ] },
   { path: 'listas/edit/:id', component: ListaEditComponent, canActivate: [ AuthGuard ] },
   // Configuracion de listas producto
   { path: 'configuration-list', component: ConfigurationListComponent, canActivate: [ AuthGuard ] },
   { path: 'configuration-list/add', component: ConfigurationListAddComponent, canActivate: [ AuthGuard ] },
   { path: 'configuration-list/update/:id', component: ConfigurationListUpdateComponent, canActivate: [ AuthGuard ] },
   { path: 'configuration-list/detail/:id', component: ConfigurationListDetailComponent, canActivate: [ AuthGuard ] },

   //  Centros de Costos
   { path: 'centroCostos', component: CentroCostosComponent, canActivate: [ AuthGuard ] },
   { path: 'centroCostos/add', component: CentroCostosAddComponent, canActivate: [ AuthGuard ] },
   { path: 'centroCostos/detail/:id', component: CentroCostosDetailComponent, canActivate: [ AuthGuard ] },
   { path: 'centroCostos/edit/:id', component: CentroCostosEditComponent, canActivate: [ AuthGuard ] },

   //  Grupos de Gestion
   { path: 'gruposGestion', component: GruposGestionComponent, canActivate: [ AuthGuard ] },
   { path: 'gruposGestion/add', component: GruposGestionAddComponent, canActivate: [ AuthGuard ] },
   { path: 'gruposGestion/detail/:id', component: GruposGestionDetailComponent, canActivate: [ AuthGuard ] },
   { path: 'gruposGestion/edit/:id', component: GruposGestionEditComponent, canActivate: [ AuthGuard ] },

   //  Roles
   { path: 'roles', component: RolesComponent, canActivate: [ AuthGuard ] },
   { path: 'roles/add', component: RolesAddComponent, canActivate: [ AuthGuard ] },
   { path: 'roles/update/:id', component: RolesUpdateComponent, canActivate: [ AuthGuard ] },
   { path: 'roles/update/:id/:msj', component: RolesUpdateComponent, canActivate: [ AuthGuard ] },
   { path: 'roles/update/:role/funcionalities-config/:id', component: RolFuncionalitiesConfigComponent, canActivate: [ AuthGuard ] },
   //  Usuarios
   { path: 'usuarios', component: UsuariosComponent },
   { path: 'usuarios/add', component: UsuariosAddComponent },
   { path: 'usuarios/detail/:id', component: UsuarioDetailComponent },
   { path: 'usuarios/edit/:id', component: UsuariosEditComponent },
   { path: 'user-session', component: UserSessionComponent },

   //  Tipos De Area
   { path: 'tipoArea', component: TipoDeAreaComponent, canActivate: [ AuthGuard ] },
   { path: 'tipoArea/add', component: TipoDeAreaAddComponent, canActivate: [ AuthGuard ] },
   { path: 'tipoArea/detail/:id', component: TipoDeAreaDetailComponent, canActivate: [ AuthGuard ] },
   { path: 'tipoArea/edit/:id', component: TipoDeAreaEditComponent, canActivate: [ AuthGuard ] },

   //  Temporales
   { path: 'criterios', component: EvaluationCriteriasComponent, canActivate: [ AuthGuard ] },
   { path: 'activos', component: CompanyAssetsComponent, canActivate: [ AuthGuard ] },
   { path: 'responsabilidades', component: PositionResponsabilitiesComponent, canActivate: [ AuthGuard ] },
   { path: 'cargosroles', component: PositionRolesComponent, canActivate: [ AuthGuard ] },
   { path: 'competencias', component: PositionCompetenciesComponent, canActivate: [ AuthGuard ] },

   //  Arboles
   { path: 'divisionPolitica', component: DivisionPoliticaComponent, canActivate: [ AuthGuard ] },
   { path: 'ocupaciones', component: OcupacionesComponent, canActivate: [ AuthGuard ] },
   { path: 'actividadeconomica', component: ActividadEconomicaComponent, canActivate: [ AuthGuard ] },

   //  Faltas
   { path: 'faults', component: FaultsAndSanctionsComponent, canActivate: [ AuthGuard ] },
   { path: 'faults/add', component: FaultsAndSanctionsAddComponent, canActivate: [ AuthGuard ] },
   { path: 'faults/update/:id', component: FaultsAndSanctionsUpdateComponent, canActivate: [ AuthGuard ] },

   //  Temporales
   { path: 'competencies-groups', component: CompetenciesGroupsComponent, canActivate: [ AuthGuard ] },

   //  Temporales
   { path: 'organizational-structure-positions', component: OrganizationalStructurePositionsComponent, canActivate: [ AuthGuard ] },

   //  Cargos
   { path: 'positions', component: PositionsComponent, canActivate: [ AuthGuard ] },
   { path: 'positions/add', component: PositionsAddComponent, canActivate: [ AuthGuard ] },
   { path: 'positions/add/:id', component: PositionsAddComponent, canActivate: [ AuthGuard ] },
   { path: 'positions/update/:id', component: PositionsUpdateComponent, canActivate: [ AuthGuard ] },
   { path: 'positions/detail/:id', component: PositionsDetailComponent },
   { path: 'positions/detail-pdf/:id', component: PositionsDetailPdfComponent },

   //  Estrctura Organizacional
   { path: 'organizational-structure', component: OrganizationalStructureComponent, canActivate: [ AuthGuard ] },

   //   Cargos Productividad
   { path: 'productivity/:idCargo', component: ProductivityComponent, canActivate: [ AuthGuard ] },
   // riesgos

   { path: 'risks', component: RisksComponent, canActivate: [ AuthGuard ] },
   { path: 'risks/add', component: RisksAddComponent, canActivate: [ AuthGuard ] },
   { path: 'risks/update/:idRiesgo', component: RisksUpdateComponent, canActivate: [ AuthGuard ] },

   // proyecciòn laboral
   { path: 'job-projection', component: JobProjectionComponent, canActivate: [ AuthGuard ] },
   { path: 'job-projection/update/:id', component: JobProjectionUpdateComponent, canActivate: [ AuthGuard ] },
   { path: 'job-projection/approbe/:id', component: JobProjectionApprobeComponent, canActivate: [ AuthGuard ] },
   { path: 'job-projection/add/:id', component: JobProjectionAddComponent, canActivate: [ AuthGuard ] },
   { path: 'job-projection/detail/:id', component: JobProjectionDetailComponent, canActivate: [ AuthGuard ] },

   //  estructura física
   { path: 'physic-structure', component: PhysicStructureComponent, canActivate: [ AuthGuard ] },
   { path: 'physic-structure/add', component: PhysicStructureAddComponent, canActivate: [ AuthGuard ] },
   { path: 'physic-structure/detail/:id', component: PhysicStructureDetailComponent, canActivate: [ AuthGuard ] },
   { path: 'physic-structure/update/:id', component: PhysicStructureUpdateComponent, canActivate: [ AuthGuard ] },

   //  widgets
   { path: 'widgets/add', component: WidgetsAddComponent, canActivate: [ AuthGuard ] },
   { path: 'widgets/update/:id', component: WidgetsUpdateComponent, canActivate: [ AuthGuard ] },
   //  adminstrador de formularios
   { path: 'form-manager', component: FormManagerComponent, canActivate: [ AuthGuard ] },
   { path: 'form-manager/add', component: FormManagerAddComponent, canActivate: [ AuthGuard ] },
   { path: 'form-manager/update/:id', component: FormManagerUpdateComponent, canActivate: [ AuthGuard ] },

   // Requerimiento de personal
   { path: 'personnel-requirement', component: PersonnelRequirementComponent, canActivate: [ AuthGuard ] },
   { path: 'personnel-requirement/add', component: PersonnelRequirementEditComponent, canActivate: [ AuthGuard ] },
   { path: 'personnel-requirement/update/:requeriment', component: PersonnelRequirementEditComponent, canActivate: [ AuthGuard ] },
   { path: 'personnel-requirement/detail/:id', component: PersonnelRequirementDetailComponent, canActivate: [ AuthGuard ] },
   { path: 'personnel-requirement/historical/:id', component: PersonnelRequirementHistoricalComponent, canActivate: [ AuthGuard ] },

   //  cargos
   //  cargos factores de riesgo
   { path: 'position-risk/:idCargo', component: RiskComponent, canActivate: [ AuthGuard ] },
   { path: 'position-absence/:idCargo', component: AbsenceComponent, canActivate: [ AuthGuard ] },
   { path: 'position-activities/:idCargo', component: PositionAuthoritiesComponent, canActivate: [ AuthGuard ] },
   { path: 'position/requirement/detail/:id', component: PersonnelRequirementDetailComponent, canActivate: [ AuthGuard ] },

   // Administracion
   { path: 'menus', component: MenuManagerComponent, canActivate: [ AuthGuard ] },
   // Intituciones medicas
   { path: 'medical-institutions', component: MedicalInstitutionsComponent, canActivate: [ AuthGuard ] },
   { path: 'medical-institutions/add', component: MedicalInstitutionAddComponent, canActivate: [ AuthGuard ] },
   { path: 'medical-institutions/update/:id', component: MedicalInstitutionUpdateComponent, canActivate: [ AuthGuard ] },
   { path: 'medical-institutions/detail/:id', component: MedicalInstitutionDetailComponent, canActivate: [ AuthGuard ] },

   // Vacantes
   { path: 'document-management', component: DocumentManagementComponent, canActivate: [ AuthGuard ] },
   { path: 'document-management/add', component: DocumentManagementAddComponent, canActivate: [ AuthGuard ] },
   { path: 'document-management/update/:idEmpDoc', component: DocumentManagementAddComponent, canActivate: [ AuthGuard ] },
   { path: 'document-management/detail/:idEmpDoc', component: DocumentManagementDetailComponent, canActivate: [ AuthGuard ] },

   // Vacantes
   { path: 'vacancies', component: VacanciesComponent, canActivate: [ AuthGuard ] },
   { path: 'vacancies/update/:id', component: VacantesActionComponent, canActivate: [ AuthGuard ] },
   { path: 'vacancies/approve/:id', component: VacantesActionComponent, canActivate: [ AuthGuard ] },
   { path: 'vacancies/detail/:id', component: PersonnelRequirementDetailComponent, canActivate: [ AuthGuard ] },

   // Colaborador novedades
   { path: 'employee-eventualities', component: EmployeeEventualitiesComponent },
   { path: 'employee-eventualities/add/:idTercero/:idTerceroNovedad', component: EmployeeEventualitiesAddComponent },

   // { path: 'vacancies/detail/:id', component: PersonnelRequirementDetailComponent, canActivate: [ AuthGuard ] },

   // Preceso de selección
   { path: 'selection-process', component: SelectionProcessComponent, canActivate: [ AuthGuard ] },
   { path: 'selection-process/add-publication/:idReq', component: SelectionProcessAddComponent, canActivate: [ AuthGuard ] },
   { path: 'selection-process/publications-detail/:idPublication', component: VacancyDetailComponent, canActivate: [ AuthGuard ] },
   { path: 'step-list', component: StepListComponent, canActivate: [ AuthGuard ] },
   { path: 'step-list/add-step', component: StepEditComponent, canActivate: [ AuthGuard ] },
   { path: 'step-list/update-step/:idStep', component: StepEditComponent, canActivate: [ AuthGuard ] },
   { path: 'step-list/detail-step/:idStep', component: StepDetailComponent, canActivate: [ AuthGuard ] },
   {
      path: 'selection-process/process-step/:idStep/publication/:idPublication/candidate/:idCandidate/process/:idProceso',
      component: StepProcessComponent, canActivate: [ AuthGuard ]
   },
   { path: 'selection-process/candidates-list/:idPublication', component: CandidatesComponent, canActivate: [ AuthGuard ] },
   {
      path: 'selection-process/process-step/:idStep/centralRisk/terceroPublication/:idTerceroPublication/process/:idProceso',
      component: CentralRiskComponent, canActivate: [ AuthGuard ]
   },
   {
      path: 'selection-process/process-step/candidate-revision/:idStep/terceroPublication/:idTerceroPublication/process/:idProceso',
      component: CandidateRevisionComponent, canActivate: [ AuthGuard ]
   },
   {
      path: 'selection-process/process-step/candidate-test/:idStep/terceroPublication/:idTerceroPublication/process/:idProceso',
      component: CandidateTestComponent, canActivate: [ AuthGuard ]
   },
   {
      path: 'selection-process/process-step/contracting/:idStep/terceroPublication/:idTerceroPublication/process/:idProceso',
      component: CandidateContractingComponent, canActivate: [ AuthGuard ]
   },
   {
      path: 'selection-process/process-step/call-reference/:idStep/terceroPublication/:idTerceroPublication/process/:idProceso',
      component: CallReferenceComponent
   },
   {
      path: 'selection-process/process-step/:idStep/terceroPublication/:idTerceroPublication/process/:idProceso',
      component: StepProcessComponent, canActivate: [ AuthGuard ]
   },
   {
      path: 'selection-process/process-step/medical-exam/:idStep/terceroPublication/:idTerceroPublication/process/:idProceso',
      component: MedicalExamComponent
   },

   // consentimiento informado
   { path: 'informed-consent/exam/:idExamen/terceroPublicacion/:idTerceroPublication', component: MedicalExamInformedConsentComponent },
   { path: 'answer-exams/exam/:idExamen/terceroPublicacion/:idTerceroPublication', component: AnswerExamsComponent },

   // Aplicar a vacantes
   { path: 'apply-vacancy/publications-detail/:idPublication', component: VacancyApplyComponent, canActivate: [ AuthGuard ] },
   {
      path: 'apply-vacancy/employee-profile/:idTercerosPublicaciones', component: EmployeesDetailPerfilComponent, canActivate: [ AuthGuard ]
   },
   { path: 'apply-vacancy/questionnaires/:idTercerosPublicaciones', component: ApplyQuestionnairesComponent, canActivate: [ AuthGuard ] },
   { path: 'apply-vacancy/active-publications', component: SelectionProcessVacanciesComponent, canActivate: [ AuthGuard ] },

   { path: 'eventualities', component: EventualitiesComponent },
   { path: 'eventualities/add', component: EventualitiesEditComponent },
   { path: 'eventualities/update/:idEventuality', component: EventualitiesEditComponent },
   { path: 'eventualities/detail/:idEventuality', component: EventualitiesDetailComponent },

   //  Cuestionarios
   { path: 'solutions/:id', component: SolutionsQuestionnairesComponent },
   { path: 'solutions/detail/:id', component: SolutionsQuestionnairesDetailComponent },
   { path: 'questionnaries', component: QuestionnairesComponent, canActivate: [ AuthGuard ] },
   { path: 'questionnaries/add', component: QuestionnairesAddComponent, canActivate: [ AuthGuard ] },
   { path: 'questionnaries/update/:id', component: QuestionnairesUpdateComponent, canActivate: [ AuthGuard ] },

   //  Dotaciones
   { path: 'supplies', component: SuppliesComponent },
   { path: 'supplies/add', component: SuppliesAddComponent },
   { path: 'supplies/update/:id', component: SuppliesUpdateComponent },
   { path: 'supplies-projection/assignations/:idProjection', component: AssignationListComponent },
   { path: 'supplies-projection/assignations/assign/:idEmployeeAssign', component: EmployeeAssignationComponent },
   { path: 'supplies-projection/assignations/detail/:idEmployeeAssign', component: EmployeeAssignationDetailComponent },

   //  Bandeja de novedades
   { path: 'tray-eventualities', component: TrayEventualitiesComponent },
   { path: 'trayEventualities/transact-eventyality/:idTerceroNovedad', component: EmployeeEventualityTransactComponent },

   // proyección de dotaciones
   { path: 'supplies-projection', component: SuppliesProjectionComponent },
   { path: 'supplies-projection/add', component: SuppliesProjectionAddComponent },
   { path: 'supplies-projection/update/:id', component: ConsolidatedProjectionComponent },

   // seguimiento de dotaciones
   { path: 'tracing-supplies', component: TracingSuppliesComponent },

   //  employees additional data
   { path: 'employees/supplies-confirmation/:id', component: SuppliesConfirmationComponent, canActivate: [ AuthGuard ] }

];
/*
@NgModule( {
              imports: [
                 RouterModule.forRoot( routes )
              ],
              exports: [ RouterModule ]
           } )
export class AppRoutingModule {
}
*/
export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(routes);
