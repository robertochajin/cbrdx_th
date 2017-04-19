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
   dialogObjet: JobProjection = new JobProjection();
   addinglocation: boolean = true;
   msgs: Message[] = [];
   estadoArea: string;
   idEstrucArea: number;
   nuevoCargo: boolean = false;
   viewanio: boolean = false;
   cargos: string;
   cargosA: number=0;
   plazasA: number=0;
   costoA: number=0;
   costo: string;
   plazasP: string;
   costoP: string;
   plazasI: string;
   costoI: string;
   cargosI: string;

   constructor(private jobProjectionService: JobProjectionService,
               private router: Router,
               private confirmationService: ConfirmationService) {
   }

   ngOnInit() {

      let date = new Date();
      let yyyy = date.getFullYear();
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

   changeTypeArea() {
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
      this.viewanio = true;
      this.ListJobProjection = [];
      this.jobProjectionService.getListJobProjctionByArea(this.jobProjection.idEstructuraOrganizacional).subscribe(rest => {
         this.ListJobProjectionTemp = rest;
      });

   }
   changeAnio() {
      this.plazasA=0;
      this.cargosA=0;
      this.costoA=0;
      this.jobProjectionService.getLisStructurePositions(this.jobProjection.idEstructuraOrganizacional).subscribe(res=>{
         for(let r of res){
            this.cargosA+=1;
            this.plazasA+=r.plazas;
            this.costoA+=Number(r.plazas)*Number(r.salario);
         }
      });
      this.nuevoCargo = true;
      this.ListJobProjection = [];
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
      for(let p of this.ListJobProjection){
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
      this.cargosI = (((cargos - cargos) / cargos) * 100).toFixed(2);
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
      this.router.navigate(['job-projection/update/' + jp.idProyecccionLaboral]);
   }

   approve(jp: JobProjection) {
      this.router.navigate(['job-projection/approbe/' + jp.idProyecccionLaboral]);
   }

   detail(jp: JobProjection) {
      this.router.navigate(['job-projection/detail/' + jp.idProyecccionLaboral]);
   }

   add(a: number) {
      this.router.navigate(['job-projection/add/' + this.idEstrucArea+'-'+a]);
   }
   bindLocation( event: any ) {
      this.jobProjection = event;
      this.ListJobProjection.push(this.jobProjection);
      this.toggleform();
      let cargos = 0;
      let cargosI = 0;
      let costoI = 0;
      let plazasP = 0;
      let costoP = 0;
      let plazasI = 0;
      let ok = true;
      for(let p of this.ListJobProjection){
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
      this.cargosI = (((cargos - cargos) / cargos) * 100).toFixed(2);
      this.costoI = (((costoP - this.costoA) / this.costoA) * 100).toFixed(2);

   }
   toggleform(){
      this.addinglocation = !this.addinglocation;
   }
   confirmar(jp: JobProjection){
      jp.idEstadoProyeccion=4;
      this.dialogObjet = jp;
      this.jobProjectionService.add(this.dialogObjet).subscribe(rest=>{
      this.ListJobProjection.splice(this.ListJobProjection.indexOf(this.dialogObjet), 1);
      this.jobProjectionService.getPositionsById(rest.idCargo).subscribe(res=>{
         rest.cargo= res.cargo;
      });
      this.jobProjectionService.getEstadoById(rest.idEstadoProyeccion).subscribe(res=>{
         rest.estadoProyeccion= res.nombre;
      });
      this.ListJobProjection.push(rest);
      });
      let ok = true;
      for(let p of this.ListJobProjection){
         if (p.idEstadoProyeccion != 2) {
            ok = false;
         }
      }
      ok ? this.estadoArea = "Area Totalmente Aprobada" : this.estadoArea = "Area Parciamente Aprobada";

   }
   delete(jp: JobProjection){
     this.ListJobProjection.splice(this.ListJobProjection.indexOf(this.dialogObjet), 1);
      let ok = true;
      for(let p of this.ListJobProjection){
         if (p.idEstadoProyeccion != 2) {
            ok = false;
         }
      }
      ok ? this.estadoArea = "Area Totalmente Aprobada" : this.estadoArea = "Area Parciamente Aprobada";

   }
}
