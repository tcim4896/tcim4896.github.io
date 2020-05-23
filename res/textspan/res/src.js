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