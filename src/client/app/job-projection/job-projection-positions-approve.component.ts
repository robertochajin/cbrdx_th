import 'rxjs/add/operator/switchMap';
import {Component, Input}         from '@angular/core';
import {Router, ActivatedRoute, Params}   from '@angular/router';
import {Location}                 from '@angular/common';
import {JobProjection} from '../_models/jobProjection';
import {Positions} from '../_models/positions';
import {Constante} from '../_models/constante';
import {SelectItem, Message, ConfirmDialog, ConfirmationService} from 'primeng/primeng';
import {JobProjectionService} from '../_services/jobProjection.service';
import * as moment from 'moment/moment';
import {NavService} from '../_services/_nav.service';
@Component({
   moduleId: module.id,
   templateUrl: 'job-projection-positions-approve.component.html',
   selector: 'projection',
   providers: [ConfirmationService]
})

export class JobProjectionApprobeComponent {
   @Input()
   jobProjection: JobProjection = new JobProjection();
   positions: Positions = new Positions();
   constante: Constante = new Constante();
   header: string = 'Editando Proyección';
   msgs: Message[] = [];
   year: Number;
   aprobacion: boolean;

   constructor(private jobProjectionService: JobProjectionService,
               private router: Router,
               private route: ActivatedRoute,
               private location: Location,
               private confirmationService: ConfirmationService,
               private _nav: NavService) {

   }

   ngOnInit() {
      this.route.params.switchMap((params: Params) => this.jobProjectionService.getById(+params['id']))
         .subscribe(data => {
            this.jobProjection = data;
            this.jobProjectionService.getPositionsById(data.idCargo).subscribe(rest => {
               this.positions = rest;
            });

         });

   }

   onSubmit() {
      if(this.aprobacion===true){
         this.jobProjection.idEstadoProyeccion=2;
      }else{
         this.jobProjection.idEstadoProyeccion=3;
      }
      this.jobProjectionService.update(this.jobProjection)
         .subscribe(data => {
            this.msgs.push({severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.'});
            this.location.back();
         }, error => {
            this.msgs.push({severity: 'error', summary: 'Error', detail: 'Error al guardar.'});
         });
   }

   goBack(): void {
      this.confirmationService.confirm({
         message: ` ¿Esta seguro que desea salir sin guardar?`,
         header: 'Corfirmación',
         icon: 'fa fa-question-circle',
         accept: () => {
            this.location.back();
         }
      });
   }

}
