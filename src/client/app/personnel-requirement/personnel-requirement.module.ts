import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormSharedModule } from '../shared/form-shared.module';
import { PersonnelRequirementComponent } from './personnel-requirement.component';
import { PersonnelRequirementAddComponent } from './personnel-requirement-add.component';
import { PersonnelRequirementServices } from '../_services/personnelRequirement.service';
import { PositionsService } from '../_services/positions.service';
import { UsuariosService } from '../_services/usuarios.service';
import { EmployeesService } from '../_services/employees.service';

@NgModule( {
              imports: [
                 SharedModule,
                 FormSharedModule,
              ],

              declarations: [ PersonnelRequirementComponent, PersonnelRequirementAddComponent
              ],
              bootstrap: [ PersonnelRequirementComponent ],
              providers: [ PersonnelRequirementServices,
                           UsuariosService,
                           EmployeesService,
                           PositionsService,
              ],
              exports: [ PersonnelRequirementComponent ]
           } )
export class PersonnelRequirementModule {
}
