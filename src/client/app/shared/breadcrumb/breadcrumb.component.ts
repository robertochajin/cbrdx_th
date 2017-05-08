import { Component, Input, OnInit, OnChanges } from '@angular/core';
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
export class BreadcrumbComponent implements OnInit, OnChanges {
   @Input() useBootstrap: boolean = true;
   @Input() prefix: string = '';

   public _urls: string[];
   public _routerSubscription: any;

   constructor( private router: Router,
      private breadcrumbService: BreadcrumbService ) {
   }

   ngOnInit(): void {
      this._urls = new Array();

      if ( this.prefix.length > 0 ) {
         this._urls.unshift( this.prefix );
      }

      this._routerSubscription = this.router.events.subscribe( ( navigationEnd: NavigationEnd ) => {

         if ( navigationEnd instanceof NavigationEnd ) {
            this._urls.length = 0; //Fastest way to clear out array
            this.generateBreadcrumbTrail( navigationEnd.urlAfterRedirects ? navigationEnd.urlAfterRedirects : navigationEnd.url );
         }
      } );
      this.setAllFriendlyName();
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
         //Add url to beginning of array (since the url is being recursively broken down from full url to its parent)
         //if (this.prefix !== url && url.lastIndexOf('/') !== 0)
         this._urls.unshift( url );
      }

      if ( url.lastIndexOf( '/' ) > 0 ) {
         this.generateBreadcrumbTrail( url.substr( 0, url.lastIndexOf( '/' ) ) ); //Find last '/' and add everything before it as a parent route
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
      this.breadcrumbService.hideRouteRegex( '/dashboard' );

      this.breadcrumbService.addFriendlyNameForRoute( '/employees', 'Colaboradores' );
      this.breadcrumbService.addFriendlyNameForRoute( '/employees/add', 'Nuevo' );
      this.breadcrumbService.addFriendlyNameForRoute( '/employees/detail', 'Detalle' );
      this.breadcrumbService.addFriendlyNameForRoute( '/employees/update', 'Actualizar' );
      this.breadcrumbService.hideRouteRegex( '/employees/detail/[0-9]' );
      this.breadcrumbService.hideRouteRegex( '/employees/update/[0-9]' );

      this.breadcrumbService.addFriendlyNameForRoute( '/employees-family-information', 'Familiares' );
      this.breadcrumbService.addFriendlyNameForRoute( '/employees-family-information/add', 'Nuevo' );
      this.breadcrumbService.hideRouteRegex( '/employees-family-information/add/[0-9]' );
      this.breadcrumbService.addFriendlyNameForRoute( '/employees-family-information/detail', 'Detalle' );
      this.breadcrumbService.addFriendlyNameForRoute( '/employees-family-information/update', 'Actualizar' );
      this.breadcrumbService.hideRouteRegex( '/employees-family-information/detail/[0-9]' );
      this.breadcrumbService.hideRouteRegex( '/employees-family-information/update/[0-9]' );
      this.breadcrumbService.hideRouteRegex( '/employees-family-information/update/[0-9]/[0-9]' );

      this.breadcrumbService.addFriendlyNameForRoute( '/employees-references', 'Referencias' );
      this.breadcrumbService.addFriendlyNameForRoute( '/employees-references/add', 'Nuevo' );
      this.breadcrumbService.hideRouteRegex( '/employees-references/add/[0-9]' );
      this.breadcrumbService.addFriendlyNameForRoute( '/employees-references/detail', 'Detalle' );
      this.breadcrumbService.addFriendlyNameForRoute( '/employees-references/update', 'Actualizar' );
      this.breadcrumbService.hideRouteRegex( '/employees-references/detail/[0-9]' );
      this.breadcrumbService.hideRouteRegex( '/employees-references/update/[0-9]' );
      this.breadcrumbService.hideRouteRegex( '/employees-references/update/[0-9]/[0-9]' );

      this.breadcrumbService.addFriendlyNameForRoute( '/employees-formal-studies', 'Estudios Formales' );
      this.breadcrumbService.addFriendlyNameForRoute( '/employees-formal-studies/add', 'Nuevo' );
      this.breadcrumbService.hideRouteRegex( '/employees-formal-studies/add/[0-9]' );
      this.breadcrumbService.addFriendlyNameForRoute( '/employees-formal-studies/detail', 'Detalle' );
      this.breadcrumbService.hideRouteRegex( '/employees-formal-studies/detail/[0-9]' );
      this.breadcrumbService.addFriendlyNameForRoute( '/employees-formal-studies/update', 'Actualizar' );
      this.breadcrumbService.hideRouteRegex( '/employees-formal-studies/update/[0-9]' );
      this.breadcrumbService.hideRouteRegex( '/employees-formal-studies/update/[0-9]/[0-9]' );

      this.breadcrumbService.addFriendlyNameForRoute( '/employees-no-formal-studies', 'Estudios No Formales' );
      this.breadcrumbService.addFriendlyNameForRoute( '/employees-no-formal-studies/add', 'Nuevo' );
      this.breadcrumbService.hideRouteRegex( '/employees-no-formal-studies/add/[0-9]' );
      this.breadcrumbService.addFriendlyNameForRoute( '/employees-no-formal-studies/detail', 'Detalle' );
      this.breadcrumbService.hideRouteRegex( '/employees-no-formal-studies/detail/[0-9]' );
      this.breadcrumbService.addFriendlyNameForRoute( '/employees-no-formal-studies/update', 'Actualizar' );
      this.breadcrumbService.hideRouteRegex( '/employees-no-formal-studies/update/[0-9]' );
      this.breadcrumbService.hideRouteRegex( '/employees-no-formal-studies/update/[0-9]/[0-9]' );

      this.breadcrumbService.addFriendlyNameForRoute( '/employees-location', 'Ubicaciones' );
      this.breadcrumbService.addFriendlyNameForRoute( '/employees-location/add', 'Nuevo' );
      this.breadcrumbService.hideRouteRegex( '/employees-location/add/[0-9]' );
      this.breadcrumbService.addFriendlyNameForRoute( '/employees-location/detail', 'Detalle' );
      this.breadcrumbService.hideRouteRegex( '/employees-location/detail/[0-9]' );
      this.breadcrumbService.addFriendlyNameForRoute( '/employees-location/update', 'Actualizar' );
      this.breadcrumbService.hideRouteRegex( '/employees-location/update/[0-9]' );
      this.breadcrumbService.hideRouteRegex( '/employees-location/update/[0-9]/[0-9]' );

      this.breadcrumbService.addFriendlyNameForRoute( '/employees-work-experience', 'Experiencia laboral' );
      this.breadcrumbService.addFriendlyNameForRoute( '/employees-work-experience/add', 'Nuevo' );
      this.breadcrumbService.hideRouteRegex( '/employees-work-experience/add/[0-9]' );
      this.breadcrumbService.addFriendlyNameForRoute( '/employees-work-experience/detail', 'Detalle' );
      this.breadcrumbService.hideRouteRegex( '/employees-work-experience/detail/[0-9]' );
      this.breadcrumbService.addFriendlyNameForRoute( '/employees-work-experience/update', 'Actualizar' );
      this.breadcrumbService.hideRouteRegex( '/employees-work-experience/update/[0-9]' );
      this.breadcrumbService.hideRouteRegex( '/employees-work-experience/update/[0-9]/[0-9]' );

      this.breadcrumbService.addFriendlyNameForRoute( '/employees-estate', 'Inmuebles' );
      this.breadcrumbService.addFriendlyNameForRoute( '/employees-estate/add', 'Nuevo' );
      this.breadcrumbService.hideRouteRegex( '/employees-estate/add/[0-9]' );
      this.breadcrumbService.addFriendlyNameForRoute( '/employees-estate/detail', 'Detalle' );
      this.breadcrumbService.hideRouteRegex( '/employees-estate/detail/[0-9]' );
      this.breadcrumbService.addFriendlyNameForRoute( '/employees-estate/update', 'Actualizar' );
      this.breadcrumbService.hideRouteRegex( '/employees-estate/update/[0-9]' );
      this.breadcrumbService.hideRouteRegex( '/employees-estate/update/[0-9]/[0-9]' );

      this.breadcrumbService.addFriendlyNameForRoute( '/employees-vehicle', 'Vehiculos' );
      this.breadcrumbService.addFriendlyNameForRoute( '/employees-vehicle/add', 'Nuevo' );
      this.breadcrumbService.hideRouteRegex( '/employees-vehicle/add/[0-9]' );
      this.breadcrumbService.addFriendlyNameForRoute( '/employees-vehicle/detail', 'Detalle' );
      this.breadcrumbService.hideRouteRegex( '/employees-vehicle/detail/[0-9]' );
      this.breadcrumbService.addFriendlyNameForRoute( '/employees-vehicle/update', 'Actualizar' );
      this.breadcrumbService.hideRouteRegex( '/employees-vehicle/update/[0-9]' );
      this.breadcrumbService.hideRouteRegex( '/employees-vehicle/update/[0-9]/[0-9]' );

      this.breadcrumbService.addFriendlyNameForRoute( '/constantes', 'Constantes' );
      this.breadcrumbService.addFriendlyNameForRoute( '/constantes/add', 'Nuevo' );
      this.breadcrumbService.addFriendlyNameForRoute( '/constantes/detail', 'Detalle' );
      this.breadcrumbService.hideRouteRegex( '/constantes/detail/[0-9]' );
      this.breadcrumbService.addFriendlyNameForRoute( '/constantes/edit', 'Actualizar' );
      this.breadcrumbService.hideRouteRegex( '/constantes/edit/[0-9]' );

      this.breadcrumbService.addFriendlyNameForRoute( '/listas', 'Listas' );
      this.breadcrumbService.addFriendlyNameForRoute( '/listas/add', 'Nuevo' );
      this.breadcrumbService.addFriendlyNameForRoute( '/listas/detail', 'Detalle' );
      this.breadcrumbService.hideRouteRegex( '/listas/detail/[0-9]' );
      this.breadcrumbService.addFriendlyNameForRoute( '/listas/edit', 'Actualizar' );
      this.breadcrumbService.hideRouteRegex( '/listas/edit/[0-9]' );

      this.breadcrumbService.addFriendlyNameForRoute( '/centroCostos', 'Centros de Costo' );
      this.breadcrumbService.addFriendlyNameForRoute( '/centroCostos/add', 'Nuevo' );
      this.breadcrumbService.addFriendlyNameForRoute( '/centroCostos/detail', 'Detalle' );
      this.breadcrumbService.hideRouteRegex( '/centroCostos/detail/[0-9]' );
      this.breadcrumbService.addFriendlyNameForRoute( '/centroCostos/edit', 'Actualizar' );
      this.breadcrumbService.hideRouteRegex( '/centroCostos/edit/[0-9]' );

      this.breadcrumbService.addFriendlyNameForRoute( '/gruposGestion', 'Grupos de Gestion' );
      this.breadcrumbService.addFriendlyNameForRoute( '/gruposGestion/add', 'Nuevo' );
      this.breadcrumbService.addFriendlyNameForRoute( '/gruposGestion/detail', 'Detalle' );
      this.breadcrumbService.hideRouteRegex( '/gruposGestion/detail/[0-9]' );
      this.breadcrumbService.addFriendlyNameForRoute( '/gruposGestion/edit', 'Actualizar' );
      this.breadcrumbService.hideRouteRegex( '/gruposGestion/edit/[0-9]' );

      this.breadcrumbService.addFriendlyNameForRoute( '/roles', 'Roles' );
      this.breadcrumbService.addFriendlyNameForRoute( '/roles/add', 'Nuevo' );
      this.breadcrumbService.addFriendlyNameForRoute( '/roles/detail', 'Detalle' );
      this.breadcrumbService.hideRouteRegex( '/roles/detail/[0-9]' );
      this.breadcrumbService.addFriendlyNameForRoute( '/roles/update', 'Actualizar' );
      this.breadcrumbService.hideRouteRegex( '/roles/update/[0-9]' );
      this.breadcrumbService.hideRouteRegex( '/roles/update/[0-9]/[0-9]' );

      this.breadcrumbService.addFriendlyNameForRoute( '/roles-funcionalities-config/[0-9]', 'Roles Funcionalidades' );

      this.breadcrumbService.addFriendlyNameForRoute( '/usuarios', 'Usuarios' );
      this.breadcrumbService.addFriendlyNameForRoute( '/usuarios/add', 'Nuevo' );
      this.breadcrumbService.addFriendlyNameForRoute( '/usuarios/detail', 'Detalle' );
      this.breadcrumbService.hideRouteRegex( '/usuarios/detail/[0-9]' );
      this.breadcrumbService.addFriendlyNameForRoute( '/usuarios/edit', 'Actualizar' );
      this.breadcrumbService.hideRouteRegex( '/usuarios/edit/[0-9]' );
      this.breadcrumbService.hideRouteRegex( '/usuarios/edit/[0-9]/[0-9]' );

      this.breadcrumbService.addFriendlyNameForRoute( '/user-session', 'Cambio de contraseña' );

      this.breadcrumbService.addFriendlyNameForRoute( '/tipoArea', 'Tipos de Area' );
      this.breadcrumbService.addFriendlyNameForRoute( '/tipoArea/add', 'Nuevo' );
      this.breadcrumbService.addFriendlyNameForRoute( '/tipoArea/detail', 'Detalle' );
      this.breadcrumbService.hideRouteRegex( '/tipoArea/detail/[0-9]' );
      this.breadcrumbService.addFriendlyNameForRoute( '/tipoArea/edit', 'Actualizar' );
      this.breadcrumbService.hideRouteRegex( '/tipoArea/edit/[0-9]' );

      this.breadcrumbService.addFriendlyNameForRoute( '/divisionPolitica', 'División Política' );
      this.breadcrumbService.addFriendlyNameForRoute( '/ocupaciones', 'ocupaciones' );
      this.breadcrumbService.addFriendlyNameForRoute( '/actividadeconomica', 'Actividades Económicas' );

      this.breadcrumbService.addFriendlyNameForRoute( '/faults', 'Faltas y Sanciones' );
      this.breadcrumbService.addFriendlyNameForRoute( '/faults/add', 'ocupaciones' );
      this.breadcrumbService.addFriendlyNameForRoute( '/faults/update', 'Actualizar' );
      this.breadcrumbService.hideRouteRegex( '/faults/update/[0-9]' );

      this.breadcrumbService.addFriendlyNameForRoute( '/faults', 'Faltas y Sanciones' );
      this.breadcrumbService.addFriendlyNameForRoute( '/faults/add', 'ocupaciones' );
      this.breadcrumbService.addFriendlyNameForRoute( '/faults/update', 'Actualizar' );
      this.breadcrumbService.hideRouteRegex( '/faults/update/[0-9]' );

      this.breadcrumbService.addFriendlyNameForRoute( '/positions', 'Cargos' );
      this.breadcrumbService.addFriendlyNameForRoute( '/positions/add', 'ocupaciones' );
      this.breadcrumbService.addFriendlyNameForRoute( '/positions/update', 'Actualizar' );
      this.breadcrumbService.hideRouteRegex( '/positions/update/[0-9]' );

      this.breadcrumbService.addFriendlyNameForRoute( '/organizational-structure', 'Estructura Organizacional' );
      this.breadcrumbService.addFriendlyNameForRoute( '/widgets', 'Widgets' );
      this.breadcrumbService.addFriendlyNameForRoute( '/form-manager', 'Administrador de Formularios' );
      this.breadcrumbService.addFriendlyNameForRoute( '/menus', 'Menues' );

   }

}
