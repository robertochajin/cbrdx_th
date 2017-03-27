import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {References} from './references';
import {ReferencesService} from './references.service';
import { ReferencesTypesService } from '../_services/references-type.service';
import {Observable} from 'rxjs/Observable';
import {ConfirmationService} from 'primeng/primeng';
import {Employee} from "../employees/employees";



@Component({
    moduleId: module.id,
    templateUrl: 'references.component.html',
    selector: 'references',
    providers:  [ConfirmationService]
})
export class ReferencesComponent {
  @Input() employee:Employee;
    reference: References = new References();
    dialogObjet: References = new References();

    references: References[];

    constructor(
                private referencesService: ReferencesService,
                private referencesTypesService: ReferencesTypesService,
                private router: Router,
                private confirmationService: ConfirmationService
                ) {}

    ngOnInit() {
        this.referencesService.getAllgetAllByEmployee(this.employee.idTercero).subscribe(
            references => {
                this.references = references;
                this.references.forEach(function(obj, index){
                    obj.nombreCompleto = obj.primerNombre+' '+obj.segundoNombre+' '+obj.primerApellido+' '+obj.segundoApellido;
                    obj.numeroContacto = obj.telefonoFijo+' /  '+obj.telefonoMovil;

                  //a utilizar en caso de que no se tenga el dato de tipo de referencia para utilizar en la vista
                    // this.referencesTypesService.getById(obj.idTipoReferencia).subscribe(
                    //   (tr:any ) => obj.tipodeReferencia.label = tr.nombreListaTipoReferencias
                    // );
                });
            }
        );
    }

    del(f: References) {

        this.dialogObjet = f;
        this.confirmationService.confirm({
            message: ` ¿Esta seguro que lo desea eliminar?`,
            header: 'Corfirmación',
            icon: 'fa fa-question-circle',
            accept: () => {

              this.referencesService.get(this.dialogObjet.idTerceroReferencia).subscribe(
                ref => {
                  ref.indicadorHabilitado = false;
                  return this.referencesService.update(ref).subscribe(x => {
                    this.references.splice(this.references.indexOf(f), 1);
                    this.dialogObjet = null;
                  });
                });
            },
            reject: () => {
                this.dialogObjet = null;
            }
        });
    }

    detail(f: References) {
        this.router.navigate(['employees-references/detail/'+f.idTerceroReferencia]);
    }

    add() {
        this.router.navigate(['employees-references/add/'+this.employee.idTercero]);
    }

    update(f: References) {
        this.router.navigate(['employees-references/update/'+f.idTerceroReferencia+'/'+this.employee.idTercero]);
    }
}
