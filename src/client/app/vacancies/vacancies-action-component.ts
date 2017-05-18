import { Component } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Message, SelectItem } from 'primeng/primeng';
import { NavService } from '../_services/_nav.service';
import { ListaService } from '../_services/lista.service';
import { ListaItem } from '../_models/listaItem';
import { VacanciesService } from '../_services/vacancies.service';
import { Vacancies } from '../_models/vacancies';
import { RequirementsAction } from '../_models/requirementsAction';
import { Usuario } from '../_models/usuario';
import { UsuariosService } from '../_services/usuarios.service';
import { OrganizationalStructureService } from '../_services/organizationalStructure.service';
import { OrganizationalStructure } from '../_models/organizationalStructure';

@Component( {
               moduleId: module.id,
               templateUrl: 'vacancies-action-component.html',
               selector: 'vacancies-action'
            } )
export class VacantesActionComponent {

   msg: Message;
   listEstados: ListaItem[] = [];
   listAcciones: SelectItem[] = [];
   listUsuarios: SelectItem[] = [];
   listReclutamiento: SelectItem[] = [];
   vacancy: Vacancies = new Vacancies();
   requirementsAction: RequirementsAction = new RequirementsAction();
   organizationalStructure: OrganizationalStructure;
   requiereAutorizacion = true;
   autorizando = true;
   codigoAsiPro: number;
   codigoSolAut: number;

   constructor(
      private vacanciesService: VacanciesService,
      private router: Router,
      private listaService: ListaService,
      private navService: NavService,
      private route: ActivatedRoute,
      private UsuariosService: UsuariosService,
      private organizationalStructureService: OrganizationalStructureService,
   ) {
      this.listaService.getMasterDetails( 'ListasEstadosRequerimientos' ).subscribe( res => {
         res.map( ( l: ListaItem ) => {
            this.listEstados.push( l );
         } );
      } );

      this.listaService.getMasterDetails( 'ListasRequerimientosAcciones' ).subscribe( res => {
         this.listAcciones.push( { label: 'Seleccione', value: '' } );
         res.map( ( l: ListaItem ) => {
            if(l.codigo === 'ASIPRO'){
               this.codigoAsiPro = l.idLista;
            }
            if(l.codigo === 'SOLAUT'){
               this.codigoSolAut = l.idLista;
            }
            if(this.autorizando){
               if(l.codigo === 'APROVA' || l.codigo === 'RECHAZ'){

               }
            }else{
               if(this.requiereAutorizacion ){
                  if(l.codigo !== 'ASIPRO') {
                     this.listAcciones.push( { label: l.nombre, value: l.idLista } );
                  }
               }else{
                  if(l.codigo !== 'SOLAUT'){
                     this.listAcciones.push( { label: l.nombre, value: l.idLista } );
                  }
               }
            }
         } );
      } );
      this.listaService.getMasterDetails( 'ListasFormasReclutamientos' ).subscribe( res => {
         this.listReclutamiento.push( { label: 'Seleccione', value: '' } );
         res.map( ( l: ListaItem ) => {
            this.listReclutamiento.push( { label: l.nombre, value: l.idLista } );
         } );
      } );

      this.UsuariosService.listUsers().subscribe(
         usuarios => {
            this.listUsuarios.push( { label: 'Seleccione', value: null } );
            usuarios.map( l => {
               this.listUsuarios.push( { label: l.usuarioSistema, value: l.idUsuario } );
            } );
         } );

      this.route.params
      .switchMap( ( params: Params ) => this.vacanciesService.get( +params[ 'id' ] ) )
      .subscribe( vacancy => {
         this.vacancy = vacancy;
         /*if(this.vacancy.idEstructuraOrganizacional){
            this.organizationalStructureService.viewOrganizationalStructure( this.vacancy.idEstructuraOrganizacional).subscribe( res => {
               this.organizationalStructure = res;
            });
         }*/
      } );

   }

   ngOnInit() {


   }

   goBack(): void {
      this.router.navigate( [ 'vacancies' ] );
   }

   onSubmit() {

      this.vacanciesService.setAction( this.requirementsAction ).subscribe( requirementsAction => {
         this.navService.setMesage( 1, this.msg );
         this.requirementsAction = requirementsAction;
         this.goBack();
      }, error => {
         this.navService.setMesage( 3, this.msg );
      } );
   }

}

