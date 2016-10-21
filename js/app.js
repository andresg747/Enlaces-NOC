var dropdownSelectors = $('.dropup');

// Custom function to read dropdown data
// =========================
function dropdownEffectData(target) {
  // @todo - page level global?
  var effectInDefault = null,
  effectOutDefault = null;
  var dropdown = $(target),
  dropdownMenu = $('.dropdown-menu', target);
  var parentUl = dropdown.parents('ul.nav'); 

  // If parent is ul.nav allow global effect settings
  if (parentUl.size() > 0) {
    effectInDefault = parentUl.data('dropdown-in') || null;
    effectOutDefault = parentUl.data('dropdown-out') || null;
  }
  
  return {
    target:       target,
    dropdown:     dropdown,
    dropdownMenu: dropdownMenu,
    effectIn:     dropdownMenu.data('dropdown-in') || effectInDefault,
    effectOut:    dropdownMenu.data('dropdown-out') || effectOutDefault,  
  };
}

// Custom function to start effect (in or out)
// =========================
function dropdownEffectStart(data, effectToStart) {
  if (effectToStart) {
    data.dropdown.addClass('dropdown-animating');
    data.dropdownMenu.addClass('animated');
    data.dropdownMenu.addClass(effectToStart);    
  }
}

// Custom function to read when animation is over
// =========================
function dropdownEffectEnd(data, callbackFunc) {
  var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
  data.dropdown.one(animationEnd, function() {
    data.dropdown.removeClass('dropdown-animating');
    data.dropdownMenu.removeClass('animated');
    data.dropdownMenu.removeClass(data.effectIn);
    data.dropdownMenu.removeClass(data.effectOut);
    
    // Custom callback option, used to remove open class in out effect
    if(typeof callbackFunc == 'function'){
      callbackFunc();
    }
  });
}

// Bootstrap API hooks
// =========================
dropdownSelectors.on({
  "show.bs.dropdown": function () {
    // On show, start in effect
    var dropdown = dropdownEffectData(this);
    dropdownEffectStart(dropdown, dropdown.effectIn);
  },
  "shown.bs.dropdown": function () {
    // On shown, remove in effect once complete
    var dropdown = dropdownEffectData(this);
    if (dropdown.effectIn && dropdown.effectOut) {
      dropdownEffectEnd(dropdown, function() {}); 
    }
  },  
  "hide.bs.dropdown":  function(e) {
    // On hide, start out effect
    var dropdown = dropdownEffectData(this);
    if (dropdown.effectOut) {
      e.preventDefault();   
      dropdownEffectStart(dropdown, dropdown.effectOut);   
      dropdownEffectEnd(dropdown, function() {
        dropdown.dropdown.removeClass('open');
      }); 
    }    
  }, 
});

$(document).ready(function(){
  var flag = false;
  $('#input_search').focus();
  $(".btn").tooltip('show');
  $(".tooltip").delay( 1500 ).fadeOut( 1000 );

  var options = {
    url: "./res/estados.json",

    getValue: "name",

    list: {
      onClickEvent: function() {flag = true;},
      match: {
        enabled: true
      },
      maxNumberOfElements: 10
    },

    theme: "square"

  };

  if(flag){
    flag = false;
    var texto = $('#input_search').val();
    buscar(texto);
    $('#input_search').val('');
  }

  $("#input_search").easyAutocomplete(options);

  $("#input_search").keyup(function(event){
    if(event.keyCode == 13){
      var texto = $('#input_search').val();
      buscar(texto);
      $('#input_search').val('');
    }
  });

  function buscar(x){
  $('.open').removeClass('open');
  x = x.toLowerCase();
  if(x == 'ciudad bolivar'){
    x = 'cbolivar';
  }else if(x == 'los teques'){
    x = 'losteques'; 
  }else if(x == 'tinaco'){
    x = 'tinaquillo';
  }else if(x == 'san carlos'){
    x = 'tinaquillo';
  }else if(x == 'san cristobal'){
    x = 'sancristobal';
  }else if(x == 'punto fijo'){
    x = 'puntofijo';
  }else if(x == 'san felipe'){
    x = 'sanfelipe';
  }else if(x == 'cabimas'){
    x = 'maracaibo';
  }else if(x == 'ciudad ojeda'){
    x = 'maracaibo';
  }else if(x == 'guarenas'){
    x = 'caracas';
  }
  var selector = '#'+x;
  $(selector).addClass('open');
}

});

