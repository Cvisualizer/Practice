//---- 動作確認用
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

// スタック
for(var i=0; i<25; i++){
	pushMemory("pre"+i, "#fff", "#bbb");
}
// グローバル
pushGlobalMemory("global1");
pushGlobalMemory("global2");
//----

function update(){
	
}