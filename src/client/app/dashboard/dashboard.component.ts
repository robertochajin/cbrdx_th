import {Component, OnInit} from "@angular/core";
import {Router,Routes,RouterModule} from "@angular/router";

@Component({
  moduleId: module.id,
  templateUrl: 'dashboard.component.html',
  selector: 'dashboard',
  styleUrls: ['dashboard.css']
})
export class DashboardComponent implements OnInit {
  funcionalidades: boolean = true;
  constructor(private router: Router) {
  }

  ngOnInit(): void {

  }

  go(data: any) {
    switch (data) {
      case "employees":
        this.router.navigate(["employees"]);
        break;
    }
  }

}
