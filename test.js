var b=getRect(200,100,300,300,"#00f",1,"white",5);
var g=getRect(200,100,200,200,"#0f0",1,"white",5);
var r=getRect(400,100,100,100,"#f00",1,"white",5);
var labelR=getLabel(420,120,20,"","red","#fff");
var labelG=getLabel(220,120,20,"","green","#fff");
var labelB=getLabel(220,380,20,"","blue","#fff");
addChild(labelR,r);
addChild(labelG,g);
addChild(labelB,b);
addChild(r,g);
addChild(g,b);

/*
矢印描画
引数はx1,y1,x2,y2,幅、色
*/
var arrow=getArrow(490,110,350,110,5,"#f00");
//alert(arrow);
//changeColor(arrow,"blue",1,1000);
drawArrow(490,110,230,110,5,"#f00");
drawArrow(490,110,300,110,5,"#f00");
drawArrow(210,110,210,350,6,"#0f0");

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
