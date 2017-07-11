import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';

@Pipe({ name: 'seguro' })
export class PipeSeguro implements PipeTransform {
   constructor(private sanitizer: DomSanitizer) {}
   transform(url:string) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
   }
}

