import {Component} from '@angular/core';
import {Functionality} from '../_models/functionality';
import {FunctionalitySection} from '../_models/functionalitySection';
import {FunctionalityField} from '../_models/functionalityFields';
import {Router, ActivatedRoute, Params}   from '@angular/router';
import {FunctionalityControl} from '../_models/functionalityContorl';
import {NavService} from "../_services/_nav.service";
import {FormManagerService} from '../_services/form-manager.service';
import {ConfirmationService, Message, SelectItem} from 'primeng/primeng';
import {Location}                 from '@angular/common';

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
   functionalitySection: FunctionalityControl[] = [];
   functionalityField: FunctionalityControl[];
   listFunctionality: SelectItem[] = [];
   listClassificationSeccion: SelectItem[] = [];
   listClassificationCampo: SelectItem[] = [];
   msgs: Message[] = [];
   acordion: number=0;
   campodisabled: boolean = true;
   seccion: boolean = false;
   indicadorSeccion: boolean = true;
   idPadre: number;
   editingField: boolean=false;
   editingSection: boolean=false;

   constructor(private formManagerService: FormManagerService,
               private router: Router,
               private location: Location,
               private route: ActivatedRoute,
               private _nav: NavService,
               private confirmationService: ConfirmationService) {
   }

   ngOnInit() {

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

      this.formManagerService.getFunctionality().subscribe(rest => {
         this.listFunctionality.push({label: "Seleccione", value: null});
         for (let dp of rest) {
            this.listFunctionality.push({
               label: dp.menu,
               value: dp.idMenu
            });
         }
      });
      this.formManagerService.getClassificationSeccion().subscribe(rest => {
         this.listClassificationSeccion.push({label: "Seleccione", value: null});
         for (let dp of rest) {
            this.listClassificationSeccion.push({
               label: dp.nombre,
               value: dp.idListaClasificacion
            });
         }
      });
      this.formManagerService.getClassificationCampo().subscribe(rest => {
         this.listClassificationCampo.push({label: "Seleccione", value: null});
         for (let dp of rest) {
            this.listClassificationCampo.push({
               label: dp.nombre,
               value: dp.idListaClasificacion
            });
         }
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




      //
      // this.functionalityControl.idPadre = null;
      // this.functionalityControl.idFuncionalidad = this.functionality.idFuncionalidad;
      // this.functionalityControl;
      // this.formManagerService.addSection(this.functionalityControl).subscribe(res => {
      //    this.formManagerService.getSectionByIdFuncionalidad(this.functionalityControl.idFuncionalidad).subscribe(rest => {
      // this.functionalitySection=[]
      //       for (let s of rest) {
      //          this.formManagerService.getFieldByIdFather(s.idFuncionalidadControl).subscribe(rest => {
      //             if (rest.length > 0) {
      //                s.notFoundFiel = false;
      //             } else {
      //                s.notFoundFiel = true;
      //             }
      //             this.functionalitySection.push(s);
      //             this.functionalitySection.sort(function (a, b) {
      //                return b.idFuncionalidadControl - a.idFuncionalidadControl;
      //             });
      //          });
      //       }
      //
      //    });
      // });
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




      this.functionalityControl.idPadre = this.functionalityControl.idFuncionalidadControl;
      this.functionalityControl.idFuncionalidad = this.functionality.idFuncionalidad;
      this.functionalityControl;
   }

   updateSection(f: FunctionalityControl) {
      this.editingSection=true;
      this.functionalityControlSection= f;
      this.functionalityField = [];
      this.acordion = 3;
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
         // this.functionalityControlField.idPadre = this.idPadre;
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
      // this.functionalityControlSection.indicadorSeccion = true;
      // this.functionalityControlSection.idPadre = null;
      // this.functionalityControlSection.idFuncionalidad = this.functionality.idFuncionalidad;
      this.formManagerService.updateSection(this.functionalityControlSection).subscribe(res => {
         this.idPadre = this.functionalityControlSection.idFuncionalidadControl;
         // this.functionalityControl = res;
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
   }
   updateField(c: FunctionalityControl){
      this.editingField=true;
      c.index=this.functionalityField.indexOf(c);
      this.functionalityControlField= c;
   }
   goBackField(){
      this.editingField=false;
   }

   goBack() {
      this.location.back();
   }

   change() {

   }

   detail() {
   }

   add() {
   }

   update() {
   }


}
