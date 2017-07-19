import { Injectable } from '@angular/core';
import { Jsonp, URLSearchParams } from '@angular/http';

@Injectable()
export class SmsService {
   constructor( private jsonp: Jsonp ) {

   }

   generateVerificationCode( obj: any ) {
      let data = new URLSearchParams();
      data.append( 'user', 'CrezcamosAPI' );
      data.append( 'password', 'CrezcamosAPI' );
      data.append( 'destination', obj.destination );
      data.append( 'message', 'Su código de verificación es: ' + obj.codigo );

      return this.jsonp.get( 'https://contactalos.com/services/rs/sendsms.php', { search: data } )
      .map( response => <string[]> response.json()[ 1 ] );
   }
}
