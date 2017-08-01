import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Employee } from '../_models/employees';
import { Message } from 'primeng/primeng';
import { EmployeesService } from '../_services/employees.service';
import { ListEmployeesService } from '../_services/lists-employees.service';
import { NavService } from '../_services/_nav.service';
import { PermissionsEmployees } from '../_models/permissionsEmployees';

@Component( {
               moduleId: module.id,
               selector: 'employees-contact',
               templateUrl: 'employees-contact.component.html',
               providers: []
            } )

export class EmployeesContactComponent implements OnInit {
   @Input() employee: Employee;
   @Input() seccion: PermissionsEmployees;

   msgs: Message[] = [];
   tel: boolean = false;
   cel: boolean = true;
   defaultCampo = { visible: true, editable: true };

   constructor( private employeesService: EmployeesService,
      private route: ActivatedRoute,
      private router: Router,
      private location: Location,
      private listEmployeesService: ListEmployeesService,
      private _nav: NavService ) {

   }

   ngOnInit() {
      this.validarTelefono();
   }
   onSubmit() {
      this.msgs = [];
      this.employeesService.update( this.employee )
      .subscribe( data => {
         this._nav.setMesage( 1, this.msgs );
      }, error => {
         this._nav.setMesage( 3, this.msgs );
      } );

   }

   /*getimc(): void {
    if (this.employee.peso !== null && this.employee.talla !== null) {
    if (!isNaN(this.employee.peso) && !isNaN(this.employee.talla)) {
    var imc = (this.employee.peso / Math.pow((this.employee.talla / 100), 2));
    this.employee.imc = Number(imc.toFixed(2));
    }
    }
    }

    inputNumberPeso() {
    var peso = this.employee.peso+'';
    if (this.employee.peso !== null) {
    this.employee.peso = Number(peso.replace(/[^0-9]/g, ''));
    }
    }

    inputNumber() {
    var size = this.employee.talla+'';
    if (this.employee.talla !== null) {
    this.employee.talla = Number(size.replace(/[^0-9]/g, ''));
    }
    }*/
   validarTelefono() {
      let tel = this.employee.telefonoFijo;
      if ( tel !== undefined ) {
         let telcel = tel.replace( /[^0-9]/g, '' ).length;
         if ( telcel >= 7 ) {
            this.cel = false;
         } else {
            this.cel = true;
         }
      } else {
         this.cel = true;
      }
   }

   /*validarCelular() {
    let cel = this.employee.telefonoCelular;
    if(cel  !== undefined) {
    let telcel = cel.replace( /[^0-9]/g, '' ).length;
    if ( telcel === 10 ) {
            this.tel = false;
    } else {
    this.tel = true;
         }
      }
    }*/
   correoMinusculas() {
      if ( this.employee.correoElectronico !== null &&
           this.employee.correoElectronico !== undefined && this.employee.correoElectronico !== '' ) {
         this.employee.correoElectronico = this.employee.correoElectronico.toLowerCase();
      }
   }
}
