import { Component, OnInit } from '@angular/core';
import { PersonnelRequirement } from '../_models/personnelRequirement';
import { PersonnelRequirementServices } from '../_services/personnelRequirement.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ConfirmationService } from 'primeng/primeng';
import { Usuario } from '../_models/usuario';
import { Employee } from '../_models/employees';
import { JwtHelper } from 'angular2-jwt';
import { UsuariosService } from '../_services/usuarios.service';
import { EmployeesService } from '../_services/employees.service';
import { Positions } from '../_models/positions';
import { PositionsService } from '../_services/positions.service';

@Component( {
               moduleId: module.id,
               templateUrl: 'personnel-requirement-form.component.html',
               selector: 'personnel-requirement-add',
               providers: [ ConfirmationService ]
            } )

export class PersonnelRequirementAddComponent implements OnInit {

   user: Usuario = new Usuario();
   employee: Employee = new Employee();
   position: Positions = new Positions();
   tokendecoded: any = { sub: '', usuario: '', nombre: '' };
   jwtHelper: JwtHelper = new JwtHelper();
   personnelRequirement: PersonnelRequirement = new PersonnelRequirement();
   idUser: number;

   constructor( private personnelRequirementServices: PersonnelRequirementServices,
      private router: Router,
      private usuariosService: UsuariosService,
      private employeesService: EmployeesService,
      private positionsService: PositionsService,
      private location: Location,
      private confirmationService: ConfirmationService ) {
   }

   ngOnInit() {
      let token = localStorage.getItem( 'token' );

      if ( token !== null && token !== undefined ) {
         this.tokendecoded = this.jwtHelper.decodeToken( token );
         this.usuariosService.viewUser(this.tokendecoded.usuario.idUsuario).subscribe(u => {
            this.user = u;
            this.employeesService.get(this.user.idTercero).subscribe(e => {this.employee = e;});
            this.positionsService.getEnabledByEmployee(this.user.idTercero).subscribe(p => {this.position = p;});
         });

      } else {
         this.location.back();
      }
   }

   onSubmit(){

   }

   goBack(): void {
      this.confirmationService.confirm( {
                                           message: ` ¿Esta seguro que desea salir sin guardar?`,
                                           header: 'Corfirmación',
                                           icon: 'fa fa-question-circle',
                                           accept: () => {
                                              this.location.back();
                                           }
                                        } );
   }
}
