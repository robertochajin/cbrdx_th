import {Component, Input} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {ConfirmationService, SelectItem, Message} from 'primeng/primeng';
import {PhysicStructure} from '../_models/physic-structure';
import {PhysicStructureService} from '../_services/physic-structure.service';
import {Localizaciones} from "../_models/localizaciones";
import {LocateService} from '../_services/locate.service';

@Component({
   moduleId: module.id,
   templateUrl: 'physic-structure-form.component.html',
   selector: 'physic-structure',
   providers: [ConfirmationService]
})
export class PhysicStructureAddComponent {
   physicStructure: PhysicStructure = new PhysicStructure();
   dialogObjet: PhysicStructure = new PhysicStructure();
   ListCategory: SelectItem[] = [];
   ListPhysicStructure: PhysicStructure[];
   msgs: Message[] = [];
   header: string = "Agregando Estructura Física";
   submitted: boolean;
   codExists: boolean = false;
   direcValid: boolean;
   addinglocation: boolean = true;
   localizacion: Localizaciones = new Localizaciones();

   constructor(private physicStructureService: PhysicStructureService,
               private locateService: LocateService,
               private router: Router,
               private location: Location,
               private confirmationService: ConfirmationService) {
   }

   ngOnInit() {

      this.physicStructureService.getAll().subscribe(res => {
         this.ListPhysicStructure = res;
      });

      this.physicStructureService.getListSedes().subscribe(rest => {
         this.ListCategory.push({label: "Seleccione", value: null});
         for (let dp of rest) {
            this.ListCategory.push({
               label: dp.nombre,
               value: dp.idListaClasificacionSede
            });
         }
      });
      this.focusUP();
   }

   inputCleanUp(value: string) {
      this.physicStructure.codigo = value.toUpperCase().replace(' ', '').trim();
   }

   validateCode() {
      this.codExists = this.ListPhysicStructure.filter(t => t.codigo === this.physicStructure.codigo).length > 0;
   }

   toggleform() {
      this.addinglocation = !this.addinglocation;
   }

   bindLocation(event: any) {
      this.localizacion = event;
      this.physicStructure.direccion = event.direccion;
      this.toggleform();
   }

   onSubmit() {
      this.msgs = [];
      if (this.physicStructure.direccion !== '') {
         this.submitted = true;
         this.localizacion.indicadorHabilitado = true;
         this.locateService.add(this.localizacion).subscribe(
            data => {
               this.physicStructure.idLocalizacion = data.idLocalizacion;
               this.physicStructureService.add(this.physicStructure).subscribe(
                  data => {
                     this.msgs.push({severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.'});
                     this.location.back();
                  }, error => {
                     this.msgs.push({severity: 'error', summary: 'Error', detail: 'Error al guardar.'});
                  }
               );
            });
      } else {
         this.focusUP();
         this.msgs.push({
            severity: 'error',
            summary: 'Dirección invalida',
            detail: 'Es necesario agregar una dirección válida'
         });
      }
   }
   focusUP(){
      const element = document.querySelector("#formulario");
      if (element) { element.scrollIntoView(element); }
   }

   goBack() {
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