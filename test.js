var b=getRect(200,100,300,300,"#00f",1,"white",5);
var g=getRect(200,100,200,200,"#0f0",1,"white",5);
var r=getRect(400,100,100,100,"#f00",1,"white",5);
var v=getRect(400,450,100,100,"#0ff",1,"white",5);
var labelB=getLabel(220,380,20,"","blue","#fff");
var labelR=getLabel(420,120,20,"","red","#fff");
var labelG=getLabel(220,120,20,"","green","#fff");
var labelV=getLabel(425,505,16,"","#00ffff","#000");
var labelVT=getLabel(340,570,16,"","クリックするとランダム色変化","#000");
addChild(labelR,r);
addChild(labelG,g);
addChild(labelB,b);
addChild(r,g);
addChild(g,b);

v.click(function(e,x,y){
	changeSampleColor();
});

function changeSampleColor(){
	var newColor=selectColor();
	//changeColor(v,newColor,1,100);
	changeColor(v,newColor[0],1,100);
	labelV.attr("text",newColor[0]);
	changeColor(labelV,newColor[1],1,0);
}

/*
矢印描画
引数はx1,y1,x2,y2,幅、色
*/
var arrow=getArrow(490,110,350,110,5,"#f00");
drawArrow(490,110,230,110,5,"#f00");
drawArrow(490,110,300,110,5,"#f00");
var arrow2=getArrow(210,110,210,350,6,"#0f0");



//---- Stack Example

	// 適当に追加してるだけ　テスト用
	for(var i=0; i<17; i++){
		pushMemory("pre"+i);
	}

	// スタック矢印
	var stackArrows = [];

	// スクロールで矢印も動かすように
	stackWrapper.addEventListener("scroll" , function (e){
		console.log(e);
		var _arrows = []
		stackArrows.forEach(function(arw){
			var d = arw.node.getAttribute('d');
			var start = (d.match(/^M(.*?)C/i)[1]).split(",");
			var end = d.split(",").slice(this.length-2);
			_arrows.push(
				getArrow(parseInt(start[0]), parseInt(start[1])+e.deltaY, parseInt(end[0]), parseInt(end[1])+e.deltaY, 3, "#aaa")
			);
			arw.remove();
		});
		_arrows.forEach(function(arw){
			stackArrows.push(arw);
		});
	});




//---------------------------------------//
//---- ↓↓↓ Tool Button Functions ↓↓↓ ----//
function moveObj(){
	move(b,500,100,500);
}

function scale(){
	changeSize(b,300,10,500);
}

function color(){
	changeColor(r,"#0f0",1,500);
	changeColor(g,"#00f",1,500);
	changeColor(b,"#f00",1,500);
	changeText(labelR,"green");
	changeText(labelG,"blue");
	changeText(labelB,"red");
}

function transformArrow(){
	arrow.transform(490,110,190,110,6,300);
	arrow2.transform(210,110,210,600,6,300);
}

function stack_push(){
	pushMemory("push"+stack.children.length);
}

function stack_addArrow(){
	var start = prompt("始点:ID");
	var end = prompt("終点:ID");
	var x = window.screen.width - stackWrapper.offsetWidth - 10;
	stackArrows.push(getArrow(x, getDisplayY(start)-20, x, getDisplayY(end)-10, 3, "#aaa"));
}

function stack_rndDisplay(){
	// 矢印削除
	stackArrows.forEach(function(arw){
		arw.remove();
	})
	// 表示変更
	var arr = [];
	for(var i=0; i<stack.children.length; i++){
		if(Math.random()<0.6) arr.push(i);
	}
	displayMemories(arr);
}

function reset(){
	move(b,200,0,0);
	changeSize(b,300,300,0);
	changeColor(r,"#f00",1,0);
	changeColor(g,"#0f0",1,0);
	changeColor(b,"#00f",1,0);
	changeText(labelR,"red");
	changeText(labelG,"green");
	changeText(labelB,"blue");
}
