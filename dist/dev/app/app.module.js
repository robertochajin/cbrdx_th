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
var car_module_1 = require('./cars/car.module');
var colaboradores_module_1 = require('./colaboradores/colaboradores.module');
var shared_module_1 = require('./shared/shared.module');
var index_1 = require('./_helpers/index');
var testing_1 = require('@angular/http/testing');
var http_2 = require('@angular/http');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, http_1.HttpModule, app_routing_module_1.AppRoutingModule, about_module_1.AboutModule, home_module_1.HomeModule, colaboradores_module_1.ColaboradoresModule, car_module_1.CarModule, shared_module_1.SharedModule.forRoot()],
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hcHAubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBeUIsZUFBZSxDQUFDLENBQUE7QUFDekMsaUNBQThCLDJCQUEyQixDQUFDLENBQUE7QUFDMUQsdUJBQThCLGlCQUFpQixDQUFDLENBQUE7QUFDaEQscUJBQTJCLGVBQWUsQ0FBQyxDQUFBO0FBQzNDLDhCQUE2QixpQkFBaUIsQ0FBQyxDQUFBO0FBQy9DLG1DQUFpQyxzQkFBc0IsQ0FBQyxDQUFBO0FBRXhELDZCQUE0QixzQkFBc0IsQ0FBQyxDQUFBO0FBQ25ELDRCQUEyQixvQkFBb0IsQ0FBQyxDQUFBO0FBQ2hELDJCQUEwQixtQkFBbUIsQ0FBQyxDQUFBO0FBQzlDLHFDQUFvQyxzQ0FBc0MsQ0FBQyxDQUFBO0FBQzNFLDhCQUE2Qix3QkFBd0IsQ0FBQyxDQUFBO0FBR3RELHNCQUFvQyxrQkFBa0IsQ0FBQyxDQUFBO0FBQ3ZELHdCQUE0Qyx1QkFBdUIsQ0FBQyxDQUFBO0FBQ3BFLHFCQUFtQyxlQUFlLENBQUMsQ0FBQTtBQWtCbkQ7SUFBQTtJQUF5QixDQUFDO0lBZjFCO1FBQUMsZUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFLENBQUMsZ0NBQWEsRUFBRSxpQkFBVSxFQUFFLHFDQUFnQixFQUFFLDBCQUFXLEVBQUUsd0JBQVUsRUFBRSwwQ0FBbUIsRUFBRSxzQkFBUyxFQUFFLDRCQUFZLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDdkksWUFBWSxFQUFFLENBQUMsNEJBQVksQ0FBQztZQUM1QixTQUFTLEVBQUUsQ0FBQztvQkFDVixPQUFPLEVBQUUsc0JBQWE7b0JBQ3RCLFFBQVEsRUFBRSxpQkFBaUI7aUJBQzFCO2dCQUVELDJCQUFtQjtnQkFDbkIscUJBQVc7Z0JBQ1gseUJBQWtCO2FBQ25CO1lBQ0QsU0FBUyxFQUFFLENBQUMsNEJBQVksQ0FBQztTQUUxQixDQUFDOztpQkFBQTtJQUN1QixnQkFBQztBQUFELENBQXpCLEFBQTBCLElBQUE7QUFBYixpQkFBUyxZQUFJLENBQUEiLCJmaWxlIjoiYXBwL2FwcC5tb2R1bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBCcm93c2VyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XHJcbmltcG9ydCB7IEFQUF9CQVNFX0hSRUYgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBIdHRwTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XHJcbmltcG9ydCB7IEFwcENvbXBvbmVudCB9IGZyb20gJy4vYXBwLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEFwcFJvdXRpbmdNb2R1bGUgfSBmcm9tICcuL2FwcC1yb3V0aW5nLm1vZHVsZSc7XHJcblxyXG5pbXBvcnQgeyBBYm91dE1vZHVsZSB9IGZyb20gJy4vYWJvdXQvYWJvdXQubW9kdWxlJztcclxuaW1wb3J0IHsgSG9tZU1vZHVsZSB9IGZyb20gJy4vaG9tZS9ob21lLm1vZHVsZSc7XHJcbmltcG9ydCB7IENhck1vZHVsZSB9IGZyb20gJy4vY2Fycy9jYXIubW9kdWxlJztcclxuaW1wb3J0IHsgQ29sYWJvcmFkb3Jlc01vZHVsZSB9IGZyb20gJy4vY29sYWJvcmFkb3Jlcy9jb2xhYm9yYWRvcmVzLm1vZHVsZSc7XHJcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gJy4vc2hhcmVkL3NoYXJlZC5tb2R1bGUnO1xyXG5cclxuLy8gdXNlZCB0byBjcmVhdGUgZmFrZSBiYWNrZW5kXHJcbmltcG9ydCB7IGZha2VCYWNrZW5kUHJvdmlkZXIgfSBmcm9tICcuL19oZWxwZXJzL2luZGV4JztcclxuaW1wb3J0IHsgTW9ja0JhY2tlbmQsIE1vY2tDb25uZWN0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cC90ZXN0aW5nJztcclxuaW1wb3J0IHsgQmFzZVJlcXVlc3RPcHRpb25zIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XHJcblxyXG4vL0NhcnNNb2R1bGUsXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW0Jyb3dzZXJNb2R1bGUsIEh0dHBNb2R1bGUsIEFwcFJvdXRpbmdNb2R1bGUsIEFib3V0TW9kdWxlLCBIb21lTW9kdWxlLCBDb2xhYm9yYWRvcmVzTW9kdWxlLCBDYXJNb2R1bGUsIFNoYXJlZE1vZHVsZS5mb3JSb290KCldLFxyXG4gIGRlY2xhcmF0aW9uczogW0FwcENvbXBvbmVudF0sXHJcbiAgcHJvdmlkZXJzOiBbe1xyXG4gICAgcHJvdmlkZTogQVBQX0JBU0VfSFJFRixcclxuICAgIHVzZVZhbHVlOiAnPCU9IEFQUF9CQVNFICU+J1xyXG4gICAgfSxcclxuICAgIC8vIHByb3ZpZGVycyB1c2VkIHRvIGNyZWF0ZSBmYWtlIGJhY2tlbmRcclxuICAgIGZha2VCYWNrZW5kUHJvdmlkZXIsXHJcbiAgICBNb2NrQmFja2VuZCxcclxuICAgIEJhc2VSZXF1ZXN0T3B0aW9uc1xyXG4gIF0sXHJcbiAgYm9vdHN0cmFwOiBbQXBwQ29tcG9uZW50XVxyXG5cclxufSlcclxuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7IH1cclxuIl19
