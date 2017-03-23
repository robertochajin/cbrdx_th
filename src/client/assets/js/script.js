
$(function(){

  /**
   * Revisa si hay un tema en sesión HTML5 y carga el tema determinado
   * si no existe un determminado se asigna el color White (blanco).
   *
   * @autor CarlosPineda
   */
  if (sessionStorage.datatheme === undefined) {
    $("head link#theme").attr("href", 'assets/css/color/' + 'white' + '.css');
    $("#logoApp").attr("src", 'assets/images/gestionamos_' + 'white' + '.png');
    console.log('white');
  } else {
    $("head link#theme").attr("href", 'assets/css/color/' + sessionStorage.datatheme + '.css');
    $("#logoApp").attr("src", 'assets/images/gestionamos_' + sessionStorage.datatheme + '.png');
    console.log(sessionStorage.datatheme);
  }

});



/**
 * Funcion que Cambia el tema por el seleccionado
 * @param color String
 *
 * @autor CarlosPineda
 */
function changeTheme(color) {
  $("head link#theme").attr("href", 'assets/css/color/' + color + '.css');
  $("#logoApp").attr("src", 'assets/images/gestionamos_' + color + '.png');
  sessionStorage.setItem("datatheme", color);
}

