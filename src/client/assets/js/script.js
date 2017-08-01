
$(function(){

  /**
   * Revisa si hay un tema en sesión HTML5 y carga el tema determinado
   * si no existe un determminado se asigna el color White (blanco).
   *
   * @autor CarlosPineda
   */
  if (sessionStorage.datatheme === undefined) {
    /*
    $("head link#theme").attr("href", 'assets/css/color/' + 'white' + '.css');
    $("#logoApp").attr("src", 'assets/images/gestionamos_' + 'white' + '.png');
    console.log('white');
    */
    sessionStorage.setItem("datatheme", 'skin-blue');
    $('body').addClass(sessionStorage.datatheme);
  } else {
    /*
    $("head link#theme").attr("href", 'assets/css/color/' + sessionStorage.datatheme + '.css');
    $("#logoApp").attr("src", 'assets/images/gestionamos_' + sessionStorage.datatheme + '.png');
    console.log(sessionStorage.datatheme);
    */
    $('body').addClass(sessionStorage.datatheme);
  }

	$('body').tooltip({
		selector: '[data-toggle="tooltip"], [title]:not([data-toggle="popover"])',
		trigger: 'hover',
		container: 'body'
	}).on('click mousedown mouseup', '[data-toggle="tooltip"], [title]:not([data-toggle="popover"])', function () {
		$('[data-toggle="tooltip"], [title]:not([data-toggle="popover"])').tooltip('destroy');
	});



});

//Skin switcher
var current_skin = "skin-blue";
$('#layout-skins-list [data-skin]').click(function(e) {
  e.preventDefault();
  var skinName = $(this).data('skin');
  $('body').removeClass(current_skin);
  $('body').addClass(skinName);
  current_skin = skinName;
});



/**
 * Funcion que Cambia el tema por el seleccionado
 * @param color String
 *
 * @autor CarlosPineda
 */
function changeTheme(color) {
  /*
  $("head link#theme").attr("href", 'assets/css/color/' + color + '.css');
  $("#logoApp").attr("src", 'assets/images/gestionamos_' + color + '.png');
  sessionStorage.setItem("datatheme", color);
  */
  $('body').removeClass(sessionStorage.datatheme);
  sessionStorage.setItem("datatheme", color);
  $('body').addClass(color);
}
