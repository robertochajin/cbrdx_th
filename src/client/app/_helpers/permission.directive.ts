import { Directive, ElementRef, Input, TemplateRef, ViewContainerRef, Renderer, OnInit } from '@angular/core';

@Directive({
              selector: '[hasPermission]'
           })

export class PermissionDirective implements OnInit {
   @Input() hasPermission: any;
   inputElement: ElementRef;
   private _defaul = 'red';
   constructor(
      private el: ElementRef,
      private _renderer: Renderer,
      private templateRef: TemplateRef<any>,
      private viewContainer: ViewContainerRef) {
      this.inputElement = el;
   }


   ngOnInit(){
      // console.info(permission);
      if (this.hasPermission.visible) {
         // If hasPermission is true add template to DOM
         let childView = this.viewContainer.createEmbeddedView(this.templateRef);
         if (!this.hasPermission.editable) {
            console.log(this.inputElement.nativeElement.getAttribute('disabled'));
            // this._renderer.setElementAttribute(this.el.nativeElement.querySelector('codigo'), 'disabled', 'true');
            // this.elem.nativeElement.attrs.disable = 'disabled';
            // this.elem.nativeElement.disabled = 'disabled';
            // this._renderer.setElementAttribute(this.elem.nativeElement, 'disabled', 'disabled');
            // this..nativeElement.setAttribute("disabled", "true");
            //this.elem.nativeElement.style.backgroundColor = 'yellow';
            //this._renderer.setElementStyle(this.elem.nativeElement, 'display', 'none');
         }
      } else {
         // Else remove template from DOM
         this.viewContainer.clear();
      }
   }

}