import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';
import { RolFuncionalities } from '../_models/rolFuncionalities';
import { RolFuncionalitiesServices } from '../_services/rolFuncionalities.service';
import { RolFunctionalityControl } from '../_models/rolFunctionalityControl';
import { FunctionalityControl } from '../_models/functionalityContorl';
import { FormManagerService } from '../_services/form-manager.service';
import { Message, ConfirmationService } from 'primeng/primeng';
import { NavService } from '../_services/_nav.service';

@Component( {
               moduleId: module.id,
               templateUrl: 'rol-functionalities-config.component.html',
               selector: 'rol-fucionalities-config',
               providers: [ ConfirmationService ]
            } )
export class RolFuncionalitiesConfigComponent implements OnInit {

   rolFuncionality: RolFuncionalities;
   listaFuncionalityControl: RolFunctionalityControl[];
   funcionalityControl: RolFunctionalityControl = new RolFunctionalityControl();
   lfuncionalityControl: RolFunctionalityControl = new RolFunctionalityControl();
   showForm: boolean = false;
   msgs: Message[] = [];
   lfControles: FunctionalityControl[] = [];
   fControles: RolFunctionalityControl;
   secciones: RolFunctionalityControl[] = [];
   controles: RolFunctionalityControl[] = [];

   constructor( private rolFuncionalitiesService: RolFuncionalitiesServices,
      private router: Router,
      private route: ActivatedRoute,
      private location: Location,
      private confirmationService: ConfirmationService,
      private formManagerService: FormManagerService,
      private _nav: NavService
   ) {
      this.route.params.subscribe( ( params: Params ) => {
         this.rolFuncionalitiesService.get( +params[ 'id' ] ).subscribe( rolFuncionality => {
            this.rolFuncionality = rolFuncionality;
            this.rolFuncionalitiesService.getControlByFuncionality( this.rolFuncionality.idRol, this.rolFuncionality.idFuncionalidad )
            .subscribe( listaFuncionalityControl => {
               this.listaFuncionalityControl = listaFuncionalityControl;
               this.formManagerService.getFuncionalidadesControlesEnabledByControl(this.rolFuncionality.idFuncionalidad).subscribe(
                  lfControles => {
                     this.lfControles = lfControles;
                     this.cosntrucObj();
                  }
               );
            } );
         } );

      } );
   }

   ngOnInit() {
      this.msgs = [];
   }

   changeControl( fc: RolFunctionalityControl ) {
      this.msgs = [];
      if ( fc.idRolFuncionalidadControl === null ) {
         this.rolFuncionalitiesService.addControl( fc ).subscribe( data => {
            // this.msgs.push( { severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.' } );
            this._nav.setMesage(0,{severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.'});
            fc.idRolFuncionalidadControl = data.idRolFuncionalidadControl;
         }, error => {
            this.showForm = true;
            // this.msgs.push( { severity: 'error', summary: 'Error', detail: 'Error al guardar.' } );
            this._nav.setMesage(0, {severity: 'error', summary: 'Error', detail: 'Error al guardar.'});
         } );
      } else {
         this.rolFuncionalitiesService.updateControl( fc ).subscribe( data => {
            // this.msgs.push( { severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.' } );
            this._nav.setMesage(0, {severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.'});
         }, error => {
            this.showForm = true;
            // this.msgs.push( { severity: 'error', summary: 'Error', detail: 'Error al guardar.' } );
            this._nav.setMesage(0,{ severity: 'error', summary: 'Error', detail: 'Error al guardar.' });
         } );
      }
   }

   cosntrucObj() {
      this.lfControles.map( ( s: any ) => {
         this.fControles = new RolFunctionalityControl();
         if ( this.listaFuncionalityControl.filter( d => d.idFuncionalidadControl === s.idFuncionalidadControl ).length > 0 ) {
            this.fControles = this.listaFuncionalityControl.filter( d => d.idFuncionalidadControl === s.idFuncionalidadControl )[0];
            this.fControles.codigo = s.codigo;
         } else {
            this.fControles.idRolFuncionalidadControl = null;
            this.fControles.idFuncionalidadControl = s.idFuncionalidadControl;
            this.fControles.idRol = this.rolFuncionality.idRol;
            this.fControles.rol = this.rolFuncionality.rol;
            this.fControles.control = s.control;
            this.fControles.codigo = s.codigo;
            this.fControles.indicadorHabilitado = true;
            this.fControles.indicadorEditar = true;
            this.fControles.indicadorSeccion = s.indicadorSeccion;
         }
         if ( s.indicadorSeccion === true ) {
            this.secciones.push( this.fControles );
         } else {
            this.controles.push( this.fControles );
         }
      } );
   }

   goBack() {
      this.router.navigate( [ 'roles/update/' + this.rolFuncionality.idRol ] );
   }

}
