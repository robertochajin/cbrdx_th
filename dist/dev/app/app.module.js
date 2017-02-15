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
var colaboradores_module_1 = require('./colaboradores/colaboradores.module');
var shared_module_1 = require('./shared/shared.module');
var family_information_module_1 = require('./employees-family-information/family-information.module');
var references_module_1 = require('./employees-references/references.module');
var index_1 = require('./_helpers/index');
var testing_1 = require('@angular/http/testing');
var http_2 = require('@angular/http');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, http_1.HttpModule, app_routing_module_1.AppRoutingModule, about_module_1.AboutModule, home_module_1.HomeModule, colaboradores_module_1.ColaboradoresModule, family_information_module_1.FamilyInformationModule, references_module_1.ReferencesModule, shared_module_1.SharedModule.forRoot()],
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hcHAubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBeUIsZUFBZSxDQUFDLENBQUE7QUFDekMsaUNBQThCLDJCQUEyQixDQUFDLENBQUE7QUFDMUQsdUJBQThCLGlCQUFpQixDQUFDLENBQUE7QUFDaEQscUJBQTJCLGVBQWUsQ0FBQyxDQUFBO0FBQzNDLDhCQUE2QixpQkFBaUIsQ0FBQyxDQUFBO0FBQy9DLG1DQUFpQyxzQkFBc0IsQ0FBQyxDQUFBO0FBRXhELDZCQUE0QixzQkFBc0IsQ0FBQyxDQUFBO0FBQ25ELDRCQUEyQixvQkFBb0IsQ0FBQyxDQUFBO0FBQ2hELHFDQUFvQyxzQ0FBc0MsQ0FBQyxDQUFBO0FBQzNFLDhCQUE2Qix3QkFBd0IsQ0FBQyxDQUFBO0FBQ3RELDBDQUF3QywwREFBMEQsQ0FBQyxDQUFBO0FBQ25HLGtDQUFpQywwQ0FBMEMsQ0FBQyxDQUFBO0FBRzVFLHNCQUFvQyxrQkFBa0IsQ0FBQyxDQUFBO0FBQ3ZELHdCQUE0Qyx1QkFBdUIsQ0FBQyxDQUFBO0FBQ3BFLHFCQUFtQyxlQUFlLENBQUMsQ0FBQTtBQWtCbkQ7SUFBQTtJQUF5QixDQUFDO0lBZjFCO1FBQUMsZUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFLENBQUMsZ0NBQWEsRUFBRSxpQkFBVSxFQUFFLHFDQUFnQixFQUFFLDBCQUFXLEVBQUUsd0JBQVUsRUFBRSwwQ0FBbUIsRUFBQyxtREFBdUIsRUFBQyxvQ0FBZ0IsRUFBRSw0QkFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3JLLFlBQVksRUFBRSxDQUFDLDRCQUFZLENBQUM7WUFDNUIsU0FBUyxFQUFFLENBQUM7b0JBQ1YsT0FBTyxFQUFFLHNCQUFhO29CQUN0QixRQUFRLEVBQUUsaUJBQWlCO2lCQUMxQjtnQkFFRCwyQkFBbUI7Z0JBQ25CLHFCQUFXO2dCQUNYLHlCQUFrQjthQUNuQjtZQUNELFNBQVMsRUFBRSxDQUFDLDRCQUFZLENBQUM7U0FFMUIsQ0FBQzs7aUJBQUE7SUFDdUIsZ0JBQUM7QUFBRCxDQUF6QixBQUEwQixJQUFBO0FBQWIsaUJBQVMsWUFBSSxDQUFBIiwiZmlsZSI6ImFwcC9hcHAubW9kdWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJyb3dzZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IEFQUF9CQVNFX0hSRUYgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSHR0cE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSAnLi9hcHAuY29tcG9uZW50JztcbmltcG9ydCB7IEFwcFJvdXRpbmdNb2R1bGUgfSBmcm9tICcuL2FwcC1yb3V0aW5nLm1vZHVsZSc7XG5cbmltcG9ydCB7IEFib3V0TW9kdWxlIH0gZnJvbSAnLi9hYm91dC9hYm91dC5tb2R1bGUnO1xuaW1wb3J0IHsgSG9tZU1vZHVsZSB9IGZyb20gJy4vaG9tZS9ob21lLm1vZHVsZSc7XG5pbXBvcnQgeyBDb2xhYm9yYWRvcmVzTW9kdWxlIH0gZnJvbSAnLi9jb2xhYm9yYWRvcmVzL2NvbGFib3JhZG9yZXMubW9kdWxlJztcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gJy4vc2hhcmVkL3NoYXJlZC5tb2R1bGUnO1xuaW1wb3J0IHsgRmFtaWx5SW5mb3JtYXRpb25Nb2R1bGUgfSBmcm9tICcuL2VtcGxveWVlcy1mYW1pbHktaW5mb3JtYXRpb24vZmFtaWx5LWluZm9ybWF0aW9uLm1vZHVsZSc7XG5pbXBvcnQgeyBSZWZlcmVuY2VzTW9kdWxlIH0gZnJvbSAnLi9lbXBsb3llZXMtcmVmZXJlbmNlcy9yZWZlcmVuY2VzLm1vZHVsZSc7XG5cbi8vIHVzZWQgdG8gY3JlYXRlIGZha2UgYmFja2VuZFxuaW1wb3J0IHsgZmFrZUJhY2tlbmRQcm92aWRlciB9IGZyb20gJy4vX2hlbHBlcnMvaW5kZXgnO1xuaW1wb3J0IHsgTW9ja0JhY2tlbmQsIE1vY2tDb25uZWN0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cC90ZXN0aW5nJztcbmltcG9ydCB7IEJhc2VSZXF1ZXN0T3B0aW9ucyB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuXG4vL0NhcnNNb2R1bGUsXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQnJvd3Nlck1vZHVsZSwgSHR0cE1vZHVsZSwgQXBwUm91dGluZ01vZHVsZSwgQWJvdXRNb2R1bGUsIEhvbWVNb2R1bGUsIENvbGFib3JhZG9yZXNNb2R1bGUsRmFtaWx5SW5mb3JtYXRpb25Nb2R1bGUsUmVmZXJlbmNlc01vZHVsZSwgU2hhcmVkTW9kdWxlLmZvclJvb3QoKV0sXG4gIGRlY2xhcmF0aW9uczogW0FwcENvbXBvbmVudF0sXG4gIHByb3ZpZGVyczogW3tcbiAgICBwcm92aWRlOiBBUFBfQkFTRV9IUkVGLFxuICAgIHVzZVZhbHVlOiAnPCU9IEFQUF9CQVNFICU+J1xuICAgIH0sXG4gICAgLy8gcHJvdmlkZXJzIHVzZWQgdG8gY3JlYXRlIGZha2UgYmFja2VuZFxuICAgIGZha2VCYWNrZW5kUHJvdmlkZXIsXG4gICAgTW9ja0JhY2tlbmQsXG4gICAgQmFzZVJlcXVlc3RPcHRpb25zXG4gIF0sXG4gIGJvb3RzdHJhcDogW0FwcENvbXBvbmVudF1cblxufSlcbmV4cG9ydCBjbGFzcyBBcHBNb2R1bGUgeyB9XG4iXX0=
