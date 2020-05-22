/*
yeey Framework
version 0.2
*/

var mStateMap = {
	services:services,
	dom:{
		flat:{},
		tree:[],
	},
};

function stateChange(){
	console.log('StateChange called..', arguments);
}

var build = function(baseElm, nodeSeq){ // engine
    function style(elm, style){
		Object.keys(style).map(function(prop){
			elm.style[prop] = style[prop];
		});
        return elm;
    };
    function addEventListeners(elm, eventListeners){
		Object.keys(eventListeners).map(function(el){
    		elm.addEventListener(el.type, function(){
    			stateChange();
    		el.fn(elm);
    		})
    	})
        return elm;
    }
    function setAttributes(elm, attributes){
    	Object.keys(attributes).map(function(attr){
            elm.setAttribute(attr, attributes[attr]);
        });
        return elm;
    }
	function setText(elm, text){
		elm.textContent=text;
		return elm;
	}
	function toElement(node){
			//cl(node);
			var 
			a = document.createElement(node.tag);
            a = style(a, node.style);
            a = addEventListeners(a, node.eventListeners);
            a = setAttributes(a, node.attributes);
			a = setText(a, node.text);
			return a;
	}

    nodeSeq.forEach(function(node){ // use scan and rsv
    	var element = toElement(node);
    	body.appendChild(element);
    });   
};

var defaultNode = {
	identifier: 'node',
	tag: 'div',
	text: 'defaultNode',
	style: {
		position: "relative",
		backgroundColor: "rgba(0,0,0,0.2)",
		width: "100%",
		lineHeight: "40px",
		paddingLeft: "10px",
		color: "#fff",
		boxSizing: "border-box"
	},
	attributes:{
		"contentEditable": true,
		"class": "node",
	},
	eventListeners:[{
		type: 'mousedown', 
		fn: function(elm){
			return function(e){
				cl("down", e);
				mStateMap[identifier].keyDown = true;
				mStateMap[identifier].e = e;
			};
		},
	}],
	children:[{a:"child"}],
}

function iterationCopy(src) {
    let target = {};
    for (let prop in src) {
        if (src.hasOwnProperty(prop)) {
        	target[prop] = src[prop];
        }
    }
    return target;
}

function fullCopy(src,target={}) {
	if(Array.isArray(src)){

	}

    for (let prop in src) {
        if (src.hasOwnProperty(prop)) {

			// check if value is object
			// is object == [] map -> if obj fullCopy
			// is object == {} -> fullCopy
			// what is the pattern over here..
			// return value should assigned to the prop of target
			// it needs to handle object, array and primitives
        	target[prop] = src[prop];
        }
    }
    return target;
}

Object.prototype.add = function(){
	cl(this);
	var nodes=arguments, self=this;
	Object.keys(arguments).map(function(i,idx){
		self.children.push(nodes[i]);
	});
	return this;
}

function defineNode(identifier, text) {
	var 
	newNode=fullCopy(defaultNode);
	newNode.identifier=identifier;
	newNode.text=text;
	mStateMap.dom.flat[identifier]=newNode;
	
	return newNode;
}

var level1 = defineNode("level1","hi");
var item1 = defineNode("item1", "item");

level1.style.position="fixed";
level1.eventListeners[0]={a:1};

body.addEventListener('mousemove', function(e){
    mStateMap = {...mStateMap, ...{y:e.clientY, x:e.clientX}}; // spread function needed
})

body.addEventListener('mousedown', function(e){
	stateChange('mousedown', e.clientX, e.ClientY)
})

build(body,[
	//level1.add(item1)
]);

function scan(arr, i=0, r=[]){
  console.log(i);
  if(typeof arr[i]=="object"){
    if(Array.isArray(arr[i])){
      console.log("ArrayHandle")
      r.push(scan(arr[i]))
    }else{
      console.log("ObjectHandle")
	  console.log(1,arr[i])
      r.push(iterationCopy(arr[i]))
    }
  }else if(typeof arr[i]!=="undefined"){
    r.push(arr[i]);
  }
  
  if(typeof arr[i+1]!=="undefined"){
    scan(arr,i+1,r);
  }
  function iterationCopy(src) {
    let target = {};
    for (let prop in src) {
        if (src.hasOwnProperty(prop)) {
			if(typeof src[prop]=="object"){
    			if(Array.isArray(src[prop])){
					console.log("ArrayHandle",src[prop])
        			target[prop] = scan(src[prop]);
				}else{
      				console.log("ObjectHandle", src[prop])
					target[prop] = iterationCopy(src[prop]);
				}
			}else{
				target[prop] = src[prop];
			}
        }
    }
    return target;
  }
  return r;
}