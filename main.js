cl=console.log;
mState = {
	elements:[],
	services:{
		replace:{
			term:"",
			replacement:""
		},
		excludeOne:{
			char:""
		},
		mangler:{
			applied:[]
		},
	}
};
_=mState.services;
menuStructure = [
  {
    text: "Mangler",
    event: "open",
    path: undefined,
    list: [
      {
        text: "item1",
        event: {
          type: "open",
          path: 1
        }
      },
      {
        text: "item2",
        event: {
          type: "ref",
          path: "/rss"
        }
      }
    ]
  }
];

// use this in cases adding events
d={
  value:{},
  fn(prop){
    this.value[prop]=prop;
    return this;
  }
};
d.fn(0).fn(1)

ipsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

function stateChange(){
	if(ss().mangler.applied.length>0){
		ss().mangler.applied.forEach(function(method){
			let id=ss().mangler.applied.length-1;
			switch(method.event){
				case "replace":
					b(s("applied"),o({id,class:"method",siblings:[
						text(method.event),
						text(method.term),
						text(method.replacement)
					]}))

					cl(window[method.event])
					s("mangled-text").textContent=window[method.event](
						s("original-text").textContent,
						method.term,
						method.replacement
					);
				break;
				case "excludeOne":
					b(s("applied"),o({id,class:"method",siblings:[
						text(method.char),
					]}))

					cl(window[method.event])
					s("mangled-text").textContent=window[method.event](
						s("original-text").textContent,
						method.char,
					);
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
  elm.addEventListener(type,fn); // state change
  return elm;
}

function s(id) {
  return mState[id];
}

function ss(){
	return mState.services;
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
	div.setAttribute("contentEditable",true)
	div.setAttribute("class","input")
	//div.setAttribute("data-text",placeholder+"...")
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
e(o({id:"original-text",class:"container",text:ipsum}),"keydown",function(e){
	stateChange(); // fix length bug
})
s("original-text").setAttribute("contentEditable", true)
o({id:"mangled-text",class:"container"})
o({id:"viewer",class:"viewer",siblings:[s("original-text"),s("mangled-text")]})
o({id:"wrapper",class:"wrapper",siblings:[s("toolbar"),s("viewer")]})
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
	e(input("term"),"keydown", function(e){
		ss().replace["term"]+=e.key;
	}),
	e(input("replacement"),"keydown", function(e){
		ss().replace["replacement"]+=e.key; //excludes
	}),
	e(btn("apply"),"click", function (e){
		ss().mangler.applied.push({
			event:"replace",
			term:ss().replace.term,
			replacement:ss().replace.replacement
		})
		stateChange();
		// push the method on the mangler stack
		// call the stateChange method
		// apply all the methods onto the te
	})
]})

function excludeOne(text,char){
    var r="";
    for(let i=0;i<text.length;i++){
      text[i]!=char?
      (r+=text[i]):0;
    }
    return r; 
}

o({id:"exclude-one",class:"method",siblings:[
	e(input("term"),"keydown", function(e){
		cl(0)
		ss().excludeOne["char"]+=e.key;
	}),
	e(btn("apply"),"click", function (e){
		ss().mangler.applied.push({
			event:"excludeOne",
			char:ss().excludeOne.char
		})
		stateChange();
		// push the method on the mangler stack
		// call the stateChange method
		// apply all the methods onto the te
	})
]})

b(s("tools"),s("replace"))
b(s("tools"),s("exclude-one"))
b(document.body,s("wrapper"))
stateChange() //init
