import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Message, SelectItem } from 'primeng/primeng';
import { NavService } from '../_services/_nav.service';
import { ListaService } from '../_services/lista.service';
import { ListaItem } from '../_models/listaItem';
import { VacanciesService } from '../_services/vacancies.service';
import { RequirementsAction } from '../_models/requirementsAction';
import { Constante } from '../_models/constante';
import { ConstanteService } from '../_services/constante.service';
import { UsuariosService } from '../_services/usuarios.service';
import { PersonnelRequirement } from '../_models/personnelRequirement';
import { PersonnelRequirementServices } from '../_services/personnelRequirement.service';

@Component( {
               moduleId: module.id,
               templateUrl: 'vacancies-action-component.html',
               selector: 'vacancies-action'
            } )
export class VacantesActionComponent implements OnInit {

   msg: Message;
   listEstados: ListaItem[] = [];
   listUsuarios: SelectItem[] = [];
   listAcciones: SelectItem[] = [];
   listReclutamiento: SelectItem[] = [];
   vacancy: PersonnelRequirement = new PersonnelRequirement();
   requirementsAction: RequirementsAction = new RequirementsAction();
   actions: RequirementsAction[] = [];
   requiereAutorizacion = true;
   permitido = true;

   eCreacion :number;
   eSolicitado :number;
   eEnAprobacion :number;
   eAprobado :number;
   eRechazado :number;
   eDevuelto :number;
   eSeleccion :number;
   eCerrado :number;
   eEliminacion :number;
   ePerfil :number;

   aSolicitar: number;
   aDevolver: number;
   aRealizar: number;
   aAsignar: number;
   aSeleccion: number;
   aAprobar: number;
   aRechazar: number;
   aCerrar: number;

   tAumentoPlanta: number;
   tCargoArea: number;
   tDisminucionPlanta: number;
   tEliminacion: number;
   tCargoNuevo: number;

   allAcciones: ListaItem[] = [];
   accionesStep1: SelectItem[] = [];
   accionesStep2: SelectItem[] = [];
   accionesStep3: SelectItem[] = [];
   accionesStep4: SelectItem[] = [];
   accionesStep5: SelectItem[] = [];

   constructor(
      private vacanciesService: VacanciesService,
      private router: Router,
      private listaService: ListaService,
      private navService: NavService,
      private route: ActivatedRoute,
      private constanteService: ConstanteService,
      private usuariosService: UsuariosService,
      private personnelRequirementServices: PersonnelRequirementServices

   ) {
      this.listAcciones.push( { label: 'Seleccione', value: null } );

      this.listaService.getMasterDetails( 'ListasFormasReclutamientos' ).subscribe( res => {
         this.listReclutamiento.push( { label: 'Seleccione', value: '' } );
         res.map( ( l: ListaItem ) => {
            this.listReclutamiento.push( { label: l.nombre, value: l.idLista } );
         } );
      } );
      this.constanteService.getByCode( 'PROSEL' ).subscribe( c => {
         this.usuariosService.getByRol(c.valor).subscribe(
            usuarios => {
               this.listUsuarios.push( { label: 'Seleccione', value: '' } );
               usuarios.map( l => {
                  this.listUsuarios.push( { label: l.nombre, value: l.idUsuario } );
               } );
            } );
      });

      this.listaService.getMasterDetails( 'ListasEstadosRequerimientos' ).subscribe( res => {
         res.map( ( l: ListaItem ) => {
            this.listEstados.push( l );
            switch (l.codigo){
               case 'PRCREQ':
                  this.eCreacion = l.idLista;
                  break;
               case 'SOLICITADO':
                  this.eSolicitado = l.idLista;
                  break;
               case 'ENAPRB':
                  this.eEnAprobacion = l.idLista;
                  break;
               case 'APRB':
                  this.eAprobado = l.idLista;
                  break;
               case 'RCHZ':
                  this.eRechazado = l.idLista;
                  break;
               case 'DVLT':
                  this.eDevuelto = l.idLista;
                  break;
               case 'PRCSEL':
                  this.eSeleccion = l.idLista;
                  break;
               case 'CRRD':
                  this.eCerrado = l.idLista;
                  break;
               case 'PRCELIM':
                  this.eEliminacion = l.idLista;
                  break;
               case 'CTRPER':
                  this.ePerfil = l.idLista;
                  break;
            }
         } );
      } );

      this.listaService.getMasterDetails( 'ListasRequerimientosAcciones' ).subscribe( res => {
         res.map( ( l: ListaItem ) => {
            this.allAcciones.push( l );
            switch (l.codigo){
               case 'SOLAUT':
                  this.aSolicitar = l.idLista;
                  break;
               case 'DEVCAM':
                  this.aDevolver = l.idLista;
                  break;
               case 'REALIZ':
                  this.aRealizar = l.idLista;
                  break;
               case 'ASIPRO':
                  this.aAsignar = l.idLista;
                  break;
               case 'APRB':
                  this.aAprobar = l.idLista;
                  break;
               case 'RCHZ':
                  this.aRechazar = l.idLista;
                  break;
               case 'CRRD':
                  this.aCerrar = l.idLista;
                  break;
            }

         } );
         this.buildSteps();
      } );

      this.listaService.getMasterDetails( 'ListasTiposSolicitudes' ).subscribe( res => {
         res.map( ( l: ListaItem ) => {
            this.allAcciones.push( l );
            switch (l.codigo){
               case 'APLNT':
                  this.tAumentoPlanta = l.idLista;
                  break;
               case 'CRGNVAREA':
                  this.tCargoArea = l.idLista;
                  break;
               case 'DMNPLNT':
                  this.tDisminucionPlanta = l.idLista;
                  break;
               case 'CRGELMN':
                  this.tEliminacion = l.idLista;
                  break;
               case 'CRGNVO':
                  this.tCargoNuevo = l.idLista;
                  break;

            }

         } );
         this.buildSteps();
      } );

   }

   ngOnInit() {
      this.route.params
      .switchMap( ( params: Params ) => this.vacanciesService.get( +params[ 'id' ] ) )
      .subscribe( vacancy => {
         this.vacancy = vacancy;
         this.historialAcciones();
         if(this.vacancy.idEstado === this.eCreacion ||
            this.vacancy.idEstado === this.eRechazado ||
            this.vacancy.idEstado === this.eDevuelto ||
            this.vacancy.idEstado === this.eCerrado
         ){
            this.permitido = false;
         }
         this.requiereAutorizacion = vacancy.indicadorAutorizacion;

         if(this.vacancy.idEstado === this.eEnAprobacion) {
            this.listAcciones = this.accionesStep1;
         }else{
            if(this.requiereAutorizacion && this.vacancy.idEstado === this.eSolicitado){
               this.listAcciones = this.accionesStep2;
            }else{
               if(this.vacancy.idEstado === this.eAprobado){
                  this.listAcciones = this.accionesStep4;
               }else{
                  this.listAcciones = this.accionesStep3;
               }

            }
         }
         if(this.vacancy.idEstado === this.eSeleccion) {
            this.listAcciones = this.accionesStep4;
         }
      } );
   }

   goBack(): void {
      this.router.navigate( [ 'vacancies' ] );
   }

   showRequerimiento(id: number): void{
      this.router.navigate( [ 'personnel-requirement/historical/' + id ] );
   }

   onSubmit() {
      if(this.requirementsAction.idAccion === this.aSolicitar){
         this.vacancy.idEstado =  this.eEnAprobacion;
      }
      if(this.requirementsAction.idAccion === this.aAprobar){
         this.vacancy.idEstado = this.eAprobado;
         if(this.vacancy.idEstado === this.tDisminucionPlanta){
            this.vacancy.idEstado = this.eCerrado;
         }

      }
      if(this.requirementsAction.idAccion === this.aSeleccion){
         this.vacancy.idEstado = this.eSeleccion;
      }
      if(this.requirementsAction.idAccion === this.aDevolver){
         this.vacancy.idEstado = this.eDevuelto;
      }
      if(this.requirementsAction.idAccion === this.aDevolver){
         this.vacancy.idEstado = this.eDevuelto;
      }
      if(this.requirementsAction.idAccion === this.aRealizar){
         this.vacancy.idEstado = this.eRechazado;
      }
      if(this.requirementsAction.idAccion === this.aCerrar){
         this.vacancy.idEstado = this.eCerrado;
      }
      if(this.requirementsAction.idAccion === this.aAsignar){
         this.vacancy.idEstado = this.eCerrado;
      }
      this.personnelRequirementServices.update( this.vacancy ).subscribe( data => {
         this.requirementsAction.idRequerimiento = this.vacancy.idRequerimiento;
         this.vacanciesService.setAction( this.requirementsAction ).subscribe( requirementsAction => {
            this.navService.setMesage( 1, this.msg );
            this.requirementsAction = requirementsAction;
            this.historialAcciones();
            this.goBack();
         }, error => {
            this.navService.setMesage( 3, this.msg );
         } );

      }, error => {
         this.navService.setMesage( 3, this.msg );
      } );
   }

   historialAcciones(){
      this.vacanciesService.getActions(this.vacancy.idRequerimiento).subscribe(
         actions => {
         this.actions = actions;
      });
   }

   buildSteps(){
      this.accionesStep1 = [];
      this.accionesStep2 = [];
      this.accionesStep3 = [];
      this.accionesStep4 = [];

      this.accionesStep1.push( { label: 'Seleccione', value: null } );
      this.accionesStep2.push( { label: 'Seleccione', value: null } );
      this.accionesStep3.push( { label: 'Seleccione', value: null } );
      this.accionesStep4.push( { label: 'Seleccione', value: null } );

      if( this.allAcciones.find( c => c.codigo === 'APRB')) {
         this.accionesStep1.push( {
                                     label: this.allAcciones.find( c => c.codigo === 'APRB' ).nombre,
                                     value: this.allAcciones.find( c => c.codigo === 'APRB' ).idLista
                                  } );
      }

      if( this.allAcciones.find( c => c.codigo === 'RCHZ')) {
         this.accionesStep1.push( {
                                     label: this.allAcciones.find( c => c.codigo === 'RCHZ' ).nombre,
                                     value: this.allAcciones.find( c => c.codigo === 'RCHZ' ).idLista
                                  } );
         this.accionesStep2.push( {
                                     label: this.allAcciones.find( c => c.codigo === 'RCHZ' ).nombre,
                                     value: this.allAcciones.find( c => c.codigo === 'RCHZ' ).idLista
                                  } );
         this.accionesStep3.push( {
                                     label: this.allAcciones.find( c => c.codigo === 'RCHZ' ).nombre,
                                     value: this.allAcciones.find( c => c.codigo === 'RCHZ' ).idLista
                                  } );
      }

      if( this.allAcciones.find( c => c.codigo === 'DEVCAM')) {
         this.accionesStep1.push( {
                                     label: this.allAcciones.find( c => c.codigo === 'DEVCAM' ).nombre,
                                     value: this.allAcciones.find( c => c.codigo === 'DEVCAM' ).idLista
                                  } );
         this.accionesStep2.push( {
                                     label: this.allAcciones.find( c => c.codigo === 'DEVCAM' ).nombre,
                                     value: this.allAcciones.find( c => c.codigo === 'DEVCAM' ).idLista
                                  } );
         this.accionesStep3.push( {
                                     label: this.allAcciones.find( c => c.codigo === 'DEVCAM' ).nombre,
                                     value: this.allAcciones.find( c => c.codigo === 'DEVCAM' ).idLista
                                  } );
      }

      if( this.allAcciones.find( c => c.codigo === 'SOLAUT')) {
         this.accionesStep2.push( {
                                     label: this.allAcciones.find( c => c.codigo === 'SOLAUT' ).nombre,
                                     value: this.allAcciones.find( c => c.codigo === 'SOLAUT' ).idLista
                                  } );
      }

      if( this.allAcciones.find( c => c.codigo === 'ASIPRO')) {

         this.accionesStep3.push( {
                                     label: this.allAcciones.find( c => c.codigo === 'ASIPRO' ).nombre,
                                     value: this.allAcciones.find( c => c.codigo === 'ASIPRO' ).idLista
                                  } );
         this.accionesStep4.push( {
                                     label: this.allAcciones.find( c => c.codigo === 'ASIPRO' ).nombre,
                                     value: this.allAcciones.find( c => c.codigo === 'ASIPRO' ).idLista
                                  } );
      }

   }



}

