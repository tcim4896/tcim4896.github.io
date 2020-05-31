cl=console.log;
mState={
  x:0,y:0,
  storage:[],
};
pos=(time)=>{
  let r = {
    x:mState.x,
    y:mState.y,
    timestamp: Date.now()
  }
  // filter possibility on time
  return r;
}

document
  .body
  .addEventListener("mousemove",e=>{
    mState.x=e.clientX;
    mState.y=e.clientY;
    mState.storage.push(pos());
})

for(let i=0;i<10;i++){
  setTimeout(function(){
    // 10s for mousemove
    // log recorded data
     cl(mState.storage)
  },1000*i)
}

// playback simulation
function play(recording){
  /*
  create fake cursor
  move cursor according to storage
  deficit storage miliseconds
  loop storage.length
  tare timestamp to current time
  */
}