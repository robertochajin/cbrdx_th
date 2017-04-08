import "rxjs/add/operator/switchMap";
import {Component, Input} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {Positions} from "../_models/positions";
import {NavService} from "../_services/_nav.service";
import {PositionsService} from "../_services/positions.service";
import {ListPositionsService} from "../_services/lists-positions.service";
import {Message, ConfirmationService} from "primeng/primeng";
@Component({
    moduleId: module.id,
    selector: 'positions-form',
    template: 'positions-form.component.html',
    providers: [ConfirmationService]
})
export class PositionsUpdateComponent {
    @Input()
    position: Positions = new Positions();
    acordion: number;
    disableTabs:boolean = true;
    msgs: Message[] = [];
    
    constructor(private positionsService: PositionsService,
                private router: Router,
                private route: ActivatedRoute,
                private location: Location,
                private listPositionsService: ListPositionsService,
                private confirmationService: ConfirmationService,
                private _nav: NavService,) {
    }
    
    ngOnInit() {
        
        /* this.route.params.subscribe((params: Params) => {
         this.positionsService.get(+params['id']).subscribe(position => {
         this.position = position;
         });
         });*/
        this.acordion = this._nav.getTab();
    }
    
    goBack(): void {
        this.confirmationService.confirm({
            message: ` ¿Esta seguro que desea salir sin guardar?`,
            header: 'Corfirmación',
            icon: 'fa fa-question-circle',
            accept: () => {
                this.location.back();
            }
        });
    }
    
    onTabShow(e: any) {
        this._nav.setTab(e.index);
        this.acordion = this._nav.getTab();
    }
}
