import { Component, OnInit } from '@angular/core';
import { Vacancies } from '../_models/vacancies';
import { VacanciesService } from '../_services/vacancies.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/primeng';
import { ListaService } from '../_services/lista.service';
import { ListaItem } from '../_models/listaItem';
import { SelectItem } from 'primeng/primeng';
import { OrganizationalStructurePositions } from '../_models/organizationalStructurePositions';
import { OrganizationalStructurePositionsServices } from '../_services/organizationalStructurePositions.service';
import { OrganizationalStructureService } from '../_services/organizationalStructure.service';
import { OrganizationalStructure } from '../_models/organizationalStructure';
import { find } from 'rxjs/operator/find';

@Component( {
               moduleId: module.id,
               templateUrl: 'vacancies.component.html',
               selector: 'vacancies-list',
               providers: [ ConfirmationService ]
            } )

export class VacanciesComponent implements OnInit {

   vacancy: Vacancies = new Vacancies();
   vacancies: Vacancies[];
   listTipoSolicitud: SelectItem[] = [];
   listEstados: SelectItem[] = [];
   listAcciones: SelectItem[] = [];
   listAutotizacion: SelectItem[] = [];
   listArea: SelectItem[] = [];
   listCargo: SelectItem[] = [];
   listOficina: SelectItem[] = [];

   es: any;
   fechaInicio: Date;
   fechaFin: Date;
   today: Date;
   osPositions: OrganizationalStructurePositions[] = [];
   listPositions: OrganizationalStructurePositions[] = [];
   countPlazas = 0;
   countOcupados = 0;
   listOrganizationalStructure: OrganizationalStructure[];

   constructor( private vacanciesService: VacanciesService,
      private router: Router,
      private confirmationService: ConfirmationService,
      private listaService: ListaService,
      private organizationalStructureService: OrganizationalStructureService,
      private ospService: OrganizationalStructurePositionsServices,
   ) {

      this.listaService.getMasterDetails( 'ListasTiposSolicitudes' ).subscribe( res => {
         this.listTipoSolicitud.push( { label: 'Todos', value: '' } );
         res.map( ( l: ListaItem ) => {
            this.listTipoSolicitud.push( { label: l.nombre, value: l.nombre } );
         } );
      } );
      this.listaService.getMasterDetails( 'ListasEstadosRequerimientos' ).subscribe( res => {
         this.listEstados.push( { label: 'Todos', value: '' } );
         res.map( ( l: ListaItem ) => {
            this.listEstados.push( { label: l.nombre, value: l.nombre } );
         } );
      } );
      this.listAutotizacion.push({label: 'Todos', value:''});
      this.listAutotizacion.push({label: 'Si', value:'Si'});
      this.listAutotizacion.push({label: 'No', value:'No'});

      this.listaService.getMasterDetails( 'ListasRequerimientosAcciones' ).subscribe( res => {
         this.listAcciones.push( { label: 'Todos', value: '' } );
         res.map( ( l: ListaItem ) => {
            this.listAcciones.push( { label: l.nombre, value: l.nombre } );
         } );
      } );

      organizationalStructureService.listOrganizationalStructure().subscribe( res => {
         this.listOrganizationalStructure = res;
         this.listArea.push({label: 'Todos', value:''});
         this.listCargo.push({label: 'Todos', value:''});
         this.listOficina.push({label: 'Todos', value:''});

         this.ospService.getAllEnabled( ).subscribe( list => {
            this.osPositions = list;
            this.countPlazas = 0;
            this.countOcupados = 0;
            for ( let position of this.osPositions ) {
               if((Number( position.plazas )- Number( position.ocupados )) > 0 ){
                  this.countPlazas = this.countPlazas + Number( position.plazas );
                  this.countOcupados = this.countOcupados + Number( position.ocupados );
                  position.estructuraOrganizacional = this.listOrganizationalStructure.find(r => r.idEstructuraOrganizacional === position.idEstructuraOrganizacional ).nombre;
                  position.estructuraFisica = this.listOrganizationalStructure.find(r => r.idEstructuraOrganizacional === position.idEstructuraOrganizacional ).estructuraFisica;
                  if(this.listCargo.filter(t => t.value === position.cargo).length  === 0){
                     if(position.cargo !== '' && position.cargo !== null) {
                        this.listCargo.push( { label: position.cargo, value: position.cargo } );
                     }
                  }
                  this.listPositions.push(position);
               }
            }
         } );
         this.listOrganizationalStructure.map(os =>{

            if(this.listArea.filter(t => t.value === os.nombre).length  === 0){
               if(os.nombre !== '' && os.nombre !== null) {
                  this.listArea.push( { label: os.nombre, value: os.nombre } );
               }
            }
            if(this.listOficina.filter(t => t.value === os.estructuraFisica ).length  === 0){
               if(os.estructuraFisica !== '' && os.estructuraFisica !== null){
                  this.listOficina.push({label: os.estructuraFisica, value:os.estructuraFisica});
               }
            }
         });

      });

   }

   ngOnInit() {
     this.vacanciesService.getAll().subscribe(
         vacancies => {
            this.vacancies = vacancies;
            this.vacancies.forEach(obj=>{
               obj.autorizacion = obj.indicadorAutorizacion ? 'Si': 'No'
            });
         }
      );


      this.es = {
         firstDayOfWeek: 1,
         dayNames: [ 'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado' ],
         dayNamesShort: [ 'dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb' ],
         dayNamesMin: [ 'D', 'L', 'M', 'X', 'J', 'V', 'S' ],
         monthNames: [ 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre',
            'diciembre'
         ],
         monthNamesShort: [ 'ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic' ]
      };
      let today = new Date();
      let date = today.getDate();
      let month = today.getMonth();
      let year = today.getFullYear();
      this.today = today;
      this.fechaFin = today;
   }

   update( c: Vacancies ) {
      this.router.navigate( [ 'vacancies/update/' + c.idRequerimiento ] );
   }

   clearDate() {
      this.fechaInicio = null;
      this.fechaFin = this.today;
   }
   changeDate(){
      let i = new Date( this.fechaInicio  );
      let f = new Date( this.fechaFin );
      let fechaInicioEnvio = `${i.getFullYear()}-${i.getMonth() + 1}-${i.getDate()}`;
      let fechaFinEnvio = `${f.getFullYear()}-${f.getMonth() + 1}-${f.getDate()}`;
      this.vacanciesService.getByDate(fechaInicioEnvio, fechaFinEnvio).subscribe(
         vacancies => {
            this.vacancies = vacancies;
            this.vacancies.forEach(obj=>{
               obj.autorizacion = obj.indicadorAutorizacion ? 'Si': 'No'
            });
         }
      );
   }

}
