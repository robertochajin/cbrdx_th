// import {Component, Input, Output, EventEmitter}         from '@angular/core';
// import {Functionality} from '../_models/functionality';
// import {NavService} from "../_services/_nav.service";
// import {FormManagerService} from '../_services/form-manager.service';
// import {Router} from '@angular/router';
// import {ConfirmationService, Message} from 'primeng/primeng';
// import {Location}                 from '@angular/common';
// @Component({
//    moduleId: module.id,
//    templateUrl: 'functionality.component.html',
//    selector: 'functionality',
//    providers: [ConfirmationService]
// })
//
// export class FunctionalityComponent {
//    functionality: Functionality = new Functionality();
//    listFunctionality: Functionality[];
//    msgs: Message[] = [];
//    acordion: number
//    seccion: boolean = true;
//
//    constructor(private formManagerService: FormManagerService,
//                private router: Router,
//                private location:Location,
//                private _nav: NavService,
//                private confirmationService: ConfirmationService) {
//    }
//
//    ngOnInit() {
//       // this.formManagerService.getAll().subscribe(rest => {
//       //
//       // });
//
//    }
//
//    onCreate() {
//    }
//    goBack(){
//       this.location.back();
//    }
//
// }
