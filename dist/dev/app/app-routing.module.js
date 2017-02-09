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
var colaboradores_component_1 = require('./colaboradores/colaboradores.component');
var routes = [
    { path: '', redirectTo: '/colaboradores', pathMatch: 'full' },
    { path: 'colaboradores', component: colaboradores_component_1.ColaboradoresComponent },
    { path: 'colaboradores/detail/:id', component: colaborador_detail_component_1.ColaboradorDetailComponent },
    { path: 'colaboradores/add', component: colaborador_add_component_1.ColaboradorAddComponent }
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hcHAtcm91dGluZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUF5QixlQUFlLENBQUMsQ0FBQTtBQUN6Qyx1QkFBb0MsaUJBQWlCLENBQUMsQ0FBQTtBQUN0RCw2Q0FBMkMsOENBQThDLENBQUMsQ0FBQTtBQUMxRiwwQ0FBd0MsMkNBQTJDLENBQUMsQ0FBQTtBQUNwRix3Q0FBdUMseUNBQXlDLENBQUMsQ0FBQTtBQUVqRixJQUFNLE1BQU0sR0FBVztJQUNyQixFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLGdCQUFnQixFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUU7SUFDN0QsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxnREFBc0IsRUFBRTtJQUM1RCxFQUFFLElBQUksRUFBRSwwQkFBMEIsRUFBRSxTQUFTLEVBQUUseURBQTBCLEVBQUU7SUFDM0UsRUFBRSxJQUFJLEVBQUUsbUJBQW1CLEVBQUUsU0FBUyxFQUFFLG1EQUF1QixFQUFFO0NBQ2xFLENBQUM7QUFRRjtJQUFBO0lBQWdDLENBQUM7SUFOakM7UUFBQyxlQUFRLENBQUM7WUFDUixPQUFPLEVBQUU7Z0JBQ1AscUJBQVksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO2FBQzdCO1lBQ0QsT0FBTyxFQUFFLENBQUMscUJBQVksQ0FBQztTQUN4QixDQUFDOzt3QkFBQTtJQUM4Qix1QkFBQztBQUFELENBQWhDLEFBQWlDLElBQUE7QUFBcEIsd0JBQWdCLG1CQUFJLENBQUEiLCJmaWxlIjoiYXBwL2FwcC1yb3V0aW5nLm1vZHVsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUsUm91dGVzIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IENvbGFib3JhZG9yRGV0YWlsQ29tcG9uZW50IH0gZnJvbSAnLi9jb2xhYm9yYWRvcmVzL2NvbGFib3JhZG9yLWRldGFpbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29sYWJvcmFkb3JBZGRDb21wb25lbnQgfSBmcm9tICcuL2NvbGFib3JhZG9yZXMvY29sYWJvcmFkb3ItYWRkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb2xhYm9yYWRvcmVzQ29tcG9uZW50IH0gZnJvbSAnLi9jb2xhYm9yYWRvcmVzL2NvbGFib3JhZG9yZXMuY29tcG9uZW50JztcblxuY29uc3Qgcm91dGVzOiBSb3V0ZXMgPSBbXG4gIHsgcGF0aDogJycsIHJlZGlyZWN0VG86ICcvY29sYWJvcmFkb3JlcycsIHBhdGhNYXRjaDogJ2Z1bGwnIH0sXG4gIHsgcGF0aDogJ2NvbGFib3JhZG9yZXMnLCBjb21wb25lbnQ6IENvbGFib3JhZG9yZXNDb21wb25lbnQgfSxcbiAgeyBwYXRoOiAnY29sYWJvcmFkb3Jlcy9kZXRhaWwvOmlkJywgY29tcG9uZW50OiBDb2xhYm9yYWRvckRldGFpbENvbXBvbmVudCB9LFxuICB7IHBhdGg6ICdjb2xhYm9yYWRvcmVzL2FkZCcsIGNvbXBvbmVudDogQ29sYWJvcmFkb3JBZGRDb21wb25lbnQgfVxuXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIFJvdXRlck1vZHVsZS5mb3JSb290KHJvdXRlcylcbiAgXSxcbiAgZXhwb3J0czogW1JvdXRlck1vZHVsZV1cbn0pXG5leHBvcnQgY2xhc3MgQXBwUm91dGluZ01vZHVsZSB7IH1cblxuIl19
