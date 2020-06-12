/* dumpfile */

let match=key=>key.match(/^[A-Za-z]+$/);
if(e.shiftKey==true && match(e.key)){
	r="";
}

var keycode = e.keyCode;

var valid = 
    (keycode > 47 && keycode < 58)   || // number keys
    keycode == 32 || keycode == 13   || // spacebar & return key(s) (if you want to allow carriage returns)
    (keycode > 64 && keycode < 91)   || // letter keys
    (keycode > 95 && keycode < 112)  || // numpad keys
    (keycode > 185 && keycode < 193) || // ;=,-./` (in order)
    (keycode > 218 && keycode < 223);   // [\]' (in order)

return valid;

String.fromCharCode(e.which)


// image viewer

let url ="https://i.pinimg.com/originals/ef/0b/66/ef0b668ba1c367ec629cd9419016ee44.jpg";
let button = document.getElementById("button");

button.addEventListener("click", (e)=>{
  let img=document.createElement("img");
  img.src=url;
  img.style.height="100%";
  img.style.width="auto";
  img.style.border="1px solid #000";
  document
    .getElementById("viewer")
    .appendChild(img)
})
/*
<input type="button" id="button" value="add"></input>
<div class="viewer" id="viewer"></div>

*/


/*
UNICODE SYMBOLS

<!DOCTYPE html>
<meta charset="utf-8">
<title>All assigned Unicode v6.3.0 symbols</title>
<script src="http://mathias.html5.org/data/unicode/format?version=6.3.0&property=Assigned&type=symbols&prepend=window.symbols%20%3D%20&append=%3B"></script>
<script>
  window.symbols.forEach(function(symbol) {
    // Do what you want to do with `symbol` here, e.g.
    console.log(symbol);
  });
</script>

*/

function insert(item,arr=[0,1,2,3],idx){
  let r=[];
  for(let i=0;i<arr.length;i++){
    if(i==idx){
      r.push(item)
      r.push(arr[i])
    }else{
      r.push(arr[i])
    }
  }
  if(idx==arr.length){
    r.push(item)
  }
  cl(r)
  return r;
}

    s("wrapper")
      .insertBefore(_
        .cursor
        .target,s("wrapper")
          .children[_.cursor.pos])//here
