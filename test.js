const RECT_WIDTH = 300;
const RECT_HEIGHT = 30;
const BASE_WIDTH = RECT_WIDTH;
const BASE_HEIGHT = 300;

// 四角/ラベルを並べる親オブジェクト
var base = getRect(0, BASE_HEIGHT, BASE_WIDTH, 0, "#000",0);
// 四角用のグループ
var group = svg.g().attr({mask: getRect(0, 0, BASE_WIDTH, BASE_HEIGHT, "#fff")});
// ラベル用のグループ
var labelGroup = svg.g().attr({mask: getRect(0, 0, BASE_WIDTH, BASE_HEIGHT, "#fff")});

// 適当に幾つか追加
for(var i=0; i<2+Math.random()*5; i++) pushRect(group.children().length);

// 四角を追加する
function pushRect(str){
	// draw Rect
	var rect = getRect(
		parseInt(base.node.getAttribute("x")),
		parseInt(base.node.getAttribute("y")) - RECT_HEIGHT*(group.children().length+1),
		RECT_WIDTH,
		RECT_HEIGHT,
		"#"+Math.floor(Math.random()*800)+100 // color
	);
	// draw Label
	var label = getLabel(
		50,
		parseInt(base.node.getAttribute("y")) - RECT_HEIGHT*(group.children().length+1) + 20,
		20,
		"",
		str,
		"#fff"
	);
	// append
	addChild(rect, base);
	addChild(label, rect);
	group.append(rect);
	labelGroup.append(label);
	// scroll
	if(group.children().length>7 || parseInt(base.node.getAttribute("y"))!=BASE_HEIGHT){
		scrollRectsTo(group.children().length-1);
	}
	return label;
}

// インデックス指定スクロール
function scrollRectsTo(idx){
	var shiftHeight = 100; //よしなにずらす
	move(base, parseInt(base.node.getAttribute("x")), idx*RECT_HEIGHT+shiftHeight, 100);
}

// ホイールスクロール
group.node.addEventListener("wheel", function(e){
	// 上にスクロール
	if(e.deltaY<0 && parseInt(base.node.getAttribute("y"))<=RECT_HEIGHT*group.children().length+RECT_HEIGHT*4){
		move(base, parseInt(base.node.getAttribute("x")), parseInt(base.node.getAttribute("y"))+RECT_HEIGHT, 10);
	}
	// 下にスクロール
	if(e.deltaY>0){
		if(BASE_HEIGHT<=parseInt(base.node.getAttribute("y"))-RECT_HEIGHT*1){
			move(base, parseInt(base.node.getAttribute("x")), parseInt(base.node.getAttribute("y"))-RECT_HEIGHT, 10);
		}else{
			move(base, parseInt(base.node.getAttribute("x")), BASE_HEIGHT, 1); // 位置を修正
		}
	}
});

// ドラッグスクロール
// 要素をひきずってしまうため、実装不可能な気が…
/*
var mouseY;
document.addEventListener("mousedown", function(e){
	mouseY = e.layerY;
});
group.node.addEventListener("mousemove", function(e){
	if(e.buttons>0){
		move(base, parseInt(base.node.getAttribute("x")), parseInt(base.node.getAttribute("y"))-(mouseY-e.layerY), 0);
		mouseY = e.layerY;
	}
});
*/




/*
rect(50,50,100,100,"black",1,"black",5);
var b=getRect(200,0,300,300,"#00f",1,"white",5);
var g=getRect(200,0,200,200,"#0f0",1,"white",5);
var r=getRect(400,0,100,100,"#f00",1,"white",5);
var labelR=getLabel(220,20,20,"","red","#fff");
var labelG=getLabel(320,20,20,"","green","#fff");
var labelB=getLabel(420,20,20,"","blue","#fff");
addChild(labelR,r);
addChild(labelG,g);
addChild(labelB,b);
addChild(r,g);
addChild(g,b);


//var ddd = svg.group(svg.circle(50, 150, 70), svg.circle(200, 150, 70));

var parentList = [];
var scl = 1;
function createParent(){
	var par = getRect(parentList.length*220*scl, 0*scl, 200*scl, 300*scl, "#aaa", 1, "white", 5);
	par.childList = [];
	par.node.onclick = function(){
		// 子を生成する
		var chl = getRect((parseInt(par.node.getAttribute("x"))+10*scl), (parseInt(par.node.getAttribute("y"))+10*scl+par.childList.length*55)*scl, 180*scl, 50*scl, "#000", 1, "white", 0);
		par.childList.push(chl);
		addChild(chl, par);
	};
	parentList.push(par);
	if(parentList.length>3){
		scl *= 0.9;
		parentList.forEach(function(p){
			move(p,parseInt(p.node.getAttribute("x"))*scl/(scl/0.9),parseInt(p.node.getAttribute("y"))*scl/(scl/0.9),200);
			changeSize(p,parseInt(p.node.getAttribute("width"))*scl/(scl/0.9),parseInt(p.node.getAttribute("height"))*scl/(scl/0.9),200);
			p.childList.forEach(function(c){
				move(c,parseInt(c.node.getAttribute("x"))*scl/(scl/0.9),parseInt(c.node.getAttribute("y"))*scl/(scl/0.9),200);
				changeSize(c,parseInt(c.node.getAttribute("width"))*scl/(scl/0.9),parseInt(c.node.getAttribute("height"))*scl/(scl/0.9),200);
			});
		});
	}
	return par;
}




function moveObj(){
	move(b,500,100,500);
}

function scale(){
	changeSize(b,500,500,500);
}

function color(){
	changeColor(rects[0],"#fff",1,500);
	changeColor(r,"#0f0",1,500);
	changeColor(g,"#00f",1,500);
	changeColor(b,"#f00",1,500);
	changeText(labelR,"green");
	changeText(labelG,"blue");
	changeText(labelB,"red");
}

function reset(){
	changeColor(rects[0],"#000",1,0);
	move(b,200,0,0);
	changeSize(b,300,300,0);
	changeColor(r,"#f00",1,0);
	changeColor(g,"#0f0",1,0);
	changeColor(b,"#00f",1,0);
	changeText(labelR,"red");
	changeText(labelG,"green");
	changeText(labelB,"blue");
}
*/