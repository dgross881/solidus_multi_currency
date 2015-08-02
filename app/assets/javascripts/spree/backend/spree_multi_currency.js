//= require spree/backend

$(document).ready(function(){
  $.expr[':'].Contains = function(a,i,m){
    return (a.textContent || a.innerText || '').toUpperCase()
    																					 .indexOf(
    																					 		m[3].toUpperCase()
    																					 	) >= 0;
  };


  function listFilter(list) {
    var input = $('#variant-price-search');

    $(input)
      .change( function () {
        var filter = $(this).val();
        if(filter) {
          $(list).find('.panel-title:not(:Contains(' + filter + '))')
          			 .parent().parent().parent()
          			 .hide();
          $(list).find('.panel-title:Contains(' + filter + ')')
          			 .parent().parent().parent()
          			 .show();
        } else {
          $(list).find('.panel').parent().show();
        }
        return false;
      })
    .keyup( function () {
      $(this).change();
    });
  }


  //ondomready
  $(function () {
    listFilter($('#variant-prices'));
  });
});


// Allows for currency to be switched 
$(function() {
  $(".set-currency-price-manually").change(function() { 
    $(this).prev("input").prop('disabled', $(this).is(":checked")).focus();
    return false;
  });
  
  $(".set-currency-price-manually").trigger('change');
});



