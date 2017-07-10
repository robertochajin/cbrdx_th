import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormSharedModule } from '../shared/form-shared.module';
import { DocumentsDownloadComponent } from './download-documents.component';
import { NavService } from '../_services/_nav.service';
import { DocumentsDownloadService } from '../_services/documentsDownload.service';

@NgModule( {
              imports: [
                 SharedModule,
                 FormSharedModule,
              ],
              declarations: [
                 DocumentsDownloadComponent
              ],
              bootstrap: [ DocumentsDownloadComponent ],
              providers: [ NavService, DocumentsDownloadService ],
              exports: [ DocumentsDownloadComponent ]
           } )
export class DocumentsDownloadModule {

}
