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

   jobProjection: JobProjection = new JobProjection();
   ListJobProjection: JobProjection[] = [];
   ListJobProjectionTemp: JobProjection[] = [];
   ListaTiposAreas: SelectItem[] = [];
   ListaAreas: SelectItem[] = [];
   anioSelect: SelectItem[] = [];
   dialogObjet: JobProjection = new JobProjection();
   addinglocation: boolean = true;
   detailprojection: boolean = true;
   updateprojection: boolean = true;
   approveprojection: boolean = true;
   msgs: Message[] = [];
   estadoArea: string;
   idEstrucArea: number;
   nuevoCargo: boolean = false;
   viewanio: boolean = false;
   cargos: string;
   cargosA: number = 0;
   plazasA: number = 0;
   costoA: number = 0;
   costo: string;
   plazasP: string;
   costoP: string;
   plazasI: string;
   costoI: string;
   cargosI: string;

   minanio: number;
   constructor(private jobProjectionService: JobProjectionService,
               private router: Router,
               private confirmationService: ConfirmationService) {
   }

   ngOnInit() {
      let date = new Date();
      let year = date.getFullYear()-2;
      this.minanio=year;
      this.jobProjectionService.getLisTypeStructure().subscribe(rest => {
         this.ListaTiposAreas.push({label: "Seleccione", value: null});
         for (let dp of rest) {
            this.ListaTiposAreas.push({
               label: dp.estructuraArea,
               value: dp.idEstructuraArea
            });
         }
      });


   }

   calculateCostA() {
      this.plazasA = 0;
      this.cargosA = 0;
      this.costoA = 0;
      this.jobProjectionService.getLisStructurePositions(this.jobProjection.idEstructuraOrganizacional).subscribe(res => {
         for (let r of res) {
            this.cargosA += 1;
            this.plazasA += r.plazas;
            this.costoA += Number(r.plazas) * Number(r.salario);
         }
      });
   }

   changeTypeArea() {
      this.jobProjection.anio = null;
      this.nuevoCargo = false;
      this.viewanio = false;
      this.ListaAreas = [];
      this.ListJobProjection = [];
      this.jobProjectionService.getLisStructure(this.jobProjection.idCargo).subscribe(rest => {
         this.ListaAreas.push({label: "Seleccione", value: null});
         for (let dp of rest) {
            this.ListaAreas.push({
               label: dp.nombre,
               value: dp.idEstructuraOrganizacional
            });
         }
      });
   }

   changeArea() {
      this.plazasA = 0;
      this.cargosA = 0;
      this.costoA = 0;
      this.calculateCostA();
      this.jobProjection.anio = null;
      this.viewanio = true;
      this.ListJobProjection = [];
      this.jobProjectionService.getListJobProjctionByArea(this.jobProjection.idEstructuraOrganizacional).subscribe(rest => {
         this.ListJobProjectionTemp = rest;
         // for (let a of this.ListJobProjectionTemp) {
         //    if (this.minanio > a.anio) {
         //       this.minanio = a.anio;
         //    }
         // }
      });


   }

   changeAnio() {
      this.nuevoCargo = true;
      this.ListJobProjection = [];
      this.jobProjectionService.getListJobProjctionByArea(this.jobProjection.idEstructuraOrganizacional).subscribe(rest => {
         this.ListJobProjectionTemp = rest;
         for (let a of this.ListJobProjectionTemp) {
            if (this.minanio > a.anio) {
               this.minanio = a.anio;
            }
         }
      });
      let cargos = 0;
      let cargosI = 0;
      let costoI = 0;
      let plazasP = 0;
      let costoP = 0;
      let plazasI = 0;
      let ok = true;
      for (let p of this.ListJobProjectionTemp) {
         if (Number(this.jobProjection.anio) === p.anio) {
            this.ListJobProjection.push(p);
         }
      }
      for (let p of this.ListJobProjection) {
         cargos += 1;
         plazasP += Number(p.plazasProyectadas);
         costoP += p.costoProyectado;
         if (p.idEstadoProyeccion != 2) {
            ok = false;
         }
      }
      ok ? this.estadoArea = "Area Totalmente Aprobada" : this.estadoArea = "Area Parciamente Aprobada";
      this.plazasP = plazasP.toFixed(0);
      this.costoP = costoP.toFixed(2);
      this.cargos = cargos.toFixed(0);
      this.plazasI = (((plazasP - this.plazasA) / this.plazasA) * 100).toFixed(2);
      this.cargosI = (((cargos - this.cargosA) / this.cargosA) * 100).toFixed(2);
      this.costoI = (((costoP - this.costoA) / this.costoA) * 100).toFixed(2);

   }

   genProyec() {
      this.confirmationService.confirm({
         message: ` ¿Esta seguro que desea generar la proyección?`,
         header: 'Corfirmación',
         icon: 'fa fa-question-circle',
         accept: () => {
            this.jobProjectionService.genPro()
               .subscribe(data => {
                  if (data === 0) {
                     this.msgs.push({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'La proyección laboral ya fue creada.'
                     });
                  }
                  if (data === 1) {
                     this.msgs.push({
                        severity: 'info',
                        summary: 'Exito',
                        detail: 'Proyección laboral generada con exito'
                     });
                  }
               }, error => {
                  this.msgs.push({severity: 'error', summary: 'Error', detail: 'Error al guardar.'});
               });
         }
      });

   }

   update(jp: JobProjection) {
      jp.index = this.ListJobProjection.indexOf(jp);
      this.jobProjection = jp;
      this.updateprojection = !this.updateprojection;
   }

   approve(jp: JobProjection) {
      jp.index = this.ListJobProjection.indexOf(jp);
      this.jobProjection = jp;
      this.approveprojection = !this.approveprojection;
   }

   detail(obj: JobProjection) {
      this.jobProjection = obj;
      this.detailprojection = !this.detailprojection;
   }

   detailBack() {
      this.detailprojection = !this.detailprojection;
   }

   updateBack() {
      this.updateprojection = !this.updateprojection;
   }

   approveBack() {
      this.approveprojection = !this.approveprojection;
   }

   toggleform() {
      this.addinglocation = !this.addinglocation;
   }

   bindLocation(event: any) {
      let jp = new JobProjection();
      jp = event;
      this.ListJobProjection.push(jp);
      this.toggleform();
      let cargos = 0;
      let cargosI = 0;
      let costoI = 0;
      let plazasP = 0;
      let costoP = 0;
      let plazasI = 0;
      let ok = true;
      for (let p of this.ListJobProjection) {
         cargos += 1;
         plazasP += Number(p.plazasProyectadas);
         costoP += p.costoProyectado;
         if (p.idEstadoProyeccion != 2) {
            ok = false;
         }
      }
      ok ? this.estadoArea = "Area Totalmente Aprobada" : this.estadoArea = "Area Parciamente Aprobada";
      this.plazasP = plazasP.toFixed(0);
      this.costoP = costoP.toFixed(2);
      this.cargos = cargos.toFixed(0);
      this.plazasI = (((plazasP - this.plazasA) / this.plazasA) * 100).toFixed(2);
      this.cargosI = (((cargos - this.cargosA) / this.cargosA) * 100).toFixed(2);
      this.costoI = (((costoP - this.costoA) / this.costoA) * 100).toFixed(2);

   }

   updateProjection(event: any) {
      this.jobProjection = event;
      this.updateBack();
      this.ListJobProjection[this.jobProjection.index] = this.jobProjection;
      this.jobProjection.idCargo = null;
      let cargos = 0;
      let cargosI = 0;
      let costoI = 0;
      let plazasP = 0;
      let costoP = 0;
      let plazasI = 0;
      let ok = true;
      for (let p of this.ListJobProjection) {
         cargos += 1;
         plazasP += Number(p.plazasProyectadas);
         costoP += p.costoProyectado;
         if (p.idEstadoProyeccion != 2) {
            ok = false;
         }
      }
      ok ? this.estadoArea = "Area Totalmente Aprobada" : this.estadoArea = "Area Parciamente Aprobada";
      this.plazasP = plazasP.toFixed(0);
      this.costoP = costoP.toFixed(2);
      this.cargos = cargos.toFixed(0);
      this.plazasI = (((plazasP - this.plazasA) / this.plazasA) * 100).toFixed(2);
      this.cargosI = (((cargos - this.cargosA) / this.cargosA) * 100).toFixed(2);
      this.costoI = (((costoP - this.costoA) / this.costoA) * 100).toFixed(2);

   }

   approveProjection(event: any) {
      this.jobProjection = event;
      this.approveBack();
      this.ListJobProjection[this.jobProjection.index] = this.jobProjection;
      this.jobProjection.idCargo = null;
      let cargos = 0;
      let cargosI = 0;
      let costoI = 0;
      let plazasP = 0;
      let costoP = 0;
      let plazasI = 0;
      let ok = true;
      for (let p of this.ListJobProjection) {
         cargos += 1;
         plazasP += Number(p.plazasProyectadas);
         costoP += p.costoProyectado;
         if (p.idEstadoProyeccion != 2) {
            ok = false;
         }
      }
      ok ? this.estadoArea = "Area Totalmente Aprobada" : this.estadoArea = "Area Parciamente Aprobada";
      this.plazasP = plazasP.toFixed(0);
      this.costoP = costoP.toFixed(2);
      this.cargos = cargos.toFixed(0);
      this.plazasI = (((plazasP - this.plazasA) / this.plazasA) * 100).toFixed(2);
      this.cargosI = (((cargos - this.cargosA) / this.cargosA) * 100).toFixed(2);
      this.costoI = (((costoP - this.costoA) / this.costoA) * 100).toFixed(2);

   }


   confirmar(jp: JobProjection) {
      jp.idEstadoProyeccion = 4;
      this.dialogObjet = jp;
      this.jobProjectionService.add(this.dialogObjet).subscribe(rest => {
         this.ListJobProjection.splice(this.ListJobProjection.indexOf(this.dialogObjet), 1);
         this.jobProjectionService.getPositionsById(rest.idCargo).subscribe(res => {
            rest.cargo = res.cargo;
         });
         this.jobProjectionService.getEstadoById(rest.idEstadoProyeccion).subscribe(res => {
            rest.estadoProyeccion = res.nombre;
         });
         this.ListJobProjection.push(rest);
      });
      let ok = true;
      for (let p of this.ListJobProjection) {
         if (p.idEstadoProyeccion != 2) {
            ok = false;
         }
      }
      ok ? this.estadoArea = "Area Totalmente Aprobada" : this.estadoArea = "Area Parciamente Aprobada";

   }

   delete(jp: JobProjection) {
      this.dialogObjet = jp;
      this.ListJobProjection.splice(this.ListJobProjection.indexOf(this.dialogObjet), 1);
      let cargos = 0;
      let cargosI = 0;
      let costoI = 0;
      let plazasP = 0;
      let costoP = 0;
      let plazasI = 0;
      let ok = true;
      for (let p of this.ListJobProjection) {
         cargos += 1;
         plazasP += Number(p.plazasProyectadas);
         costoP += p.costoProyectado;
         if (p.idEstadoProyeccion != 2) {
            ok = false;
         }
      }
      ok ? this.estadoArea = "Area Totalmente Aprobada" : this.estadoArea = "Area Parciamente Aprobada";
      this.plazasP = plazasP.toFixed(0);
      this.costoP = costoP.toFixed(2);
      this.cargos = cargos.toFixed(0);
      this.plazasI = (((plazasP - this.plazasA) / this.plazasA) * 100).toFixed(2);
      this.cargosI = (((cargos - this.cargosA) / this.cargosA) * 100).toFixed(2);
      this.costoI = (((costoP - this.costoA) / this.costoA) * 100).toFixed(2);

   }

   calculate() {

   }
}
