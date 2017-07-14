import { Component, Input, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BreadcrumbService } from './breadcrumb.service';

/**
 * This component shows a breadcrumb trail for available routes the router can navigate to.
 * It subscribes to the router in order to update the breadcrumb trail as you navigate to a component.
 */
@Component( {
               moduleId: module.id,
               selector: 'sd-breadcrumb',
               templateUrl: 'breadcrumb-component.html',
               styleUrls: [ 'breadcrumb.component.css' ],

            } )
export class BreadcrumbComponent implements OnInit, OnChanges, OnDestroy {
   @Input() useBootstrap = true;
   @Input() prefix = '';

   public _urls: string[];
   public _routerSubscription: any;

   constructor( private router: Router,
      private breadcrumbService: BreadcrumbService ) {
   }

   ngOnInit(): void {
      this.setAllFriendlyName();
      this._urls = new Array();

      if ( this.prefix.length > 0 ) {
         this._urls.unshift( this.prefix );
      }

      this._routerSubscription = this.router.events.subscribe( ( navigationEnd: NavigationEnd ) => {

         if ( navigationEnd instanceof NavigationEnd ) {
            this._urls.length = 0; // Fastest way to clear out array
            this.generateBreadcrumbTrail( navigationEnd.urlAfterRedirects ? navigationEnd.urlAfterRedirects : navigationEnd.url );
         }
      } );

   }

   ngOnChanges( changes: any ): void {
      if ( !this._urls ) {
         return;
      }

      this._urls.length = 0;
      this.generateBreadcrumbTrail( this.router.url );
   }

   generateBreadcrumbTrail( url: string ): void {
      if ( !this.breadcrumbService.isRouteHidden( url ) ) {
         // Add url to beginning of array (since the url is being recursively broken down from full url to its parent)
         // if (this.prefix !== url && url.lastIndexOf('/') !== 0)
         this._urls.unshift( url );
      }

      if ( url.lastIndexOf( '/' ) > 0 ) {
         this.generateBreadcrumbTrail( url.substr( 0, url.lastIndexOf( '/' ) ) ); // Find last '/' and add everything before it as a parent
                                                                                  // route
      } else if ( this.prefix.length > 0 ) {
         this._urls.unshift( this.prefix );
      }
   }

   navigateTo( url: string ): void {
      this.router.navigateByUrl( url );
   }

   friendlyName( url: string ): string {
      return !url ? '' : this.breadcrumbService.getFriendlyNameForRoute( url );
   }

   ngOnDestroy(): void {
      this._routerSubscription.unsubscribe();
   }

   setAllFriendlyName() {

      this.breadcrumbService.hideRoute( '/dashboard' );

      this.breadcrumbService.addFriendlyNameForRoute( '/employees', 'Colaboradores' );
      this.breadcrumbService.addFriendlyNameForRoute( '/employees/add', 'Nuevo' );
      this.breadcrumbService.hideRoute( '/employees/detail' );
      this.breadcrumbService.addFriendlyNameForRouteRegex( '^/employees/detail/[0-9]*$', 'Detalle' );
      this.breadcrumbService.hideRoute( '/employees/update' );
      this.breadcrumbService.addFriendlyNameForRouteRegex( '^/employees/update/[0-9]*$', 'Actualizar' );

      this.breadcrumbService.hideRouteRegex( '^/employees/detail/[0-9]*/references$' );
      this.breadcrumbService.addFriendlyNameForRouteRegex( '^/employees/detail/[0-9]*/references/add$', 'Nueva Referencia' );
      this.breadcrumbService.hideRouteRegex( '^/employees/detail/[0-9]*/references/detail$' );
      this.breadcrumbService.addFriendlyNameForRouteRegex( '^/employees/detail/[0-9]*/references/detail/[0-9]*$', 'Detalles Referencia' );
      this.breadcrumbService.hideRouteRegex( '^/employees/detail/[0-9]*/references/update$' );
      this.breadcrumbService.addFriendlyNameForRouteRegex( '^/employees/detail/[0-9]*/references/update/[0-9]*$', 'Actualizar Referencia' );

      this.breadcrumbService.hideRouteRegex( '^/employees/detail/[0-9]*/family-information$' );
      this.breadcrumbService.addFriendlyNameForRouteRegex( '^/employees/detail/[0-9]*/family-information/add$', 'Nuevo Familiar' );
      this.breadcrumbService.hideRouteRegex( '^/employees/detail/[0-9]*/family-information/detail$' );
      this.breadcrumbService.addFriendlyNameForRouteRegex(
         '^/employees/detail/[0-9]*/family-information/detail/[0-9]*$', 'Detalles del Familiar' );
      this.breadcrumbService.hideRouteRegex( '^/employees/detail/[0-9]*/family-information/update$' );
      this.breadcrumbService.addFriendlyNameForRouteRegex(
         '^/employees/detail/[0-9]*/family-information/update/[0-9]*$', 'Actualizar Familiar' );

      this.breadcrumbService.hideRouteRegex( '^/employees/detail/[0-9]*/location$' );
      this.breadcrumbService.addFriendlyNameForRouteRegex( '^/employees/detail/[0-9]*/location/add$', 'Nueva Ubicación' );
      this.breadcrumbService.hideRouteRegex( '^/employees/detail/[0-9]*/location/update$' );
      this.breadcrumbService.addFriendlyNameForRouteRegex(
         '^/employees/detail/[0-9]*/location/update/[0-9]*$', 'Actualizar Ubicación' );

      this.breadcrumbService.hideRouteRegex( '^/employees/detail/[0-9]*/estate$' );
      this.breadcrumbService.addFriendlyNameForRouteRegex( '^/employees/detail/[0-9]*/estate/add$', 'Nuevo Inmueble' );
      this.breadcrumbService.hideRouteRegex( '^/employees/detail/[0-9]*/estate/update$' );
      this.breadcrumbService.addFriendlyNameForRouteRegex(
         '^/employees/detail/[0-9]*/estate/update/[0-9]*$', 'Actualizar Inmueble' );

      this.breadcrumbService.hideRouteRegex( '^/employees/detail/[0-9]*/vehicle$' );
      this.breadcrumbService.addFriendlyNameForRouteRegex( '^/employees/detail/[0-9]*/vehicle/add$', 'Nuevo Vehículo' );
      this.breadcrumbService.hideRouteRegex( '^/employees/detail/[0-9]*/vehicle/update$' );
      this.breadcrumbService.addFriendlyNameForRouteRegex(
         '^/employees/detail/[0-9]*/vehicle/update/[0-9]*$', 'Actualizar Vehículo' );

      this.breadcrumbService.hideRouteRegex( '^/employees/detail/[0-9]*/formal-studies$' );
      this.breadcrumbService.addFriendlyNameForRouteRegex( '^/employees/detail/[0-9]*/formal-studies/add$', 'Nuevo Estudio' );
      this.breadcrumbService.hideRouteRegex( '^/employees/detail/[0-9]*/formal-studies/update$' );
      this.breadcrumbService.addFriendlyNameForRouteRegex(
         '^/employees/detail/[0-9]*/formal-studies/update/[0-9]*$', 'Actualizar Estudio' );
      this.breadcrumbService.hideRouteRegex( '^/employees/detail/[0-9]*/formal-studies/detail$' );
      this.breadcrumbService.addFriendlyNameForRouteRegex(
         '^/employees/detail/[0-9]*/formal-studies/detail/[0-9]*$', 'Detalles del Estudio' );

      this.breadcrumbService.hideRouteRegex( '^/employees/detail/[0-9]*/no-formal-studies$' );
      this.breadcrumbService.addFriendlyNameForRouteRegex( '^/employees/detail/[0-9]*/no-formal-studies/add$', 'Nuevo estudio no formal' );
      this.breadcrumbService.hideRouteRegex( '^/employees/detail/[0-9]*/no-formal-studies/update$' );
      this.breadcrumbService.addFriendlyNameForRouteRegex(
         '^/employees/detail/[0-9]*/no-formal-studies/update/[0-9]*$', 'Actualizar Estudio' );
      this.breadcrumbService.hideRouteRegex( '^/employees/detail/[0-9]*/no-formal-studies/detail$' );
      this.breadcrumbService.addFriendlyNameForRouteRegex(
         '^/employees/detail/[0-9]*/no-formal-studies/detail/[0-9]*$', 'Detalles del Estudio' );

      this.breadcrumbService.hideRouteRegex( '^/employees/detail/[0-9]*/work-experience$' );
      this.breadcrumbService.addFriendlyNameForRouteRegex( '^/employees/detail/[0-9]*/work-experience/add$', 'Nueva Experiencia' );
      this.breadcrumbService.hideRouteRegex( '^/employees/detail/[0-9]*/work-experience/update$' );
      this.breadcrumbService.addFriendlyNameForRouteRegex(
         '^/employees/detail/[0-9]*/work-experience/update/[0-9]*$', 'Actualizar Experiencia' );
      this.breadcrumbService.hideRouteRegex( '^/employees/detail/[0-9]*/work-experience/detail$' );
      this.breadcrumbService.addFriendlyNameForRouteRegex(
         '^/employees/detail/[0-9]*/work-experience/detail/[0-9]*$', 'Detalles Experiencia' );

      this.breadcrumbService.addFriendlyNameForRoute( '/constantes', 'Constantes' );
      this.breadcrumbService.addFriendlyNameForRoute( '/constantes/add', 'Nuevo' );
      this.breadcrumbService.addFriendlyNameForRoute( '/constantes/detail', 'Detalle' );
      this.breadcrumbService.hideRouteRegex( '^/constantes/detail/[0-9]*' );
      this.breadcrumbService.addFriendlyNameForRoute( '/constantes/edit', 'Actualizar' );
      this.breadcrumbService.hideRouteRegex( '^/constantes/edit/[0-9]*' );

      this.breadcrumbService.addFriendlyNameForRoute( '/listas', 'Listas' );
      this.breadcrumbService.addFriendlyNameForRoute( '/listas/add', 'Nuevo' );
      this.breadcrumbService.addFriendlyNameForRoute( '/listas/detail', 'Detalle' );
      this.breadcrumbService.hideRouteRegex( '^/listas/detail/[0-9]*' );
      this.breadcrumbService.addFriendlyNameForRoute( '/listas/edit', 'Actualizar' );
      this.breadcrumbService.hideRouteRegex( '^/listas/edit/[0-9]*' );

      this.breadcrumbService.addFriendlyNameForRoute( '/centroCostos', 'Centros de Costo' );
      this.breadcrumbService.addFriendlyNameForRoute( '/centroCostos/add', 'Nuevo' );
      this.breadcrumbService.addFriendlyNameForRoute( '/centroCostos/detail', 'Detalle' );
      this.breadcrumbService.hideRouteRegex( '^/centroCostos/detail/[0-9]*' );
      this.breadcrumbService.addFriendlyNameForRoute( '/centroCostos/edit', 'Actualizar' );
      this.breadcrumbService.hideRouteRegex( '^/centroCostos/edit/[0-9]*' );

      this.breadcrumbService.addFriendlyNameForRoute( '/gruposGestion', 'Grupos de Gestion' );
      this.breadcrumbService.addFriendlyNameForRoute( '/gruposGestion/add', 'Nuevo' );
      this.breadcrumbService.addFriendlyNameForRoute( '/gruposGestion/detail', 'Detalle' );
      this.breadcrumbService.hideRouteRegex( '^/gruposGestion/detail/[0-9]*' );
      this.breadcrumbService.addFriendlyNameForRoute( '/gruposGestion/edit', 'Actualizar' );
      this.breadcrumbService.hideRouteRegex( '^/gruposGestion/edit/[0-9]*' );

      this.breadcrumbService.addFriendlyNameForRoute( '/roles', 'Administrador de Roles' );
      this.breadcrumbService.addFriendlyNameForRoute( '/roles/add', 'Nuevo' );
      this.breadcrumbService.hideRoute( '/roles/update' );
      this.breadcrumbService.addFriendlyNameForRouteRegex( '^/roles/update/[0-9]*$', 'Detalles' );
      this.breadcrumbService.hideRouteRegex( '^/roles/update/[0-9]*/[0-9]*$' );
      this.breadcrumbService.hideRouteRegex( '^/roles/update/[0-9]*/funcionalities-config$' );
      this.breadcrumbService.addFriendlyNameForRouteRegex( '^/roles/update/[0-9]*/funcionalities-config/[0-9]*$', 'Funcionalidad' );
      this.breadcrumbService.addFriendlyNameForRoute( '/roles-funcionalities-config/[0-9]*', 'Roles Funcionalidades' );

      this.breadcrumbService.addFriendlyNameForRoute( '/usuarios', 'Usuarios' );
      this.breadcrumbService.addFriendlyNameForRoute( '/usuarios/add', 'Nuevo' );
      this.breadcrumbService.addFriendlyNameForRoute( '/usuarios/detail', 'Detalle' );
      this.breadcrumbService.hideRouteRegex( '^/usuarios/detail/[0-9]*' );
      this.breadcrumbService.addFriendlyNameForRoute( '/usuarios/edit', 'Actualizar' );
      this.breadcrumbService.hideRouteRegex( '^/usuarios/edit/[0-9]*' );
      this.breadcrumbService.hideRouteRegex( '^/usuarios/edit/[0-9]/[0-9]*' );

      this.breadcrumbService.addFriendlyNameForRoute( '/user-session', 'Cambio de contraseña' );

      this.breadcrumbService.addFriendlyNameForRoute( '/tipoArea', 'Tipos de Area' );
      this.breadcrumbService.addFriendlyNameForRoute( '/tipoArea/add', 'Nuevo' );
      this.breadcrumbService.addFriendlyNameForRoute( '/tipoArea/detail', 'Detalle' );
      this.breadcrumbService.hideRouteRegex( '^/tipoArea/detail/[0-9]*' );
      this.breadcrumbService.addFriendlyNameForRoute( '/tipoArea/edit', 'Actualizar' );
      this.breadcrumbService.hideRouteRegex( '^/tipoArea/edit/[0-9]*' );

      this.breadcrumbService.addFriendlyNameForRoute( '/faults', 'Faltas y Sanciones' );
      this.breadcrumbService.addFriendlyNameForRoute( '/faults/add', 'Nuevo' );
      this.breadcrumbService.addFriendlyNameForRoute( '/faults/update', 'Actualizar' );
      this.breadcrumbService.hideRouteRegex( '^/faults/update/[0-9]*' );

      this.breadcrumbService.addFriendlyNameForRoute( '/positions', 'Cargos' );
      this.breadcrumbService.addFriendlyNameForRoute( '/position', 'Cargos' );
      this.breadcrumbService.addFriendlyNameForRouteRegex( '^/positions/add$', 'Nuevo' );
      this.breadcrumbService.hideRouteRegex( '^/positions/add/[0-9]*$' );
      this.breadcrumbService.addFriendlyNameForRoute( '/positions/update', 'Actualizar' );
      this.breadcrumbService.hideRouteRegex( '^/positions/update/[0-9]*' );

      this.breadcrumbService.addFriendlyNameForRoute( '/position/requirement' , 'Requerimiento');
      this.breadcrumbService.hideRoute( '/position/requirement/detail');
      this.breadcrumbService.hideRouteRegex( '^/position/requirement/detail/[0-9]*$' );

      this.breadcrumbService.addFriendlyNameForRoute( '/physic-structure', 'Estructura Física' );
      this.breadcrumbService.addFriendlyNameForRoute( '/physic-structure/add', 'Nuevo' );
      this.breadcrumbService.addFriendlyNameForRoute( '/physic-structure/update', 'Actualizar' );
      this.breadcrumbService.addFriendlyNameForRoute( '/physic-structure/detail', 'Detalle' );
      this.breadcrumbService.hideRouteRegex( '^/physic-structure/update/[0-9]*' );
      this.breadcrumbService.hideRouteRegex( '^/physic-structure/detail/[0-9]*' );

      this.breadcrumbService.addFriendlyNameForRoute( '/risks', 'Riesgos' );
      this.breadcrumbService.addFriendlyNameForRoute( '/risks/add', 'Nuevo' );
      this.breadcrumbService.addFriendlyNameForRoute( '/risks/update', 'Actualizar' );
      this.breadcrumbService.addFriendlyNameForRoute( '/risks/detail', 'Detalle' );
      this.breadcrumbService.hideRouteRegex( '^/risks/update/[0-9]*' );
      this.breadcrumbService.hideRouteRegex( '^/risks/detail/[0-9]*' );

      this.breadcrumbService.addFriendlyNameForRoute( '/form-manager', 'Administrador de Formularios' );
      this.breadcrumbService.addFriendlyNameForRoute( '/form-manager/add', 'Nuevo' );
      this.breadcrumbService.addFriendlyNameForRoute( '/form-manager/update', 'Actualizar' );
      this.breadcrumbService.hideRouteRegex( '^/form-manager/update/[0-9]*' );

      this.breadcrumbService.addFriendlyNameForRoute( '/widgets', 'Administrador de Widgets' );
      this.breadcrumbService.addFriendlyNameForRoute( '/widgets/add', 'Nuevo' );
      this.breadcrumbService.addFriendlyNameForRoute( '/widgets/update', 'Actualizar' );
      this.breadcrumbService.hideRouteRegex( '^/widgets/update/[0-9]*' );

      this.breadcrumbService.addFriendlyNameForRoute( '/organizational-structure', 'Estructura Organizacional' );
      this.breadcrumbService.addFriendlyNameForRoute( '/menus', 'Administrador de Menús' );
      this.breadcrumbService.addFriendlyNameForRoute( '/organizational-structure-positions', 'Planta de Colaboradores' );
      this.breadcrumbService.addFriendlyNameForRoute( '/job-projection', 'Proyección laboral' );
      this.breadcrumbService.addFriendlyNameForRoute( '/competencies-groups', 'Competencias y Habilidades' );
      this.breadcrumbService.addFriendlyNameForRoute( '/divisionPolitica', 'División Política' );
      this.breadcrumbService.addFriendlyNameForRoute( '/ocupaciones', 'Ocupaciones' );
      this.breadcrumbService.addFriendlyNameForRoute( '/actividadeconomica', 'Actividades Económicas' );

      this.breadcrumbService.addFriendlyNameForRoute( '/vacancies', 'Gestión de Vacantes' );
      this.breadcrumbService.addFriendlyNameForRoute( '/vacancies/update', 'Cambio de Estado' );
      this.breadcrumbService.hideRouteRegex( '^/vacancies/update/[0-9]*' );

      this.breadcrumbService.addFriendlyNameForRoute( '/personnel-requirement', 'Requerimiento de personal' );
      this.breadcrumbService.addFriendlyNameForRoute( '/personnel-requirement/add', 'Agregando requerimiento de personal' );
      this.breadcrumbService.addFriendlyNameForRoute( '/personnel-requirement/update', 'Editando requerimiento de personal' );
      this.breadcrumbService.hideRouteRegex( '^/personnel-requirement/update/[0-9]*' );
      this.breadcrumbService.addFriendlyNameForRoute( 'personnel-requirement/detail', 'Detalle' );

      //selection-process/process-step/:idStep/publication/:idPublication/candidate/:idCandidate
      this.breadcrumbService.hideRouteRegex( '^/selection-process/process-step/[0-9]*' );
      this.breadcrumbService.addFriendlyNameForRouteRegex( '^/process-step', 'Postulado' );

      this.breadcrumbService.addFriendlyNameForRoute( '/document-management', 'Administrador de documentos' );
      this.breadcrumbService.hideRouteRegex( '^/document-management/add/[0-9]*' );
      this.breadcrumbService.addFriendlyNameForRoute( '/document-management/add', 'Agregar registro' );
      this.breadcrumbService.hideRouteRegex( '^/document-management/update/[0-9]*' );
      this.breadcrumbService.addFriendlyNameForRoute( '/document-management/update', 'Actualizar registro' );
      this.breadcrumbService.hideRouteRegex( '^/document-management/detail/[0-9]*' );
      this.breadcrumbService.addFriendlyNameForRoute( '/document-management/detail', 'Detalle regiistro' );

      this.breadcrumbService.addFriendlyNameForRoute( '/questionnaries', 'Cuestionarios' );
      this.breadcrumbService.addFriendlyNameForRoute( '/questionnaries/add', 'Nuevo' );
      this.breadcrumbService.addFriendlyNameForRoute( '/questionnaries/update', 'Actualizar' );
      this.breadcrumbService.addFriendlyNameForRoute( '/questionnaries/detail', 'Detalle' );
      this.breadcrumbService.hideRouteRegex( '^/questionnaries/update/[0-9]*' );
      this.breadcrumbService.hideRouteRegex( '^/questionnaries/detail/[0-9]*' );

      this.breadcrumbService.addFriendlyNameForRoute( '/medical-institutions', 'Instituciones Medicas' );
      this.breadcrumbService.addFriendlyNameForRoute( '/medical-institutions/add', 'Nuevo' );
      this.breadcrumbService.addFriendlyNameForRoute( '/medical-institutions/update', 'Actualizar' );
      this.breadcrumbService.addFriendlyNameForRoute( '/medical-institutions/detail', 'Detalle' );
      this.breadcrumbService.hideRouteRegex( '^/medical-institutions/update/[0-9]*' );
      this.breadcrumbService.hideRouteRegex( '^/medical-institutions/detail/[0-9]*' );

      this.breadcrumbService.addFriendlyNameForRoute( '/selection-process', 'Proceso de Selección' );
      this.breadcrumbService.addFriendlyNameForRoute( '/selection-process/add-publication', 'Publicación' );
      this.breadcrumbService.hideRouteRegex( '^/selection-process/add-publication/[0-9]*' );
      this.breadcrumbService.addFriendlyNameForRoute( '/selection-process/publications-detail', 'Detalle' );
      this.breadcrumbService.hideRouteRegex( '^/selection-process/publications-detail/[0-9]*' )
      this.breadcrumbService.addFriendlyNameForRoute( '/selection-process/candidates-list', 'Candidatos' );
      this.breadcrumbService.hideRouteRegex( '^/selection-process/candidates-list/[0-9]*' );

      this.breadcrumbService.addFriendlyNameForRoute( '/step-list', 'Configuración de los pasos' );
      this.breadcrumbService.addFriendlyNameForRoute( '/selection-process/add-step', 'Nuevo Paso' );
      this.breadcrumbService.addFriendlyNameForRoute( '/selection-process/update-step', 'Actualizar Paso' );
      this.breadcrumbService.hideRouteRegex( '^/selection-process/update-step/[0-9]*' );
      this.breadcrumbService.hideRouteRegex( '^/selection-process/add-step/[0-9]*' );

      this.breadcrumbService.hideRoute( '/apply-vacancy' );
      this.breadcrumbService.addFriendlyNameForRoute( '/apply-vacancy/publications-detail', 'Detalles vacante' );
      this.breadcrumbService.addFriendlyNameForRoute( '/apply-vacancy/employee-profile', 'Actualizar Perfil' );
      this.breadcrumbService.addFriendlyNameForRoute( '/apply-vacancy/questionnaires', 'Cuestionario' );
      this.breadcrumbService.hideRouteRegex( '^/apply-vacancy/publications-detail/[0-9]*' );
      this.breadcrumbService.hideRouteRegex( '^/apply-vacancy/employee-profile/[0-9]*' );
      this.breadcrumbService.hideRouteRegex( '^/apply-vacancy/questionnaires/[0-9]*' );

   }
}
