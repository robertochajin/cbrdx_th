import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { EmployeesService } from '../_services/employees.service';
import { Employee } from '../_models/employees';
import { NavService } from '../_services/_nav.service';
import { EmployeesContactService } from '../_services/employees-contact.service';
import { EmployeesContact } from '../_models/employeesContactList';
import { SelectItem } from 'primeng/primeng';
import { ListaItem } from '../_models/listaItem';
import { ListaService } from '../_services/lista.service';
import { FamilyInformationService } from '../employees-family-information/family-information.service';
import { ConstructorFamilyInformation } from '../employees-family-information/family-information.construct';
import { LocationService } from '../_services/employee-location.service';
import * as moment from 'moment/moment';
import { Localizaciones } from '../_models/localizaciones';
import { EmployeeEstate } from '../_models/employee-estate';
import { EmployeeEstateService } from '../_services/employee-estate.service';
import { EmployeeVehicle } from '../_models/employee-vehicle';
import { EmployeeVehicleService } from '../_services/employee-vehicles.service';
import { FormalStudies } from '../employees-academic-education/formal-studies';
import { AcademicEducationService } from '../_services/academic-education.service';
import { Noformalstudies } from '../employees-academic-education/no-formal-studies';
import { Workexperience } from '../_models/work-experience';
import { WorkExperienceService } from '../_services/work-experience.service';
import { References } from '../_models/references';
import { ReferencesService } from '../_services/references.service';
import { ClinicalInformationService } from '../_services/clinical-information.service';
import { EmployeesClinicalData } from '../_models/employeesClinicalData';
import { DivisionPoliticaService } from '../_services/divisionPolitica.service';

@Component( {
               moduleId: module.id,
               selector: 'employees-view-detail',
               templateUrl: 'employees-view-detail.component.html'
            } )

export class EmployeesViewDetailComponent implements OnInit {
   @Input()
   employee: Employee = new Employee();
   acordion: number;
   contacts: EmployeesContact[] = [];
   relationship: SelectItem[] = [];
   familyInformation: ConstructorFamilyInformation = new ConstructorFamilyInformation();
   familyInformations: ConstructorFamilyInformation[];
   employeesLocations: Localizaciones[];
   employeesEstate: EmployeeEstate[];
   employeesVehicle: EmployeeVehicle[];
   fstudy: FormalStudies = new FormalStudies();
   fstudies: FormalStudies[];
   study: Noformalstudies = new Noformalstudies();
   nfstudies: Noformalstudies[];
   experience: Workexperience = new Workexperience();
   experiences: Workexperience[];
   reference: References = new References();
   references: References[];
   clinicalInformations: EmployeesClinicalData[];
   gentilicio='';

   constructor( private employeeService: EmployeesService,
      private route: ActivatedRoute,
      private location: Location,
      private listaService: ListaService,
      private locationService: LocationService,
      private employeesEstateService: EmployeeEstateService,
      private employeesVehicleService: EmployeeVehicleService,
      private academicEducationService: AcademicEducationService,
      private workExperienceService: WorkExperienceService,
      private referencesService: ReferencesService,
      private divisionPoliticaService: DivisionPoliticaService,
      private clinicalInformationService: ClinicalInformationService,
      private employeesContactService: EmployeesContactService,
      private familyInformationService: FamilyInformationService,
      private _nav: NavService,
      private router: Router ) {
      this.listaService.getMasterDetails( 'ListasParentescos' ).subscribe( res => {
         this.relationship.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.relationship.push( { label: s.nombre, value: s.idLista } );
         } );
      } );
   }

   ngOnInit(): void {
      this.route.params.subscribe( ( params: Params ) => {
         this.employeeService.get( +params[ 'id' ] ).subscribe( employee => {
            this.employee = employee;
            this.employee.nombreCompleto = this.employee.primerNombre + ' ' +
                                           this.employee.segundoNombre + ' ' +
                                           this.employee.primerApellido + ' ' +
                                           this.employee.segundoApellido;

            this.divisionPoliticaService.viewDivisionPolitica(this.employee.idCiudadNacimiento).subscribe(rest=>{
               this.gentilicio= rest.gentilicio;
            });

         } );
         this.employeesContactService.getByEmployee( +params[ 'id' ] ).subscribe(
            contacts => {
               for ( let c of contacts ) {
                  let bandera = false;
                  let label = '';
                  for ( let ct of this.relationship ) {
                     if ( c.idListaParentesco === ct.value ) {
                        label = ct.label;
                        bandera = true;
                        break;
                     }
                  }
                  if ( bandera ) {
                     c.nombreListaParentesco = label;
                     this.contacts.push( c );
                  }
               }
            }
         );
         this.locationService.getAllByEmployee( +params[ 'id' ] ).subscribe(
            employeesLocations => this.employeesLocations = employeesLocations
         );
         this.familyInformationService.getAllByEmployee( +params[ 'id' ] ).subscribe(
            familyInformations => {
               this.familyInformations = familyInformations;
               this.familyInformations.forEach( e => {
                  e.nombreCompleto = e.primerNombre + ' ' + e.segundoNombre + ' ' + e.primerApellido + ' ' + e.segundoApellido;
                  e.edad = moment( e.fechaNacimiento, 'YYYY-MM-DD' ).toNow( true ).toString();
               } );
            }
         );
         this.employeesEstateService.getByEmployee( +params[ 'id' ] ).subscribe(
            employeesEstate => {
               this.employeesEstate = employeesEstate;

            }
         );
         this.employeesVehicleService.getByIdTercero( +params[ 'id' ] ).subscribe(
            employeesVehicle => {
               this.employeesVehicle = employeesVehicle;

            }
         );
         this.academicEducationService.getAllFormalByEmployee( +params[ 'id' ] ).subscribe(
            fstudies => this.fstudies = fstudies
         );
         this.academicEducationService.getAllNoFormalByEmployee( +params[ 'id' ] ).subscribe(
            nfstudies => this.nfstudies = nfstudies
         );
         this.workExperienceService.getByEmployee( +params[ 'id' ] ).subscribe(
            wexp => this.experiences = wexp
         );
         this.referencesService.getAllgetAllByEmployee( +params[ 'id' ] ).subscribe(
            references => {
               this.references = references;
               this.references.forEach( function ( obj, index ) {
                  obj.nombreCompleto = obj.primerNombre + ' ' + obj.segundoNombre + ' ' + obj.primerApellido + ' ' + obj.segundoApellido;
                  if ( obj.telefonoFijo === null ) {
                     obj.numeroContacto = obj.telefonoMovil;
                  }
                  if ( obj.telefonoMovil === null ) {
                     obj.numeroContacto = obj.telefonoFijo;
                  }
                  if ( obj.telefonoMovil !== null && obj.telefonoFijo !== null ) {
                     obj.numeroContacto = obj.telefonoFijo + ' /  ' + obj.telefonoMovil;
                  }
               } );
            }
         );
         this.clinicalInformationService.getAllByEmployee( +params[ 'id' ] )
         .subscribe( employeesClinicalData => this.clinicalInformations = employeesClinicalData );
      } );

   }

   goBack(): void {
      this.location.back();
   }

   // onTabShow( e: any ) {
   //    this._nav.setTab( e.index );
   //    this.acordion = this._nav.getTab();
   //
   //    // Focus  en accordionTab Activo
   //    setTimeout( () => {
   //       jQuery( 'body' ).animate({
   //                                   scrollTop : jQuery( 'p-accordiontab > .ui-state-active' ).position().top + 90
   //                                }, 'fast');
   //    }, 1000 );
   //
   // }
}

