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
