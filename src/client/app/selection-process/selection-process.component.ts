import { Component, OnInit } from '@angular/core';
import { Rol } from '../_models/rol';
import { RolesService } from '../_services/roles.service';
import { Router } from '@angular/router';
import { NavService } from '../_services/_nav.service';
import { VacanciesService } from '../_services/vacancies.service';
import { PersonnelRequirement } from '../_models/personnelRequirement';
import { ListaService } from '../_services/lista.service';
import { Message, SelectItem } from 'primeng/primeng';
import { JwtHelper } from 'angular2-jwt';
import moment = require('moment');
import { UsuariosService } from '../_services/usuarios.service';
import { ConstanteService } from '../_services/constante.service';
import { VUsuario } from '../_models/vUsuario';
import { VUsuarioRol } from '../_models/vUsuarioRol';

@Component( {
               moduleId: module.id,
               templateUrl: 'selection-process.component.html'
            } )
export class SelectionProcessComponent implements OnInit {

   roles: VUsuarioRol[];
   busqueda: string;
   idEstado: number;
   vacancies: PersonnelRequirement[] = [];
   vacanciesTemp: PersonnelRequirement[] = [];
   msgs: Message[] = [];
   jwtHelper: JwtHelper = new JwtHelper();
   usuarioLogueado: any;
   listStatus: SelectItem[] = [];
   filtro: number = 1;
   today: Date;
   private showFilters: boolean;
   private recruiters: SelectItem[] = [];
   selectedRecruiter: number;

   constructor( private rolesService: RolesService,
      private router: Router,
      private navService: NavService,
      private constanteService: ConstanteService,
      private usuariosService: UsuariosService,
      private listaService: ListaService,
      private vacanciesService: VacanciesService, ) {
      this.busqueda = this.navService.getSearch( 'selection-process.component' );
      let token = localStorage.getItem( 'token' );
      if ( token !== null ) {
         this.usuarioLogueado = this.jwtHelper.decodeToken( token );
         usuariosService.readUserRoles(this.usuarioLogueado.usuario.idUsuario).subscribe( res => {
            this.roles = res;
            constanteService.getByCode('ROLPRO').subscribe(c => {
               if(this.checkRol(this.roles, c.valor)){
                  this.showFilters = true;
               } else {
                  this.showFilters = false;
               }
            });
         } );
      }
      // ---------------Estados para filtrar los requerimientos-------------------
      this.listStatus.push( { label: 'Todos', value: 1 } );
      this.listStatus.push( { label: 'Activos', value: 2 } );
      this.listStatus.push( { label: 'Nuevos', value: 3 } );
      this.listStatus.push( { label: 'Terminados', value: 4 } );
      // -------------------------------------------------------------------------
   }

   ngOnInit() {
      this.today = new Date();
      this.today.setHours( 0 );
      this.today.setMinutes( 0 );
      this.today.setSeconds( 0 );
      if(this.showFilters){
         this.usuariosService.getByRol('PROSEL').subscribe( recruiters => {
            this.recruiters.push({label: 'Seleccione el profesional de selección', value: null});
            this.recruiters.push({label: 'Mis procesos', value: this.usuarioLogueado.usuario.idUsuario});
            recruiters.map((r:VUsuario) => {
               this.recruiters.push({label: r.nombre, value: r.idUsuario});
            });
            this.selectedRecruiter = this.usuarioLogueado.usuario.idUsuario;
         } );
      }
      this.listaService.getMasterAllDetails( 'ListasEstadosRequerimientos' ).subscribe( data => {
         let temp = data.find( r => r.codigo === 'PRCSEL' );
         if ( temp ) {
            this.idEstado = temp.idLista;
            this.vacanciesService.getByRespSelecAndIdEstad( this.usuarioLogueado.usuario.idUsuario, this.idEstado ).subscribe( rest => {
               this.vacancies = rest;
               this.vacanciesTemp = rest;
            } );
         } else {
            this.navService.setMesage( 0, { severity: 'error', summary: 'Error', detail: 'Estado Preceso de selección no existe' } );
         }
      } );
   }

   filter() {
      this.vacancies = [];
      if ( this.filtro === 1 && this.selectedRecruiter === null) {
         this.vacancies = this.vacanciesTemp;
      } else {
         for ( let r of this.vacanciesTemp ) {
            let responsible = false;
            if(this.selectedRecruiter === null || this.selectedRecruiter === r.idResponsableSeleccion) {
               responsible = true;
            }

            if ( this.filtro === 2 ) {
               let fin = new Date( r.fechaFinPublicacion );
               fin.setHours( 24 );
               fin.setSeconds( 1 );
               if ( fin >= this.today && responsible) {
                  this.vacancies.push( r );
               }
            }
            if ( this.filtro === 3 ) {
               if ( (r.fechaFinPublicacion === null || r.fechaFinPublicacion === undefined) && responsible ) {
                  this.vacancies.push( r );
               }
            }
            if ( this.filtro === 4 ) {
               let fin = new Date( r.fechaFinPublicacion );
               fin.setHours( 24 );
               fin.setSeconds( 1 );
               if ( fin < this.today && r.idPublicacion && responsible ) {
                  this.vacancies.push( r );
               }
            }
         }
      }
   }

   add( r: PersonnelRequirement ) {
      this.router.navigate( [ 'selection-process/add-publication/' + r.idRequerimiento ] );
   }

   detail( r: PersonnelRequirement ) {
      this.router.navigate( [ 'selection-process/publications-detail/' + r.idPublicacion ] );
   }

   candidates( r: PersonnelRequirement ) {
      this.router.navigate( [ 'selection-process/candidates-list/' + r.idPublicacion ] );
   }

   update( r: PersonnelRequirement ) {
      this.router.navigate( [ 'selection-process/add-publication/' + r.idRequerimiento ] );
   }

   setSearch() {
      this.navService.setSearch( 'selection-process.component', this.busqueda );
   }

   private checkRol( roles: VUsuarioRol[], rolesConstante: string ) : boolean {
      let confRoles = rolesConstante.split(',');
      let foundRol = false;
      roles.map(r => {
         if(confRoles.find(c => c === r.codigoRol)){
            foundRol = true;
         }
      })
      return foundRol;
   }
}
