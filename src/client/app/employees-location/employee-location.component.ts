import { Component, OnInit, Input } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { EmployeesLocation } from "../_models/employee-location";
import { Localizaciones } from "../_models/localizaciones";
import { ConfirmationService } from "primeng/primeng";
import { LocationService } from "../_services/employee-location.service";
import { LocateService } from "../_services/locate.service";

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
   
   constructor( private locationService: LocationService,
                private router: Router,
                private locateService: LocateService,
                private confirmationService: ConfirmationService,
                private route: ActivatedRoute ) {
   }
   
   ngOnInit() {
      this.locationService.getAllByEmployee( this.colaborador.idTercero ).subscribe(
         employeesLocations => this.employeesLocations = employeesLocations
      );
   }
   
   del( f: Localizaciones ) {
      this.confirmationService.confirm( {
                                           message: ` ¿Esta seguro que desea eliminar?`,
                                           header: 'Corfirmación',
                                           icon: 'fa fa-question-circle',
                                           accept: () => {
                                              console.log( f );
            
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
                                           }, reject: () => {
         }
                                        } );
   }
   
   detail( l: any ) {
      this.router.navigate( [ 'employees-location/detail/' + l.idLocalizacion ] );
   }
   
   add() {
      this.router.navigate( [ 'employees-location/add/' + this.colaborador.idTercero ] );
   }
   
   update( l: any ) {
      this.router.navigate( [ 'employees-location/update/' + l.idLocalizacion + '/' + this.colaborador.idTercero ] );
   }
}
