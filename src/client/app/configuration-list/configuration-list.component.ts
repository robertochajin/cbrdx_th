import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/primeng';
import { ConfigurationList } from '../_models/configurationList';
import { ConfigurationListServices } from '../_services/configurationList.service';
import { NavService } from '../_services/_nav.service';

@Component( {
               moduleId: module.id,
               templateUrl: 'configuration-list.component.html',
               selector: 'configuration-list',
               providers: [ ConfirmationService ]
            } )
export class ConfigurationListComponent implements OnInit {

   configurationList: ConfigurationList = new ConfigurationList();
   dialogObjet: ConfigurationList = new ConfigurationList();

   listConfigurationList: ConfigurationList[];
   busqueda: string;

   constructor( private configurationListServices: ConfigurationListServices,
      private router: Router,
      private _nav: NavService,
      private confirmationService: ConfirmationService ) {
      this.busqueda = this._nav.getSearch( 'configuration-list' );
   }

   ngOnInit() {

      this.configurationListServices.getAll().subscribe(
         data => {
            this.listConfigurationList = data;

         }
      );

   }

   del( configurationList: ConfigurationList ) {
      this.dialogObjet = configurationList;
      this.confirmationService.confirm( {
                                           message: `¿Está seguro que desea inactivar este registro?`,
                                           header: 'Confirmación',
                                           icon: 'fa fa-question-circle',
                                           accept: () => {
                                              this.dialogObjet.indicadorHabilitado = false;
                                              this.configurationListServices.update( this.dialogObjet ).subscribe( r => {
                                                 this.listConfigurationList.splice( this.listConfigurationList
                                                                                    .indexOf( this.dialogObjet ), 1 );
                                                 this.dialogObjet = null;
                                              } );
                                           },
                                           reject: () => {
                                              this.dialogObjet = null;
                                           }
                                        } );
   }

   add() {
      this.router.navigate( [ 'configuration-list/add' ] );
   }

   detail( c: ConfigurationList ) {
      this.router.navigate( [ 'configuration-list/detail/' + c.idRelacionLista ] );
   }

   update( c: ConfigurationList ) {
      this.router.navigate( [ 'configuration-list/update/' + c.idRelacionLista ] );
   }

   setSearch() {
      this._nav.setSearch( 'configuration-list', this.busqueda );
   }
}
