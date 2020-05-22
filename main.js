cl=console.log;
none="";
mState = {
	elements:[],
	services:{
		replace:{
			term:"",
			replacement:""
		}
	}
};
menuStructure = [
  {
    text: "News",
    event: "open",
    path: 1,
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
				for (let node of args[prop]) {
    			r.appendChild(node);
  			}
  			break;
  			case "id":
  				mState[args[prop]] = r;
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

function b(elm, sibling) {
  elm.appendChild(sibling);
}

e(document.body,"mousedown",function(e){
	mState['mousedown']=true
})
e(document.body,"mouseup",function(e){
	mState['mousedown']=false
})

function input(){
	let div=document.createElement("div");
	div.setAttribute("contentEditable", true)
	div.setAttribute("class", "input")
	return div;
}

o({id:"tools",class:"tools"})
o({id:"applied",class:"applied"})
o({id:"toolbar",class:"toolbar",siblings:[s("tools"),s("applied")]})
o({id:"viewer",class:"viewer", text:"lorum ipsum"})
o({id:"wrapper",class:"wrapper",siblings:[s("toolbar"),s("viewer")]})
// or propchaining
s("viewer").setAttribute("contentEditable", true)
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

o({id:"replace",class:"replace",siblings:[
	e(input(),"keydown", function(e){
		mState.services.replace["term"]+=e.key;
	}),
	e(input(),"keydown", function(e){
		mState.services.replace["replacement"]+=e.key;
		s("viewer").innerText=replace(s("viewer").innerText,
			mState.services.replace.term,
			mState.services.replace.replacement)
	})
]})
b(s("tools"),s("replace"))


b(document.body,s("wrapper"))

