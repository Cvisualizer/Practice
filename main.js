Math.seedrandom("ORF2016Change");
var animSpan=30;
var animCount=0;
var dataAnimLen=8;
var isStart=false;
var commonColor='';

isDisplayStackID = false; // スタックのIDを表示するか否か

//<<<<<<< Updated upstream
function initDataList(){
	make_dataList(function(){
	    global_variable('*s',commonColor[0]);
	});
	make_dataList(function(){
	    global_variable('*s1',commonColor[0]);
	});
	make_dataList(function(){
	    global_variable('*s2',commonColor[0]);
	});
	make_dataList(function(){ main_func('main','black') });
	make_dataList(function(){
	    main_local_variable('a',commonColor[0]);
	});
	make_dataList(function(){
	    main_local_variable('b',commonColor[0]);
	});
	make_dataList(function(){
	    main_local_variable('c',commonColor[0]);
	});
	make_dataList(function(){
	    main_local_variable('*p',commonColor[0]);
	});
}

stackAnim={
	0:function(){
		var m1 = pushGlobalMemory('s',commonColor[1],commonColor[0]);
	    var color2=selectColor();
		var m2 = pushGlobalMemory('"welcom"',color2[1],color2[0]);
		addGlobalArrow(m1.id, m2.id, commonColor[0]);
	},
	1:function(){
		var m1 = pushGlobalMemory('s1',commonColor[1],commonColor[0]);
	    var color2=selectColor();
	    var m2 = pushGlobalMemory('"to"',color2[1],color2[0]);
		addGlobalArrow(m1.id, m2.id, commonColor[0]);
	},
	2:function(){
		var m1 = pushGlobalMemory('s2',commonColor[1],commonColor[0]);
	    var color2=selectColor();
	    var m2 = pushGlobalMemory('"ORF"',color2[1],color2[0]);
		addGlobalArrow(m1.id, m2.id, commonColor[0]);
	},
	4:function(){
		pushMemory('a : 10',commonColor[1],commonColor[0]);
	},
	5:function(){
		pushMemory('b : 20',commonColor[1],commonColor[0]);
	},
	6:function(){
		pushMemory('c : 30',commonColor[1],commonColor[0]);
	},
	7:function(){
		pushMemory('p',commonColor[1],commonColor[0]);
		addStackArrow(3, 1, commonColor[0]);
	},
	8:function(){
		var ele_a = document.getElementById('0');
		ele_a.innerHTML = "a : 11";
	},
	9:function(){
		var arrow = getStackArrowById(3);
		moveStackArrow(arrow,3,0);
	}
}

//=======
//<<<<<<< Updated upstream
//>>>>>>> Stashed changes


//function update(){

//=======

draw_mapping(800,1);

function start(){
	isStart=true;
	initDataList();
}

function update(){
	if(isStart==true){
		if(animCount%animSpan==0){
			commonColor=selectColor();
			if(animCount/animSpan<dataAnimLen){
				mapping();
			}
			if(stackAnim[animCount/animSpan]){
				stackAnim[animCount/animSpan]();
			}
		}
		animCount++;
	}
}