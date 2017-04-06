import {Component,OnInit,Input} from '@angular/core';
import {Router,ActivatedRoute, Params} from '@angular/router';
import { Employee } from '../_models/employees';
import {EmployeesContact} from '../_models/employeesContactList';
import {EmployeesContactService} from '../_services/employees-contact.service';
import {Observable} from 'rxjs/Observable';
import {ListEmployeesService} from "../_services/lists-employees.service";
import {EmployeesService} from "../_services/employees.service";
import {SelectItem, Message, ConfirmationService} from 'primeng/primeng';
import {RelationTypeServices} from "../_services/relation-type.service";

@Component({
    moduleId: module.id,
    templateUrl: 'employees-contact-list.html',
    selector: 'employees-contact-list',
    providers:  [ConfirmationService]
})
export class EmployeesContactListComponent{
    
    @Input() employee:Employee;
    
    contact: EmployeesContact = new EmployeesContact();
    lcontact: EmployeesContact = new EmployeesContact();
    dialogObjet: EmployeesContact = new EmployeesContact();
    contacts: EmployeesContact[];
    show_form: boolean = false;
    msgs: Message[] = [];
    relationship: SelectItem[] = [];
    
    constructor(private employeesContactService: EmployeesContactService,
                private router: Router,
                private route: ActivatedRoute,
                private confirmationService: ConfirmationService,
                private listEmployeesService: ListEmployeesService,
                private employeesService: EmployeesService,
                private relationTypeServices: RelationTypeServices,
    ) {
      this.relationTypeServices.getAllEnabled().subscribe(
        relationship => {
          this.relationship.unshift({label: 'Seleccione', value: null});
          relationship.map((s: any) => {
            this.relationship.push({label: s.nombreListaParentesco, value: s.idListaParentesco});
          });
        }
      );
    }

    ngOnInit() {
        /*this.route.params
        .switchMap((params: Params) => this.employeesContactService.getByEmployee(+params['id']))
        .subscribe(contacts => {
          this.contacts = contacts
        });*/
  
        this.employeesContactService.getByEmployee(this.employee.idTercero).subscribe(
          contacts => this.contacts = contacts
        );
        
    }
    
    onSubmit() {
        this.msgs = [];
        this.show_form  = false;
        this.contact.idTercero = this.employee.idTercero;
        if(this.contact.idTerceroContacto == null || this.contact.idTerceroContacto == 0) {
            this.employeesContactService.add(this.contact)
            .subscribe(data => {
                this.msgs.push({severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.'});
                this.employeesContactService.getByEmployee(this.employee.idTercero).subscribe(
                  contacts => this.contacts = contacts
                );
            }, error => {
              this.show_form  = true;
              this.msgs.push({severity: 'error', summary: 'Error', detail: 'Error al guardar.'});
            });
        }else{
            this.employeesContactService.update(this.contact)
            .subscribe(data => {
                this.msgs.push({severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.'});
                this.employeesContactService.getByEmployee(this.employee.idTercero).subscribe(
                  contacts => this.contacts = contacts
                );
            }, error => {
              this.show_form  = true;
              this.msgs.push({severity: 'error', summary: 'Error', detail: 'Error al guardar.'});
            });
        }
      
    }

    delete(f: EmployeesContact) {
        this.dialogObjet = f;
        this.confirmationService.confirm({
            message: ` ¿Esta seguro que desea eliminar el contacto?`,
            header: 'Corfirmación',
            icon: 'fa fa-question-circle',
            accept: () => {
                this.dialogObjet.indicadorHabilitado = false;
                this.employeesContactService.update(this.dialogObjet).subscribe( r => {
                  this.contacts.splice(this.contacts.indexOf(this.dialogObjet), 1);
                  this.dialogObjet = null;
                });
            },
            reject: () => {
                this.dialogObjet = null;
            }
        });
    }
  
    add(){
      this.msgs = [];
      this.contact = new EmployeesContact();
      this.show_form  = true;
    }
    
    update(f: EmployeesContact) {
      this.msgs = [];
      this.contact = f;
      this.show_form  = true;
    }
    
    goBackUpdate(){
      this.msgs = [];
      this.show_form  = false;
    }
  
    capitalize() {
        let input = this.contact.contacto;
        input = input.toLowerCase().replace(/^.|\s\S/g, function(a) {
          return a.toUpperCase();
        });
        this.contact.contacto = input;
    }
    
}
