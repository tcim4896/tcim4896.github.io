cl=console.log;
let nodeTree={};
let state={
  saved:{},
  save:function save(){
  	cl(nodeTree)
    this.saved=nodeTree;
  },
  update:function update(){
  }
}

function o(node){
	state.save();
	nodeTree[node.id]=node;
}

o({
   id:"menu",
   class:"menu",
   styles:{
    background:"black",
    height:"100px"
  }
})

// a change
function style(node,styles){
  state.save()
  for(let style in styles){
    node.styles[style]=styles[style];
  }
  state.update();
  return node;
}

function select(nodeId){
  return nodeTree[nodeId];
}

function prop(node,props){
	state.save();
	for(let prop in props){
		node[prop]=props[prop];
	}
	state.update();
	return node;
}
/*
	scan the whole obj for changes

*/
function differ(obj1,obj2){
	let objSize=0;
	function size(obj){
		cl(obj)
		for(let prop in obj){
			objSize+=1;
			if(typeof obj[prop]=="object"){
				size(obj[prop])
			}
		}
		return objSize;
	}
	cl(size(obj1),size(obj2))
}

differ(state.saved,nodeTree)

style(select("menu"),{
	background:"white",
})

prop(select("menu"),{
	styles:{
		background:"blue",
		position:"absolute",
		left:0,
		bottom:0,
		right:0,
		height:"100px"
	}
})

cl(nodeTree)