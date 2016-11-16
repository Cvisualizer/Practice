/*
色の取得関係
サーバーから色情報をもらってきて系統ごとに配列に格納
配列の中から、ランダムに色を取得する
*/

var colorSet;
var colorCount=0;
const MAX_COLOR_VALUE=500;
const MIN_COLOR_VALUE=200;

socket=io.connect("http://133.27.5.14:5324/",function(){
	//socket.emit('message');
});
socket.emit('message');
socket.on('greeting',function(data){
	colorSet=data;
	console.log(data);
	checkColor();
});

//指定範囲外の色を除外する
function checkColor(){
	for(var i=0;i<colorSet.length;i++){
		for(var j=0;j<colorSet[i].length;j++){
			var r,g,b=0;
			r=parseInt(colorSet[i][j].slice(1,3),16);
			g=parseInt(colorSet[i][j].slice(3,5),16);
			b=parseInt(colorSet[i][j].slice(5,7),16);
			if(r+g+b<MIN_COLOR_VALUE||r+g+b>MAX_COLOR_VALUE){
				colorSet[i].splice(j,1);
			}
		}
	}
	//showColorSet();
}

/*
ランダムな色を取得して配列を返す
配列の1番目には取得した色、
2番目にはその色と併用するテキストの色が格納される(濃い色なら白、薄い色なら黒)
*/
function selectColor(){
	var rn=Math.floor(Math.random()*(colorSet[colorCount%4].length));
	var rcv=colorSet[colorCount%4][rn];
	if(rcv==undefined) alert(colorCount%4+" "+rn);
	var r,g,b,tc=0;
	r=parseInt(rcv.slice(1,3),16);
	g=parseInt(rcv.slice(3,5),16);
	b=parseInt(rcv.slice(5,7),16);
	if(r+g+b<350) tc="#fff";
	else tc="#000";
	colorCount++;
	return [rcv,tc];
}

//全ての色を表示する
function showColorSet(){
	for(var i=0;i<colorSet.length;i++){
		for(var j=0;j<colorSet[i].length;j++){
			rect(700+i*30,50+j*30,20,20,colorSet[i][j],1,"#fff",0);
		}
	}
}