import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { VPersonnelRequirement } from '../_models/vPersonnelRequirement';
import { EmployeesService } from '../_services/employees.service';
import { UsuariosService } from '../_services/usuarios.service';
import { JwtHelper } from 'angular2-jwt';
import { Usuario } from '../_models/usuario';
import { Employee } from '../_models/employees';
import { ListaItem } from '../_models/listaItem';
import { ListaService } from '../_services/lista.service';
import { Message } from 'primeng/primeng';
import { NavService } from '../_services/_nav.service';
import { PersonnelRequirementServices } from '../_services/personnelRequirement.service';

class employeeBasicInfo {
   idTercero: number;
   nombreCompleto: string;
   idCargo: number;
   cargo: string;
   idArea: number;
   area: string;
   direccionGeneral: string;
   correoTercero: string;
   correoUsuario: string;
};

@Component( {
               moduleId: module.id,
               templateUrl: 'personnel-requirement-detail.component.html',
               selector: 'personnel-requirement'
            } )
export class PersonnelRequirementDetailComponent {

   vPersonnelRequirement: VPersonnelRequirement = new VPersonnelRequirement();
   tokendecoded: any = { sub: '', usuario: '', nombre: '' };
   jwtHelper: JwtHelper = new JwtHelper();
   user: Usuario = new Usuario();
   employee: Employee = new Employee();
   employeeBasics: employeeBasicInfo = new employeeBasicInfo();
   private listRT: ListaItem[] = [];
   msg: Message;

   constructor( private personnelRequirementServices: PersonnelRequirementServices,
      private router: Router,
      private usuariosService: UsuariosService,
      private listaService: ListaService,
      private employeesService: EmployeesService,
      private _nav: NavService,
      private location: Location,
      private route: ActivatedRoute ) {

      listaService.getMasterDetails( 'ListasTiposSolicitudes' ).subscribe( res => {
         this.listRT = res;
      }, error => {
         this._nav.setMesage( 3, this.msg );
      } );


   }
   ngOnInit(){
      // this.route.params.switchMap( ( params: Params ) => this.personnelRequirementServices.getByIdRequirement( +params[ 'id' ] ) )
      // .subscribe( data => {
      //    this.vPersonnelRequirement = data;
      // } );
      let token = localStorage.getItem( 'token' );
      if ( token !== null && token !== undefined ) {
         this.tokendecoded = this.jwtHelper.decodeToken( token );
         this.usuariosService.viewUser( this.tokendecoded.usuario.idUsuario ).subscribe( u => {
            this.user = u;
            if ( this.user.idTercero ) {
               this.employeesService.getInfoPositionEmployee( this.user.idTercero ).subscribe( e => {
                  if ( e !== undefined ) {
                     this.employeeBasics = e;
                  }
               } );
            }
         } );

      } else {
         this.location.back();
      }
   }
   goBack(): void {
      this.router.navigate( [ 'employees-estate' ] );
   }
}
