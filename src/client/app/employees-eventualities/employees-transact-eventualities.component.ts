import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EmployeeEventuality } from '../_models/employeeEventuality';
import { EmployeeEventualitiesService } from '../_services/employees-eventualities.service';
import { AdjuntosService } from '../_services/adjuntos.service';
import { EmployeeEventualitiesActivitiesService } from '../_services/employee-eventualities-activities.service';
import { EmployeeEventualityActivity } from '../_models/employeeEventualitiesActivities';
import { NavService } from '../_services/_nav.service';
import { ListaService } from '../_services/lista.service';
import { Message, SelectItem } from 'primeng/primeng';
import { Location } from '@angular/common';
import { EmployeesService } from '../_services/employees.service';
import { Employee } from '../_models/employees';

@Component( {
               moduleId: module.id,
               templateUrl: 'employees-transact-eventualities.component.html',
               selector: 'employee-transact-eventuality'
            } )
export class EventualityTransactEmployeeComponent {
   @Input()
   employeeEventuality: EmployeeEventuality;

   listField: any[] = [];
   @Output()
   dismiss: EventEmitter<number> = new EventEmitter<number>();

   employeeEventualityActivity: EmployeeEventualityActivity = new EmployeeEventualityActivity();
   listActivities: EmployeeEventualityActivity[] = [];
   listEstados: SelectItem[] = [];
   msgs: Message[];
   employee: Employee = new Employee();

   constructor( private employeeEventualitiesActivitiesService: EmployeeEventualitiesActivitiesService,
      private router: Router,
      private _nav: NavService,
      private adjuntosService: AdjuntosService,
      private route: ActivatedRoute ) {
   }

   ngOnInit() {
      this.employeeEventualitiesActivitiesService.getAllByEventuality( this.employeeEventuality.idTerceroNovedad ).subscribe( data => {
         this.listActivities = data;
      } );

   }

   downloadFile( id: number ) {
      this.adjuntosService.downloadFile( id ).subscribe( res => {
         this.adjuntosService.getFileName( id ).subscribe( adj => {
            saveAs( res, adj.nombreArchivo );
         } );
      } );
   }

   goBack(): void {
      this.dismiss.emit( 1 );
   }
}
