import 'rxjs/add/operator/switchMap';
import { Risk } from '../_models/position-risks';
import { RiskService } from '../_services/positios-risks.service';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Exam } from '../_models/position-exam';
import { SelectItem, Message, ConfirmationService } from 'primeng/primeng';
import { Positions } from '../_models/positions';
import { ListaItem } from '../_models/listaItem';
import { ListaService } from '../_services/lista.service';

@Component( {
               moduleId: module.id,
               templateUrl: 'position-risks-list.html',
               selector: 'position-risks',
               providers: [ ConfirmationService ]
            } )
export class RiskComponent implements OnInit {

   @Input()
   position: Positions;
   Risk: Risk;

   @Output()
   nextStep: EventEmitter<number> = new EventEmitter<number>();

   header = 'Riesgos Laborales';
   risk: Risk = new Risk();
   exam: Exam = new Exam();
   dialogObjet: Risk = new Risk();
   showForm = true;
   msgs: Message[] = [];
   listRisk: Risk[] = [];
   listRisks: Risk[] = [];
   listTipoRiesgos: SelectItem[] = [];
   allTipoRiesgos: any[] = [];
   listSubtipoRiesgo: SelectItem[] = [];
   allSubtipoRiesgo: any[] = [];
   listRiesgo: SelectItem[] = [];
   allRiesgo: any[] = [];
   listExam: SelectItem[] = [];
   ListPositionExam: Exam[];
   PositionExam: Exam[];
   idTypeRisk: string;
   idSubtypeRisk: string;
   guardando = false;
   msgsAlert: Message[] = [];

   constructor( private riskService: RiskService,
      private listaService: ListaService,
      private router: Router,
      private route: ActivatedRoute,
      private confirmationService: ConfirmationService ) {

      this.riskService.getTypeRisk().subscribe( rest => {
         this.allTipoRiesgos = rest;
         this.listTipoRiesgos.push( { label: 'Seleccione', value: null } );
         for ( let dp of rest ) {
            this.listTipoRiesgos.push( {
                                          label: dp.riesgoTipo,
                                          value: dp.idRiesgoTipo
                                       } );
         }
      } );

      this.riskService.getSubypeRisk().subscribe( rest => {
         this.allSubtipoRiesgo = rest;
      } );

      this.riskService.getRisk().subscribe( rest => {
         this.allRiesgo = rest;
      } );

   }

   ngOnInit() {

      this.risk.idCargo = this.position.idCargo;
      this.exam.idCargo = this.position.idCargo;

      this.listaService.getMasterDetails( 'ListasExamenes' ).subscribe( res => {
         res.map( ( s: ListaItem ) => {
            this.listExam.push( { label: s.nombre, value: s.idLista } );
         } );

         this.riskService.getExamByIdCargo( this.risk.idCargo ).subscribe(
            exam => {
               this.ListPositionExam = exam;
               this.PositionExam = exam;
               for ( let le of  this.listExam ) {
                  let bandera = false;
                  for ( let pe of this.ListPositionExam ) {
                     if ( Number( le.label ) === pe.idExamen ) {
                        bandera = true;
                        break;
                     }
                  }
                  if ( !bandera ) {
                     let ex = new Exam();
                     ex.idExamen = Number( le.value );
                     ex.examen = le.label;
                     ex.indicadorIngreso = false;
                     ex.indicadorPeriodicidad = false;
                     ex.indicadorRetiro = false;
                     this.PositionExam.push( ex );
                  }
               }
            }
         );
      } );

      this.riskService.getRiskByIdCargo( this.risk.idCargo ).subscribe(
         risk => {
            for ( let rk of risk ) {
               let r = new Risk();
               r.idCargo = rk.idCargo;
               r.idCargoRiesgo = rk.idCargoRiesgo;
               r.idRiesgo = rk.idRiesgo;
               r.auditoriaFecha = rk.auditoriaFecha;
               r.auditoriaFecha = rk.auditoriaFecha;

               this.riskService.getRiskById( rk.idRiesgo ).subscribe( rest => {
                  r.riesgo = rest.riesgo;
                  this.riskService.getTypeRiskById( rest.idTipoRiesgo ).subscribe( restT => {
                     r.tipo = restT.riesgoTipo;
                  } );
                  this.riskService.getSubypeRiskById( rest.idSubTipoRiesgo ).subscribe( restS => {
                     r.subtipo = restS.riesgoSubTipo;
                  } );
               } );
               this.listRisks.push( r );
            }
         }
      );

   }

   onSubmit() {
      this.msgs = [];
      this.confirmationService.confirm( {
                                           message: ` ¿Esta seguro que desea agregar este riesgo?`,
                                           header: 'Corfirmación',
                                           icon: 'fa fa-question-circle',
                                           accept: () => {
                                              this.guardando = true;
                                              if ( this.listRisks.filter( r => r.idRiesgo === this.risk.idRiesgo &&
                                                                               r.idCargo === this.risk.idCargo ).length > 0 ) {
                                                 this.msgs[ 0 ] = { severity: 'error', summary: 'Error', detail: 'El riesgo ya existe!' };
                                                 this.guardando = false;
                                              } else {
                                                 this.riskService.add( this.risk )
                                                 .subscribe( data => {
                                                    this.msgsAlert = [];
                                                    this.msgs[ 0 ] = {
                                                       severity: 'info',
                                                       summary: 'Exito',
                                                       detail: 'Registro guardado correctamente.'
                                                    };
                                                    let riesgo = this.allRiesgo.find( s1 => s1.idRiesgo === this.risk.idRiesgo );
                                                    let tipo = this.allTipoRiesgos.find( s2 => s2.idRiesgoTipo === riesgo.idTipoRiesgo );
                                                    let subtipo = this.allSubtipoRiesgo.find(
                                                       s2 => s2.idRiesgoSubTipo === riesgo.idSubTipoRiesgo );
                                                    this.risk.riesgo = riesgo.riesgo ? riesgo.riesgo : '';
                                                    this.risk.tipo = tipo.riesgoTipo ? riesgo.riesgoTipo : '';
                                                    this.risk.subtipo = subtipo.riesgoSubTipo ? riesgo.riesgoSubTipo : '';
                                                    this.listRisks.push( this.risk );
                                                    this.idTypeRisk = null;
                                                    this.idSubtypeRisk = null;
                                                    this.risk.idRiesgo = null;
                                                    this.guardando = false;
                                                 }, error => {
                                                    this.showForm = true;
                                                    this.msgs[ 0 ] = { severity: 'error', summary: 'Error', detail: 'Error al guardar.' };
                                                 } );
                                              }
                                           }
                                        } );
   }

   changeType() {
      this.listSubtipoRiesgo = [];
      this.listRiesgo = [];
      this.risk.idRiesgo = null;
      this.idSubtypeRisk = null;
      this.listSubtipoRiesgo.push( { label: 'Seleccione', value: null } );
      for ( let dp of this.allSubtipoRiesgo ) {
         if ( dp.idRiesgoTipo === this.idTypeRisk ) {
            this.listSubtipoRiesgo.push( {
                                            label: dp.riesgoSubTipo,
                                            value: dp.idRiesgoSubTipo
                                         } );
         }
      }
   }

   changeSubtype() {
      this.listRiesgo = [];
      this.risk.idRiesgo = null;
      this.listRiesgo.push( { label: 'Seleccione', value: null } );
      this.riskService.getRiskByIdCargo( this.risk.idCargo ).subscribe(
         risk => {
            for ( let dp of this.allRiesgo ) {
               let bandera = false;
               for ( let r of risk ) {
                  if ( dp.idRiesgo === r.idRiesgo ) {
                     bandera = true;
                     break;
                  }
               }
               if ( !bandera ) {
                  if ( dp.idTipoRiesgo === this.idTypeRisk && dp.idSubTipoRiesgo === this.idSubtypeRisk ) {
                     this.listRiesgo.push( {
                                              label: dp.riesgo,
                                              value: dp.idRiesgo
                                           } );
                  }
               }
            }
         }
      );
      // for (let dp of this.allRiesgo) {
      //    if (dp.idTipoRiesgo === this.idTypeRisk && dp.idSubTipoRiesgo === this.idSubtypeRisk) {
      //       this.listRiesgo.push({
      //          label: dp.riesgo,
      //          value: dp.idRiesgo
      //       });
      //    }
      // }
   }

   changeExam( e: Exam ) {
      this.msgs = [];
      if ( e.idCargoExamen !== null ) {
         this.riskService.updatePositionExam( e )
         .subscribe( data => {
            this.msgs.push( { severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.' } );
         }, error => {
            this.showForm = true;
            this.msgs.push( { severity: 'error', summary: 'Error', detail: 'Error al guardar.' } );
         } );
      } else {
         e.idCargo = this.exam.idCargo;
         this.riskService.addPositionExam( e )
         .subscribe( data => {
            this.msgs.push( { severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.' } );
         }, error => {
            this.showForm = true;
            this.msgs.push( { severity: 'error', summary: 'Error', detail: 'Error al guardar.' } );
         } );
      }
   }

   //
   // periodicidad(e: Exam) {
   //   if (e.idCargoExamen !== null) {
   //     this.riskService.updatePositionExam(e)
   //       .subscribe(data => {
   //         this.msgs.push({severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.'});
   //       }, error => {
   //         this.showForm = true;
   //         this.msgs.push({severity: 'error', summary: 'Error', detail: 'Error al guardar.'});
   //       })
   //   } else {
   //     e.idCargo= this.exam.idCargo;
   //     this.riskService.addPositionExam(e)
   //       .subscribe(data => {
   //         this.msgs.push({severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.'});
   //       }, error => {
   //         this.showForm = true;
   //         this.msgs.push({severity: 'error', summary: 'Error', detail: 'Error al guardar.'});
   //       });
   //   }
   // }
   //
   // retiro(e: Exam) {
   //   if (e.idCargoExamen !== null) {
   //     this.riskService.updatePositionExam(e)
   //       .subscribe(data => {
   //         this.msgs.push({severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.'});
   //       }, error => {
   //         this.showForm = true;
   //         this.msgs.push({severity: 'error', summary: 'Error', detail: 'Error al guardar.'});
   //       })
   //   } else {
   //     e.idCargo= this.exam.idCargo;
   //     this.riskService.addPositionExam(e)
   //       .subscribe(data => {
   //         this.msgs.push({severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.'});
   //       }, error => {
   //         this.showForm = true;
   //         this.msgs.push({severity: 'error', summary: 'Error', detail: 'Error al guardar.'});
   //       });
   //   }
   // }
   next() {
      if ( this.listRisks.length > 0 ) {
         this.nextStep.emit( 14 );
         this.msgsAlert = [];
      } else {
         this.msgsAlert[ 0 ] = { severity: 'error', summary: 'Error', detail: 'Debe llenar al menos un Riesgo' };
      }

   }

}



