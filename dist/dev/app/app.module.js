"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var common_1 = require('@angular/common');
var http_1 = require('@angular/http');
var app_component_1 = require('./app.component');
var app_routing_module_1 = require('./app-routing.module');
var about_module_1 = require('./about/about.module');
var home_module_1 = require('./home/home.module');
var employees_module_1 = require('./employees/employees.module');
var shared_module_1 = require('./shared/shared.module');
var family_information_module_1 = require('./employees-family-information/family-information.module');
var references_module_1 = require('./employees-references/references.module');
var academic_education_module_1 = require('./employees-academic-education/academic-education.module');
var work_experience_module_1 = require('./employees-work-experience/work-experience.module');
var index_1 = require('./_helpers/index');
var testing_1 = require('@angular/http/testing');
var http_2 = require('@angular/http');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, http_1.HttpModule, app_routing_module_1.AppRoutingModule, about_module_1.AboutModule, home_module_1.HomeModule,
                employees_module_1.EmployeesModule,
                family_information_module_1.FamilyInformationModule,
                references_module_1.ReferencesModule,
                academic_education_module_1.AcademicEducationModule,
                work_experience_module_1.WorkExperienceModule,
                shared_module_1.SharedModule.forRoot()],
            declarations: [app_component_1.AppComponent],
            providers: [{
                    provide: common_1.APP_BASE_HREF,
                    useValue: '/'
                },
                index_1.fakeBackendProvider,
                testing_1.MockBackend,
                http_2.BaseRequestOptions
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hcHAubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBeUIsZUFBZSxDQUFDLENBQUE7QUFDekMsaUNBQThCLDJCQUEyQixDQUFDLENBQUE7QUFDMUQsdUJBQThCLGlCQUFpQixDQUFDLENBQUE7QUFDaEQscUJBQTJCLGVBQWUsQ0FBQyxDQUFBO0FBQzNDLDhCQUE2QixpQkFBaUIsQ0FBQyxDQUFBO0FBQy9DLG1DQUFpQyxzQkFBc0IsQ0FBQyxDQUFBO0FBRXhELDZCQUE0QixzQkFBc0IsQ0FBQyxDQUFBO0FBQ25ELDRCQUEyQixvQkFBb0IsQ0FBQyxDQUFBO0FBQ2hELGlDQUFnQyw4QkFBOEIsQ0FBQyxDQUFBO0FBQy9ELDhCQUE2Qix3QkFBd0IsQ0FBQyxDQUFBO0FBQ3RELDBDQUF3QywwREFBMEQsQ0FBQyxDQUFBO0FBQ25HLGtDQUFpQywwQ0FBMEMsQ0FBQyxDQUFBO0FBQzVFLDBDQUF3QywwREFBMEQsQ0FBQyxDQUFBO0FBQ25HLHVDQUFxQyxvREFBb0QsQ0FBQyxDQUFBO0FBRzFGLHNCQUFvQyxrQkFBa0IsQ0FBQyxDQUFBO0FBQ3ZELHdCQUE0Qyx1QkFBdUIsQ0FBQyxDQUFBO0FBQ3BFLHFCQUFtQyxlQUFlLENBQUMsQ0FBQTtBQXdCbkQ7SUFBQTtJQUF5QixDQUFDO0lBckIxQjtRQUFDLGVBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRSxDQUFDLGdDQUFhLEVBQUUsaUJBQVUsRUFBRSxxQ0FBZ0IsRUFBRSwwQkFBVyxFQUFFLHdCQUFVO2dCQUM1RSxrQ0FBZTtnQkFDZixtREFBdUI7Z0JBQ3ZCLG9DQUFnQjtnQkFDaEIsbURBQXVCO2dCQUN2Qiw2Q0FBb0I7Z0JBQ3BCLDRCQUFZLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDekIsWUFBWSxFQUFFLENBQUMsNEJBQVksQ0FBQztZQUM1QixTQUFTLEVBQUUsQ0FBQztvQkFDVixPQUFPLEVBQUUsc0JBQWE7b0JBQ3RCLFFBQVEsRUFBRSxpQkFBaUI7aUJBQzFCO2dCQUVELDJCQUFtQjtnQkFDbkIscUJBQVc7Z0JBQ1gseUJBQWtCO2FBQ25CO1lBQ0QsU0FBUyxFQUFFLENBQUMsNEJBQVksQ0FBQztTQUUxQixDQUFDOztpQkFBQTtJQUN1QixnQkFBQztBQUFELENBQXpCLEFBQTBCLElBQUE7QUFBYixpQkFBUyxZQUFJLENBQUEiLCJmaWxlIjoiYXBwL2FwcC5tb2R1bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQnJvd3Nlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgQVBQX0JBU0VfSFJFRiB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBIdHRwTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5pbXBvcnQgeyBBcHBDb21wb25lbnQgfSBmcm9tICcuL2FwcC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQXBwUm91dGluZ01vZHVsZSB9IGZyb20gJy4vYXBwLXJvdXRpbmcubW9kdWxlJztcblxuaW1wb3J0IHsgQWJvdXRNb2R1bGUgfSBmcm9tICcuL2Fib3V0L2Fib3V0Lm1vZHVsZSc7XG5pbXBvcnQgeyBIb21lTW9kdWxlIH0gZnJvbSAnLi9ob21lL2hvbWUubW9kdWxlJztcbmltcG9ydCB7IEVtcGxveWVlc01vZHVsZSB9IGZyb20gJy4vZW1wbG95ZWVzL2VtcGxveWVlcy5tb2R1bGUnO1xuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSAnLi9zaGFyZWQvc2hhcmVkLm1vZHVsZSc7XG5pbXBvcnQgeyBGYW1pbHlJbmZvcm1hdGlvbk1vZHVsZSB9IGZyb20gJy4vZW1wbG95ZWVzLWZhbWlseS1pbmZvcm1hdGlvbi9mYW1pbHktaW5mb3JtYXRpb24ubW9kdWxlJztcbmltcG9ydCB7IFJlZmVyZW5jZXNNb2R1bGUgfSBmcm9tICcuL2VtcGxveWVlcy1yZWZlcmVuY2VzL3JlZmVyZW5jZXMubW9kdWxlJztcbmltcG9ydCB7IEFjYWRlbWljRWR1Y2F0aW9uTW9kdWxlIH0gZnJvbSAnLi9lbXBsb3llZXMtYWNhZGVtaWMtZWR1Y2F0aW9uL2FjYWRlbWljLWVkdWNhdGlvbi5tb2R1bGUnO1xuaW1wb3J0IHsgV29ya0V4cGVyaWVuY2VNb2R1bGUgfSBmcm9tICcuL2VtcGxveWVlcy13b3JrLWV4cGVyaWVuY2Uvd29yay1leHBlcmllbmNlLm1vZHVsZSc7XG5cbi8vIHVzZWQgdG8gY3JlYXRlIGZha2UgYmFja2VuZFxuaW1wb3J0IHsgZmFrZUJhY2tlbmRQcm92aWRlciB9IGZyb20gJy4vX2hlbHBlcnMvaW5kZXgnO1xuaW1wb3J0IHsgTW9ja0JhY2tlbmQsIE1vY2tDb25uZWN0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cC90ZXN0aW5nJztcbmltcG9ydCB7IEJhc2VSZXF1ZXN0T3B0aW9ucyB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuXG4vL0NhcnNNb2R1bGUsXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQnJvd3Nlck1vZHVsZSwgSHR0cE1vZHVsZSwgQXBwUm91dGluZ01vZHVsZSwgQWJvdXRNb2R1bGUsIEhvbWVNb2R1bGUsXG4gICAgRW1wbG95ZWVzTW9kdWxlLFxuICAgIEZhbWlseUluZm9ybWF0aW9uTW9kdWxlLFxuICAgIFJlZmVyZW5jZXNNb2R1bGUsXG4gICAgQWNhZGVtaWNFZHVjYXRpb25Nb2R1bGUsXG4gICAgV29ya0V4cGVyaWVuY2VNb2R1bGUsXG4gICAgU2hhcmVkTW9kdWxlLmZvclJvb3QoKV0sXG4gIGRlY2xhcmF0aW9uczogW0FwcENvbXBvbmVudF0sXG4gIHByb3ZpZGVyczogW3tcbiAgICBwcm92aWRlOiBBUFBfQkFTRV9IUkVGLFxuICAgIHVzZVZhbHVlOiAnPCU9IEFQUF9CQVNFICU+J1xuICAgIH0sXG4gICAgLy8gcHJvdmlkZXJzIHVzZWQgdG8gY3JlYXRlIGZha2UgYmFja2VuZFxuICAgIGZha2VCYWNrZW5kUHJvdmlkZXIsXG4gICAgTW9ja0JhY2tlbmQsXG4gICAgQmFzZVJlcXVlc3RPcHRpb25zXG4gIF0sXG4gIGJvb3RzdHJhcDogW0FwcENvbXBvbmVudF1cblxufSlcbmV4cG9ydCBjbGFzcyBBcHBNb2R1bGUgeyB9XG4iXX0=
