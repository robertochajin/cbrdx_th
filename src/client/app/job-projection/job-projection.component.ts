import { Component, OnInit } from '@angular/core';
import { JobProjection } from '../_models/jobProjection';
import { JobProjectionService } from '../_services/jobProjection.service';
import { Router } from '@angular/router';
import { ConfirmationService, Message, SelectItem } from 'primeng/primeng';
import { ListaService } from '../_services/lista.service';
import { NavService } from '../_services/_nav.service';

@Component( {
               moduleId: module.id,
               templateUrl: 'job-projection.component.html',
               selector: 'job-projection',
               providers: [ ConfirmationService ]
            } )

export class JobProjectionComponent implements OnInit {

   jobProjection: JobProjection = new JobProjection();
   ListJobProjection: JobProjection[] = [];
   ListJobProjectionTemp: JobProjection[] = [];
   ListaTiposAreas: SelectItem[] = [];
   ListaAreas: SelectItem[] = [];
   anioSelect: SelectItem[] = [];
   dialogObjet: JobProjection = new JobProjection();
   addinglocation = true;
   detailprojection = true;
   updateprojection = true;
   approveprojection = true;
   msgs: Message[] = [];
   estadoArea: string;
   idEstrucArea: number;
   nuevoCargo = false;
   viewanio = false;
   cargos: string;
   cargosA = 0;
   plazasA = 0;
   costoA = '0';
   costoAA = 0;
   costo: string;
   plazasP: string;
   costoP: string;
   plazasI: string;
   costoI: string;
   cargosI: string;
   date = new Date();
   year = this.date.getFullYear() - 2;
   minanio: number;

   constructor( private jobProjectionService: JobProjectionService,
      private listaService: ListaService,
      private router: Router,
      private confirmationService: ConfirmationService,
      private _nav: NavService
   ) {
   }

   ngOnInit() {
      this.minanio = this.year;
      this.jobProjectionService.getLisTypeStructure().subscribe( rest => {
         this.ListaTiposAreas.push( { label: 'Seleccione', value: null } );
         for ( let dp of rest ) {
            this.ListaTiposAreas.push( {
                                          label: dp.estructuraArea,
                                          value: dp.idEstructuraArea
                                       } );
         }
      } );
   }

   calculateCostA() {
      this.plazasA = 0;
      this.cargosA = 0;
      this.costoA = '0';
      let costoa = 0;
      this.jobProjectionService.getLisStructurePositions( this.jobProjection.idEstructuraOrganizacional ).subscribe( res => {
         for ( let r of res ) {
            this.cargosA += 1;
            this.plazasA += r.plazas;
            costoa += Number( r.plazas ) * Number( r.salario );
            this.costoAA += Number( r.plazas ) * Number( r.salario );
         }
         this.costoA = new Intl.NumberFormat( [ 'ban', 'id' ] ).format( costoa );
      } );
   }

   changeTypeArea() {
      this.minanio = this.year;
      this.jobProjection.anio = null;
      this.nuevoCargo = false;
      this.viewanio = false;
      this.ListaAreas = [];
      this.ListJobProjection = [];
      this.jobProjectionService.getLisStructure( this.jobProjection.idCargo ).subscribe( rest => {
         this.ListaAreas.push( { label: 'Seleccione', value: null } );
         for ( let dp of rest ) {
            this.ListaAreas.push( {
                                     label: dp.nombre,
                                     value: dp.idEstructuraOrganizacional
                                  } );
         }
      } );
   }

   changeArea() {
      this.minanio = this.year;
      this.plazasA = 0;
      this.cargosA = 0;
      this.costoA = '0';
      this.calculateCostA();
      this.jobProjection.anio = null;
      this.viewanio = true;
      this.ListJobProjection = [];
      this.jobProjectionService.getListJobProjctionByArea( this.jobProjection.idEstructuraOrganizacional ).subscribe( rest => {
         this.ListJobProjectionTemp = rest;
      } );

   }

   changeAnio() {
      this.nuevoCargo = true;
      this.ListJobProjection = [];
      this.jobProjectionService.getListJobProjctionByArea( this.jobProjection.idEstructuraOrganizacional ).subscribe( rest => {
         this.ListJobProjectionTemp = rest;
         for ( let a of this.ListJobProjectionTemp ) {
            if ( this.minanio > a.anio ) {
               this.minanio = a.anio;
            }
         }
      } );
      let cargos = 0;
      let cargosI = 0;
      let costoI = 0;
      let plazasP = 0;
      let costoP = 0;
      let plazasI = 0;
      let ok = true;
      for ( let p of this.ListJobProjectionTemp ) {
         if ( Number( this.jobProjection.anio ) === p.anio ) {
            let v = p.costoProyectado;
            let va = p.costoActual;
            p.costoPP = new Intl.NumberFormat( [ 'ban', 'id' ] ).format( v );
            p.costoAP = new Intl.NumberFormat( [ 'ban', 'id' ] ).format( va );
            this.ListJobProjection.push( p );
         }
      }
      for ( let p of this.ListJobProjection ) {
         cargos += 1;
         plazasP += Number( p.plazasProyectadas );
         costoP += p.costoProyectado;
         if ( p.idEstadoProyeccion !== 2 ) {
            ok = false;
         }
      }
      ok ? this.estadoArea = 'Area Totalmente Aprobada' : this.estadoArea = 'Area Parciamente Aprobada';
      this.plazasP = plazasP.toFixed( 0 );
      this.costoP = new Intl.NumberFormat( [ 'ban', 'id' ] ).format( costoP );
      this.cargos = cargos.toFixed( 0 );
      this.plazasI = (((plazasP - this.plazasA) / this.plazasA) * 100).toFixed( 2 );
      this.cargosI = (((cargos - this.cargosA) / this.cargosA) * 100).toFixed( 2 );
      this.costoI = (((costoP - this.costoAA) / this.costoAA) * 100).toFixed( 2 );

   }

   genProyec() {
      this.confirmationService.confirm( {
                                           message: ` ¿Está seguro que desea generar la proyección?`,
                                           header: 'Confirmación',
                                           icon: 'fa fa-question-circle',
                                           accept: () => {
                                              this.jobProjectionService.genPro()
                                              .subscribe( data => {
                                                 this.msgs = [];
                                                 if ( data === 0 ) {

                                                    /* this.msgs.push( {
                                                                       severity: 'info',
                                                                       summary: '',
                                                                       detail: 'La proyección laboral ya ha sido generada.'
                                                                    } ); */
                                                    this._nav.setMesage(0,{severity: 'info',summary: '',detail: 'La proyección laboral ya ha ' +
                                                                                                                'sido generada.' });
                                                 }
                                                 if ( data === 1 ) {
                                                    /* this.msgs.push( {
                                                                       severity: 'info',
                                                                       summary: 'Exito',
                                                                       detail: 'Proyección laboral generada con exito'
                                                                    } ); */
                                                    this._nav.setMesage(0, {severity: 'info', summary: 'Exito',detail: 'Proyección laboral ' +
                                                                                                                       'generada con exito'});
                                                 }
                                              }, error => {
                                                 // this.msgs.push( { severity: 'error', summary: 'Error', detail: 'Error al guardar.' } );
                                                 this._nav.setMesage(0, { severity: 'error', summary: 'Error', detail: 'Error al' +
                                                                                                                       ' guardar.' });
                                              } );
                                           }
                                        } );

   }

   update( jp: JobProjection ) {
      jp.index = this.ListJobProjection.indexOf( jp );
      this.jobProjection = jp;
      this.updateprojection = !this.updateprojection;
   }

   approve( jp: JobProjection ) {
      jp.index = this.ListJobProjection.indexOf( jp );
      this.jobProjection = jp;
      this.approveprojection = !this.approveprojection;
   }

   detail( obj: JobProjection ) {
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

   bindLocation( event: any ) {
      let jp = new JobProjection();
      jp = event;
      this.ListJobProjection.push( jp );
      this.toggleform();
      let cargos = 0;
      let cargosI = 0;
      let costoI = 0;
      let plazasP = 0;
      let costoP = 0;
      let plazasI = 0;
      let ok = true;
      for ( let p of this.ListJobProjection ) {
         cargos += 1;
         plazasP += Number( p.plazasProyectadas );
         costoP += p.costoProyectado;
         if ( p.idEstadoProyeccion !== 2 ) {
            ok = false;
         }
      }
      ok ? this.estadoArea = 'Area Totalmente Aprobada' : this.estadoArea = 'Area Parciamente Aprobada';
      this.plazasP = plazasP.toFixed( 0 );
      this.costoP = new Intl.NumberFormat( [ 'ban', 'id' ] ).format( costoP );
      this.cargos = cargos.toFixed( 0 );
      this.plazasI = (((plazasP - this.plazasA) / this.plazasA) * 100).toFixed( 2 );
      this.cargosI = (((cargos - this.cargosA) / this.cargosA) * 100).toFixed( 2 );
      this.costoI = (((costoP - this.costoAA) / this.costoAA) * 100).toFixed( 2 );

   }

   updateProjection( event: any ) {
      this.jobProjection = event;
      this.updateBack();
      this.ListJobProjection[ this.jobProjection.index ] = this.jobProjection;
      this.jobProjection.idCargo = null;
      let cargos = 0;
      let cargosI = 0;
      let costoI = 0;
      let plazasP = 0;
      let costoP = 0;
      let plazasI = 0;
      let ok = true;
      for ( let p of this.ListJobProjection ) {
         cargos += 1;
         plazasP += Number( p.plazasProyectadas );
         costoP += p.costoProyectado;
         if ( p.idEstadoProyeccion !== 2 ) {
            ok = false;
         }
      }
      ok ? this.estadoArea = 'Area Totalmente Aprobada' : this.estadoArea = 'Area Parciamente Aprobada';
      this.plazasP = plazasP.toFixed( 0 );
      this.costoP = new Intl.NumberFormat( [ 'ban', 'id' ] ).format( costoP );
      this.cargos = cargos.toFixed( 0 );
      this.plazasI = (((plazasP - this.plazasA) / this.plazasA) * 100).toFixed( 2 );
      this.cargosI = (((cargos - this.cargosA) / this.cargosA) * 100).toFixed( 2 );
      this.costoI = (((costoP - this.costoAA) / this.costoAA) * 100).toFixed( 2 );

   }

   approveProjection( event: any ) {
      this.jobProjection = event;
      this.approveBack();
      this.ListJobProjection[ this.jobProjection.index ] = this.jobProjection;
      this.jobProjection.idCargo = null;
      let cargos = 0;
      let cargosI = 0;
      let costoI = 0;
      let plazasP = 0;
      let costoP = 0;
      let plazasI = 0;
      let ok = true;
      for ( let p of this.ListJobProjection ) {
         cargos += 1;
         plazasP += Number( p.plazasProyectadas );
         costoP += p.costoProyectado;
         if ( p.idEstadoProyeccion !== 2 ) {
            ok = false;
         }
      }
      ok ? this.estadoArea = 'Area Totalmente Aprobada' : this.estadoArea = 'Area Parciamente Aprobada';
      this.plazasP = plazasP.toFixed( 0 );
      this.costoP = new Intl.NumberFormat( [ 'ban', 'id' ] ).format( costoP );
      this.cargos = cargos.toFixed( 0 );
      this.plazasI = (((plazasP - this.plazasA) / this.plazasA) * 100).toFixed( 2 );
      this.cargosI = (((cargos - this.cargosA) / this.cargosA) * 100).toFixed( 2 );
      this.costoI = (((costoP - this.costoAA) / this.costoAA) * 100).toFixed( 2 );

   }

   confirmar( jp: JobProjection ) {
      jp.idEstadoProyeccion = 4;
      this.dialogObjet = jp;
      this.jobProjectionService.add( this.dialogObjet ).subscribe( rest => {
         this.ListJobProjection.splice( this.ListJobProjection.indexOf( this.dialogObjet ), 1 );
         this.jobProjectionService.getPositionsById( rest.idCargo ).subscribe( res => {
            rest.cargo = res.cargo;
         } );
         this.listaService.getMasterDetailsByIdItem( 'ListasEstadosProyecciones', rest.idEstadoProyeccion )
         .subscribe( res => {
            rest.estadoProyeccion = res.nombre;
         } );
         this.ListJobProjection.push( rest );
      } );
      let ok = true;
      for ( let p of this.ListJobProjection ) {
         if ( p.idEstadoProyeccion !== 2 ) {
            ok = false;
         }
      }
      ok ? this.estadoArea = 'Area Totalmente Aprobada' : this.estadoArea = 'Area Parciamente Aprobada';

   }

   delete( jp: JobProjection ) {
      this.dialogObjet = jp;
      this.ListJobProjection.splice( this.ListJobProjection.indexOf( this.dialogObjet ), 1 );
      let cargos = 0;
      let cargosI = 0;
      let costoI = 0;
      let plazasP = 0;
      let costoP = 0;
      let plazasI = 0;
      let ok = true;
      for ( let p of this.ListJobProjection ) {
         cargos += 1;
         plazasP += Number( p.plazasProyectadas );
         costoP += p.costoProyectado;
         if ( p.idEstadoProyeccion !== 2 ) {
            ok = false;
         }
      }
      ok ? this.estadoArea = 'Area Totalmente Aprobada' : this.estadoArea = 'Area Parciamente Aprobada';
      this.plazasP = plazasP.toFixed( 0 );
      this.costoP = new Intl.NumberFormat( [ 'ban', 'id' ] ).format( costoP );
      this.cargos = cargos.toFixed( 0 );
      this.plazasI = (((plazasP - this.plazasA) / this.plazasA) * 100).toFixed( 2 );
      this.cargosI = (((cargos - this.cargosA) / this.cargosA) * 100).toFixed( 2 );
      this.costoI = (((costoP - this.costoAA) / this.costoAA) * 100).toFixed( 2 );

   }

   confirmProjection() {
      this.jobProjectionService.getPending().subscribe( rest => {
         this.msgs = [];
         let str = 'Existen las siguientes areas con algun inconveniente';
         for ( let r of rest ) {
            str = 'Area:' + r.area + '|--Estado:' + r.estado + '|--Cantidad:' + r.cantidad;
            /* this.msgs.push( {
                               severity: 'info',
                               summary: '#',
                               detail: str
                            } ); */
            this._nav.setMesage(0, {severity: 'info', summary: '#',detail: str});
         }
         if ( rest.length === 0 ) {
            this.jobProjectionService.getConfirmProjection().subscribe( res => {
               this.msgs = [];
               /* this.msgs.push( {
                                  severity: 'info',
                                  summary: 'Exito',
                                  detail: 'Proyección confirmada con exito'
                               } ); */
               this._nav.setMesage(0, {severity: 'info', summary: 'Exito',detail: 'Proyección confirmada con exito'});
            } );
         }
      } );
   }
}
