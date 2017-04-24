import {Component} from '@angular/core';
import {Functionality} from '../_models/functionality';
import {Router, ActivatedRoute, Params}   from '@angular/router';
import {FunctionalityControl} from '../_models/functionalityContorl';
import {NavService} from "../_services/_nav.service";
import {FormManagerService} from '../_services/form-manager.service';
import {ConfirmationService, Message, SelectItem} from 'primeng/primeng';
import {Location}                 from '@angular/common';
import {ListaService} from "../_services/lista.service";
import {ListaItem} from "../_models/listaItem";

@Component({
   moduleId: module.id,
   templateUrl: 'form-manager-update.component.html',
   selector: 'form-manager-update',
   providers: [ConfirmationService]
})

export class FormManagerUpdateComponent {


   functionality: Functionality = new Functionality();
   functionalityControl: FunctionalityControl = new FunctionalityControl();
   functionalityControlField: FunctionalityControl = new FunctionalityControl();
   functionalityControlSection: FunctionalityControl = new FunctionalityControl();
   functionalityControlSectionDetail: FunctionalityControl = new FunctionalityControl();
   functionalityControlFieldDetail: FunctionalityControl = new FunctionalityControl();
   functionalitySection: FunctionalityControl[] = [];
   listAllfunctionalityControl: FunctionalityControl [];
   functionalityField: FunctionalityControl[];
   listFunctionalities: Functionality[];
   listFunctionality: SelectItem[] = [];
   listClassificationSeccion: SelectItem[] = [];
   listClassificationCampo: SelectItem[] = [];
   msgs: Message[] = [];
   acordion: number=0;
   campodisabled: boolean = true;
   seccion: boolean = false;
   indicadorSeccion: boolean = true;
   indicadorVisible: string;
   indicadorImprime: string;
   indicadorHabilitado: string;
   idPadre: number;
   editingField: boolean=false;
   detailSection: boolean=false;
   detailField: boolean=false;
   editingSection: boolean=false;
   codExists: boolean=false;

   constructor(private formManagerService: FormManagerService,
               private router: Router,
               private location: Location,
               private listaService: ListaService,
               private route: ActivatedRoute,
               private _nav: NavService,
               private confirmationService: ConfirmationService) {
   }

   ngOnInit() {
      this.formManagerService.getAllFunctionalityControl().subscribe(rest=>{
         this.listAllfunctionalityControl= rest;
      });
      this.route.params.switchMap((params: Params) => this.formManagerService.getFunctionalityById(+params['id']))
         .subscribe(data => {
            this.functionality = data;
            this.formManagerService.getSectionByIdFuncionalidad(this.functionality.idFuncionalidad).subscribe(rest => {
               if(rest.length===0){
                  this.indicadorSeccion=false;
               }else{
                  for (let s of rest) {
                     this.formManagerService.getFieldByIdFather(s.idFuncionalidadControl).subscribe(rest => {
                        if (rest.length > 0) {
                           s.notFoundFiel = false;
                        } else {
                           s.notFoundFiel = true;
                        }
                        this.functionalitySection.push(s);
                        this.functionalitySection.sort(function (a, b) {
                           return b.idFuncionalidadControl - a.idFuncionalidadControl;
                        });
                     });
                  }
               }


            });
         });

      this.formManagerService.getAllFunctionalityControl().subscribe(rest => {
         this.listAllfunctionalityControl = rest;
      });

      this.formManagerService.getFunctionality().subscribe(res => {
         this.formManagerService.getAllFunctionality().subscribe(rest => {
            this.listFunctionalities = rest;
            this.listFunctionality.push({label: "Seleccione", value: null});
            for (let dp of res) {
               let bandera = false;
               for (let r of this.listFunctionalities) {
                  if (dp.idMenu === r.idMenu) {
                     bandera = true;
                     break;
                  }
               }
               if (!bandera) {
                  this.listFunctionality.push({
                     label: dp.menu,
                     value: dp.idMenu
                  });
               }
            }
         });
      });

      this.listaService.getMasterDetailsStartsByCode('ListasClasificaciones','SEC').subscribe(res => {
         this.listClassificationSeccion.push({label: 'Seleccione', value: null});
         res.map((s: ListaItem) => this.listClassificationSeccion.push({label: s.nombre, value: s.idLista}));
      });
      this.listaService.getMasterDetailsStartsByCode('listClassificationSeccion', 'CAM').subscribe(res => {
         this.listClassificationCampo.push({label: 'Seleccione', value: null});
         res.map((s: ListaItem) => this.listClassificationCampo.push({label: s.nombre, value: s.idLista}));
      });
   }

   onTabShow(e: any) {
      this._nav.setTab(e.index);
      this.acordion = this._nav.getTab();
      if (this.acordion == 2) {
         this.functionalitySection = [];
         this.formManagerService.getSectionByIdFuncionalidad(this.functionality.idFuncionalidad).subscribe(rest => {
            for (let s of rest) {
               this.formManagerService.getFieldByIdFather(s.idFuncionalidadControl).subscribe(rest => {
                  if (rest.length > 0) {
                     s.notFoundFiel = false;
                  } else {
                     s.notFoundFiel = true;
                  }
               });
               this.functionalitySection.push(s);
            }
         });
      }
      this.formManagerService.getAllFunctionalityControl().subscribe(rest=>{
         this.listAllfunctionalityControl= rest;
      });
   }

   onCreateF(n: number) {
      this.formManagerService.update(this.functionality).subscribe(rest => {
         if (this.indicadorSeccion) {
            this.acordion = 2;
            this.formManagerService.getSectionByIdFuncionalidad(this.functionality.idFuncionalidad).subscribe(rest => {
               this.functionalitySection = rest;
            });
         } else {
            this.acordion = 3;
            this.functionalityField = [];
            this.formManagerService.getFieldByIdFuncionalidad(this.functionality.idFuncionalidad).subscribe(rest => {
               for (let r of rest) {
                  if (r.indicadorSeccion === false && r.idPadre === null) {
                     this.functionalityField.push(r);
                  }
               }
            });
         }

      });
   }

   onCreateS() {
      this.functionalitySection = [];
      this.functionalityControl.indicadorSeccion = true;
      this.functionalityControl.idPadre = null;
      this.functionalityControl.idFuncionalidad = this.functionality.idFuncionalidad;
      this.formManagerService.addSection(this.functionalityControl).subscribe(res => {
         this.idPadre = res.idFuncionalidadControl;
         this.functionalityControl = res;
         this.formManagerService.getSectionByIdFuncionalidad(this.functionalityControl.idFuncionalidad).subscribe(rest => {
            for (let s of rest) {
               this.formManagerService.getFieldByIdFather(s.idFuncionalidadControl).subscribe(rest => {
                  if (rest.length > 0) {
                     s.notFoundFiel = false;
                  } else {
                     s.notFoundFiel = true;
                  }
               });
               this.functionalitySection.push(s);
            }
         });
         this.functionalityControl.control = " ";
         this.functionalityControl.codigo = " ";
      });
      this.formManagerService.getAllFunctionalityControl().subscribe(rest=>{
         this.listAllfunctionalityControl= rest;
      });
   }

   onCreateC(n: number) {

      if (this.indicadorSeccion === false) {
         this.functionalityField=[];
         this.functionalityControl.idPadre = null;
         this.functionalityControl.idFuncionalidadControl = null;
         this.functionalityControl.idFuncionalidad = this.functionality.idFuncionalidad;
         this.functionalityControl.indicadorSeccion = false;
         this.formManagerService.addField(this.functionalityControl).subscribe(rest => {
            this.formManagerService.getFieldByIdFuncionalidad(this.functionality.idFuncionalidad).subscribe(rest => {
               for (let r of rest) {
                  if (r.indicadorSeccion === false && r.idPadre === null) {
                     this.functionalityField.push(r);
                  }
               }
            });
         });
         this.functionalityControl.control = " ";
         this.functionalityControl.codigo = " ";
      } else {
         this.functionalityField=[];
         this.functionalityControl.idPadre = this.idPadre;
         this.functionalityControl.idFuncionalidadControl = null;
         this.functionalityControl.idFuncionalidad = this.functionality.idFuncionalidad;
         this.functionalityControl.indicadorSeccion = false;
         this.formManagerService.addField(this.functionalityControl).subscribe(rest => {
            this.formManagerService.getFieldByIdFather(this.idPadre).subscribe(rest => {
               this.functionalityField = rest;
            });
         });
         this.functionalityControl.control = " ";
         this.functionalityControl.codigo = " ";
      }

      this.formManagerService.getAllFunctionalityControl().subscribe(rest=>{
         this.listAllfunctionalityControl= rest;
      });
   }

   updateSection(f: FunctionalityControl) {
      this.editingSection=true;
      this.functionalityControlSection= f;
      this.functionalityField = [];
      this.formManagerService.getFieldByIdFather(f.idFuncionalidadControl).subscribe(rest => {
         this.functionalityField = rest;
      });
   }

   addField(f: FunctionalityControl) {
      this.idPadre= f.idFuncionalidadControl;
      this.acordion = 3;
      this.formManagerService.getFieldByIdFather(f.idFuncionalidadControl).subscribe(rest => {
         this.functionalityField = rest;
      });
   }

   onUpdateC() {
         this.functionalityControlField;
      if (this.indicadorSeccion === false) {
         this.functionalityField=[];
         this.functionalityControlField.idPadre = null;
         this.functionalityControlField.idFuncionalidad = this.functionality.idFuncionalidad;
         this.functionalityControlField.indicadorSeccion = false;
         this.formManagerService.updateField(this.functionalityControlField).subscribe(rest => {
            this.formManagerService.getFieldByIdFuncionalidad(this.functionality.idFuncionalidad).subscribe(rest => {
               for (let r of rest) {
                  if (r.indicadorSeccion === false && r.idPadre === null) {
                     this.functionalityField.push(r);
                  }
               }
            });
            this.editingField=false;
         });
         this.functionalityControlField.control = " ";
         this.functionalityControlField.codigo = " ";
      } else {
         this.functionalityField=[];
         this.functionalityControlField.idFuncionalidad = this.functionality.idFuncionalidad;
         this.functionalityControlField.indicadorSeccion = false;
         this.formManagerService.updateField(this.functionalityControlField).subscribe(rest => {
            this.formManagerService.getFieldByIdFather(this.functionalityControlField.idPadre).subscribe(rest => {
               this.functionalityField = rest;
            });
            this.editingField=false;
         });
         this.functionalityControlField.control = " ";
         this.functionalityControlField.codigo = " ";
      }
   }
   onUpdateS(){
      this.functionalitySection = [];
      this.formManagerService.updateSection(this.functionalityControlSection).subscribe(res => {
         this.idPadre = this.functionalityControlSection.idFuncionalidadControl;
         this.formManagerService.getSectionByIdFuncionalidad(this.functionalityControlSection.idFuncionalidad).subscribe(rest => {
            for (let s of rest) {
               this.formManagerService.getFieldByIdFather(s.idFuncionalidadControl).subscribe(rest => {
                  if (rest.length > 0) {
                     s.notFoundFiel = false;
                  } else {
                     s.notFoundFiel = true;
                  }
               });
               this.functionalitySection.push(s);
            }
         });
         this.functionalityControl.control = " ";
         this.functionalityControl.codigo = " ";
      });
      this.editingSection=false;
      this.acordion=3;
   }
   updateField(c: FunctionalityControl){
      this.editingField=true;
      c.index=this.functionalityField.indexOf(c);
      this.functionalityControlField= c;
   }
   goBackField(){
      this.editingField=false;
   }
   validateCode() {
      this.functionalityControl.codigo= this.functionalityControl.codigo.toUpperCase();
      this.codExists = this.listAllfunctionalityControl.filter(t => t.codigo === this.functionalityControl.codigo).length > 0;
   }
   goBack() {
      this.location.back();
   }
   detailSectionF(f: FunctionalityControl){
      this.detailSection=true;
      this.functionalityControlSectionDetail= f;
      this.functionalityControlSectionDetail.indicadorImprimir?this.indicadorImprime="Si":this.indicadorImprime="No";
      this.functionalityControlSectionDetail.indicadorVisible?this.indicadorVisible="Si":this.indicadorVisible="No";
      this.functionalityControlSectionDetail.indicadorHabilitado?this.indicadorHabilitado="Si":this.indicadorHabilitado="No";
   }
   goBackDetail() {
      this.detailSection=false;
   }
   detailDetailF(f: FunctionalityControl){
      this.detailField=true;
      this.functionalityControlFieldDetail= f;
      this.functionalityControlFieldDetail.indicadorImprimir?this.indicadorImprime="Si":this.indicadorImprime="No";
      this.functionalityControlFieldDetail.indicadorVisible?this.indicadorVisible="Si":this.indicadorVisible="No";
      this.functionalityControlFieldDetail.indicadorHabilitado?this.indicadorHabilitado="Si":this.indicadorHabilitado="No";
   }
   goBackDetailField() {
      this.detailField=false;
   }
   goBackSectionEdi(){
      this.editingSection = false;
   }
   capitalize(event:any) {
      let input = event.target.value;
      if(input.substring(0,1)===" "){
         input = input.replace(' ','');
      }
      event.target.value = input.substring(0,1).toUpperCase()+input.substring(1).toLowerCase();
   }
   inputCleanUp(event:any) {
      let input = event.target.value;
      event.target.value=input.toUpperCase().replace(' ','').trim();
   }
}
