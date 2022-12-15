cl=console.log;
root=document.querySelector("[root]");
mState = {
	elements:[],
	services:{
		menu:{
			open:{
				id:0,
				open:false
			},
		},
		router:{
			currentPage: 0,
			routes:{}
		},
	}
};
_=mState.services;
menuStructure = [
 	{
	    text: "BiBi Cars",
	    event: {type:"open",path:0},
	    list: [
	      {
	        text: "Kleine beurt",
	        event: {type:"route",path:"kleine-beurt"
	        }
	      },
	      {
	        text: "Contactgegevens",
	        event: {type:"route",path:"/contact"}
		  },
	      {
	        text: "Route",
	        event: {type:"route",path:"/route"}
	      }, 
	    ],
	},
];

// Propchaining
d={
  value:{},
  fn(prop){
    this.value[prop]=prop;
    return this;
  }
};
d.fn(0).fn(1)

e(document.documentElement,"mousedown",function(e){
	cl("mousedown")
	_.mousedown=true;
})

e(document.documentElement,"mouseup",function(e){
	cl("mouseup")
	_.mousedown=false;
})

ipsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

function stateChange(service){
	function clear(obj){
		for(let prop in obj){
			if(typeof prop=="string"){
				obj[prop]="";
			}
		}
		return;
	}
	clear(service)
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
  				r.setAttribute("placeholder",args[prop]);
  			break;
  			default:
  				r.setAttribute("class", "input")
  			break;
		}
	}
  return r;
}
function oo(amt,args){
	let r = [];
	/*
		diff on element props
	*/
	for(let i=0;i<amt;i++){
		let elm = document.createElement("div");
		r.push(elm)
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

function st(elm,styles){
	for(let prop in styles){
		elm.style[prop]=styles[prop];
	}
	return elm;
}

function input(placeholder){
	// use this in future
	const input=document.createElement("input");
	input.setAttribute("type","text");
	input.setAttribute("class","input");
	return inp;
}

function btn(text){
	let div=document.createElement("div");
	div.innerText=text
	div.setAttribute("class","btn")
	return div;
}
// polyfill (lol)
function draw(...args){
// higher order function.
	let canvas = document.createElement("canvas");
		canvas.getContext("2d"); //do things from hereon
		cl(root,canvas)
	return canvas;
}

function text(text){
	let div=document.createElement("div");
	div.innerText=text
	div.setAttribute("class","btn")
	return div;
}

function img(url){
	//wip..
	let img=document.createElement("img");
		img.src=url;
		img.style.height="100%";
		img.style.width="auto";
		img.style.border="1px solid #000";
		
	return img;
}

function dropdown(props){
	/* at cursor fixed position */
	let dropdown=document.createElement("div");
	dropdown.open=false;
  	dropdown.textContent=props.text;
	dropdown.setAttribute("class","dropdown");
  	dropdown.addEventListener("click",function(e){s
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
			cl(option.value)
			_.encrypt.type=option.value;
		})
    	dropdown.
    	appendChild(opt);
	}
  	mState[props.id]=dropdown;
	return dropdown;
}

e(document.documentElement,"mousemove",function(){
	_.x=this.clientX;
	_.y=this.clientY;
	//cl(_.x,_.y)
})

// example page

function registerService(service){
	_[service.name]=service;
}

// toggle menu
function toggle(id){
	for(let item of menuStructure){
		if(item.event.type=="open"){
			s("level"+item.event.path).style.height="calc(0%)";
		}
	}
	if(typeof id!=="undefined"){
		if(_.menu.open.id==id&&_.menu.open.open==true){
		_.menu.open={id,open:false};
			s("level"+id).style.height="0px";
		}else{
			_.menu.open={id,open:true};
			s("level"+id).style.height="auto";
		}
	}

}

// html over here??
o({id:"container",class:"container",siblings:[]})


// end html

function slideGallery(){
	o({})// image slider
}

o({id:"contact",class:"contact",text:"Hello"})

registerService({
	name: "router",
	init: function Router(path){ // handler for request and routes

		// window location handler
		// http://localhost:8080/contact
		routes = [
			{path: "/contact", component: "contact"},
		]
		cl(0,path)
		routes.forEach(route=>{
			if(route.path==path){
				cl(1)
				history.pushState({},"BiBi Cars "+path,path)
				cl(s("contact",route.component))
				b(root,s(route.component))
			}
		})
	},
	registerRoute: function registerRoute(id,component){
		_.router.routes[id]=component;
	}
})


function drawMenu(menuStructure){
	function menuAction(menuItem){
		switch(menuItem.event.type){
			case "open":
				toggle(menuItem.event.path);
			break;
			case "close":
				_.menu.open.open=false;
				toggle()
			break;
			case "page":
				toggle(menuItem.event.path);
			break;
			case "route":
				_.router.init(menuItem.event.path);
				_.menu.open.open=false;
				toggle();
			break;
			case "ref":
				window.open(menuItem.event.path)
			break;
			default:
				cl("No matching route..")
			break;
		}
	}

	b(root,o({id:"menu",class:"menu"}))

	for(let menuItem of menuStructure){
		b(s("menu"),e(o({class:"item", text:menuItem.text}),"click",function(){		
			menuAction(menuItem)
		}))
		function drawLevel(menuItem,rows=2){
			const list=menuItem.list
			const len=list.length;
		
			const divs=Math.ceil(len/rows);
			let itemIndex=0;rows=3;
			if(menuItem.event.type=="open"){
				b(root,o({id:"level"+menuItem.event.path, class:"level", siblings:[]})
				)
			}
			for(let i=0;i<divs;i++){
				// create division
				b(s("level"+menuItem.event.path),o({id:"division"+i,class:"division"}))

				for(let x=0;x<rows;x++){
					let li=menuItem.list[itemIndex];
					if(typeof li=="object"){
						if(menuItem.event.type=="open"){
							// create level
							itemIndex++;
							b(s("division"+i),e(o({id:"level"+li.event.path,class:"item", text:li.text}),"click",function(){
								menuAction(li)
							}))					
						}else{
							itemIndex++;
							b(s("division"+i),e(o({class:"item", text:li.text}),"click",function(){
								menuAction(li)
							}))
						}						
					}else{
						b(s("division"+i),o({class:"empty",text:"hello"}))
					}
	
				}
			}
			if(menuItem.event=="level"){
				cl(true)
				b(root,o({id:"level"+menuItem.event.path, class:"level", siblings:[
						text("Adres: Amsterdamseweg"),
						text("Adres: Arnhem")
					]})
				)
			}

		}
		drawLevel(menuItem);
	}

	e(document.body,"mousedown",function(){
		if(_.menu.open.open==true){
			if(_.y<s("level"+_.menu.open.id).offsetTop){
				menuAction({event:{type:"close"}})
			}
		}

	})
}

drawMenu(menuStructure);

_.router.init(window.location.pathname)
stateChange() //init
cl(window.location)
