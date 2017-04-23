import "rxjs/add/operator/switchMap";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Message, ConfirmationService } from "primeng/primeng";
import { Location }                 from '@angular/common';

import { EmployeesService } from "../_services/employees.service";
import { Employee } from "../_models/employees";

import { Usuario } from "../_models/usuario";
import { UsuariosService } from "../_services/usuarios.service";

@Component( {
               moduleId: module.id,
               selector: 'userSession',
               templateUrl: 'userSession.component.html',
               providers: [ ConfirmationService ],
               styleUrls: ['userSession.component.css'],
            } )

export class UserSessionComponent implements OnInit {
   
   employee: Employee = new Employee();
   user: Usuario = new Usuario();
   acordion: number;
   msgs: Message[] = [];
   
   constructor( private employeeService: EmployeesService,
                private usuariosService: UsuariosService,
                private route: ActivatedRoute,
                private location: Location,
                private router: Router,
                private confirmationService: ConfirmationService ) {
   }
   
   ngOnInit(): void {
      let idColaborador = 129;
      this.employeeService.get( idColaborador ).subscribe( employee => {
         this.employee = employee;
         this.employee.nombreCompleto = this.employee.primerNombre + ' ' +
            this.employee.segundoNombre + ' ' +
            this.employee.primerApellido + ' ' +
            this.employee.segundoApellido;
      } );
      this.usuariosService.viewUser( idColaborador ).subscribe(data => {
         this.user = data;
      });
   }
   
   goBack(): void {
      this.location.back();
   }
   
}

