var matrix1=[1,2,3,4,5,6,7,8,9];
/*
 *
 * 1,2,3
 * 4,5,6
 * 7,8,9
 *
 * */
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
cl(reverse([1,2,3]))
cl(reverse("abc"))
/*
 * 2 options:
 * calc sqrt + col= a, o=reverse(a)
 * formula to get reverse(a)
 * 
 * */

function reverseCol(col,matrix){
	var r=matrix,len=matrix.length,
	sqrt=Math.sqrt(len),a=[],b=Array(sqrt);

	for(let i=0,x=sqrt-1;i<sqrt;(i++,x--)){
		var cell=(i==0)?col:col+(i*sqrt);
		b[x]=matrix[cell];
		a[i]=cell;
	}
	for(let i=0;i<a.length;i++){
		cl(matrix[b[i]],matrix);
		r[a[i]]=b[i];
	}
	return r;
}	
var matrix1=[1,2,3,4,5,6,7,8,9];
function reverseRow(row,matrix){
	let r=matrix;

	return r;
}

cl(reverseRow(0,matrix1))
/*
 * allows more verbose coding
 * set this[id] vs. this.storage[id]
 * this incl. methods
 * storage as return obj does not
 * */
function acc(args,fn){
	var storage ={...arguments};
	function setArgs(args){
		//objloop
		//set this vars
	}
	return {
		inc: (val,id)=>{
			this[id]+=val;
			return this[id];
		},
		get: (id)=>{
			return this[id];
		}
	}
}
/*
 * for using acc function..
 * acc as helper fn??
 * */

function getColValues(col,matrix){
	var r=[],sqrt=Math.sqrt(matrix.length);;
	for(var i=0;i<sqrt;i++){
		var idx=i===0?col:col+(i*sqrt);
		r.push(matrix[idx]);
	}
	return r;
}
//cl(getColValues(1,matrix));
/*
process.stdin.setEncoding("utf-8");
process.stdin.on("data", function(d){
	cl(d);
	process.stdout.write("\033c")
	cl("Oke",d)
})
*/
function getValuesByPattern(ptrn,matrix){
	return ptrn.map((x,i)=>matrix[ptrn[i]]);
}

function getDiagonal(matrix){
	var r=[];
	for(let i=0;i<matrix.length;i++){
	r.push(i==0?0:Math.sqrt(matrix)+1);
	}
	return r;
}
