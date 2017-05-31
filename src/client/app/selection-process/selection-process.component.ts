import { Component, OnInit } from '@angular/core';
import { Rol } from '../_models/rol';
import { RolesService } from '../_services/roles.service';
import { Router } from '@angular/router';
import { NavService } from '../_services/_nav.service';
import { VacanciesService } from '../_services/vacancies.service';
import { PersonnelRequirement } from '../_models/personnelRequirement';
import { ListaService } from '../_services/lista.service';
import { Message } from 'primeng/primeng';
import { JwtHelper } from 'angular2-jwt';

@Component( {
               moduleId: module.id,
               templateUrl: 'selection-process.component.html'
            } )
export class SelectionProcessComponent implements OnInit {

   roles: Rol[];
   busqueda: string;
   idEstado: number;
   vacancies: PersonnelRequirement[] = [];
   msgs: Message[]=[];
   jwtHelper: JwtHelper = new JwtHelper();
   usuarioLogueado: any;

   constructor( private rolesService: RolesService,
      private router: Router,
      private navService:NavService,
      private listaService: ListaService,
      private vacanciesService: VacanciesService,) {
      this.busqueda = this.navService.getSearch( 'selection-process.component' );
      rolesService.listRoles().subscribe( res => {
         this.roles = res;
      } );
      let token = localStorage.getItem( 'token' );
      if ( token !== null ) {
         this.usuarioLogueado = this.jwtHelper.decodeToken( token );
      }
   }
   ngOnInit() {
      this.listaService.getMasterAllDetails('ListasEstadosRequerimientos').subscribe(data=>{
         let temp =data.find(r=> r.codigo==='PRCSEL');
         if(temp){
            this.idEstado= temp.idLista;
            this.vacanciesService.getByRespSelecAndIdEstad(this.usuarioLogueado.usuario.idUsuario, this.idEstado).subscribe(rest=>{
               this.vacancies= rest;
            });
         }else{
            this.navService.setMesage( 0, { severity: 'error', summary: 'Error', detail: 'Estado Preceso de selección no existe'});
         }
      });
   }

   add(r: PersonnelRequirement) {
      this.router.navigate( [ 'selection-process/add-publication/'+ r.idRequerimiento] );
   }

   update( r: Rol ) {
      this.router.navigate( [ 'roles/update/' + r.idRol ] );
   }
   setSearch() {
      this.navService.setSearch( 'selection-process.component', this.busqueda );
   }
}
