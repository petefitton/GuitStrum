// document.addEventListener('DOMContentLoaded', function() {
//   var elems = document.querySelectorAll('.parallax');
//   var instances = M.Parallax.init(elems, options);
// });

$(document).ready(function(){
  $('.parallax').parallax();
});

$(document).ready(function(){
  $('select').formSelect();
});

$(document).ready(function(){
  $('.modal').modal();
});