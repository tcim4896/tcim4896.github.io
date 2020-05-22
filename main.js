cl=console.log;
none="";
mState = {
	elements:[],
	services:{}
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

d={
  value:{},
  fn(prop){
    this.value[prop]=prop;
    return this;
  }
};
d.fn(0).fn(1)

function o(id, text, type, siblings = []) {
  let r = document.createElement("div");
  r.textContent = text;
  r.setAttribute("class", type);
  for (let node of siblings) {
    r.appendChild(node);
  }

  // adding chain to define it's level
  mState[id] = r;
  mState["elements"].push(r);
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


o("tools",none,"tools")
o("applied",none,"applied")
o("toolbar",none,"toolbar",[s("tools"),s("applied")])
o("viewer",none,"viewer")

o("wrapper",none,"wrapper",[s("toolbar"),s("viewer")])

s("viewer").setAttribute("contentEditable", true)

b(document.body,s("wrapper"))

