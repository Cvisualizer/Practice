rect(50,50,100,100,"black",1,"black",5);
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

//move(g,100,0,100);

function moveObj(){
	move(b,500,100,500);
}

function scale(){
	changeSize(b,300,10,500);
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
