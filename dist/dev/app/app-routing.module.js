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
var routes = [
    { path: '', redirectTo: '/colaboradores', pathMatch: 'full' },
    { path: 'colaboradores', component: colaboradores_component_1.ColaboradoresComponent },
    { path: 'colaboradores/detail/:id', component: colaborador_detail_component_1.ColaboradorDetailComponent },
    { path: 'colaboradores/add', component: colaborador_add_component_1.ColaboradorAddComponent },
    { path: 'colaboradores/update/:id', component: colaborador_update_component_1.ColaboradorUpdateComponent }
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hcHAtcm91dGluZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUF5QixlQUFlLENBQUMsQ0FBQTtBQUN6Qyx1QkFBb0MsaUJBQWlCLENBQUMsQ0FBQTtBQUN0RCw2Q0FBMkMsOENBQThDLENBQUMsQ0FBQTtBQUMxRiwwQ0FBd0MsMkNBQTJDLENBQUMsQ0FBQTtBQUNwRiw2Q0FBMkMsOENBQThDLENBQUMsQ0FBQTtBQUMxRix3Q0FBdUMseUNBQXlDLENBQUMsQ0FBQTtBQUVqRixJQUFNLE1BQU0sR0FBVztJQUNyQixFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLGdCQUFnQixFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUU7SUFDN0QsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxnREFBc0IsRUFBRTtJQUM1RCxFQUFFLElBQUksRUFBRSwwQkFBMEIsRUFBRSxTQUFTLEVBQUUseURBQTBCLEVBQUU7SUFDM0UsRUFBRSxJQUFJLEVBQUUsbUJBQW1CLEVBQUUsU0FBUyxFQUFFLG1EQUF1QixFQUFFO0lBQ2pFLEVBQUUsSUFBSSxFQUFFLDBCQUEwQixFQUFFLFNBQVMsRUFBRSx5REFBMEIsRUFBRTtDQUM1RSxDQUFDO0FBUUY7SUFBQTtJQUFnQyxDQUFDO0lBTmpDO1FBQUMsZUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFO2dCQUNQLHFCQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQzthQUM3QjtZQUNELE9BQU8sRUFBRSxDQUFDLHFCQUFZLENBQUM7U0FDeEIsQ0FBQzs7d0JBQUE7SUFDOEIsdUJBQUM7QUFBRCxDQUFoQyxBQUFpQyxJQUFBO0FBQXBCLHdCQUFnQixtQkFBSSxDQUFBIiwiZmlsZSI6ImFwcC9hcHAtcm91dGluZy5tb2R1bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlLFJvdXRlcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBDb2xhYm9yYWRvckRldGFpbENvbXBvbmVudCB9IGZyb20gJy4vY29sYWJvcmFkb3Jlcy9jb2xhYm9yYWRvci1kZXRhaWwuY29tcG9uZW50JztcbmltcG9ydCB7IENvbGFib3JhZG9yQWRkQ29tcG9uZW50IH0gZnJvbSAnLi9jb2xhYm9yYWRvcmVzL2NvbGFib3JhZG9yLWFkZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29sYWJvcmFkb3JVcGRhdGVDb21wb25lbnQgfSBmcm9tICcuL2NvbGFib3JhZG9yZXMvY29sYWJvcmFkb3ItdXBkYXRlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb2xhYm9yYWRvcmVzQ29tcG9uZW50IH0gZnJvbSAnLi9jb2xhYm9yYWRvcmVzL2NvbGFib3JhZG9yZXMuY29tcG9uZW50JztcblxuY29uc3Qgcm91dGVzOiBSb3V0ZXMgPSBbXG4gIHsgcGF0aDogJycsIHJlZGlyZWN0VG86ICcvY29sYWJvcmFkb3JlcycsIHBhdGhNYXRjaDogJ2Z1bGwnIH0sXG4gIHsgcGF0aDogJ2NvbGFib3JhZG9yZXMnLCBjb21wb25lbnQ6IENvbGFib3JhZG9yZXNDb21wb25lbnQgfSxcbiAgeyBwYXRoOiAnY29sYWJvcmFkb3Jlcy9kZXRhaWwvOmlkJywgY29tcG9uZW50OiBDb2xhYm9yYWRvckRldGFpbENvbXBvbmVudCB9LFxuICB7IHBhdGg6ICdjb2xhYm9yYWRvcmVzL2FkZCcsIGNvbXBvbmVudDogQ29sYWJvcmFkb3JBZGRDb21wb25lbnQgfSxcbiAgeyBwYXRoOiAnY29sYWJvcmFkb3Jlcy91cGRhdGUvOmlkJywgY29tcG9uZW50OiBDb2xhYm9yYWRvclVwZGF0ZUNvbXBvbmVudCB9XG5dO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgUm91dGVyTW9kdWxlLmZvclJvb3Qocm91dGVzKVxuICBdLFxuICBleHBvcnRzOiBbUm91dGVyTW9kdWxlXVxufSlcbmV4cG9ydCBjbGFzcyBBcHBSb3V0aW5nTW9kdWxlIHsgfVxuXG4iXX0=
