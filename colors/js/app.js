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
      complement: [color.complement()],
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
  color.origin('#FF0000');
  
  var colors = color.collect();
  for(var c in colors){
    if(colors.hasOwnProperty(c)){

    }
  }
});