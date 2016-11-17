Math.seedrandom("ORF2016Change");
//<<<<<<< Updated upstream
function initDataList(){
	make_dataList(function(){
		var color=selectColor();
	    global_variable('*s',color[0]);
	    pushGlobalMemory('*s',color[1],color[0]);
	});
	make_dataList(function(){
		var color=selectColor();
	    global_variable('*s1',color[0]);
	    pushGlobalMemory('*s1',color[1],color[0]);
	});
	make_dataList(function(){
		var color=selectColor();
	    global_variable('*s2',color[0]);
	    pushGlobalMemory('*s2',color[1],color[0]);
	});
	make_dataList(function(){ var color=selectColor(); main_func('main','black') });
	make_dataList(function(){
		var color=selectColor();
	    main_local_variable('a',color[0]);
	    pushMemory('a',color[1],color[0]);
	});
	make_dataList(function(){
		var color=selectColor();
	    main_local_variable('b',color[0]);
	    pushMemory('b',color[1],color[0]);
	});
	make_dataList(function(){
		var color=selectColor();
	    main_local_variable('c',color[0]);
	    pushMemory('c',color[1],color[0]);
	});
	make_dataList(function(){
		var color=selectColor();
	    main_local_variable('*p',color[0]);
	    pushMemory('*p',color[1],color[0]);
	});
}
//=======
//<<<<<<< Updated upstream
//>>>>>>> Stashed changes


//function update(){

//=======
var animSpan=30;
var animCount=0;
var dataAnimLen=7;
var isStart=false;

draw_mapping(800,1);

function start(){
	isStart=true;
	initDataList();
}

function update(){
	if(isStart==true){
		if(animCount%animSpan==0){
			if(animCount/animSpan<dataAnimLen){
				mapping();
			}
		}
		animCount++;
	}
}