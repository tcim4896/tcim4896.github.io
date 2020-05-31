cl=console.log;
root=document.querySelector("[root]");
mState = {
	elements:[],
	services:{
		menu:{
			open:[],
		},
		router:{
			currentPage: 0,
			routes:{}
		},
		cursor: {
			x:0,
			y:0,
		},
		replace:{
			term:"",
			replacement:""
		},
		exclude:{
			char:""
		},
		extra:{
			char:""
		},
		encrypt:{
			type:"abcup"
		},
		encode:{
			type:""
		},
		applied:[]
	}
};
_=mState.services;
menuStructure = [
 	{
	    text: "Dictea",
	    event: {type:"open",path:0},
	    list: [
	      {
	        text: "Mangler",
	        event: {type:"route",path:"mangler"
	        }
	      },
	      {
	        text: "Langcheckup",
	        event: {type:"route",path:"langcheckup"}
	      },
	      {
	        text: "Dictionary",
	        event: {type:"ref",path:"dictionary"
	        }
	      },
	    ],
	},
	{
	    text: "Leke.js",
	    event: {type:"open",path:0},
	    list: [
	       {
	        text: "Quick start",
	        event: {type:"route",path:"langcheckup"}
	      },   
	      {
	        text: "API Reference",
	        event: {type:"route",path:"mangler"
	        }
	      },
	      {
	        text: "Download",
	        event: {type:"ref",path:"dictionary"
	        }
	      },
	    ]
  	},
	{
	    text: "Music",
	    event: {type:"ref",path:"https://www.youtube.com/watch?v=W-KpT2o1xXY"},
	    list:[],
  	}
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

	s("applied").innerHTML="";
	if(_.applied.length>0){
		_.applied.forEach(function(method){
			switch(method.event){
				case "replace":
					b(s("applied"),o({id:method.id,class:"method",siblings:[
						e(btn("x"),"click",e=>{
							_.applied=_.applied.filter(function(m){
								return method.id !== m.id;
							})
							stateChange()
						}),
						text(method.event),
						text(method.term),
						text(method.replacement)
					]}))
					s("mangled-text").textContent=window[method.event](
						s("mangled-text")
						.textContent,
						method.term,
						method.replacement
					);
				break;
				case "exclude":
					b(s("applied"),o({id:method.id,class:"method",siblings:[
						e(btn("x"),"click",e=>{
							_.applied=_.applied.filter(function(m){
								return method.id !== m.id;
							})
							stateChange()
						}),
						text(method.char),
					]}))
					s("mangled-text")
					.textContent=window[method.event](
						s("mangled-text").textContent,
						method.char,
					);
				break;
				case "toLowerCase":
					b(s("applied"),o({id:method.id,class:"method",siblings:[
						e(btn("x"),"click",e=>{
							_.applied=_.applied.filter(function(m){
								return method.id !== m.id;
							})
							stateChange()
						}),
						text("lowercase")
					]}))
					s("mangled-text")
					.textContent=window[method.event](
						s("mangled-text").textContent); //
				break;
				case "extra":
					b(s("applied"),o({id:method.id,class:"method",siblings:[
						e(btn("x"),"click",e=>{
							_.applied=_.applied.filter(function(m){
								return method.id !== m.id;
							})
							stateChange()
						}),
						text(method.char),
					]}))

					s("mangled-text")
					.textContent=window[method.event](
						s("mangled-text").textContent,
						method.char,
					);
				break;
				case "encrypt":
					b(s("applied"),o({id:method.id,class:"method",siblings:[
						e(btn("x"),"click",e=>{
							_.applied=_.applied.filter(function(m){
								return method.id !== m.id;
							})
							stateChange()
						}),
						text("encrypt"),
					]}))
					s("mangled-text")
					.textContent=window[method.event](s("mangled-text")
						.textContent,_.encrypt.type);
				break;
				case "encode":
					b(s("applied"),o({id:method.id,class:"method",siblings:[
						e(btn("x"),"click",e=>{
							_.applied=_.applied.filter(function(m){
								return method.id !== m.id;
							})
							stateChange()
						}),
						text("encode"),
						text(_.encode.type),
					]}))
					s("mangled-text")
					.textContent=window[method.event](s("mangled-text")
						.textContent,_.encode.type);
				break;														
			}
		})		
	}else{
		s("mangled-text").textContent=s("original-text").textContent;
	}
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
		}
	}
	mState["elements"].push(r);
	// or propchaining
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
	// ffkeys
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

function Component(type){}

o({id:"tools",class:"tools"})
o({id:"applied",class:"applied"})
o({id:"toolbar",class:"toolbar",siblings:[s("tools"),s("applied")]})
e(o({id:"original-text",class:"container",text:ipsum}),"keydown",function(){
	cl(s("mangled-text").textContent+=this.value) // fix bug here
	stateChange();
})
s("original-text").setAttribute("contentEditable", true)
o({id:"mangled-text",class:"container"})
o({id:"viewer",class:"viewer",siblings:[s("original-text"),s("mangled-text")]})
o({id:"mangler",class:"wrapper",siblings:[s("toolbar"),s("viewer")]})
// or propchaining

// creating replace tool
function replace(str,term,replacement){
	let r="",len=string=>string.length;
	let m={
		indexes:[],
		match:[]
	};
    for(let i=0;i<len(str);i++){
        for(let x=0;x<len(term);x++){
         	if(str[i+x]==term[x]){
				m.indexes.push(i+x)
				if(len(m.indexes)==len(term)){
					m.match.push(i)
					r+=replacement;
					x=0;
					i+=len(term);
				}
         	}else{
         		m.indexes=[];
         	}
        }
       	if(typeof str[i] !== "undefined"){
       		r+=str[i];
       	}
    }
    return r;
}

o({id:"replace",class:"method",siblings:[
	e(input("term"),"keydown",function(){
		_.replace["term"]+=this.value;
	}),
	e(input("replacement"),"keydown",function(){
		_.replace["replacement"]+=this.value;
	}),
	e(btn("replace"),"click", function (e){
		_.applied.push({
			id:_.applied.length,
			event:"replace",
			term:_.replace.term,
			replacement:_.replace.replacement
		})
		stateChange()
	})
]})

function exclude(text,char){
    var r="";
    for(let i=0;i<text.length;i++){
      text[i]!=char?
      (r+=text[i]):0;
    }
    return r; 
}

// creating exclude tool
o({id:"exclude",class:"method",siblings:[
	e(input("term"),"keydown",function(){
		_.exclude.char+=this.value;
	}),
	e(btn("exclude"),"click",function(){
		_.applied.push({
			id:_.applied.length,
			event:"exclude",
			char:_.exclude.char
		})
		stateChange(_.exclude) // *clear input field
		// clear service variable here; try moving it over to stateChange
	})
]})

// creating extra char tool
function extra(str,char){
	let r="",len=string=>string.length;
    for(let i=0;i<len(str);i++){
       	if(typeof str[i] !== "undefined"){
       		r+=str[i]+=char;
       	}
    }
    return r;
}

o({id:"extra",class:"method",siblings:[
	e(input("term"),"keydown",function(){
		_.extra["char"]+=this.value;
	}),
	e(btn("extra"),"click",function(){
		_.applied.push({
			id:_.applied.length,
			event:"extra",
			char:_.extra.char
		})
		stateChange()
	})
]})

// creating toLowerCase tool
function toLowerCase(str){
	let r="",len=string=>string.length;
    for(let i=0;i<len(str);i++){
    	r+=str[i].toLowerCase();
    }
    return r;
}

o({id:"lowercase",class:"method",siblings:[
	e(btn("lowercase"),"click",function(){
		_.applied.push({
			id:_.applied.length,
			event:"toLowerCase"
		})
		stateChange()
	})
]})

// creating encrypt tool
function encrypt(text,type){
	let r;
	// creating abc-up encryption
	function abcUp(char){
		let r="",abc="abcdefghijklmnopqrstuvwxyz";
		if(char==" "){
			r=" ";
		}else if(abc.indexOf(char)==abc.length-1){
			r=abc[0];
		}else{
			r=abc[abc.indexOf(char)+1];
		}
		return r;
	}

	function base64(string){
		return btoa(string)
	}

	switch(type){
		case "base64":
			r=base64(text);
		break;
		case "abcup":
			text=toLowerCase(text);
			for(let i=0;i<text.length;i++){
			  (r+=abcUp(text[i])) //abcUp as default temp.
			}
		break;
		default:
			r=base64(text);
		break;
	}

    return r;
}

o({id:"encrypt",class:"method",siblings:[
	e(input("term"),"keydown",function(){
		_.encrypt.type+=this.value;
	}),
	e(btn("encrypt"),"click",function(){
		_.applied.push({
			id:_.applied.length,
			event:"encrypt",
			type:_.encrypt.type,
		})
		stateChange()
	})
]})

function encode(str, type){
	let r;
	function l2i(str){
		let r="",len=str.length;
		let indxx={};
		for(let i=0;i<len-1;i++){
			if(typeof indxx[str[i]]=="undefined"){
				indxx[str[i]]=[i];
			}else{
				indxx[str[i]].push(i);
			}
		}
		cl(indxx);
		r=JSON.stringify(indxx);
		// multi occurance mapping here..
		return r;
	}
	switch(type){
		case "l2i": {
			r=l2i(str);
		}
		break;
		default:
			r=l2i(str);
		break;
	}
	return r;
}

o({id:"encode",class:"method",siblings:[
	e(input("term"),"keydown",function(){
		_.encode.type+=this.value;
	}),
	e(btn("encode"),"click",function(){
		_.applied.push({
			id:_.applied.length,
			event:"encode",
			type:_.encode.type,
		})
		stateChange()
	})
]});

//creating rxtx db tool
function rxtx(url){
	let r;
	// XMLHttpRequest
	const Http = new XMLHttpRequest();
	Http.open("GET", url);
	Http.send();
	//
	Http.onreadystatechange = (e) => {
	  cl(Http.responseText)
	}
	/* Fetch
	https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
	*/
	fetch(url)
	  .then((response) => {
	    return response.json();
	  })
	  .then((data) => {
	    cl(data);
	  });

	return r;
}

rxtx("http://10.0.0.127:80")

function store(obj){
	localStorage.setItem(obj.key,obj.value)
}

// creating ranking service
_.ranking={
	items:{
		382494:{
			points:0,
			accounts:[],
		},
		234890:{
			points:1,
			accounts:[0]
		}
	}
};

function rank(userId,itemId){
	let item=_.ranking.items[itemId];
	if(typeof item !=="undefined"){
		item.points+=item.accounts.indexOf(userId)==-1?
		1:0;
	}
	return item;
}

// cl(rank(0,382494))
// cl(rank(0,234890))

b(s("tools"),s("replace"))
b(s("tools"),s("exclude"))
b(s("tools"),s("extra"))
b(s("tools"),s("lowercase"))
b(s("tools"),s("encrypt"))
b(s("tools"),s("encode"))

// building langcheckup gui
o({id:"langcheckup", class:"langcheckup",siblings:[
	input(), // e
	btn("Check"),
	text("Result:false"),
]})

// register service
function registerService(service){
	_[service.name]=service;
}

// registering Router service
registerService({
	name: "router",
	init: function Router(pageId){ // handler for request and routes
		root.innerHTML='';
		switch(pageId){
			case "langcheckup":
				b(root,s("langcheckup"))
			break;
			default:
				b(root,s("mangler"))
			break;
		}
		// Dynamic menu build
		b(root,o({id:"menu",class:"menu"}))

		function menuAction(menuItem){
			function openLevel(id){
				let level=s("level"+id);
				// javascript animation..
				if(_.menu.open.indexOf(id)==-1){
					_.menu.open.push(id);
					level.style.height="calc(20%)";
				}else{
					_.menu.open=_.menu.open.filter(open=>open!==id)
					level.style.height="calc(0%)";
				}
			}

			switch(menuItem.event.type){
				case "open":
					openLevel(menuItem.event.path);
				break;
				case "route":
					_.menu.open=_.menu
						.open
						.filter(open=>{
							open!==menuItem.event.path
						});
					_.router.init(menuItem.event.path);
				break;
				case "ref":
					window.open(menuItem.event.path)
				break;
				default:
					cl("No matching route..")
				break;
			}
		}

		for(let item of menuStructure){
			b(s("menu"),e(o({class:"item", text:item.text}),"click",function(){		
				menuAction(item)
			}))

			b(root,o({id:"level"+item.event.path, class:"level"}))
			// Level list items
			for(let li of item.list){
				b(s("level"+item.event.path),e(o({id:"level"+li.event.path,class:"item", text:li.text}),"click",function(){
					menuAction(li)
				}))
			}
		}
	},
	registerRoute: function registerRoute(id,component){
		_.router.routes[id]=component;
	}
})

_.router.init()
stateChange() //init