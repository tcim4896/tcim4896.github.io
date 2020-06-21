cl=console.log;
root=document.querySelector("[root]");
mState = {
	services:{
		items:{
			list:["item1","item2","item3","item4","item5"],
		},
		cursor:{
			target:undefined,
			dragging: false,
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

e(document.body,"mousedown",function(e){
	mState['mousedown']=true
})

e(document.body,"mouseup",function(e){
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

console.log("Welcome!")
b(root,o({id:"wrapper",class:"wrapper"}))

e(document.documentElement,"mousemove",function(){
	_.x=this.clientX;
	_.y=this.clientY;
	cl("x",_.x,"y",_.y)
	if(_.cursor.dragging==true){
		cl("targetMove")
		_.cursor.target.style.position="fixed";
		_.cursor.target.style.top=_.y-_.cursor.layerY+"px";
		_.cursor.target.style.left=_.x-_.cursor.layerX+"px";
	}

})

e(document.documentElement,"mouseup",function(){
	cl("mouseup")
	_.cursor.dragging=false;
	if(typeof _.cursor.target=="object"){
		_.cursor.target.style.position="relative";
		_.cursor.target.style.left="auto";
		_.cursor.target.style.top="auto";
	}
})

function stateChange(obj){
	function init(){
		for(let services in _){
			for(let service in _[services]){
				if(typeof _[services][service]!=="undefined"&&
					typeof _[services][service].handler=="function"){
					let vars=_[services][service].variables;
					// service({prop:1,prop:2})
					// cl(vars);
					// cl(_[services][vars])
					_[services][service].handler(_[services][vars])
				}
			}
		}
	}
	function update(obj){
		// cl("update",obj)
		// cl(_[obj.service])
		// cl(_[obj.service][obj.fnCall])
		cl(_[obj.service][obj.fnCall].handler(_[obj.service][obj.var]))
	}

	if(obj=="init"){
		init();
	}else{
		update(obj)
	}

}

function registerService(serviceId,variables,handler){//name, handler.parameters handler.fn
	_[serviceId][handler.name]={
		variables,
		handler,
	};
}

registerService("items",["list"],listItems)

function listItems(items){// service({prop:1,prop:2})
	s("wrapper").innerHTML="";
	for(let i=0; i<items.length;i++){
		let item=e(o({class:"item",text:items[i]}),"mousedown",function(){
			_.cursor={
				dragging:true,
				layerX:this.layerX,
				layerY:this.layerY,
				target:this.target, //wth
			};
			cl("mousedown",_.cursor)

		});
		s("wrapper").appendChild(item)// call out of scope
	}
}


stateChange("init") //init