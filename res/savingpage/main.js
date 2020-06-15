cl=console.log;
root=document.querySelector("[root]");
mState = {
	services:{
		editor:{
			url:'',

		},
		clip:"",
		x:0,
		y:0,
	}
};
_=mState.services;
function stateChange(){}

function o(args) {
	let r = document.createElement("div");
	for(let prop in args){
		switch(prop){
			case "text":
				r.textContent = args[prop];
			break;
			case "editable":
				r.setAttribute("contentEditable", args[prop])
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

function b(elm,sibling) {
  elm.appendChild(sibling);
}

function st(elm,styles){
	for(let prop in styles){
		elm[prop]=styles[prop];
	}
	return elm;
}

e(document.body,"mousedown",function(e){
	mState['mousedown']=true
})

e(document.body,"mouseup",function(e){
	mState['mousedown']=false
})

function inp(){
	// use this in future
	const inp=document.createElement("input");
	inp.setAttribute("type","text");
	inp.setAttribute("class","input");
	return inp;
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

function img(uri){
	let elm=document.createElement("img");
	elm.src=uri;
	return elm;
}

function store(obj){
	localStorage.setItem(obj.key,obj.value)
}
/*
~
paste image url onto input field one
press add image button

*/
b(root,e(e(input(),"keydown",function(){

}),"paste",function(){
	_.clip=this.clipboardData.getData('text');
}))

b(root,e(btn("add image"),"click",function(){
	s("wrapper").appendChild(img(_.clip))
}))

b(root,inp());

b(root,e(btn("save page"),"click",function(){
	store({
		key:"page",
		value:s("wrapper").innerHTML,
	})
}))
b(root,e(btn("load page"),"click",function(){
	s("wrapper").innerHTML=localStorage.getItem("page")
}))

b(root,o({
	id:"wrapper",
	class:"wrapper",
	editable:true,
	text:"https://i.pinimg.com/originals/d8/be/28/d8be2864467f8d5009d470e8b6d34a23.jpg"}))

stateChange() //init