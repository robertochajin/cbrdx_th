import 'rxjs/add/operator/switchMap';
import {Component, Input, Output,EventEmitter}         from '@angular/core';
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
   templateUrl: 'job-projection-positions-add.component.html',
   selector: 'projections',
   providers: [ConfirmationService]
})

export class JobProjectionAddComponent {
   @Input()
   jobProjection: JobProjection = new JobProjection();
   ListJobProjection: JobProjection[];
   positions: Positions = new Positions();
   ListPositions: SelectItem[]=[];
   constante: Constante = new Constante();
   header: string = 'Editando Proyección';
   msgs: Message[] = [];
   year: Number;
   @Output()
   create: EventEmitter<JobProjection> = new EventEmitter<JobProjection>();

   @Output()
   dismiss: EventEmitter<number> = new EventEmitter<number>();

   constructor(private jobProjectionService: JobProjectionService,
               private router: Router,
               private route: ActivatedRoute,
               private location: Location,
               private confirmationService: ConfirmationService,
               private _nav: NavService) {

   }

   ngOnInit() {
      this.jobProjectionService.getListJobProjctionByArea(this.jobProjection.idEstructuraOrganizacional).subscribe(rest=>{
         this.ListJobProjection=rest;
      });
      this.jobProjectionService.getPositions().subscribe(rest=>{
         this.ListPositions.push({label: "Seleccione", value: null});
         for (let dp of rest) {
            let bandera = false;
            for (let r of this.ListJobProjection) {
               if (dp.idCargo === r.idCargo) {
                  bandera = true;
                  break;
               }
            }
            if (!bandera) {
               this.ListPositions.push({
                  label: dp.cargo,
                  value: dp.idCargo
               });
            }

         }
      });

      this.jobProjectionService.getConstantes().subscribe(rest => {
         for (let c of rest) {
            if (c.constante === "AUMSUE") {
               this.constante = c;
               break;
            }
         }
      });
      this.jobProjection.plazasActuales=0;
      this.jobProjection.costoActual=0;
   }

   changePosition(){
      this.jobProjectionService.getPositionsById(this.jobProjection.idCargo).subscribe(rest => {
         this.positions = rest;
      });
   }
   calculate() {
      let salario = ((this.jobProjection.plazasProyectadas * this.positions.salario) *(Number(this.constante.valor)/100))+(this.jobProjection.plazasProyectadas * this.positions.salario);
      this.jobProjection.costoProyectado=salario;
   }
   createProjection(){

      this.jobProjection.idProyecccionLaboral=null;
      this.jobProjection.costoActual=0;
      this.jobProjection.idEstadoProyeccion=1;
      this.jobProjection.estadoProyeccion="Solicitado";
      this.jobProjection.cargo= this.positions.cargo;
      this.create.emit(this.jobProjection);
      // this.localizacion.direccion = this.finalAddress;
      // this.localizacion.idTipoDireccion = this.selectedAddressType;
      // this.localizacion.nomenclaturaPrincipal = this.selectedPrincipalNomenclature;
      // if (this.localizacion.locacion.idDivisionPolitica !== undefined) {
      //    this.localizacion.idDivisionPolitica = this.localizacion.locacion.idDivisionPolitica;
      //    this.create.emit(this.localizacion);
      // } else {
      //    this.badSelect = true;
      //    this.localizacion.locacion = null;
      // }
   }
   // onSubmit() {
   //    this.jobProjection.idEstadoProyeccion=4;
   //    this.jobProjectionService.add(this.jobProjection)
   //       .subscribe(data => {
   //          this.msgs.push({severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.'});
   //          this.location.back();
   //       }, error => {
   //          this.msgs.push({severity: 'error', summary: 'Error', detail: 'Error al guardar.'});
   //       });
   // }

   discard(): void {
      this.dismiss.emit(1);
   }

}
