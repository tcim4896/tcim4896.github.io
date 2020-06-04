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
		langCheckup:{
			inputStr:""
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
	        event: {type:"route",path:"dictionary"
	        }
	      },
	    ],
	},
	{
	    text: "Leke.js",
	    event: {type:"open",path:1},
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
	        text: "Downloads",
	        event: {type:"route",path:"leke/downloads"
	        }
	      },
	    ]
  	},
	{
	    text: "Noteshare",
	    event: {type:"open",path:2},
	    list:[
		    {
		        text: "Quick start",
		        event: {type:"route",path:"noteshare"}
		    },
			{
		        text: "Register",
		        event: {type:"ref",path:"http://pinterest.com/"}
		    },
	    ]
	},
	{
	    text: "Music",
	    event: {type:"ref",path:"https://www.youtube.com/watch?v=W-KpT2o1xXY"},
	    list:[],
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

cl=console.log;
mState={};
function s(id){
  return mState[id];
}
// dropdown
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

// body
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
// tool
o({id:"lowercase",class:"method",siblings:[
	e(btn("lowercase"),"click",function(){
		_.applied.push({
			id:_.applied.length,
			event:"toLowerCase"
		})
		stateChange()
	})
]})

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
	dropdown({id:"encryptionType",text:"type",options:[
		{text:"base64",value:"base64"},
		{text:"abcup",value:"abcup"},
	]}),
	e(btn("encrypt"),"click",function(){
		_.applied.push({
			id:_.applied.length,
			event:"encrypt",
			type:s("encryptionType").value,
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
	text("Language Checkup Tool"),
	e(input(),"keydown",function(){
		_.langCheckup.inputStr+=this.value;
	}),
	e(btn("Input"),"click",function(){
		// storing a sentence into localStorage
		store({"key":localStorage.length,"value":_.langCheckup.inputStr})
		_.langCheckup.inputStr="";
	}),
	e(btn("Check"),"click",function(){
		let r=false;
		for(let i=0;i<localStorage.length-1;i++){
			r=localStorage.getItem(i)==_.langCheckup.inputStr;
		}
		if(r){
			b(s("langcheckup"),text("Yes!"))
		}else{
			// check occurance of string in localStorage
			b(s("langcheckup"),text("Sorry no occurance of this language.."))
		}
		
	})
]})

// noteshare
o({id:"noteshare", class:"noteshare",siblings:[
	text("Noteshare"),
	e(btn("Upload"),"click",function(){
		let url ="https://i.pinimg.com/originals/ef/0b/66/ef0b668ba1c367ec629cd9419016ee44.jpg";
		let img=document.createElement("img");
		img.src=url;
		img.style.height="100%";
		img.style.width="auto";
		img.style.border="1px solid #000";
		b(s("noteshare"),img)
	})
]})

o({id:"dictionary", class:"dictionary",siblings:[
	text(`mangle1[ mang-guh l ]
		verb (used with object), man·gled, man·gling.
		to injure severely, disfigure, or mutilate by cutting, slashing, or crushing:
		The coat sleeve was mangled in the gears of the machine.
		to spoil; ruin; mar badly:
		to mangle a text by careless typesetting.`),
]})

o({id:"leke/downloads", class:"dictionary",siblings:[
	text("Leke.js Framework"),
	text("Mangler"),
	// text("Window System"),
	// text("Nucleus"),
	// text("Matrix operators"),
	// text("Health Daemon"),
	// text("Pattern Generator"),
	// text("Export script"),
	// text("Upload script"),
	// text("Cross Origin Bypass"),
	// text("Dynamic Form"),
	// text("Multiple Finds"),
	// text("huh? Synthesizer"),
	// text("Drum sampler"),
	// text("Arrow game"),
	// text("Darts Trainer"),
	// text("Poule Generator"),
	// text("Push Menu"),
	// text("HTML5 Snippet"),
	// text("Default Node Server"),
	// text("Firefox Bookmarks to Playlist"),
]})
// register service
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
			s("level"+id).style.height="calc(0%)";
		}else{
			_.menu.open={id,open:true};
			s("level"+id).style.height="calc(20%)";
		}
	}

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
			case "noteshare":
				b(root,s("noteshare"))
			break;
			case "dictionary":
				b(root,s("dictionary"))
			break;
			case "leke/downloads":
				b(root,s("leke/downloads"))
			break;
			case "mangler":
				b(root,s("mangler"))
			break;
			default:
				b(root,s("mangler"))
			break;
		}
		// Dynamic menu
		b(root,o({id:"menu",class:"menu"}))

		function menuAction(menuItem){
			switch(menuItem.event.type){
				case "open":
					toggle(menuItem.event.path);
				break;
				case "close":
					_.menu.open.open=false;
					toggle()
				break;
				case "route":
					_.router.init(menuItem.event.path);
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

		for(let item of menuStructure){
			// init all menu items false
			b(s("menu"),e(o({class:"item", text:item.text}),"click",function(){		
				menuAction(item)
			}))

			if(item.event.type=="open"){
				b(root,o({id:"level"+item.event.path, class:"level", siblings:[
					o({class:"bar", text:item.text,siblings:[
						e(o({class:"close-btn",text:"x"}),"mousedown",()=>menuAction(item))
						]})
					]})
				)
			}

			// Level list items
			for(let li of item.list){
				if(li.event.type=="open"){
					b(s("level"+item.event.path),e(o({id:"level"+li.event.path,class:"item", text:li.text}),"click",function(){
						menuAction(li)
					}))					
				}else{
					b(s("level"+item.event.path),e(o({class:"item", text:li.text}),"click",function(){
						menuAction(li)
					}))
				}
			}
		}
		e(document.body,"mousedown",function(){

			// clientY < menuHeight + getLevelHeight
			// condition 
			menuAction({event:{type:"close"}});

		})
	},
	registerRoute: function registerRoute(id,component){
		_.router.routes[id]=component;
	}
})

_.router.init()
stateChange() //init