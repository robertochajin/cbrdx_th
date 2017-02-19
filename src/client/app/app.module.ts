import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AboutModule } from './about/about.module';
import { HomeModule } from './home/home.module';
import { EmployeesModule } from './employees/employees.module';
import { SharedModule } from './shared/shared.module';
import { FamilyInformationModule } from './employees-family-information/family-information.module';
import { ReferencesModule } from './employees-references/references.module';
import { AcademicEducationModule } from './employees-academic-education/academic-education.module';
import { WorkExperienceModule } from './employees-work-experience/work-experience.module';

// used to create fake backend
import { fakeBackendProvider } from './_helpers/index';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

//CarsModule,
@NgModule({
  imports: [BrowserModule, HttpModule, AppRoutingModule, AboutModule, HomeModule,
    EmployeesModule,
    FamilyInformationModule,
    ReferencesModule,
    AcademicEducationModule,
    WorkExperienceModule,
    SharedModule.forRoot()],
  declarations: [AppComponent],
  providers: [{
    provide: APP_BASE_HREF,
    useValue: '<%= APP_BASE %>'
    },
    // providers used to create fake backend
    fakeBackendProvider,
    MockBackend,
    BaseRequestOptions
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
