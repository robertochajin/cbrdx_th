import { Component } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
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
import { LocationService } from '../_services/employee-location.service';
import { Localizaciones } from '../_models/localizaciones';
import { Message } from 'primeng/primeng';
import { NavService } from '../_services/_nav.service';

@Component( {
               moduleId: module.id,
               selector: 'usuario-edit',
               templateUrl: './usuario-edit.component.html',
            } )

export class UsuariosEditComponent {

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
   displayUpdateDialog = false;

   datatypeMaster: Lista;
   datatypeDetails: ListaItem[];
   selectedTipo: number;
   numeroDocumento: string;
   isTerceroSet = true;
   isTerceroEmpty = false;
   isUserCreated = true;
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
   private locations: Localizaciones[] = [];

   msgs: Message[] = [];

   constructor( private usuariosService: UsuariosService,
      private rolesService: RolesService,
      private gruposGestionService: GruposGestionService,
      private tercerosService: EmployeesService,
      private listasService: ListaService,
      private locationService: LocationService,
      private _nav: NavService,
      private router: Router,
      private route: ActivatedRoute ) {
      route.params.switchMap( ( params: Params ) => usuariosService.viewUser( +params[ 'id' ] ) )
      .subscribe( data => {
         this.usuario = data;
         this.updateRolesLists();
         this.updateHistoric();
         this.updateGroupLists();
         usuariosService.listUsers().subscribe( res => {
            this.usuarios = res.filter( t => t.idUsuario !== this.usuario.idUsuario );
         } );
         tercerosService.get( this.usuario.idTercero ).subscribe( res => {
            this.tercero = res;
            this.locationService.getAllResiden( this.usuario.idTercero ).subscribe( locations => this.locations = locations );
         } );
      } );
   }

   goBack(): void {
      this.router.navigate( [ 'usuarios' ] );
   }

   displayUpdate() {
      this.displayUpdateDialog = true;
   }

   createUser() {
      this.usuariosService.updateUser( this.usuario ).then( res => {
         this.usuariosService.viewUser( this.usuario.idUsuario ).subscribe( res => {
            this.usuario = res;
            this.updateGroupLists();
            this.updateRolesLists();
            this.updateHistoric();
            this.displayUpdateDialog = false;
         } );
         // 1: add 2: update 3: error
         this._nav.setMesage( 2, this.msgs );
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
      if ( this.isGreaterRol ) {
         this.usuariosService.readAllUserRoles().subscribe( res => {
            let ur = res.find( t => t.idUsuario === this.usuario.idUsuario && t.idRol === this.curUsuarioRol.idRol );
            if ( ur ) {
               ur.fechaInicio = this.curUsuarioRol.fechaInicio;
               ur.fechaFin = this.curUsuarioRol.fechaFin;
               ur.indicadorHabilitado = true;
               this.creatingRol = false;
               this.usuariosService.updateUserRole( ur ).then( res => {
                  this.updateRolesLists();
                  this.updateHistoric();
                  this.curUsuarioRol = new UsuarioRol();
                  this.isRequiredRol = false;
                  this.isGreaterRol = true;
                  this.creatingRol = true;
               } );
            } else {
               this.curUsuarioRol.idUsuario = this.usuario.idUsuario;
               this.creatingRol = false;
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
   }

   createUserGroup() {
      if ( this.isGreaterGroup ) {
         this.usuariosService.readAllUserGroups().subscribe( res => {
            let ug = res.find( t => t.idUsuario === this.usuario.idUsuario && t.idGrupoGestion === this.curUsuarioGrupo.idGrupoGestion );
            if ( ug ) {
               ug.fechaInicio = this.curUsuarioGrupo.fechaInicio;
               ug.fechaFin = this.curUsuarioGrupo.fechaFin;
               ug.indicadorHabilitado = true;
               this.creatingGroup = false;
               this.usuariosService.updateUserGroup( ug ).then( res => {
                  this.updateGroupLists();
                  this.updateHistoric();
                  this.curUsuarioGrupo = new UsuarioGrupoGestion();
                  this.isRequiredGroup = false;
                  this.isGreaterGroup = true;
                  this.creatingGroup = true;
               } );
            } else {
               this.curUsuarioGrupo.idUsuario = this.usuario.idUsuario;
               this.creatingGroup = false;
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
   }

   removeRole( c: number ) {
      this.usuariosService.readUserRol( c ).subscribe( res => {
         res.indicadorHabilitado = false;
         this.usuariosService.updateUserRole( res ).then( rest => {
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

   emailCleanUp( value: string ) {
      this.usuario.correoElectronico = value.toLowerCase().replace( ' ', '' ).trim();
   }

   userCleanUp( value: string ) {
      this.usuario.usuarioSistema = value.toLowerCase().replace( ' ', '' ).trim();
   }

   editEmployee( idTercero: number ) {
      this.router.navigate( [ 'employees/update/' + idTercero ] );
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

   goTercero() {
      this.router.navigate( [ 'employees/update/' + this.usuario.idTercero ] );
   }
}
