/**
 * Created by TracesMaker on 06/02/2017.
 */
import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import 'rxjs/add/operator/toPromise';

import { ColaboradoresComponent }  from './colaboradores.component';
import { ColaboradorDetailComponent }  from './colaborador-detail.component';
import { ColaboradorAddComponent }  from './colaborador-add.component';
import { ColaboradorUpdateComponent }  from './colaborador-update.component';
import { ColaboradoresService } from './colaboradoresservice';
import { InputTextModule,DataTableModule,ButtonModule,DialogModule } from 'primeng/primeng';

import {FamilyInformationModule} from './../employees-family-information/family-information.module';

@NgModule({
    imports:      [CommonModule,InputTextModule,FormsModule,DataTableModule,ButtonModule,DialogModule,FamilyInformationModule],
    declarations: [ColaboradoresComponent, ColaboradorDetailComponent, ColaboradorAddComponent, ColaboradorUpdateComponent],
    bootstrap:    [ColaboradoresComponent],
    providers:    [ColaboradoresService],
    exports: 	  [ColaboradoresComponent]
})
export class ColaboradoresModule { }
