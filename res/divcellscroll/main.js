cl=console.log;
root=document.querySelector("[root]");
mState = {
	services:{
		items:{
			list:["item1","item2","item3","item4","item5"],
		},
		cursor:{
			target:undefined,
			dragging:false,
			pos:0,
			layerX:0,
			layerY:0,
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

e(document.documentElement,"mousedown",function(e){
	mState['mousedown']=true
})

e(document.documentElement,"mouseup",function(e){
	mState['mousedown']=false
})

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

cl=console.log;
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

e(document.documentElement,"mousemove",function(){
	_.x=this.clientX;
	_.y=this.clientY;
})

e(document.documentElement,"mouseup",function(){
	cl("mouseup")
})

function c(node,id){
	let elm=node.cloneNode(true);
	mState[id]=elm;
	return elm;
}

function st(elm,styles){
	for(let prop in styles){
		elm.style[prop]=styles[prop];
	}
	return elm;
}

function px(value){
	let int=parseInt;
	return typeof value=="string"?int(value):value+="px";
}
console.log("Welcome!")
function stateChange(updateObj){}

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
b(root,o({
	id:"c1",
	class:"cell"
}))
// set width and height of cell
st(s("c1"),{
	width:px(100),
	height:px(100),
})

/*
	define border detector:
	> clientTop
	> clientLeft
	> clientWidth
	> clientHeight
	>?border


*/

let cellProps={};

e(document.documentElement,"mousemove",function(){
	_.y=this.clientY;
	_.x=this.clientX;
	//---------------
	let cell=s("c1");

	cellProps={
		clientTop:cell.clientTop,
		clientLeft:cell.clientLeft,
		clientWidth:cell.clientWidth,
		clientHeight:cell.clientHeight
	};

	let bottom=cellProps.clientTop+cellProps.clientHeight;
	cl(_.y,bottom)
	if(_.y==bottom){
		st(s("c1"),{
			cursor:"s-resize"
		})
	}
	cl(cellProps)
})

