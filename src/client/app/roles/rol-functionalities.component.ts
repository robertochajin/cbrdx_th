import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Rol } from '../_models/rol';
import { RolFuncionalities } from '../_models/rolFuncionalities';
import { RolFuncionalitiesServices } from '../_services/rolFuncionalities.service';
import { SelectItem, Message, ConfirmationService } from 'primeng/primeng';
import { FormManagerService } from '../_services/form-manager.service';

@Component( {
               moduleId: module.id,
               templateUrl: 'rol-functionalities.component.html',
               selector: 'rol-fucionalities',
               providers: [ ConfirmationService ]
            } )
export class RolFuncionalitiesComponent implements OnInit {

   @Input() rol: Rol;

   rolFuncionality: RolFuncionalities = new RolFuncionalities();
   lfuncionality: RolFuncionalities = new RolFuncionalities();
   dialogObjet: RolFuncionalities = new RolFuncionalities();
   funcionalities: RolFuncionalities[];
   showForm: boolean = false;
   msgs: Message[] = [];
   menus: SelectItem[] = [];
   idRol: number;
   isUpdating: boolean = false;

   constructor( private rolFuncionalitiesService: RolFuncionalitiesServices,
      private router: Router,
      private route: ActivatedRoute,
      private confirmationService: ConfirmationService,
      private formManagerService: FormManagerService, ) {

   }

   ngOnInit() {

      this.idRol = this.rol.idRol;
      this.rolFuncionalitiesService.getAllByRol( this.idRol ).subscribe(
         funcionalities => {
            this.funcionalities = funcionalities;
            this.formManagerService.getAllEnabled().subscribe(
               menus => {
                  this.menus.unshift( { label: 'Seleccione', value: null } );
                  menus.map( ( s: any ) => {
                     if ( this.funcionalities.filter( w => w.idFuncionalidad === s.idFuncionalidad ).length === 0 ) {
                        this.menus.push( { label: s.menu, value: s.idFuncionalidad } );
                     }
                  } );
               }
            );
         }
      );
   }

   onSubmit() {
      this.msgs = [];
      this.showForm = false;

      if ( this.rolFuncionality.idRolFuncionalidad === null ||
           this.rolFuncionality.idRolFuncionalidad === 0 ||
           this.rolFuncionality.idRolFuncionalidad === undefined ) {
         this.rolFuncionality.idRol = this.idRol;
         this.rolFuncionalitiesService.add( this.rolFuncionality )
         .subscribe( data => {
            this.menus.splice( this.menus.indexOf( this.menus.find( m => m.value === this.rolFuncionality.idFuncionalidad ) ), 1 );
            this.msgs.push( { severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.' } );
            this.rolFuncionalitiesService.getAllByRol( this.idRol ).subscribe(
               funcionalities => this.funcionalities = funcionalities
            );
         }, error => {
            this.showForm = true;
            this.msgs.push( { severity: 'error', summary: 'Error', detail: 'Error al guardar.' } );
         } );
      } else {

         this.rolFuncionalitiesService.update( this.rolFuncionality )
         .subscribe( data => {
            this.isUpdating = false;
            this.menus.splice( 0, 1 );
            this.msgs.push( { severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.' } );
            this.rolFuncionalitiesService.getAllByRol( this.idRol ).subscribe(
               funcionalities => this.funcionalities = funcionalities
            );
         }, error => {
            this.showForm = true;
            this.msgs.push( { severity: 'error', summary: 'Error', detail: 'Error al guardar.' } );
         } );
      }

   }

   add() {
      this.msgs = [];
      this.rolFuncionality = new RolFuncionalities();
      this.showForm = true;
   }

   update( f: RolFuncionalities ) {
      this.msgs = [];
      this.rolFuncionality = f;
      this.showForm = true;
      this.isUpdating = true;
      this.menus.unshift( { label: f.menu, value: f.idFuncionalidad } );

   }

   goBackUpdate() {
      this.msgs = [];
      this.showForm = false;
      if ( this.isUpdating === true ) {
         this.isUpdating = false;
         this.menus.splice( 0, 1 );
      }
   }

   config( r: RolFuncionalities ) {
      this.router.navigate( [ 'roles-funcionalities-config/' + r.idRolFuncionalidad ] );
   }

}
