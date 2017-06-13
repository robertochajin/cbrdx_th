import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeesLocation } from '../_models/employee-location';
import { Localizaciones } from '../_models/localizaciones';
import { ConfirmationService } from 'primeng/primeng';
import { LocationService } from '../_services/employee-location.service';
import { LocateService } from '../_services/locate.service';
import { NavService } from '../_services/_nav.service';

@Component( {
               moduleId: module.id,
               templateUrl: 'employee-location.component.html',
               selector: 'employees-locations',
               providers: [ ConfirmationService ]
            } )
export class LocationComponent implements OnInit {

   @Input() colaborador: any;

   employeesLocations: Localizaciones[];
   terceroLocalizacion: EmployeesLocation = new EmployeesLocation();
   dialogObjet: EmployeesLocation = new EmployeesLocation();
   busqueda: string;

   constructor( private locationService: LocationService,
      private router: Router,
      private locateService: LocateService,
      private _nav: NavService,
      private confirmationService: ConfirmationService,
      private route: ActivatedRoute ) {
      this.busqueda = this._nav.getSearch( 'employee-location.component' );
   }

   ngOnInit() {
      this.locationService.getAllByEmployee( this.colaborador.idTercero ).subscribe(
         employeesLocations => this.employeesLocations = employeesLocations
      );
   }

   del( f: Localizaciones ) {
      this.confirmationService.confirm( {
                                           message: ` ¿Está seguro que desea inactivar el registro?`,
                                           header: 'Confirmación',
                                           icon: 'fa fa-question-circle',
                                           accept: () => {
                                              f.indicadorHabilitado = false;
                                              this.locateService.update( f ).subscribe( res => {
                                                 this.locationService.get( f.idLocalizacion ).subscribe( tl => {
                                                    this.terceroLocalizacion = tl;
                                                    this.terceroLocalizacion.indicadorHabilitado = false;
                                                    this.locationService.update( this.terceroLocalizacion ).subscribe(
                                                       data => {
                                                          this.employeesLocations.splice( this.employeesLocations.indexOf( f ), 1 );
                                                       } );
                                                 } );
                                              } );
                                           }
                                        } );
   }

   add() {
      this.router.navigate( [ 'employees/detail/' + this.colaborador.idTercero + '/location/add/' ] );
   }

   detail( l: any ) {
      this.router.navigate( [ 'employees/detail/' + this.colaborador.idTercero + '/location/detail/' + l.idLocalizacion ] );
   }

   update( l: any ) {
      this.router.navigate( [ 'employees/detail/' + this.colaborador.idTercero + '/location/update/' + l.idLocalizacion ] );
   }
   setSearch() {
      this._nav.setSearch( 'employee-location.component', this.busqueda );
   }
}
