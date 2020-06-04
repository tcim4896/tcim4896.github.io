cl=console.log;
col=document.querySelector("div");
map={
  mousedown:false,
};

col.addEventListener("mousedown",function(e){
  map.mousedown=true;
})

document.body.addEventListener("mouseup",function(e){
  map.mousedown=false;
})

document.body.addEventListener("mousemove",function(e){
  cl(e.layerX,e.layerX,map)
  if(map.mousedown==true){
    col.style.width=e.layerX+"px";
  }
})