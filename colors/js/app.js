var color = function(){
  // Starting point color
  var origin, harmonies;
  
  // Set the origin
  function publicSetOrigin(color){
    origin = color;
    console.log("%c Color set to " + color, 'color:'+color)
  }
  
  // Collect all the colors
  function publicCollect(){
    var color = tinycolor(origin);
    
    harmonies = {
      complement: [tinycolor(origin), color.complement()],
      splitcomplement: color.splitcomplement(),
      mono: color.monochromatic(),
      analogous: color.analogous(),
      triad: color.triad()
    };
    
    for(var harmony in harmonies){
      if(harmonies.hasOwnProperty(harmony)){
        harmonies[harmony] = harmonies[harmony].map(function(h){
          return h.toHexString();
        });
      }
    }
    
    return harmonies;
  }
  
  return {
    origin: publicSetOrigin,
    collect: publicCollect
  }
}();

$(document).ready(function(){
  
  var origin = $('#origin');
  
  function populate(){
    color.origin(origin.val());
    $('body').animate({
      backgroundColor: tinycolor(origin.val()).darken(35).toString()
    });
    var harmonies = color.collect();
    var outputs = $('.container .output');
    var h = 0;
    // Loop through each harmony and apply colors
    for(var harmony in harmonies){
      if(harmonies.hasOwnProperty(harmony)){
        // Set origin color
        var elements = [];

        // Loop through each color
        for (var i=0; i < harmonies[harmony].length; i++){
            var _color = harmonies[harmony][i]
            var swatches = $(outputs[h]).find('.swatch');
            outputs.eq(h).find('h1').text(harmony);
            if(swatches.eq(i).length){
              swatches.eq(i).animate({
                backgroundColor: _color
              }, 500).html("<span>"+_color+"</span>");
            } else {
              console.log("Create new!");
              var swatch = $('<div/>').addClass('swatch').css({
                background: _color
              }).html("<span>"+_color+"</span>");
              swatch.appendTo(outputs[h]);
            }
        };
        h++;
      }
    }
  }
  
  $(document).keyup(function(event){
    switch(event.which){
      case 13:
        populate();
        break;
    }
  });
  
  $('.maincontent').on('click', '.swatch', function(){
    origin.val($(this).find('span').text());
    populate();
  })
  

});
