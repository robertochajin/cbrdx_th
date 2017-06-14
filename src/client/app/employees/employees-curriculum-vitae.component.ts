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
import { LocationService } from '../_services/employee-location.service';
import { Localizaciones } from '../_models/localizaciones';
import { FormalStudies } from '../employees-academic-education/formal-studies';
import { AcademicEducationService } from '../_services/academic-education.service';
import { Noformalstudies } from '../employees-academic-education/no-formal-studies';
import { Workexperience } from '../_models/work-experience';
import { WorkExperienceService } from '../_services/work-experience.service';
import { References } from '../employees-references/references';
import { ReferencesService } from '../employees-references/references.service';
import { DivisionPoliticaService } from '../_services/divisionPolitica.service';

@Component( {
               moduleId: module.id,
               selector: 'employees-curriculum-vitae',
               templateUrl: 'employees-curriculum-vitae.component.html',
               styleUrls: [ 'employees-curriculum-vitae.component.css' ],

            } )

export class EmployeesCurriculumVitaeComponent implements OnInit {
   @Input()
   employee: Employee = new Employee();
   acordion: number;
   contacts: EmployeesContact[] = [];
   relationship: SelectItem[] = [];
   fstudy: FormalStudies = new FormalStudies();
   fstudies: FormalStudies[]=[];
   study: Noformalstudies = new Noformalstudies();
   nfstudies: Noformalstudies[]=[];
   experience: Workexperience = new Workexperience();
   experiences: Workexperience[] = [];
   reference: References = new References();
   references: References[];
   gentilicio = '';
   meses: any[] = [];
   direcccionResidencia:string='';
   fechaNacimicento:string='';

   constructor( private employeeService: EmployeesService,
      private route: ActivatedRoute,
      private location: Location,
      private listaService: ListaService,
      private locationService: LocationService,
      private academicEducationService: AcademicEducationService,
      private workExperienceService: WorkExperienceService,
      private referencesService: ReferencesService,
      private divisionPoliticaService: DivisionPoliticaService,
      private employeesContactService: EmployeesContactService,
      private _nav: NavService,
      private router: Router ) {
      this.listaService.getMasterDetails( 'ListasParentescos' ).subscribe( res => {
         this.relationship.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.relationship.push( { label: s.nombre, value: s.idLista } );
         } );
      } );
      this.meses.push( { "numero": "01", "mes": "enero" } );
      this.meses.push( { "numero": "02", "mes": "febrero" } );
      this.meses.push( { "numero": "03", "mes": "marzo" } );
      this.meses.push( { "numero": "04", "mes": "abril" } );
      this.meses.push( { "numero": "05", "mes": "mayo" } );
      this.meses.push( { "numero": "06", "mes": "junio" } );
      this.meses.push( { "numero": "07", "mes": "julio" } );
      this.meses.push( { "numero": "08", "mes": "agosto" } );
      this.meses.push( { "numero": "09", "mes": "septiembre" } );
      this.meses.push( { "numero": "10", "mes": "octubre" } );
      this.meses.push( { "numero": "11", "mes": "noviembre" } );
      this.meses.push( { "numero": "12", "mes": "diciembre" } );
   }

   ngOnInit(): void {
      this.route.params.subscribe( ( params: Params ) => {
         this.employeeService.get( +params[ 'id' ] ).subscribe( employee => {
            this.employee = employee;
            this.employee.nombreCompleto = this.employee.primerNombre + ' ' +
                                           this.employee.segundoNombre + ' ' +
                                           this.employee.primerApellido + ' ' +
                                           this.employee.segundoApellido;

            let fch =employee.fechaNacimiento.toString().split('-');
            let tmpMmes = fch[1];
            let temp= this.meses.find(f=> f.numero===tmpMmes).mes;
            this.fechaNacimicento= temp+' '+ fch[2]+' de '+ fch[0];

            this.divisionPoliticaService.viewDivisionPolitica( this.employee.idCiudadNacimiento ).subscribe( rest => {
               this.gentilicio = rest.gentilicio;
            } );
            this.listaService.getMasterDetails( 'ListasTiposDocumentos' ).subscribe( res => {
               let temp = res.find( t => t.idLista === this.employee.idTipoDocumento ).codigo;
               this.employee.tipoDocumento = temp;
            } );
            this.locationService.getAllResiden(this.employee.idTercero).subscribe(res=>{
               if(res.length>0){
                  this.direcccionResidencia= res[0].direccion;
               }
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
         this.academicEducationService.getAllFormalByEmployee( +params[ 'id' ] ).subscribe(
            fstudies => {
               for(let fs of fstudies){
                  let temp = fs.fechaIngresa.split( '-' )[ 1 ];
                  let tempMes = this.meses.find( m => m.numero === temp ).mes;
                  fs.fechaIngresa= tempMes+' de '+ fs.fechaIngresa.split( '-' )[ 0 ];
                  if ( fs.fechaTermina !== null && fs.fechaTermina !== undefined ) {
                     let temp2 = fs.fechaTermina.split( '-' )[ 1 ];
                     let tempMes2 = this.meses.find( m => m.numero === temp ).mes;
                     fs.fechaTermina = tempMes + ' de ' + fs.fechaTermina.split( '-' )[ 0 ];
                  }else{
                     fs.fechaTermina='Actualmente';
                  }
                  this.fstudies.push( fs );
               }
            });
         this.academicEducationService.getAllNoFormalByEmployee( +params[ 'id' ] ).subscribe(
            nfstudies => {
               for(let nfs of nfstudies){
                  let temp = nfs.fechaIngresa.split( '-' )[ 1 ];
                  let tempMes = this.meses.find( m => m.numero === temp ).mes;
                  nfs.fechaIngresa= tempMes+' de '+ nfs.fechaIngresa.split( '-' )[ 0 ];
                  if ( nfs.fechaTermina !== null && nfs.fechaTermina !== undefined ) {
                     let temp2 = nfs.fechaTermina.split( '-' )[ 1 ];
                     let tempMes2 = this.meses.find( m => m.numero === temp ).mes;
                     nfs.fechaTermina = tempMes + ' de ' + nfs.fechaTermina.split( '-' )[ 0 ];
                  }else{
                     nfs.fechaTermina='Actualmente';
                  }
                  this.nfstudies.push( nfs );
               }
            });
         this.workExperienceService.getByEmployee( +params[ 'id' ] ).subscribe(
            wexp => {
               for ( let e of wexp ) {
                  let temp = e.fechaIngresa.split( '-' )[ 1 ];
                  let tempMes = this.meses.find( m => m.numero === temp ).mes;
                  e.fechaIngresa = tempMes +' '+e.fechaIngresa.split( '-' )[ 2 ]+ ' de ' + e.fechaIngresa.split( '-' )[ 0 ];
                  if ( e.fechaTermina !== null && e.fechaTermina !== undefined ) {
                     let temp2 = e.fechaTermina.split( '-' )[ 1 ];
                     let tempMes2 = this.meses.find( m => m.numero === temp ).mes;
                     e.fechaTermina = tempMes +' '+e.fechaTermina.split( '-' )[ 2 ]+ ' de ' + e.fechaTermina.split( '-' )[ 0 ];
                  }else{
                     e.fechaTermina='Actualmente';
                  }
                  this.experiences.push( e );
               }
            } );
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
      } );

   }

   goBack(): void {
      this.location.back();
   }

}

