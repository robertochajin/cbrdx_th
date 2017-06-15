import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dinamic } from './dinamic';
import { DinamicServices } from './dinamic.service';

@Component( {
               moduleId: module.id,
               templateUrl: 'dinamic.component.html',
               selector: 'dinamic-form',
            } )
export class DinamicComponent implements OnInit {

   componentList:Dinamic[]=[]

   constructor( private router: Router,
      private dinamicServices: DinamicServices
   ) {
   }

   ngOnInit() {
      this.componentList = this.dinamicServices.getAll();

   }

}
