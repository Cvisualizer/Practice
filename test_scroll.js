var base = getRect(50,300, 300,1, "#000",1, "#000",0);
var children = [null];

for(var i=0; i<4; i++){
	pushRect();
}

function pushRect(){
	// draw
	// いちいちマスクを作るという無駄なアレはなんとかしたいけどgroupをつくらないとなんともならなさそう
	var rect = getRect(parseInt(base.node.getAttribute("x")),parseInt(base.node.getAttribute("y"))-30*children.length, 300, 30, "#"+parseInt(Math.random()*800)+100,1, "#000",0);
	var frame = getRect(50,50, 300,250, "#aaa",1, "#000",0)
	rect.attr({mask: frame});
	// append
	addChild(rect, base);
	children.push(rect);
	// scroll
	if(children.length>8){
		move(base, parseInt(base.node.getAttribute("x")), parseInt(base.node.getAttribute("y"))+30, 100);
	}
}

function scUp(){
	move(base, parseInt(base.node.getAttribute("x")), parseInt(base.node.getAttribute("y"))-30, 100);
}

function scDown(){
	move(base, parseInt(base.node.getAttribute("x")), parseInt(base.node.getAttribute("y"))+30, 100);
}

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