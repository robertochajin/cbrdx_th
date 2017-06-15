import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormSharedModule } from '../shared/form-shared.module';
import { DinamicComponent } from './dinamic.component';
import { DinamicServices } from './dinamic.service';

@NgModule( {
              imports: [ CommonModule,
                 SharedModule,
                 FormSharedModule
              ],
              declarations: [ DinamicComponent ],
              bootstrap: [ DinamicComponent ],
              providers: [ DinamicServices ],
              exports: [ DinamicComponent ]
           } )

export class DinamicModule {

}
