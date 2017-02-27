/**
 * Revisa si hay un tema en sesión HTML5 y carga el tema determinado
 * si no existe un determminado se asigna el color White (blanco).
 */
 if(sessionStorage.datatheme === undefined){
     $("head link#theme").attr("href", 'assets/css/color/' + 'white' + '.css');
 }else{
     $("head link#theme").attr("href", 'assets/css/color/' + sessionStorage.datatheme + '.css');
 }


/**
 * Funcion que Cambia el tema por el seleccionado
 * @param color String
 */
 function changeTheme(color) {
   $("head link#theme").attr("href", 'assets/css/color/' + color + '.css');
   sessionStorage.setItem("datatheme", color );
 }

