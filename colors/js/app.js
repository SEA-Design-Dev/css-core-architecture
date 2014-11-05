/* Palette maker */
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
    
    // A collection of harmonies
    harmonies = {
      complement: [tinycolor(origin), color.complement()],
      splitcomplement: color.splitcomplement(),
      mono: color.monochromatic(),
      analogous: color.analogous(),
      triad: color.triad(),
      tetrad: color.tetrad()
    };
    
    // Loop through each harmony and map it to an array
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
  
  // Get the starting color
  var origin = $('#origin').focus();
  
  // Auto-highlight
  origin.click(function(){
    $(this).select();
  })
  
  // Populate other colors
  function populate(options){
    
    // Set options
    options = options || {speed:500};
    
    color.origin(origin.val());
 
    var harmonies = color.collect();
    var outputs = $('.container .output');
    var h = 0;
    
    // Loop through each harmony and apply colors
    for(var harmony in harmonies){
      if(harmonies.hasOwnProperty(harmony)){
        // Loop through each color
        for (var i=0; i < harmonies[harmony].length; i++){
            var _color = harmonies[harmony][i]
            var swatches = $(outputs[h]).find('.swatch');
            outputs.eq(h).find('h1').text(harmony);
            if(swatches.eq(i).length){
              swatches.eq(i).animate({
                backgroundColor: _color
              }, options.speed).html("<span>"+_color+"</span>");
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
      if(origin.val() == 'dance'){
        setInterval(function(){
          var r = Math.round(255 * Math.random());
          var g = Math.round(255 * Math.random());
          var b = Math.round(255 * Math.random());
          
          origin.val("rgb("+r+","+g+","+b+")");
          populate({
            speed: 0
          });
        },40);
      }
        populate();
        break;
    }
  });
  
  $('.maincontent').on('click', '.swatch', function(){
    origin.val($(this).find('span').text());
    populate();
  });
  
  $('#bright').change(function(){
    var orig = origin.val()
    var color = tinycolor(orig)
    origin.val(color.brighten($(this).val()));
    populate();
    origin.val(orig);
  });
  
}); // End document ready
