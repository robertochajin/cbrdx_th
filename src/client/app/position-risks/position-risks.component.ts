import "rxjs/add/operator/switchMap";
import {Location} from "@angular/common";
import {Risk} from "../_models/position-risks";
import {RiskService} from "../_services/positios-risks.service";
import {NavService} from "../_services/_nav.service"
import {Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Exam} from '../_models/position-exam';
import {SelectItem, Message, ConfirmationService} from 'primeng/primeng';
import { Positions } from "../_models/positions";

@Component({
  moduleId: module.id,
  templateUrl: 'position-risks-list.html',
  selector: 'position-risks',
  providers: [ConfirmationService]
})
export class RiskComponent {
   
   @Input()
   position: Positions;
  Risk: Risk;
  
  header: string = 'Riesgos Laborales';
  risk: Risk = new Risk();
  exam: Exam = new Exam();
  dialogObjet: Risk = new Risk();
  show_form: boolean = true;
  msgs: Message[] = [];
  listRisk: Risk[];
  listRisks: Risk[] = [];
  listTipoRiesgos: SelectItem[] = [];
  listSubtipoRiesgo: SelectItem[] = [];
  listRiesgo: SelectItem[] = [];
  listExam: SelectItem[] = [];
  ListPositionExam: Exam[];
  PositionExam: Exam[];
  idTypeRisk: string;
  idSubtypeRisk: string;

  constructor(private riskService: RiskService,
              private router: Router,
              private route: ActivatedRoute,
              private confirmationService: ConfirmationService,) {

  }

  ngOnInit() {
     
      this.risk.idCargo = this.position.idCargo;
      this.exam.idCargo = this.position.idCargo;

    this.riskService.getListExam().subscribe(rest => {
      for (let dp of rest) {
        this.listExam.push({label: dp.idListaExamen, value: dp.nombre});
      }
    });
    this.riskService.getExamByIdCargo(this.risk.idCargo).subscribe(
      exam => {
        this.ListPositionExam = exam;
        this.PositionExam = exam;
        for (let le of  this.listExam) {
          let bandera = false;
          for (let pe of this.ListPositionExam) {
            if (Number(le.label) === pe.idExamen) {
              bandera = true;
              break;
            }
          }
          if (!bandera) {
            let ex = new Exam();
            ex.idExamen = Number(le.label);
            ex.examen = le.value;
            ex.indicadorIngreso = false;
            ex.indicadorPeriodicidad = false;
            ex.indicadorRetiro = false;
            this.PositionExam.push(ex);
          }
        }
      }
    );


    this.riskService.getRiskByIdCargo(this.risk.idCargo).subscribe(
      risk => {
        for (let rk of risk) {
          let r = new Risk();
          r.idCargo = rk.idCargo;
          r.idCargoRiesgo = rk.idCargoRiesgo;
          r.auditoriaFecha = rk.auditoriaFecha;
          r.auditoriaFecha = rk.auditoriaFecha;
          this.riskService.getRiskById(rk.idRiesgo).subscribe(rest => {
            r.riesgo = rest.riesgo;
            this.riskService.getTypeRiskById(rest.idTipoRiesgo).subscribe(restT => {
              r.tipo = restT.riesgoTipo;
            });
            this.riskService.getSubypeRiskById(rest.idSubTipoRiesgo).subscribe(restS => {
              r.subtipo = restS.riesgoSubTipo;
            });
          });
          this.listRisks.push(r);
        }
      }
    );
    this.riskService.getTypeRisk().subscribe(rest => {
      this.listTipoRiesgos.push({label: "Seleccione", value: null});
      for (let dp of rest) {
        this.listTipoRiesgos.push({
          label: dp.riesgoTipo,
          value: dp.idRiesgoTipo
        });
      }
    });

  }

  onSubmit() {
    this.msgs = [];
    this.confirmationService.confirm({
      message: ` ¿Esta seguro que desea agregar este riesgo?`,
      header: 'Corfirmación',
      icon: 'fa fa-question-circle',
      accept: () => {
        this.riskService.add(this.risk)
          .subscribe(data => {
            this.msgs.push({severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.'});
            this.riskService.getRiskById(this.risk.idRiesgo).subscribe(rest => {
              this.risk.riesgo = rest.riesgo;
              this.riskService.getTypeRiskById(rest.idTipoRiesgo).subscribe(restT => {
                this.risk.tipo = restT.riesgoTipo;
              });
              this.riskService.getSubypeRiskById(rest.idSubTipoRiesgo).subscribe(restS => {
                this.risk.subtipo = restS.riesgoSubTipo;
              });
            });
            this.listRisks.push(this.risk);
          }, error => {
            this.show_form = true;
            this.msgs.push({severity: 'error', summary: 'Error', detail: 'Error al guardar.'});
          });
      }
    });


  }

  changeType() {
    this.listSubtipoRiesgo = [];
    this.listRiesgo = [];
    this.risk.idRiesgo = null;
    this.idSubtypeRisk = null;
    this.riskService.getSubypeRisk().subscribe(rest => {
      this.listSubtipoRiesgo.push({label: "Seleccione", value: null});
      for (let dp of rest) {
        if (dp.idRiesgoTipo === this.idTypeRisk) {
          this.listSubtipoRiesgo.push({
            label: dp.riesgoSubTipo,
            value: dp.idRiesgoSubTipo
          });
        }
      }
    });
  }

  changeSubtype() {
    this.listRiesgo = [];
    this.risk.idRiesgo = null;
    this.riskService.getRisk().subscribe(rest => {
      this.listRiesgo.push({label: "Seleccione", value: null});
      for (let dp of rest) {
        if (dp.idTipoRiesgo === this.idTypeRisk && dp.idSubTipoRiesgo === this.idSubtypeRisk) {
          this.listRiesgo.push({
            label: dp.riesgo,
            value: dp.idRiesgo
          });
        }
      }
    });
  }

  changeExam(e: Exam) {
    if (e.idCargoExamen != null) {
      this.riskService.updatePositionExam(e)
        .subscribe(data => {
          this.msgs.push({severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.'});
        }, error => {
          this.show_form = true;
          this.msgs.push({severity: 'error', summary: 'Error', detail: 'Error al guardar.'});
        })
    } else {
      e.idCargo= this.exam.idCargo;
      this.riskService.addPositionExam(e)
        .subscribe(data => {
          this.msgs.push({severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.'});
        }, error => {
          this.show_form = true;
          this.msgs.push({severity: 'error', summary: 'Error', detail: 'Error al guardar.'});
        });
    }
  }
  //
  // periodicidad(e: Exam) {
  //   if (e.idCargoExamen != null) {
  //     this.riskService.updatePositionExam(e)
  //       .subscribe(data => {
  //         this.msgs.push({severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.'});
  //       }, error => {
  //         this.show_form = true;
  //         this.msgs.push({severity: 'error', summary: 'Error', detail: 'Error al guardar.'});
  //       })
  //   } else {
  //     e.idCargo= this.exam.idCargo;
  //     this.riskService.addPositionExam(e)
  //       .subscribe(data => {
  //         this.msgs.push({severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.'});
  //       }, error => {
  //         this.show_form = true;
  //         this.msgs.push({severity: 'error', summary: 'Error', detail: 'Error al guardar.'});
  //       });
  //   }
  // }
  //
  // retiro(e: Exam) {
  //   if (e.idCargoExamen != null) {
  //     this.riskService.updatePositionExam(e)
  //       .subscribe(data => {
  //         this.msgs.push({severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.'});
  //       }, error => {
  //         this.show_form = true;
  //         this.msgs.push({severity: 'error', summary: 'Error', detail: 'Error al guardar.'});
  //       })
  //   } else {
  //     e.idCargo= this.exam.idCargo;
  //     this.riskService.addPositionExam(e)
  //       .subscribe(data => {
  //         this.msgs.push({severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.'});
  //       }, error => {
  //         this.show_form = true;
  //         this.msgs.push({severity: 'error', summary: 'Error', detail: 'Error al guardar.'});
  //       });
  //   }
  // }

}



