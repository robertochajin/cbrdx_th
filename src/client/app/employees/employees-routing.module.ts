import {RouterModule} from '@angular/router';
import {AuthGuard} from '../_guards/auth.guard';

import {EmployeesDetailComponent} from './employees-detail.component';
import {EmployeesAddComponent} from './employees-add.component';
import {EmployeesUpdateComponent} from './employees-update.component';
import {EmployeesComponent} from './employees.component';
import {EmployeesViewDetailComponent} from './employees-view-detail.component';
import {EmployeesCurriculumVitaeComponent} from './employees-curriculum-vitae.component';

export const EmployeesRoutingModule = RouterModule.forChild([
   {path: 'employees', component: EmployeesComponent, canActivate: [AuthGuard]},
   {path: 'employees/add', component: EmployeesAddComponent, canActivate: [AuthGuard]},
   {path: 'employees/view/detail/:id', component: EmployeesViewDetailComponent, canActivate: [AuthGuard]}, // solo ver
   {path: 'employees/detail/:id', component: EmployeesDetailComponent, canActivate: [AuthGuard]}, // ver editar
   {path: 'employees/update/:id', component: EmployeesUpdateComponent, canActivate: [AuthGuard]}, // ver editar
   {path: 'employees/curriculum/:id', component: EmployeesCurriculumVitaeComponent, canActivate: [AuthGuard]}, // hoja de vida
]);
