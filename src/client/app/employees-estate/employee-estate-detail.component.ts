import {Component} from "@angular/core";
import {EmployeeEstate} from "../_models/employee-estate"
import {EmployeeEstateService} from "../_services/employee-estate.service";
import {Router, ActivatedRoute, Params} from "@angular/router";

@Component({
  moduleId: module.id,
  templateUrl: 'employee-estate-detail.component.html',
  selector: 'employees-estate'
})
export class EmployeeEstateDetailComponent {

  employeeEstate: EmployeeEstate = new EmployeeEstate();
  constructor(
    private employeeEstateService: EmployeeEstateService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    route.params.switchMap((params: Params) => employeeEstateService.getById(+params['id']))
      .subscribe(data => {
        this.employeeEstate = data;
      });
  }

  goBack(): void {
    this.router.navigate(['employees-estate']);
  }
}
