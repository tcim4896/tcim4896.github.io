cl=console.log;
root=document.querySelector("[root]");
mState = {
	services:{
		items:{
			list:["item1","item2","item3","item4","item5"],
		},
		grid:{
			cells:{},
		},
		cursor:{
			target:undefined,
			dragging:false,
			pos:0,
			layerX:0,
			layerY:0,
			mousedown:undefined,
		},
		x:0,
		y:0,
	}
};
_=mState.services;

// Propchaining
d={
  value:{},
  fn(prop){
    this.value[prop]=prop;
    return this;
  }
};

d.fn(0).fn(1)

function st(elm,styles){
	for(let prop in styles){
		elm.style[prop]=styles[prop];
	}
	return elm;
}


function o(args) {
	let r = document.createElement("div");
	for(let prop in args){
		switch(prop){
			case "text":
				r.textContent = args[prop];
			break;
			case "class":
				r.setAttribute("class", args[prop]);
			break;
			case "siblings":
				for (let sibling of args[prop]) {
    			r.appendChild(sibling);
  			}
  			break;
  			case "id":
  				mState[args[prop]] = r;
  			break;
  			case "placeholder":
  				r.setAttribute("data-placeholder",args[prop]);
  			break;
  			default:
  				r.setAttribute("class", "input")
  			break;
  			case "styles":
  				st(r,args[prop]);
  			break; 	
   			case "fn":
  				args[prop]();
  			break; 			
		}
	}
  return r;
}

function e(elm,type,fn) {
	function ffkeys(event){ // key validator
		let r;
		switch(event.key){
			case "Shift":
				r="";
			break;
			case "Tab":
				r="";
			break;
			case "Backspace":
				r="";
			break;
			// Ctrl, Alt -> dumpfile[valid]
			default:
				r=event.key;
			break;
		}
		return r;
	}

	if(true){ // if elm.ffkeys
		elm.addEventListener(type,function(e){
			e.value=ffkeys(e);
			fn.call(e)
		});
	}else{
		elm.addEventListener(type,fn)
	}
  return elm;
}

function s(id) {
  return mState[id];
}

function b(elm, sibling) {
  elm.appendChild(sibling);
}

function input(placeholder){
	let div=document.createElement("div");
	div.input=true;
	div.setAttribute("contentEditable",true)
	div.setAttribute("class","input")
	// div.setAttribute("data-text",placeholder+"...")
	// clear input..
	return div;
}

function btn(text){
	let div=document.createElement("div");
	div.innerText=text
	div.setAttribute("class","btn")
	return div;
}

function text(text){
	let div=document.createElement("div");
	div.innerText=text
	div.setAttribute("class","btn")
	return div;
}

// dropdown w.i.p ..
function dropdown(props){
	let dropdown=document.createElement("div");
	dropdown.open=false;
  	dropdown.textContent=props.text;
	dropdown.setAttribute("class","dropdown");
  	dropdown.addEventListener("click",function(e){
	    s(props.id).open=!s(props.id).open;
	    if(!s(props.id).open){
	    	s(props.id).style.height="20px";
	    }else{
	    	s(props.id).style.height=(props.options.length+1)*20+"px";
	    }
 	})
 	let icon=document.createElement("div");
	icon.setAttribute("class","icon")
	icon.innerHTML="&#x25BC";
 	dropdown.appendChild(icon);

	for(let option of props.options){
		let opt=document.createElement("div");
		opt.setAttribute("class","option")
		opt.textContent=option.text;
		opt.addEventListener("click",function(e){
			s(props.id).value=option.value;
		})
    	dropdown.appendChild(opt);
	}
  	mState[props.id]=dropdown;
	return dropdown;
}

function p(elm,props){
	for(let prop in props){
		elm.setAttribute(prop,props[prop])
	}
	return elm;
}

function c(node,id){
	let elm=node.cloneNode(true);
	mState[id]=elm;
	return elm;
}


function px(value){
	let int=parseInt;
	return typeof value=="string"?int(value):value+="px";
}

console.log("Welcome!")

function stateChange(state){}

//b(root,o({id:"wrapper",class:"wrapper"}))
o({id:"wrapper",class:"wrapper"})
/*
	to begin with
	3 row layout
	get width of all together
	and determine where to start new row
	left space allowed

*/
_.items.list=[
{
	text:"Bazooka",
	width: px(100)
},
{
	text:"Oblivion",
	width: px(200)
},
{	
	text:"Charlie",
	width: px(200)
}]

let clientWidth=s("wrapper").clientWidth;
let itemsTotalWidth=0;

for(let item of _.items.list){
	itemsTotalWidth+=px(item.width)
}

cl(clientWidth,itemsTotalWidth)

/*
	
	get max width of all items devided by 3
	set row to max width
	begin new row if max width excedes
*/

for(let item of _.items.list){

  b(s("wrapper"),o({
  	id:item.text,
  	class:"item",
  	text:item.text
  }))

  st(s(item.text),{
  	width:item.width,
  })
}

// single cell resize
b(root,o({ // could add call to service fn:
	id:"c1",
	class:"cell",
	styles:{
		width:px(100),
		height:px(100),
	},
	fn:function fn(){
		let cell=s(this.id);
		_.grid.cells[this.id]={
			element:cell,
			borders:{},
		};
	}
}))
function getBorders(cell){
	let elm = cell.element;
	cell.borders={
		bottom:elm.clientTop+elm.clientHeight,
		top:elm.clientTop,
		left:elm.clientLeft,
		right:elm.clientLeft+elm.clientWidth,	
	};
	return cell;
}

getBorders(_.grid.cells["c1"]);
/*
	define border detector:
	> clientTop
	> clientLeft
	> clientWidth
	> clientHeight
	> ?border
	
	> bottom clientTop+clientHeight
	> top clientTop
	> left clientLeft
	> right clientLeft+clientWidth

	> corner(x==top&&y==left)

	change cursor at border range
	> col-resize
	> row-resize
	> se-resize
	> ne-resize

*/


e(document.documentElement,"mousedown",function(){
	_.cursor.mousedown=true;
})

e(document.documentElement,"mouseup",function(){
	_.cursor.mousedown=false;
	_.cursor.dragging=false;
})

/*
	grid cells cell
		>borders
		>element


*/
e(document.documentElement,"mousemove",function(){
	_.y=this.clientY;
	_.x=this.clientX;
	//---------------
	let borders = _.grid.cells["c1"].borders;
	cl(_.y<borders.bottom+20)
	cl(_.y>borders.bottom-20)

	if(_.y<borders.bottom+20&&
		_.y>borders.bottom-20){
		st(document.documentElement,{
			cursor:"row-resize"
		})

	/*

		here we fire a dragging event
		so height of element will folllow y
	*/
		if(_.cursor.mousedown==true){
			_.cursor.dragging=true;
		}
	}else{
		st(document.documentElement,{
			cursor:""
		})
	}

	if(_.cursor.dragging==true){
		st(s("c1"),{
			height:px(_.y)
		})
			// update borders
	}
})

