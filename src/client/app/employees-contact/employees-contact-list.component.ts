import {Component,OnInit,Input} from '@angular/core';
import {Router} from '@angular/router';
import { Employee } from '../_models/employees';
import {EmployeesContact} from '../_models/employeesContactList';
import {EmployeesContactService} from '../_services/employees-contact.service';
import {Observable} from 'rxjs/Observable';
import {ConfirmationService} from 'primeng/primeng';

@Component({
    moduleId: module.id,
    template: 'employees-contact-list.html',
    selector: 'employees-contact-list',
    providers:  [ConfirmationService]
})
export class EmployeesContactListComponent implements OnInit{
   @Input() employee:Employee;
    contact: EmployeesContact = new EmployeesContact();
    dialogObjet: EmployeesContact = new EmployeesContact();
    contacts: EmployeesContact[];

    constructor(private employeesContactService: EmployeesContactService,
                private router: Router,
                private confirmationService: ConfirmationService) {
        this.employeesContactService.getByEmployee(this.employee.idTercero).subscribe(contacts  => {
            this.contacts = contacts
          }
        );
    }

    ngOnInit() {
        
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
  
    
    update(f: EmployeesContact) {
        //this.router.navigate(['employees-work-experience/update/'+f.idTerceroExperienciaLaboral]);
    }
}
