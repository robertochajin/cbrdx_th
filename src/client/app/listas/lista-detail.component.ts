import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { ListaItem } from '../_models/listaItem';
import { Lista } from '../_models/lista';
import { ListaService } from '../_services/lista.service';
import { FormSharedModule } from '../shared/form-shared.module';

import { RolesService } from '../_services/roles.service';

@Component( {
               moduleId: module.id,
               templateUrl: 'lista-detail.component.html'
            } )

export class ListaDetailComponent implements OnInit {
   masterList: Lista = new Lista();
   othersList: Lista[];
   othersDetailsList: ListaItem[];
   detailsList: ListaItem[];
   habilitado: string;
   rolModifica: string;

   constructor( private listasService: ListaService,
      private route: ActivatedRoute,
      private rolesService: RolesService,
      private location: Location ) {
   }

   ngOnInit(): void {
      this.route.params
      .switchMap( ( params: Params ) => this.listasService.getMaster( +params[ 'id' ] ) )
      .subscribe( data => {
         this.masterList = data;
         this.rolesService.listRoles().subscribe( data => {
            if(data.find(r=> r.idRol ===this.masterList.idRol)){
               this.rolModifica = data.find(r=> r.idRol ===this.masterList.idRol).rol;
            }
         });
         this.habilitado = data.indicadorEditable ? 'Si' : 'No';
         this.listasService.getMasterAllDetails( this.masterList.nombreTabla ).subscribe( res => {
            this.detailsList = res;
         } );
      } );
   }

   goBack() {
      this.location.back();
   }
}
