var count=0;
var slide=false;
var slideCount=0;
var started=false;
var animSpan=30;
var is_play=false;
var memory;
const OBJ_NUM=10;
var stack=new Array();
var usedSpace;

function initialDraw(){
	memory=getRect(900,120,350,550,"#202f55",1);
	mapping(10,10,0);
}

function update(){
	moveBar();
}

function draw(phase){
	switch(phase){
		case 0:
			rect(350,300,200,200,"#000",0.9);
			label(350,290,25,"futura","main","#000");
			addChild(labels[0],rects[0]);
			rect(350,550,50,70,"#00bb99",0.9);
			label(350,540,20,"futura","num","#000");
			addChild(labels[1],rects[1]);
			break;
		default:
			//rect(riseX[phase-1],riseY[phase-1],riseW[phase-1],riseH[phase-1],"#000",0.9);
			if(phase<=OBJ_NUM){
				rect(riseX[phase-1],riseY[phase-1],65,100,"#000",0.9);
				label(riseX[phase-1],riseY[phase-1]-10,20,"futura","sub("+phase+")","#000");
				var localX=getRect(riseX[phase-1]+5,riseY[phase-1],20,40,"#aaa",0.9);
				var localY=getRect(riseX[phase-1]+40,riseY[phase-1],20,40,"#aaa",0.9);
				var fn=getRect(900,670-100*phase,350,100,"#000",0.9,"#202f55",5);
				var fnx=getRect(900,740-100*phase,350,20,"#00a1e9",0.9);
				usedSpace+=100*phase;
				addChild(labels[phase],rects[phase]);
				addChild(localX,rects[phase]);
				addChild(localY,rects[phase]);
			}
			break;
	}
}

function moveBar(){
	if(slide==true){
		if(slideCount>=0){
			document.getElementById('sideBar').style.left=slideCount+"%";
			document.getElementById('editor').style.left=(slideCount+1)+"%";
			document.getElementById('tutorial').style.left=(slideCount+3.9)+"%";
			document.getElementById('exec').style.left=(slideCount+7.3)+"%";
			document.getElementById('execText').style.left=(slideCount+10.7)+"%";
			document.getElementById('title').style.left=(slideCount+2.5)+"%";
			document.getElementById('drawAreaText').style.left=(slideCount+42.5)+"%";
			document.getElementById('drawAreaText2').style.left=(slideCount-56.5)+"%";
		}
		if(started==false&&slideCount<=0){
			initialDraw();
			started=true;
		}
		slideCount-=2;
	}

	if(started==true){
		if(count%animSpan==0){
			draw(count/animSpan);
		}
		count++;
	}
}

function setSlide(state){
	slide=state;
	if(slide==true){
		slideCount=38;
	}
}

function play(){
	if(is_play==false){
		//request();
	}
	else{
		reset();
	}
}