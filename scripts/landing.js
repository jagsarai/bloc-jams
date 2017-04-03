
var revealPoint = function(){
    var points = document.getElementsByClassName("point");
    
    for(var i=0; i<points.length; i++){
        points[i].style.opacity = 1;
        points[i].style.transform = "scaleX(1) translateY(0)";
        points[i].style.msTransform = "sacleX(1) tranlateY(0)";
        points[i].style.WebkitTransform = "scalex(1) translateY(0)";
    }
  
};
                
                 