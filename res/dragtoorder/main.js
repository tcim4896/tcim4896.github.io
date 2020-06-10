cl=console.log;
root=document.querySelector("[root]");
mState = {
	services:{
		order:[],
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

function stateChange(){}

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

items=["item1","item2","item3"];

console.log("Welcome!")
e(root,"mousemove",function(){
	_.x=this.clientX;
	_.y=this.clientY;
	//cl(_.x,_.y)
	for(let prop in _){
		//cl(prop,_[prop])
	}

})

b(root,o({id:"wrapper",class:"wrapper"}))
let i=0;
for(let item of items){
	b(s("wrapper"),
		e(e(e(o({
			id:i,
			text:item,
			class:"item"
		}),"mousedown",function(){
			cl("mousedown")
			 this.target.style.position="fixed";
			 this.target.style.width="200px";
			_.cursor={
				y:this.layerY,
				x:this.layerX,
			}
			s("wrapper")
				.children[0]
				.insertAdjacentElement("afterEnd", o({class:"dummy"}));
		}),"mousemove",function(){
			
			cl("mousemove")
			if(typeof _.cursor=="object"){
				this.target.style.top=_.y-_.cursor.y+"px";
				this.target.style.left=_.x-_.cursor.x+"px";
			}

			/*
			loop over every item?
			*/
			cl(s(1).offsetTop==this.target.offsetTop)
		}),"mouseup",function(){
			cl("mouseup")
			s("wrapper").removeChild(s("wrapper").childNodes[1])
			_.cursor=undefined;
			this.target.style.position="relative";
			this.target.style.top="auto";
			this.target.style.left="auto";
		})
	)
	i++;
}

stateChange() //init