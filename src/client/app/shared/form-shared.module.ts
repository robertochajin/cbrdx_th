import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
   InputTextModule, DataTableModule, ButtonModule, DialogModule, ConfirmDialogModule, TabViewModule, AccordionModule, MessagesModule,
   AutoCompleteModule, FileUploadModule, DropdownModule, CalendarModule, GrowlModule, TreeModule, FieldsetModule, CheckboxModule,
   ToggleButtonModule, InputMaskModule, InputTextareaModule, InputSwitchModule, PanelModule
} from 'primeng/primeng';


/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule( {
              imports: [
                 CommonModule,
                 RouterModule,
                 InputTextModule,
                 FormsModule,
                 DataTableModule,
                 ButtonModule,
                 DialogModule,
                 ConfirmDialogModule,
                 TabViewModule,
                 AccordionModule,
                 MessagesModule,
                 AutoCompleteModule,
                 FileUploadModule,
                 DropdownModule,
                 CalendarModule,
                 GrowlModule,
                 TreeModule,
                 FieldsetModule,
                 CheckboxModule,
                 ToggleButtonModule,
                 InputMaskModule,
                 InputTextareaModule,
                 InputSwitchModule,
                 PanelModule
              ],
              declarations: [],
              exports: [
                 CommonModule,
                 FormsModule,
                 RouterModule,
                 DataTableModule,
                 ButtonModule,
                 DialogModule,
                 ConfirmDialogModule,
                 TabViewModule,
                 AccordionModule,
                 MessagesModule,
                 AutoCompleteModule,
                 FileUploadModule,
                 DropdownModule,
                 CalendarModule,
                 GrowlModule,
                 TreeModule,
                 FieldsetModule,
                 CheckboxModule,
                 ToggleButtonModule,
                 InputMaskModule,
                 InputTextareaModule,
                 InputSwitchModule,
                 PanelModule

              ]
           } )
export class FormSharedModule {
   static forRoot(): ModuleWithProviders {
      return {
         ngModule: FormSharedModule,
         providers: []
      };
   }
}
