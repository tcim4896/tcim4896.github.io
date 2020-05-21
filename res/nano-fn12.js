/*

  undo/redo concept
  filter word
  replace word

*/

const cl=console.log; 
var directory=[0,[0,[479],2],2];
cl(directory[1][1][0])
function fs(path){
    let len=val=>val.length;
    let int=val=>parseInt(val);
    r=[directory];//input root
    for(let i=0;i<len(path)-1;i++){
        r=r[int(path.charAt(i))];
    }
    r=r[path.charAt(len(path)-1)];
    return (cl(r),r);
}
// fs("0110")
// fs("012")
// fs("01")
// fs("0")

const log = console.log;
var ipsum = "lorem ipsum";
function scan(str,term){
    let len=string=>string.length;
    for(let i=0;i<len(str);i++){
         for(let x=0;x<len(term);x++){
            log(i,x,str[i+x]==term[x])
        }
    }
}
//scan(ipsum,"em")

function excludeOne(text,char){
    var r="";
    for(let i=0;i<text.length;i++){
      text[i]!=char?
      (r+=text[i]):0;
    }
    return r; 
}

cl(excludeOne("hallo","a"))

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
     //01234567890123456789012
ipsum="lorum ipsum ipsum ipsum"
cl(replace(ipsum, "ipsum","muspi"))

len=string=>{
	let count=0,_="";
	for(let i=0;i==_;i++){
		if(typeof string[i]!=="undefined"){
			count++
		}else{
			i=_;
		}
	}
	return count;
}

function filter(str,term){
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

log(filter("hello bye", "hello"))

function shuffle(str){
	let r="";

	return r;		
}

function shuffle(o){
	for (var j, x, i = o.length; 
		i; j = Math.floor(Math.random() * i),
		 x = o[--i], o[i] = o[j], o[j] = x);
		return o;
}

cl(shuffle(["z","y","x"]))

function upOne(char){
	let r="",abc="abcdefghijklmnopqrstuvwxyz";
	if(abc.indexOf(char)==abc.length-1){
		r=abc[0];
	}else{
		r=abc[abc.indexOf(char)+1];
	}
	return r;
}

console.log(upOne("z"))

function sentenceMix(sentence){
	let r="",s=sentence.split(' ');
	s=shuffle(s);
	function shuffle(o){
	for (var j, x, i = o.length; 
		i; j = Math.floor(Math.random() * i),
		 x = o[--i], o[i] = o[j], o[j] = x);
		return o;
	}
	return s.join(' ');
}

function reverse(arr){
	var r=[],seq={val:arr,str:false};
	if(typeof arr==="string"){
		seq.str=true;
		seq.val=[...arr];
	}
	for(let i=seq.val.length-1;i>=0;i--){
		r.push(seq.val[i]);
	}
	return seq.str?r.join(''):r;

}


function extra(str,char){
	let r="",len=string=>string.length;
    for(let i=0;i<len(str);i++){
       	if(typeof str[i] !== "undefined"){
       		r+=str[i]+=char;
       	}
    }
    return r;
}

function encrypt(char,table1,table2){
	return table2[table1.indexOf(char)];
}