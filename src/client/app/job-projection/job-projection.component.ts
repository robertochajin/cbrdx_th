import {Component} from '@angular/core';
import {JobProjection} from '../_models/jobProjection';
import {JobProjectionService} from '../_services/jobProjection.service';
import {Router} from '@angular/router';
import {ConfirmationService, Message, SelectItem} from 'primeng/primeng';

@Component({
   moduleId: module.id,
   templateUrl: 'job-projection.component.html',
   selector: 'projection',
   providers: [ConfirmationService]
})

export class JobProjectionComponent {

   JobProjection: JobProjection = new JobProjection();
   ListJobProjection: JobProjection[]=[];
   ListaEstados: SelectItem[]= [];
   dialogObjet: JobProjection = new JobProjection();
   msgs: Message[] = [];

   constructor(private jobProjectionService: JobProjectionService,
               private router: Router,
               private confirmationService: ConfirmationService) {
   }

   ngOnInit() {

      this.jobProjectionService.getAll().subscribe(
         projection => {
            this.ListJobProjection = projection;
         }
      );

      this.jobProjectionService.getListEstados().subscribe(rest => {
         this.ListaEstados.push({label: "Seleccione", value: null});
         for (let dp of rest) {
            this.ListaEstados.push({
               label: dp.nombre,
               value: dp.idListaEstadoCargo
            });
         }
      });

      // this.jobProjectionService.getAll().subscribe(
      //    projection => {
      //       for (let r of projection) {
      //          this.jobProjectionService.getTypeRiskById(r.idTipoRiesgo).subscribe(
      //             res => {
      //                r.tipo = res.riesgoTipo;
      //             });
      //          this.jobProjectionService.getSubTypeRiskById(r.idSubTipoRiesgo).subscribe(
      //             res => {
      //                r.subtipo = res.riesgoSubTipo;
      //             });
      //          this.risks.push(r);
      //       }
      //    }
      // );

   }

   // del(risks: Risks) {
   //    this.dialogObjet = risks;
   //    this.confirmationService.confirm({
   //       message: ` ¿Esta seguro que lo desea eliminar?`,
   //       header: 'Corfirmación',
   //       icon: 'fa fa-question-circle',
   //       accept: () => {
   //          this.dialogObjet.indicadorHabilitado = false;
   //          this.risksService.update(this.dialogObjet).subscribe(r => {
   //             this.risks.splice(this.risks.indexOf(this.dialogObjet), 1);
   //             this.dialogObjet = null;
   //          });
   //       },
   //       reject: () => {
   //          this.dialogObjet = null;
   //       }
   //    });
   // }

   // change(r: Risks) {
   //    this.risksService.update(r)
   //       .subscribe(data => {
   //          this.msgs.push({severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.'});
   //       }, error => {
   //          this.msgs.push({severity: 'error', summary: 'Error', detail: 'Error al guardar.'});
   //       });
   // }

   // detail(r: Risks) {
   //    this.router.navigate(['risks/detail/' + r.idRiesgo]);
   // }
   //
   // add() {
   //    this.router.navigate(['risks/add']);
   // }
   //
   // update(r: Risks) {
   //    this.router.navigate(['risks/update/' + r.idRiesgo]);
   // }


}
