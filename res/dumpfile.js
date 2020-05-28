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