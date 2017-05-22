import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuariosService } from '../_services/usuarios.service';
import { Usuario } from '../_models/usuario';
import 'rxjs/add/operator/switchMap';
import { VUsuarioRol } from '../_models/vUsuarioRol';
import { VUsuarioGrupoGestion } from '../_models/vUsuarioGrupoGestion';
import { VHistoricoUsuario } from '../_models/vHistoricoUsuario';
import { EmployeesService } from '../_services/employees.service';
import { LocationService } from '../_services/employee-location.service';
import { Employee } from '../_models/employees';
import { Localizaciones } from '../_models/localizaciones';
import * as moment from 'moment/moment';

@Component( {
               moduleId: module.id,
               selector: 'usuario-detail',
               templateUrl: './usuario-detail.component.html',
            } )

export class UsuarioDetailComponent {

   usuario: Usuario = new Usuario();
   tercero: Employee = new Employee();
   curRoles: VUsuarioRol[] = [];
   curGrupos: VUsuarioGrupoGestion[] = [];
   historico: VHistoricoUsuario[] = [];
   private locations: Localizaciones[] = [];

   constructor( private usuariosService: UsuariosService,
      private tercerosService: EmployeesService,
      private locationService: LocationService,
      private router: Router,
      private route: ActivatedRoute ) {
      route.params.switchMap( ( params: Params ) => usuariosService.viewUser( +params[ 'id' ] ) )
      .subscribe( data => {
         this.usuario = data;
         this.updateRolesLists();
         this.updateHistoric();
         this.updateGroupLists();
         tercerosService.get( this.usuario.idTercero ).subscribe( res => {
            this.tercero = res;
            this.tercero.nombreCompleto = this.tercero.primerNombre + ' ' +
               this.tercero.segundoNombre + ' ' +
               this.tercero.primerApellido + ' ' +
               this.tercero.segundoApellido;
            this.tercero.edad = moment( this.tercero.fechaNacimiento, 'YYYY-MM-DD' ).toNow( true ).toString();
            this.locationService.getAllResiden( this.usuario.idTercero ).subscribe( locations => this.locations = locations );
         } );
      } );

   }

   goBack(): void {
      this.router.navigate( [ 'usuarios' ] );
   }

   updateRolesLists() {
      this.usuariosService.readUserRoles( this.usuario.idUsuario ).subscribe( res => {
         this.curRoles = res;
      } );
   }

   updateGroupLists() {
      this.usuariosService.readUserGroups( this.usuario.idUsuario ).subscribe( res => {
         this.curGrupos = res;
      } );
   }

   updateHistoric() {
      this.usuariosService.listHistory( this.usuario.idUsuario ).subscribe( res => {
         this.historico = res;
      } );
   }
}
