import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { SharedModule } from '../shared/shared.module';
import { FormSharedModule } from '../shared/form-shared.module';
import { AssignmentProfessionalService } from '../_services/assignmentprofessional.service';
import { AssignmentProfessionalComponent } from '../assignment-professional/assignment-professional-component';

@NgModule( {
              imports: [ CommonModule, FormsModule, SharedModule,FormSharedModule ],
              declarations: [ AssignmentProfessionalComponent ],
              bootstrap: [ AssignmentProfessionalComponent ],
              providers: [ AssignmentProfessionalService ],
              exports: [ AssignmentProfessionalComponent ]
           } )
export class AssignmentProfessionalModule {

}
