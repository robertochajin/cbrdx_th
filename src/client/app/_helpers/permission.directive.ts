import { Directive, ElementRef, Input, TemplateRef, ViewContainerRef, Renderer, OnInit, AfterViewInit } from '@angular/core';

@Directive({
              selector: '[hasPermission]'
           })

export class PermissionDirective  {

   inputElement: ElementRef;
   _viewContainer: ViewContainerRef;
   private _defaul = 'red';
   constructor(
      private el: ElementRef,
      private _renderer: Renderer,
      private templateRef: TemplateRef<any>,
      private viewContainer: ViewContainerRef) {
      this.inputElement = el;
      this._viewContainer = viewContainer;
   }

   @Input() set hasPermission(hasPermission: any) {
      if (hasPermission.visible) {
         this._viewContainer.clear();
         // If hasPermission is true add template to DOM
         this._viewContainer.createEmbeddedView( this.templateRef );

         if (!hasPermission.editable) {
            this._renderer.setElementAttribute(this.inputElement.nativeElement.nextSibling, 'disabled', 'true');
            this._renderer.setElementAttribute(this.inputElement.nativeElement.nextSibling, 'readonly', 'true');
         }
      } else {
         // Else remove template from DOM
         this._viewContainer.clear();
         this.inputElement.nativeElement.parentNode.parentNode.removeChild(this.inputElement.nativeElement.parentNode);
      }

   }

   /*@Input() hasPermission: any;
   ngAfterViewInit(){
      console.info('inicia directiva');
      // console.info(permission);
      if (this.hasPermission.visible) {
         // If hasPermission is true add template to DOM
         let childView = this.viewContainer.createEmbeddedView( this.templateRef );

         if (!this.hasPermission.editable) {
               this._renderer.setElementAttribute(this.inputElement.nativeElement.nextSibling, 'disabled', 'true');
               this._renderer.setElementAttribute(this.inputElement.nativeElement.nextSibling, 'readonly', 'true');
         }
      } else {
         // Else remove template from DOM
         this.viewContainer.clear();
         this.inputElement.nativeElement.parentNode.parentNode.removeChild(this.inputElement.nativeElement.parentNode);
      }
      console.info('sale directiva');
   }*/

}