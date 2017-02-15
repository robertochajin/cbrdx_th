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
var router_1 = require('@angular/router');
var colaborador_detail_component_1 = require('./colaboradores/colaborador-detail.component');
var colaborador_add_component_1 = require('./colaboradores/colaborador-add.component');
var colaborador_update_component_1 = require('./colaboradores/colaborador-update.component');
var colaboradores_component_1 = require('./colaboradores/colaboradores.component');
var family_information_component_1 = require('./employees-family-information/family-information.component');
var family_information_add_component_1 = require('./employees-family-information/family-information-add.component');
var family_information_update_component_1 = require('./employees-family-information/family-information-update.component');
var family_information_detail_component_1 = require('./employees-family-information/family-information-detail.component');
var references_component_1 = require('./employees-references/references.component');
var references_detail_component_1 = require('./employees-references/references-detail.component');
var references_add_component_1 = require('./employees-references/references-add.component');
var references_update_component_1 = require('./employees-references/references-update.component');
var routes = [
    { path: '', redirectTo: '/colaboradores', pathMatch: 'full' },
    { path: 'colaboradores', component: colaboradores_component_1.ColaboradoresComponent },
    { path: 'colaboradores/add', component: colaborador_add_component_1.ColaboradorAddComponent },
    { path: 'colaboradores/detail/:id', component: colaborador_detail_component_1.ColaboradorDetailComponent },
    { path: 'colaboradores/update/:id', component: colaborador_update_component_1.ColaboradorUpdateComponent },
    { path: 'employees-family-information', component: family_information_component_1.FamilyInformationComponent },
    { path: 'employees-family-information/add', component: family_information_add_component_1.FamilyInformationAddComponent },
    { path: 'employees-family-information/update/:id', component: family_information_update_component_1.FamilyInformationUpdateComponent },
    { path: 'employees-family-information/detail/:id', component: family_information_detail_component_1.FamilyInformationDetailComponent },
    { path: 'employees-references', component: references_component_1.ReferencesComponent },
    { path: 'employees-references/add', component: references_add_component_1.ReferencesAddComponent },
    { path: 'employees-references/detail/:id', component: references_detail_component_1.ReferencesDetailComponent },
    { path: 'employees-references/update/:id', component: references_update_component_1.ReferencesUpdateComponent },
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forRoot(routes)
            ],
            exports: [router_1.RouterModule]
        }), 
        __metadata('design:paramtypes', [])
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hcHAtcm91dGluZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUF5QixlQUFlLENBQUMsQ0FBQTtBQUN6Qyx1QkFBb0MsaUJBQWlCLENBQUMsQ0FBQTtBQUd0RCw2Q0FBMkMsOENBQThDLENBQUMsQ0FBQTtBQUMxRiwwQ0FBd0MsMkNBQTJDLENBQUMsQ0FBQTtBQUNwRiw2Q0FBMkMsOENBQThDLENBQUMsQ0FBQTtBQUMxRix3Q0FBdUMseUNBQXlDLENBQUMsQ0FBQTtBQUdqRiw2Q0FBMkMsNkRBQTZELENBQUMsQ0FBQTtBQUN6RyxpREFBOEMsaUVBQWlFLENBQUMsQ0FBQTtBQUNoSCxvREFBaUQsb0VBQW9FLENBQUMsQ0FBQTtBQUN0SCxvREFBaUQsb0VBQW9FLENBQUMsQ0FBQTtBQUd0SCxxQ0FBb0MsNkNBQTZDLENBQUMsQ0FBQTtBQUNsRiw0Q0FBMEMsb0RBQW9ELENBQUMsQ0FBQTtBQUMvRix5Q0FBdUMsaURBQWlELENBQUMsQ0FBQTtBQUN6Riw0Q0FBMEMsb0RBQW9ELENBQUMsQ0FBQTtBQUUvRixJQUFNLE1BQU0sR0FBVztJQUNyQixFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLGdCQUFnQixFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUU7SUFHN0QsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxnREFBc0IsRUFBRTtJQUM1RCxFQUFFLElBQUksRUFBRSxtQkFBbUIsRUFBRSxTQUFTLEVBQUUsbURBQXVCLEVBQUU7SUFDakUsRUFBRSxJQUFJLEVBQUUsMEJBQTBCLEVBQUUsU0FBUyxFQUFFLHlEQUEwQixFQUFFO0lBQzNFLEVBQUUsSUFBSSxFQUFFLDBCQUEwQixFQUFFLFNBQVMsRUFBRSx5REFBMEIsRUFBRTtJQUczRSxFQUFFLElBQUksRUFBRSw4QkFBOEIsRUFBRSxTQUFTLEVBQUUseURBQTBCLEVBQUU7SUFDL0UsRUFBRSxJQUFJLEVBQUUsa0NBQWtDLEVBQUUsU0FBUyxFQUFFLGdFQUE2QixFQUFFO0lBQ3RGLEVBQUUsSUFBSSxFQUFFLHlDQUF5QyxFQUFFLFNBQVMsRUFBRSxzRUFBZ0MsRUFBRTtJQUNoRyxFQUFFLElBQUksRUFBRSx5Q0FBeUMsRUFBRSxTQUFTLEVBQUUsc0VBQWdDLEVBQUU7SUFHaEcsRUFBRSxJQUFJLEVBQUUsc0JBQXNCLEVBQUUsU0FBUyxFQUFFLDBDQUFtQixFQUFFO0lBQ2hFLEVBQUUsSUFBSSxFQUFFLDBCQUEwQixFQUFFLFNBQVMsRUFBRSxpREFBc0IsRUFBRTtJQUN2RSxFQUFFLElBQUksRUFBRSxpQ0FBaUMsRUFBRSxTQUFTLEVBQUUsdURBQXlCLEVBQUU7SUFDakYsRUFBRSxJQUFJLEVBQUUsaUNBQWlDLEVBQUUsU0FBUyxFQUFFLHVEQUF5QixFQUFFO0NBQ2xGLENBQUM7QUFRRjtJQUFBO0lBQWdDLENBQUM7SUFOakM7UUFBQyxlQUFRLENBQUM7WUFDUixPQUFPLEVBQUU7Z0JBQ1AscUJBQVksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO2FBQzdCO1lBQ0QsT0FBTyxFQUFFLENBQUMscUJBQVksQ0FBQztTQUN4QixDQUFDOzt3QkFBQTtJQUM4Qix1QkFBQztBQUFELENBQWhDLEFBQWlDLElBQUE7QUFBcEIsd0JBQWdCLG1CQUFJLENBQUEiLCJmaWxlIjoiYXBwL2FwcC1yb3V0aW5nLm1vZHVsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUsUm91dGVzIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuLy9oaXN0b3JpYSBkZSBjb2xhYm9yYWRvcmVzXG5pbXBvcnQgeyBDb2xhYm9yYWRvckRldGFpbENvbXBvbmVudCB9IGZyb20gJy4vY29sYWJvcmFkb3Jlcy9jb2xhYm9yYWRvci1kZXRhaWwuY29tcG9uZW50JztcbmltcG9ydCB7IENvbGFib3JhZG9yQWRkQ29tcG9uZW50IH0gZnJvbSAnLi9jb2xhYm9yYWRvcmVzL2NvbGFib3JhZG9yLWFkZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29sYWJvcmFkb3JVcGRhdGVDb21wb25lbnQgfSBmcm9tICcuL2NvbGFib3JhZG9yZXMvY29sYWJvcmFkb3ItdXBkYXRlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb2xhYm9yYWRvcmVzQ29tcG9uZW50IH0gZnJvbSAnLi9jb2xhYm9yYWRvcmVzL2NvbGFib3JhZG9yZXMuY29tcG9uZW50JztcblxuLy9JbmZvcm1hY2nDs24gZmFtaWxpYXIgZGUgY29sYWJvcmFkb3Jlc1xuaW1wb3J0IHsgRmFtaWx5SW5mb3JtYXRpb25Db21wb25lbnQgfSBmcm9tICcuL2VtcGxveWVlcy1mYW1pbHktaW5mb3JtYXRpb24vZmFtaWx5LWluZm9ybWF0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGYW1pbHlJbmZvcm1hdGlvbkFkZENvbXBvbmVudCB9IGZyb20gJy4vZW1wbG95ZWVzLWZhbWlseS1pbmZvcm1hdGlvbi9mYW1pbHktaW5mb3JtYXRpb24tYWRkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGYW1pbHlJbmZvcm1hdGlvblVwZGF0ZUNvbXBvbmVudCB9IGZyb20gJy4vZW1wbG95ZWVzLWZhbWlseS1pbmZvcm1hdGlvbi9mYW1pbHktaW5mb3JtYXRpb24tdXBkYXRlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGYW1pbHlJbmZvcm1hdGlvbkRldGFpbENvbXBvbmVudCB9IGZyb20gJy4vZW1wbG95ZWVzLWZhbWlseS1pbmZvcm1hdGlvbi9mYW1pbHktaW5mb3JtYXRpb24tZGV0YWlsLmNvbXBvbmVudCc7XG5cbi8vSW5mb3JtYWNpw7NuIGRlIHJlZmVyZW5jaWEgZGUgY29sYWJvcmFkb3Jlc1xuaW1wb3J0IHsgUmVmZXJlbmNlc0NvbXBvbmVudCB9IGZyb20gJy4vZW1wbG95ZWVzLXJlZmVyZW5jZXMvcmVmZXJlbmNlcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgUmVmZXJlbmNlc0RldGFpbENvbXBvbmVudCB9IGZyb20gJy4vZW1wbG95ZWVzLXJlZmVyZW5jZXMvcmVmZXJlbmNlcy1kZXRhaWwuY29tcG9uZW50JztcbmltcG9ydCB7IFJlZmVyZW5jZXNBZGRDb21wb25lbnQgfSBmcm9tICcuL2VtcGxveWVlcy1yZWZlcmVuY2VzL3JlZmVyZW5jZXMtYWRkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSZWZlcmVuY2VzVXBkYXRlQ29tcG9uZW50IH0gZnJvbSAnLi9lbXBsb3llZXMtcmVmZXJlbmNlcy9yZWZlcmVuY2VzLXVwZGF0ZS5jb21wb25lbnQnO1xuXG5jb25zdCByb3V0ZXM6IFJvdXRlcyA9IFtcbiAgeyBwYXRoOiAnJywgcmVkaXJlY3RUbzogJy9jb2xhYm9yYWRvcmVzJywgcGF0aE1hdGNoOiAnZnVsbCcgfSxcblxuICAvL2hpc3RvcmlhIGRlIGNvbGFib3JhZG9yZXNcbiAgeyBwYXRoOiAnY29sYWJvcmFkb3JlcycsIGNvbXBvbmVudDogQ29sYWJvcmFkb3Jlc0NvbXBvbmVudCB9LFxuICB7IHBhdGg6ICdjb2xhYm9yYWRvcmVzL2FkZCcsIGNvbXBvbmVudDogQ29sYWJvcmFkb3JBZGRDb21wb25lbnQgfSxcbiAgeyBwYXRoOiAnY29sYWJvcmFkb3Jlcy9kZXRhaWwvOmlkJywgY29tcG9uZW50OiBDb2xhYm9yYWRvckRldGFpbENvbXBvbmVudCB9LFxuICB7IHBhdGg6ICdjb2xhYm9yYWRvcmVzL3VwZGF0ZS86aWQnLCBjb21wb25lbnQ6IENvbGFib3JhZG9yVXBkYXRlQ29tcG9uZW50IH0sXG5cbiAgLy9JbmZvcm1hY2nDs24gZmFtaWxpYXIgZGUgY29sYWJvcmFkb3Jlc1xuICB7IHBhdGg6ICdlbXBsb3llZXMtZmFtaWx5LWluZm9ybWF0aW9uJywgY29tcG9uZW50OiBGYW1pbHlJbmZvcm1hdGlvbkNvbXBvbmVudCB9LFxuICB7IHBhdGg6ICdlbXBsb3llZXMtZmFtaWx5LWluZm9ybWF0aW9uL2FkZCcsIGNvbXBvbmVudDogRmFtaWx5SW5mb3JtYXRpb25BZGRDb21wb25lbnQgfSxcbiAgeyBwYXRoOiAnZW1wbG95ZWVzLWZhbWlseS1pbmZvcm1hdGlvbi91cGRhdGUvOmlkJywgY29tcG9uZW50OiBGYW1pbHlJbmZvcm1hdGlvblVwZGF0ZUNvbXBvbmVudCB9LFxuICB7IHBhdGg6ICdlbXBsb3llZXMtZmFtaWx5LWluZm9ybWF0aW9uL2RldGFpbC86aWQnLCBjb21wb25lbnQ6IEZhbWlseUluZm9ybWF0aW9uRGV0YWlsQ29tcG9uZW50IH0sXG5cbiAgLy9JbmZvcm1hY2nDs24gZGUgcmVmZXJlbmNpYSBkZSBjb2xhYm9yYWRvcmVzXG4gIHsgcGF0aDogJ2VtcGxveWVlcy1yZWZlcmVuY2VzJywgY29tcG9uZW50OiBSZWZlcmVuY2VzQ29tcG9uZW50IH0sXG4gIHsgcGF0aDogJ2VtcGxveWVlcy1yZWZlcmVuY2VzL2FkZCcsIGNvbXBvbmVudDogUmVmZXJlbmNlc0FkZENvbXBvbmVudCB9LFxuICB7IHBhdGg6ICdlbXBsb3llZXMtcmVmZXJlbmNlcy9kZXRhaWwvOmlkJywgY29tcG9uZW50OiBSZWZlcmVuY2VzRGV0YWlsQ29tcG9uZW50IH0sXG4gIHsgcGF0aDogJ2VtcGxveWVlcy1yZWZlcmVuY2VzL3VwZGF0ZS86aWQnLCBjb21wb25lbnQ6IFJlZmVyZW5jZXNVcGRhdGVDb21wb25lbnQgfSxcbl07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBSb3V0ZXJNb2R1bGUuZm9yUm9vdChyb3V0ZXMpXG4gIF0sXG4gIGV4cG9ydHM6IFtSb3V0ZXJNb2R1bGVdXG59KVxuZXhwb3J0IGNsYXNzIEFwcFJvdXRpbmdNb2R1bGUgeyB9XG5cbiJdfQ==
