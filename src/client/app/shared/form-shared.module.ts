import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {TranslateService, TranslateModule} from 'ng2-translate';
import {
  InputTextModule,
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
  InputMaskModule
  
} from 'primeng/primeng';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
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
      InputMaskModule
  ],
  declarations: [
  ],
  exports: [
      CommonModule,
      FormsModule,
      RouterModule,
      TranslateModule,
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
      InputMaskModule
    
  ]
})
export class FormSharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FormSharedModule,
      providers: [TranslateService]
    };
  }
}
