import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../_services/usuarios.service';
import { Usuario } from '../_models/usuario';
import 'rxjs/add/operator/switchMap';
import { RolesService } from '../_services/roles.service';
import { ListaService } from '../_services/lista.service';
import { Lista } from '../_models/lista';
import { ListaItem } from '../_models/listaItem';
import { Rol } from '../_models/rol';
import { GruposGestionService } from '../_services/grupoGestion.service';
import { GruposGestion } from '../_models/gruposGestion';
import { UsuarioRol } from '../_models/usuarioRol';
import { UsuarioGrupoGestion } from '../_models/usuarioGrupoGestion';
import { VUsuarioRol } from '../_models/vUsuarioRol';
import { VUsuarioGrupoGestion } from '../_models/vUsuarioGrupoGestion';
import { VHistoricoUsuario } from '../_models/vHistoricoUsuario';
import { Employee } from '../_models/employees';
import { EmployeesService } from '../_services/employees.service';
import { Message } from 'primeng/primeng';
import { NavService } from '../_services/_nav.service';

@Component( {
               moduleId: module.id,
               selector: 'usuario-add',
               templateUrl: './usuario-add.component.html',
            } )

export class UsuariosAddComponent {

   usuario: Usuario = new Usuario();
   tercero: Employee = new Employee();
   terceros: Employee[] = [];
   usuarios: Usuario[] = [];
   roles: Rol[] = [];
   gruposGestion: GruposGestion[] = [];
   curUsuarioRol: UsuarioRol = new UsuarioRol();
   curUsuarioGrupo: UsuarioGrupoGestion = new UsuarioGrupoGestion();
   curRoles: VUsuarioRol[] = [];
   curGrupos: VUsuarioGrupoGestion[] = [];
   currentDate: Date = new Date( Date.now() );
   displayDialog = false;

   datatypeMaster: Lista;
   datatypeDetails: ListaItem[];
   selectedTipo: number;
   numeroDocumento: string;
   isTerceroSet = false;
   isTerceroEmpty = false;
   isUserCreated = false;
   userExists = false;
   terceroExiste = true;
   sameUser = false;
   terceroObtenido: Employee;

   isRequiredRol = false;
   isGreaterRol = true;

   isRequiredGroup = false;
   isGreaterGroup = true;

   creatingRol = true;
   creatingGroup = true;
   historico: VHistoricoUsuario[] = [];

   msgs: Message[] = [];

   constructor( private usuariosService: UsuariosService,
      private rolesService: RolesService,
      private gruposGestionService: GruposGestionService,
      private tercerosService: EmployeesService,
      private listasService: ListaService,
      private _nav: NavService,
      private router: Router ) {
      listasService.getMasterDetails( 'ListasTiposDocumentos' ).subscribe( res => {
         this.datatypeDetails = res;
      } );
      usuariosService.listUsers().subscribe( res => {
         this.usuarios = res;
      } );
      tercerosService.getAll().subscribe( res => {
         this.terceros = res;
      } );
   }

   changeEvent( event?: any ) {
      this.documentCleanUp( event.target.value );
      if ( event.keyCode === 13 ) {
         this.findPerson();
      } else {
         this.limpiarValidaciones();
      }
   }

   limpiarValidaciones() {
      this.userExists = false;
      this.terceroExiste = true;
   }

   validarTercero() {
      this.limpiarValidaciones();
      this.terceroObtenido = this.terceros.filter( t => t.idTipoDocumento === this.selectedTipo )
      .find( s => s.numeroDocumento.toLowerCase() === this.numeroDocumento.toLowerCase() );
      if ( this.terceroObtenido !== null && this.terceroObtenido !== undefined ) {
         this.terceroExiste = true;
         this.validateUser();
      } else {
         this.terceroExiste = false;
      }
   }

   crearTercero() {
      // Navega a la pantalla de creación de terceros
      this.router.navigate( [ 'employees/add' ] );
   }

   validateUser() {
      if ( this.terceroObtenido !== null && this.terceroObtenido !== undefined ) {
         this.userExists = this.usuarios.filter( t => t.idTercero === this.terceroObtenido.idTercero ).length > 0;
      } else {
         this.userExists = false;
      }
   }

   goBack(): void {
      this.router.navigate( [ 'usuarios' ] );
   }

   findPerson() {
      this.validarTercero();
      if ( !this.userExists && this.terceroExiste ) {
         this.tercerosService.validateDocument( this.numeroDocumento, this.selectedTipo ).subscribe( res => {
            if ( res !== undefined && res.idTercero > 0 ) {
               this.tercerosService.get( res.idTercero ).subscribe( rest => {
                  this.tercero = rest;
                  this.isTerceroSet = true;
                  this.usuario.idTercero = this.tercero.idTercero;
               } );
            } else {
               this.isTerceroEmpty = true;
            }
         } );
      }
   }

   createUser() {
      this.usuariosService.createUser( this.usuario ).then( res => {
         this.usuario = res;
         this.router.navigate( [ 'usuarios/edit/' + this.usuario.idUsuario ] );
         this.isUserCreated = true;
         this.updateGroupLists();
         this.updateRolesLists();
         this.updateHistoric();
         // 1: add 2: update 3: error
         this._nav.setMesage( 1, this.msgs );
      } );
   }

   updateRolesLists() {
      this.rolesService.getAvaliableFunctions( this.usuario.idUsuario ).subscribe( res => {
         this.roles = res;
      } );
      this.usuariosService.readUserRoles( this.usuario.idUsuario ).subscribe( res => {
         this.curRoles = res;
      } );
   }

   updateGroupLists() {
      this.gruposGestionService.listAvaliableGruposGestion( this.usuario.idUsuario ).subscribe( res => {
         this.gruposGestion = res;
      } );
      this.usuariosService.readUserGroups( this.usuario.idUsuario ).subscribe( res => {
         this.curGrupos = res;
      } );
   }

   createUserRole() {
      this.usuariosService.readAllUserRoles().subscribe( res => {
         let ur = res.find( t => t.idUsuario === this.usuario.idUsuario && t.idRol === this.curUsuarioRol.idRol );
         if ( ur !== null ) {
            this.creatingRol = false;
            ur.fechaInicio = this.curUsuarioRol.fechaInicio;
            ur.fechaFin = this.curUsuarioRol.fechaFin;
            ur.indicadorHabilitado = true;
            this.usuariosService.updateUserRole( ur ).then( res => {
               this.updateRolesLists();
               this.updateHistoric();
               this.curUsuarioRol = new UsuarioRol();
               this.isRequiredRol = false;
               this.isGreaterRol = true;
               this.creatingRol = true;
            } );
         } else {
            this.creatingRol = false;
            this.curUsuarioRol.idUsuario = this.usuario.idUsuario;
            this.usuariosService.createUserRole( this.curUsuarioRol ).then( res => {
               this.updateRolesLists();
               this.updateHistoric();
               this.curUsuarioRol = new UsuarioRol();
               this.isRequiredRol = false;
               this.isGreaterRol = true;
               this.creatingRol = true;
            } );
         }
      } );
   }

   createUserGroup() {
      this.usuariosService.readAllUserGroups().subscribe( res => {
         let ug = res.find( t => t.idUsuario === this.usuario.idUsuario && t.idGrupoGestion === this.curUsuarioGrupo.idGrupoGestion );
         if ( ug !== null ) {
            this.creatingGroup = false;
            ug.fechaInicio = this.curUsuarioGrupo.fechaInicio;
            ug.fechaFin = this.curUsuarioGrupo.fechaFin;
            ug.indicadorHabilitado = true;
            this.usuariosService.updateUserGroup( ug ).then( res => {
               this.updateGroupLists();
               this.updateHistoric();
               this.curUsuarioGrupo = new UsuarioGrupoGestion();
               this.isRequiredGroup = false;
               this.isGreaterGroup = true;
               this.creatingGroup = true;
            } );
         } else {
            this.creatingGroup = false;
            this.curUsuarioGrupo.idUsuario = this.usuario.idUsuario;
            this.usuariosService.createUserGroup( this.curUsuarioGrupo ).then( res => {
               this.updateGroupLists();
               this.updateHistoric();
               this.curUsuarioGrupo = new UsuarioGrupoGestion();
               this.isRequiredGroup = false;
               this.isGreaterGroup = true;
               this.creatingGroup = true;
            } );
         }
      } );
   }

   removeRole( c: number ) {
      this.usuariosService.readUserRol( c ).subscribe( res => {
         let u: UsuarioRol = res;
         u.indicadorHabilitado = false;
         this.usuariosService.updateUserRole( u ).then( res => {
            this.updateRolesLists();
         } );
      } );
   }

   removeGroup( c: number ) {
      this.usuariosService.readUserGroup( c ).subscribe( res => {
         let u: UsuarioGrupoGestion = res;
         u.indicadorHabilitado = false;
         this.usuariosService.updateUserGroup( u ).then( res => {
            this.updateGroupLists();
         } );
      } );
   }

   documentCleanUp( value: string ) {
      this.numeroDocumento = value.replace( ' ', '' ).trim();
   }

   emailCleanUp( value: string ) {
      this.usuario.correoElectronico = value.toLowerCase().replace( ' ', '' ).trim();
   }

   userCleanUp( value: string ) {
      this.usuario.usuarioSistema = value.toLowerCase().replace( ' ', '' ).trim();
   }

   validateCreationUser() {
      this.sameUser = this.usuarios.filter( t => t.usuarioSistema === this.usuario.usuarioSistema ).length > 0;
   }

   validateGreaterRol() {
      if ( this.curUsuarioRol.fechaInicio !== null &&
           this.curUsuarioRol.fechaFin !== null &&
           this.curUsuarioRol.fechaInicio < this.curUsuarioRol.fechaFin ) {
         this.isGreaterRol = true;
      } else {
         this.isGreaterRol = false;
      }
   }

   clearSelectionRol() {
      this.isRequiredRol = false;
      this.isGreaterRol = true;
      this.curUsuarioRol.fechaFin = null;
      this.curUsuarioRol.fechaInicio = null;
   }

   validateGreaterGroup() {
      if ( this.curUsuarioGrupo.fechaInicio !== null &&
           this.curUsuarioGrupo.fechaFin !== null &&
           this.curUsuarioGrupo.fechaInicio < this.curUsuarioGrupo.fechaFin ) {
         this.isGreaterGroup = true;
      } else {
         this.isGreaterGroup = false;
      }
   }

   clearSelectionGroup() {
      this.isRequiredGroup = false;
      this.isGreaterGroup = true;
      this.curUsuarioGrupo.fechaFin = null;
      this.curUsuarioGrupo.fechaInicio = null;
   }

   updateHistoric() {
      this.usuariosService.listHistory( this.usuario.idUsuario ).subscribe( res => {
         this.historico = res;
      } );
   }
}
